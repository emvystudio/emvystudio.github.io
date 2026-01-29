export default function (eleventyConfig) {

    // ✅ PASSTHROUGH — must be at top-level
    eleventyConfig.addPassthroughCopy({
        "assets": "assets"
    });

    // ✅ sanity log (important)
    console.log("Eleventy config loaded: passthrough enabled");

    eleventyConfig.addCollection("categories", (collection) => {
        const items = collection.getFilteredByGlob("./Pieces/**/*.{njk,md}");
        const categories = {};

        for (const item of items) {
            const { category, heroImage } = item.data;
            if (!category) continue;

            if (!categories[category]) {
                categories[category] = {
                    items: [],
                    heroImage: []
                };
            }
            categories[category].items.push(item);
            
            if (heroImage) {
                categories[category].heroImage.push(heroImage);
            }
        }

        return categories;
    });

    eleventyConfig.addCollection("projects", (collection) => {
        return collection.getFilteredByGlob("./Pieces/**/*.{njk,md}");
    });

    // Sort by date (newest first)
    eleventyConfig.addCollection("projectsByDate", (collection) => {
        return collection
            .getFilteredByGlob("./Pieces/**/*.{njk,md}")
            .sort((a, b) => b.date - a.date);
    });

// Sort alphabetically by title
    eleventyConfig.addCollection("projectsByTitle", (collection) => {
        return collection
            .getFilteredByGlob("./Pieces/**/*.{njk,md}")
            .sort((a, b) => {
                const titleA = (a.data.title || "").toLowerCase();
                const titleB = (b.data.title || "").toLowerCase();
                return titleA.localeCompare(titleB);
            });
    });

// Sort by category, then title
    eleventyConfig.addCollection("projectsByCategory", (collection) => {
        return collection
            .getFilteredByGlob("./Pieces/**/*.{njk,md}")
            .sort((a, b) => {
                const catA = (a.data.category || "").toLowerCase();
                const catB = (b.data.category || "").toLowerCase();
                if (catA === catB) {
                    return (a.data.title || "").localeCompare(b.data.title || "");
                }
                return catA.localeCompare(catB);
            });
    });
    eleventyConfig.addFilter("allTags", (collections) => {
        const tagSet = new Set();

        collections.projects.forEach(item => {
            if (Array.isArray(item.data.tags)) {
                item.data.tags.forEach(tag => tagSet.add(tag));
            }
        });

        return [...tagSet];
    });

    eleventyConfig.addFilter("allProjectTags", (projects) => {
        if (!Array.isArray(projects)) {
            return [];
        }

        const set = new Set();

        projects.forEach(p => {
            if (Array.isArray(p.data?.tags)) {
                p.data.tags.forEach(tag => set.add(tag));
            }
        });

        return [...set];
    });
    
    eleventyConfig.addFilter("allRoles", (projects) => {
        if (!Array.isArray(projects)) {
            return [];
        }

        const set = new Set();

        projects.forEach(p => {
            if (Array.isArray(p.data?.roles)) {
                p.data.roles.forEach(role => set.add(role));
            }
        });

        return [...set];
    });
    
    eleventyConfig.addFilter("normalizeSkill", (skill) => {
        if (!skill || typeof skill !== "string") return "";

        return skill
            .toLowerCase()
            .replace(/#/g, "sharp")
            .replace(/\+/g, "plus")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    });

    eleventyConfig.addFilter("normalizeRole", (role) => {
        if (!role || typeof role !== "string") return "";

        return role
            .toLowerCase()
            .replace(/#/g, "sharp")
            .replace(/\+/g, "plus")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    });
    
    return {
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
}