const isMobile = window.matchMedia("(hover: none)").matches;

document.querySelectorAll(".category-tile").forEach(tile => {
    const images = tile.dataset.images?.split(",").filter(Boolean);
    console.log(images);
    if (!images || images.length === 0) return;

    const container = tile; // ✅ THIS WAS MISSING
    let index = 0;
    let interval = null;

    const showImage = () => {
        container.style.backgroundImage = `url(${images[index]})`;
        index = (index + 1) % images.length;
    };

    const start = (speed = 2000) => {
        if (interval) return;
        showImage();
        interval = setInterval(showImage, speed);
    };

    const stop = () => {
        clearInterval(interval);
        interval = null;
        container.style.backgroundImage = "";
    };

    if (isMobile) {
        start(3500);
    } else {
        tile.addEventListener("mouseenter", () => start(1800));
        tile.addEventListener("mouseleave", stop);
    }
});

