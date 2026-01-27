var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

//piece background roller
document.querySelectorAll('.piece').forEach(piece => {
    if (!piece.dataset.images) return; // skip if no images defined

    const images = piece.dataset.images.split(',');
    let index = 0;
    let interval;

    piece.addEventListener('mouseenter', () => {
        index = 0;

        startTimeout = setTimeout(() => {
            piece.style.backgroundImage = `url(${images[index]})`;

            interval = setInterval(() => {
                index = (index + 1) % images.length;
                piece.style.backgroundImage = `url(${images[index]})`;
            }, 333); // cycle speed
        }, 00); // delay before slideshow starts
    });

    piece.addEventListener('mouseleave', () => {
        clearInterval(interval);
        clearTimeout(startTimeout);
        piece.style.backgroundImage = "none";
    });

//trying to add a program that slides the white of the background  to grey as the user scrolls
    window.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty("--background-color", `rgba(${0}, ${0}, ${0}, ${scrollPosition * .01})`);
    });
        // Restore scroll position after reload
        const savedScroll = sessionStorage.getItem("feedScroll");
        if (savedScroll !== null) {
        window.scrollTo(0, parseInt(savedScroll, 10));
        sessionStorage.removeItem("feedScroll");
    }

        // Save scroll position before leaving
        document.addEventListener("click", (e) => {
        const link = e.target.closest("a[href*='?sort=']");
        if (link) {
        sessionStorage.setItem("feedScroll", window.scrollY);
    }
    });
});
