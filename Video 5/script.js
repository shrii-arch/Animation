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
// 5. SEAMLESS KEYBOARD NAVIGATION WITH DYNAMIC TEXT-SYNC
// =========================================================================
let currentRotationY = 0;
let resumeTimer = null;
let autoSpinInterval = null;

// 💡 Data map matching your 6 exact anime cards in counter-clockwise order
const animeMetadata = [
    { title: "Spy x Family", desc: "A spy on an undercover mission marries an assassin and adopts a telepathic child." },
    { title: "Your Name", desc: "Two high school students living in completely different parts of Japan suddenly discover they are swapping bodies." },
    { title: "Demon Slayer", desc: "Tanjiro Kamado sets out on a perilous quest to hunt down malicious demons and restore his sister's human soul." },
    { title: "Suzume", desc: "A teenage girl travels across Japan alongside a mysterious young man closing portals to prevent giant natural disasters." },
    { title: "Hana Kimi", desc: "A classic high school romance comedy revolving around athletic rivalries and complex hidden identities." },
    { title: "Dark Moon", desc: "Seven vampire brothers navigate a complex web of destiny, memory, and supernatural high school rivalries." }
];

let activeIndex = 0; // Tracks which card is center-forward index position
const activeTitleText = document.getElementById('activeAnimeTitle');
const activeDescText = document.getElementById('activeAnimeDesc');

function updateTextPlateDisplay() {
    if (activeTitleText && activeDescText) {
        // Safe mathematical modulo clamps index tracking precisely between 0 and 5 loops
        let normalizedIndex = ((activeIndex % 6) + 6) % 6;
        
        activeTitleText.textContent = animeMetadata[normalizedIndex].title;
        activeDescText.textContent = animeMetadata[normalizedIndex].desc;
    }
}

// Function to handle continuous smooth auto-rotation from the current angle
function startSmoothAutoRotation() {
    clearInterval(autoSpinInterval);
    
    autoSpinInterval = setInterval(() => {
        currentRotationY -= 0.3; // Your perfect custom velocity sweet spot stays untouched!
        carouselRing.style.transition = 'none'; 
        carouselRing.style.transform = `rotateX(-10deg) rotateY(${currentRotationY}deg)`;
    }, 16); 
}

// Initial boot startup spin loop execution
startSmoothAutoRotation();

window.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        clearInterval(autoSpinInterval);
        clearTimeout(resumeTimer);
        
        carouselRing.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    if (event.key === "ArrowLeft") {
        currentRotationY += 60; 
        carouselRing.style.transform = `rotateX(-10deg) rotateY(${currentRotationY}deg)`;
        
        activeIndex++; // Increments index alignment tracking parameter
        updateTextPlateDisplay();
    } 
    else if (event.key === "ArrowRight") {
        currentRotationY -= 60; 
        carouselRing.style.transform = `rotateX(-10deg) rotateY(${currentRotationY}deg)`;
        
        activeIndex--; // Decrements index alignment tracking parameter
        updateTextPlateDisplay();
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        resumeTimer = setTimeout(() => {
            console.log(`🔄 Resuming smooth infinite rotation right from: ${currentRotationY}°`);
            startSmoothAutoRotation();
        }, 2000); 
    }
});
