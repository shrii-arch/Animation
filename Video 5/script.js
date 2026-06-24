// 1. Grab the spinning container ring from your page
const carousel = document.querySelector('.banner .slider');

// 2. PAUSE: When the mouse moves inside the carousel box
carousel.addEventListener('mouseenter', () => {
    carousel.style.animationPlayState = 'paused';
    console.log("Carousel paused on hover!");
});

// 3. PLAY: When the mouse moves outside the carousel box
carousel.addEventListener('mouseleave', () => {
    carousel.style.animationPlayState = 'running';
    console.log("Carousel playing again!");
});
