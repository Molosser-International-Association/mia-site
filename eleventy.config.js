export default function (eleventyConfig) {
  // Copy static files straight through to the build.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  // {{ "now" | year }} for the footer copyright.
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Find one breed by slug: {% set b = breeds | breed("boerboel") %}
  eleventyConfig.addFilter("breed", (breeds, slug) => breeds.find((b) => b.slug === slug));

  // Event dates are stored as "YYYY-MM-DD" in src/_data/events.json.
  const asDate = (iso) => new Date(`${iso}T12:00:00Z`);
  eleventyConfig.addFilter("monthShort", (iso) =>
    asDate(iso).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase());
  eleventyConfig.addFilter("dayNum", (iso) => asDate(iso).getUTCDate());
  eleventyConfig.addFilter("longDate", (iso) =>
    asDate(iso).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }));

  // Give every ## heading in Markdown an id, so pages can link to sections.
  eleventyConfig.amendLibrary("md", (md) => {
    const slugify = eleventyConfig.getFilter("slugify");
    md.core.ruler.push("heading_ids", (state) => {
      state.tokens.forEach((token, i) => {
        if (token.type === "heading_open" && token.tag === "h2" && !token.attrGet("id")) {
          token.attrSet("id", slugify(state.tokens[i + 1].content));
        }
      });
    });
  });

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
