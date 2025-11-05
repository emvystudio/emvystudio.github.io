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

    module.exports = function(eleventyConfig) {
        // Create a collection for game-dev projects
        eleventyConfig.addCollection("gameDevProjects", function(collectionApi) {
            return collectionApi.getAll().filter(item => item.data.category === "game-dev");
        });
    };

    eleventyConfig.addCollection("categories", collection => {
        let categories = {};
        collection.getAll().forEach(item => {
            if (item.data.categories) {
                item.data.categories.forEach(cat => {
                    if (!categories[cat]) categories[cat] = [];
                    categories[cat].push(item);
                });
            }
        });
        return categories;
    });
}