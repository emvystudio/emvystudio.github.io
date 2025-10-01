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
    const images = piece.dataset.images.split(',');
    let index = 0;
    let interval;

    // set initial background
    piece.style.backgroundImage = `url(${images[0]})`;

    piece.addEventListener('mouseenter', () => {
        index = 0;
        interval = setInterval(() => {
            index = (index + 1) % images.length;
            piece.style.backgroundImage = `url(${images[index]})`;
        }, 1500); // change every 1.5s
    });

    piece.addEventListener('mouseleave', () => {
        clearInterval(interval);
        index = 0;
        piece.style.backgroundImage = `url(${images[0]})`; // reset to first image
    });
});

