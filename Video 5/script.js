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
// =========================================================================
// 5. SEAMLESS KEYBOARD NAVIGATION WITH SMOOTH RESUME FROM CURRENT STATE
// =========================================================================
let currentRotationY = 0;
let resumeTimer = null;
let autoSpinInterval = null;

// Function to handle continuous smooth auto-rotation from the current angle
function startSmoothAutoRotation() {
    // Clear any existing background tracking engines to avoid multi-speed spins
    clearInterval(autoSpinInterval);
    
    // Smoothly increment the angle over a tiny time delta interval
    autoSpinInterval = setInterval(() => {
        currentRotationY -= 0.3; // Adjust this number down for a slower, cleaner turn
        carouselRing.style.transition = 'none'; // Wipes transitions so background spin is perfectly fluid
        carouselRing.style.transform = `rotateX(-10deg) rotateY(${currentRotationY}deg)`;
    }, 16); // ~60 Frames Per Second refresh calculation rate
}

// Kick off the initial continuous background rotation on page startup
startSmoothAutoRotation();

window.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        // Stop the background automatic spinning calculation loop instantly
        clearInterval(autoSpinInterval);
        clearTimeout(resumeTimer);
        
        // Add a smooth easing transition physics glide for your finger presses
        carouselRing.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    if (event.key === "ArrowLeft") {
        currentRotationY += 60; // Steps back 1 clean card sector track slot
        carouselRing.style.transform = `rotateX(-10deg) rotateY(${currentRotationY}deg)`;
    } 
    else if (event.key === "ArrowRight") {
        currentRotationY -= 60; // Steps forward 1 clean card sector track slot
        carouselRing.style.transform = `rotateX(-10deg) rotateY(${currentRotationY}deg)`;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        // Set up the countdown clock to pick back up after you let go of the keys
        resumeTimer = setTimeout(() => {
            console.log(`🔄 Resuming smooth infinite rotation right from: ${currentRotationY}°`);
            startSmoothAutoRotation();
        }, 2000); // Waits exactly 2 seconds of zero key interaction before resuming
    }
});
