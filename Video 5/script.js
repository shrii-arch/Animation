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
// 1. Grab all individual item cards
const cards = document.querySelectorAll('.banner .slider .item');

// 2. Loop through every card and listen for a mouse click
cards.forEach((card) => {
    card.addEventListener('click', () => {
        // 3. Extract the unique video ID we saved in the HTML attribute
        const videoId = card.getAttribute('data-video');
        
        // 4. Print it to the browser console to verify it works!
        console.log(`🎯 Success! You clicked an anime card. Target YouTube ID: ${videoId}`);
    });
});
