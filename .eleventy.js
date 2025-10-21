export default function(eleventyConfig) {
    // Passthrough copy for static assets
    eleventyConfig.addPassthroughCopy({ "css": "css" });
    eleventyConfig.addPassthroughCopy({ "js": "js" });
    eleventyConfig.addPassthroughCopy({ "assets": "assets" });

    return {
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
        htmlTemplateEngine: "njk"
    };
}