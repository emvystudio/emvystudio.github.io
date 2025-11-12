export default function(eleventyConfig) {
    // Passthrough copy for static assets
    eleventyConfig.addPassthroughCopy({ "css": "css" });
    eleventyConfig.addPassthroughCopy({ "js": "js" });
    eleventyConfig.addPassthroughCopy({ "assets": "assets" });
    
    // return config
    

    // Create a collection for all pieces
    
        // Create a collection for all pieces
        eleventyConfig.addCollection("pieces", collection => {
            return collection.getFilteredByGlob("./Pieces/**/*.njk");
        });

        // Collection grouped by category
        eleventyConfig.addCollection("categories", collection => {
            const pieces = collection.getFilteredByGlob("./Pieces/**/*.njk");
            const categories = {};

            for (let item of pieces) {
                const cat = item.data.category || "Uncategorized";
                if (!categories[cat]) categories[cat] = [];
                categories[cat].push(item);
            }

            return categories;
        });
    return {
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
        htmlTemplateEngine: "njk"
    };


};