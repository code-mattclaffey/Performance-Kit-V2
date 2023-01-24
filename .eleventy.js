const { DateTime } = require('luxon');
const fs = require('fs').promises;

const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./_site/assets/img');
  eleventyConfig.addPassthroughCopy('./_site/assets/fonts');
  eleventyConfig.addPassthroughCopy('./_site/assets/js/');

  // Add plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addFilter('getContentFromFile', async function (path) {
    const content = await fs.readFile(path, 'utf8');

    return content;
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: '/',
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: './_site',
      includes: '_includes',
      data: '_data',
      output: 'dist',
    },
  };
};
