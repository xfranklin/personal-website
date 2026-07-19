#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { createInterface } = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const moviesPath = path.join(__dirname, "src/site/_data/movies.json");
const envPath = path.join(__dirname, ".env");

function getEnvValue(name) {
  if (process.env[name]) return process.env[name];

  try {
    const line = fs
      .readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .find((item) => item.startsWith(`${name}=`));
    return (
      line
        ?.slice(name.length + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "") || ""
    );
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

function toRating(value) {
  if (!value.trim()) return null;

  const rating = Number(value.replace(",", "."));
  if (!Number.isFinite(rating) || rating < 0 || rating > 10) {
    throw new Error("Rating must be a number from 0 to 10.");
  }

  return rating;
}

function toYear(value) {
  const match = String(value).match(/^\d{4}/);
  return match ? Number(match[0]) : null;
}

function toWatchedDate(value) {
  const match = value.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    throw new Error("Watched date must use the DD.MM.YYYY format.");
  }

  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    throw new Error("Watched date is not a valid calendar date.");
  }

  return value.trim();
}

async function main() {
  const prompt = createInterface({ input, output });

  try {
    const apiKey = getEnvValue("OMDB_API_KEY") || (await prompt.question("OMDb API key: ")).trim();
    const id = (await prompt.question("IMDb movie ID (for example, tt3896198): ")).trim();
    const rating = toRating(await prompt.question("Your rating (0–10, optional): "));
    const watched = toWatchedDate(await prompt.question("Watched date (DD.MM.YYYY): "));
    const description = (await prompt.question("Description or i18n key (optional): ")).trim();

    if (!apiKey) throw new Error("OMDb API key is required.");
    if (!/^tt\d+$/.test(id)) throw new Error("IMDb ID must look like tt3896198.");

    const url = new URL("https://www.omdbapi.com/");
    url.searchParams.set("i", id);
    url.searchParams.set("apikey", apiKey);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.Response !== "True") {
      throw new Error(`OMDb request failed: ${data.Error || `HTTP ${response.status}`}`);
    }

    const movies = JSON.parse(fs.readFileSync(moviesPath, "utf8"));
    if (!Array.isArray(movies)) throw new Error("movies.json must contain an array.");
    if (movies.some((movie) => movie.id === id)) {
      throw new Error(`A movie with IMDb ID ${id} is already in movies.json.`);
    }

    movies.push({
      watched,
      year: toYear(data.Year),
      rating,
      title: data.Title,
      id,
      description,
      poster: data.Poster === "N/A" ? "" : data.Poster
    });

    fs.writeFileSync(moviesPath, `${JSON.stringify(movies, null, 2)}\n`);
    console.log(`Added “${data.Title}” to ${moviesPath}.`);
  } finally {
    prompt.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
