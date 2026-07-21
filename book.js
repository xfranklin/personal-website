#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { createInterface } = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const booksPath = path.join(__dirname, "src/site/_data/books.json");

function toRating(value) {
  const rating = Number(value.trim().replace(",", "."));

  if (!Number.isFinite(rating) || rating < 0 || rating > 10) {
    throw new Error("Rating must be a number from 0 to 10.");
  }

  return rating;
}

function toYear(value) {
  const year = Number(value.trim());

  if (!Number.isInteger(year) || year < 1 || year > new Date().getFullYear()) {
    throw new Error("Year must be a valid year.");
  }

  return year;
}

function toReadDate(value) {
  const match = value.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    throw new Error("Read date must use the DD.MM.YYYY format.");
  }

  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    throw new Error("Read date is not a valid calendar date.");
  }

  return value.trim();
}

function readBooks() {
  if (!fs.existsSync(booksPath)) return [];

  const books = JSON.parse(fs.readFileSync(booksPath, "utf8"));
  if (!Array.isArray(books)) {
    throw new Error("books.json must contain an array.");
  }

  return books;
}

async function main() {
  const prompt = createInterface({ input, output });

  try {
    const title = (await prompt.question("Book title: ")).trim();
    const description = (await prompt.question("Description: ")).trim();
    const year = toYear(await prompt.question("Year written: "));
    const read = toReadDate(await prompt.question("Read date (DD.MM.YYYY): "));
    const rating = toRating(await prompt.question("Your rating (0–10): "));
    const poster = (await prompt.question("Poster path: ")).trim();

    if (!title) throw new Error("Book title is required.");
    if (!poster) throw new Error("Poster path is required.");

    const books = readBooks();
    books.push({ title, description, year, read, rating, poster });

    fs.writeFileSync(booksPath, `${JSON.stringify(books, null, 2)}\n`);
    console.log(`Added “${title}” to ${booksPath}.`);
  } finally {
    prompt.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
