/**
 * @function videoFlex
 * @description Makes a video element responsive for various screen sizes.
 * @param {HTMLElement} videoElement - The video HTML element to make responsive.
 * @param {number} [width=50] - The width percentage of the video element (20, 40, 60, 80, 100).
 */

function videoFlex(videoElement, width = 50) {
    if (!videoElement || !(videoElement instanceof HTMLVideoElement)) {
        console.error('Invalid video element provided');
        return;
    }

    const parent = videoElement.parentElement;
    if (!parent) {
        console.error('Video element has no parent');
        return;
    }

    // Validate video source
    const src = videoElement.getAttribute('src');
    if (!src) {
        console.error('No source attribute found!');
        return;
    }

    const videoExtensions = ['.mp4', '.webm', '.ogg']; // Reduced to most common web video formats
    if (!videoExtensions.some(ext => src.toLowerCase().endsWith(ext))) {
        console.error('Unsupported video format');
        return;
    }

    // valid range
    width = Math.max(20, Math.min(100, width));

    // Simplified height calculation
    const height = Math.min(100, Math.max(30, Math.round(width * 1.2)));

    // Apply styles
    const applyStyles = () => {
        parent.style.cssText = `
            width: ${width}%;
            height: calc(${height}vw * 0.5625);
            max-width: 1280px;
            max-height: 720px;
            min-height: 260px;
            min-width: 320px;
            background-color: #000;
            position: relative;
        `;

        videoElement.style.cssText = `
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: contain;
        `;
    };

    // Handle fullscreen changes
    const handleFullscreenChange = () => {
        const isFullscreen = document.fullscreenElement === parent;
        parent.style.width = isFullscreen ? '100%' : `${width}%`;
        parent.style.height = isFullscreen ? '100%' : `calc(${height}vw * 0.5625)`;
        videoElement.style.objectFit = isFullscreen ? 'contain' : 'cover';
    };

    // Initialize
    applyStyles();

    // Set up event listeners
    const fullscreenEvents = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
    fullscreenEvents.forEach(event => document.addEventListener(event, handleFullscreenChange));

    // Clean up function
    return () => {
        fullscreenEvents.forEach(event => document.removeEventListener(event, handleFullscreenChange));
    };
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');
    if (video) {
        const cleanup = videoFlex(video, 60);
        
        // unload
        window.addEventListener('beforeunload', () => {
            if (typeof cleanup === 'function') {
                cleanup();
            } else {
                console.warn('cleanup is not a function');
            }
        });

        // Add fullscreen toggle functionality
        video.addEventListener('dblclick', () => {
            if (!document.fullscreenElement) {
                video.parentElement.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });

        // Add play/pause toggle on click
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
});
