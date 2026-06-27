// =========================================================================
// 1. ALL GLOBAL DECLARATIONS (Declared exactly ONCE to prevent crashes)
// =========================================================================
const carouselRing = document.querySelector('.banner .slider');
const cards = document.querySelectorAll('.banner .slider .item');
const videoModal = document.getElementById('videoModal');
const videoIframe = document.getElementById('videoIframe');
const closeModalBtn = document.getElementById('closeModalBtn');

// =========================================================================
// 2. HOVER INTERACTIONS (Pauses the carousel when looking at a card)
// =========================================================================
if (carouselRing) {
    carouselRing.addEventListener('mouseenter', () => {
        carouselRing.style.animationPlayState = 'paused';
        console.log("Carousel paused on hover!");
    });

    carouselRing.addEventListener('mouseleave', () => {
        // Only spin again if the video player isn't currently open on screen
        if (videoModal && videoModal.style.display !== 'flex') {
            carouselRing.style.animationPlayState = 'running';
            console.log("Carousel playing again!");
        }
    });
}

// =========================================================================
// 3. CLICK TO STREAM ENGINE (Loads the real video stream popup window)
// =========================================================================
cards.forEach((card) => {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video');
        console.log("🎯 Card clicked! Extracted target video ID:", videoId);
        
        if (videoId && videoModal && videoIframe) {
            // FIXED URL: Switched to standard YouTube embed path for secure streaming
            videoIframe.setAttribute('src', `${videoId}?autoplay=1`);
            
            // Pop the dark player window into view overlaying the screen
            videoModal.style.setProperty('display', 'flex', 'important');
            
            // Keep the background wheel frozen while watching the clip
            if (carouselRing) carouselRing.style.animationPlayState = 'paused';
        }
    });
});

// =========================================================================
// 4. CLOSING CONTROL LOGIC (Instantly kills data streaming & audio)
// =========================================================================
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        if (videoModal && videoIframe) {
            videoModal.style.display = 'none';
            videoIframe.setAttribute('src', ''); // Wipes out connection stream data instantly
            if (carouselRing) carouselRing.style.animationPlayState = 'running';
            console.log("❌ Modal closed. Video stopped and carousel resumed.");
        }
    });
}

