const config = require('./build-config.js');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const { dateToIsoString } = require('./11ty/filters/date-to-iso-string');
const { formatDate } = require('./11ty/filters/format-date');
const { sortArticles } = require('./11ty/filters/sort-articles');

const dir = {
	input: config.dir['11ty'],
	output: config.dir.build,
  };

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPassthroughCopy(`${dir.input}/assets`);
	eleventyConfig.addNunjucksFilter("dateToIsoString", dateToIsoString);
	eleventyConfig.addNunjucksFilter("formatDate", formatDate);
	eleventyConfig.addNunjucksFilter("sortArticles", sortArticles);
	return {
		dir,
		templateFormats: ['njk', 'md', 'png']
	}
}