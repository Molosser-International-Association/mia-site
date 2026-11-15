export default function (eleventyConfig) {
  // Copy static files straight through to the build.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  // {{ "now" | year }} for the footer copyright.
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Find one breed by slug: {% set b = breeds | breed("boerboel") %}
  eleventyConfig.addFilter("breed", (breeds, slug) => breeds.find((b) => b.slug === slug));

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
