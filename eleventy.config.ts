import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { dateToIsoString } from "./11ty/filters/date-to-iso-string.ts";
import { formatDate } from "./11ty/filters/format-date.ts";
import { sortArticles } from "./11ty/filters/sort-articles.ts";

export default function (eleventyConfig: any) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy({ "src/site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ _redirects: "_redirects" });

  eleventyConfig.addNunjucksFilter("dateToIsoString", dateToIsoString);
  eleventyConfig.addNunjucksFilter("formatDate", formatDate);
  eleventyConfig.addNunjucksFilter("sortArticles", sortArticles);

  return {
    dir: {
      input: "src/site",
      output: "build"
    },
    templateFormats: ["njk", "md"]
  };
}
