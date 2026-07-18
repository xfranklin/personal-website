import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import i18n from "eleventy-plugin-i18n";
import sitemap from "@quasibit/eleventy-plugin-sitemap";
import { dateToIsoString } from "./11ty/filters/date-to-iso-string.ts";
import { formatDate } from "./11ty/filters/format-date.ts";
import { getYear } from "./11ty/filters/get-year.ts";
import { sortArticles } from "./11ty/filters/sort-articles.ts";
import en from "./src/site/_data/locales/en.json";
import ru from "./src/site/_data/locales/ru.json";
import site from "./src/site/_data/site.json";
import uk from "./src/site/_data/locales/uk.json";

const locales = { en, ru, uk };
const translations = Object.fromEntries(
  Object.keys(uk).map((key) => [
    key,
    Object.fromEntries(
      Object.entries(locales).map(([locale, dictionary]) => [
        locale,
        dictionary[key as keyof typeof uk]
      ])
    )
  ])
);

export default function (eleventyConfig: any) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: { "*": "uk" }
  });
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: site.url
    }
  });
  eleventyConfig.addCollection("sitemap", (collectionApi: any) => {
    const items = collectionApi
      .getAll()
      .filter((item: any) => item.url && !item.data.sitemap?.ignore);

    return items.map((item: any) => {
      const translations = item.data.translationKey
        ? items.filter((other: any) => other.data.translationKey === item.data.translationKey)
        : [];

      return {
        url: item.url,
        date: item.date,
        data: {
          ...item.data,
          sitemap: {
            ...item.data.sitemap,
            ...(translations.length
              ? {
                  links: translations.map((translation: any) => ({
                    lang: translation.data.locale,
                    url: translation.url
                  }))
                }
              : {})
          }
        }
      };
    });
  });
  eleventyConfig.addCollection("newPublications", (collectionApi: any) =>
    collectionApi.getAll().filter((item: any) => {
      const tags = item.data.tags;
      return Array.isArray(tags) ? tags.includes("new-publication") : tags === "new-publication";
    })
  );
  eleventyConfig.addPassthroughCopy({ "src/site/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/site/archive/**/assets/**");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/geist/files/geist-cyrillic-wght-normal.woff2":
      "assets/fonts/geist-cyrillic-wght-normal.woff2",
    "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2":
      "assets/fonts/geist-latin-wght-normal.woff2",
    "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-cyrillic-wght-normal.woff2":
      "assets/fonts/jetbrains-mono-cyrillic-wght-normal.woff2",
    "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2":
      "assets/fonts/jetbrains-mono-latin-wght-normal.woff2"
  });
  eleventyConfig.addPassthroughCopy({ _redirects: "_redirects" });

  eleventyConfig.addNunjucksFilter("dateToIsoString", dateToIsoString);
  eleventyConfig.addNunjucksFilter("formatDate", formatDate);
  eleventyConfig.addNunjucksFilter("getYear", getYear);
  eleventyConfig.addNunjucksFilter("sortArticles", sortArticles);

  return {
    dir: {
      input: "src/site",
      output: "build"
    },
    templateFormats: ["njk", "md"]
  };
}
