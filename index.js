/**
 * @function videoFlex
 * @description Makes a video element responsive for various screen sizes.
 * @param {HTMLElement} videoElement - The video HTML element to make responsive.
 * @param {number} [width=50] - The width percentage of the video element (20, 40, 60, 80, 100).
 */

function videoFlex(videoElement, width = 50) {
    if (!videoElement || !videoElement.parentElement) return;

    const src = videoElement.getAttribute('src');
    if (src) {
        const videoExtensions = [
            '.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.mpeg', '.mpg', '.ogv'
        ];
        const extension = videoExtensions.find(ext => src.endsWith(ext));
        if (!extension) {
            console.log('The extension you are searching is not found!');
            return;
        }
    } else {
        console.log('No source attribute found!');
        return;
    }

    let height;

    // Determine height based on width
    switch (true) {
        case width <= 20:
            height = 30;  // Minimum height for very small widths
            break;
        case width > 20 && width <= 30:
            height = 40;
            break;
        case width > 30 && width <= 40:
            height = 60;
            break;
        case width > 40 && width <= 50:
            height = 70;
            break;
        case width > 50 && width <= 60:
            height = 85;
            break;
        case width > 60 && width <= 70:
            height = 90;
            break;
        case width > 70:
            width = 70;
            height = 100;
            break;
        default:
            height = 70;   // Default height if width is out of the expected range
    }

    const parent = videoElement.parentElement;

    // Ensure parent has non-static position
    function ensureRelativePosition() {
        const position = window.getComputedStyle(parent).position;
        if (position === 'static') {
            parent.style.position = 'relative';
        }
    }

    // Apply styles to parent element
    function applyParentStyles() {
        parent.style.cssText = `
            width: ${width}%;
            height: calc(.5625 * ${height}vw);
            max-width: 1280px;
            max-height: 720px;
            min-height: 260px;
            min-width: 320px;
            background-color: brown;
            position: relative;
            margin: 1rem auto;
        `;
    }

    // Apply initial styles to video element
    function applyVideoStyles() {
        videoElement.style.cssText = `
            width: 100%;
            height: 100%;
            max-height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: cover;
            z-index: 1;
        `;
    }

    // Update styles for fullscreen mode
    function updateFullscreenStyles() {
        if (document.fullscreenElement) {
            parent.style.width = '100%';
            parent.style.height = '100%';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.objectFit = 'contain';
        } else {
            applyParentStyles();
            applyVideoStyles();
        }
    }

    // Initialize the video element responsiveness
    function initialize() {
        ensureRelativePosition();
        applyParentStyles();
        applyVideoStyles();
    }

    // Listen for fullscreen changes
    function setupFullscreenListeners() {
        document.addEventListener('fullscreenchange', updateFullscreenStyles);
        document.addEventListener('webkitfullscreenchange', updateFullscreenStyles); // For Safari
        document.addEventListener('mozfullscreenchange', updateFullscreenStyles); // For Firefox
        document.addEventListener('MSFullscreenChange', updateFullscreenStyles); // For IE/Edge
    }

    window.addEventListener('load', () => {
        initialize();
        setupFullscreenListeners();
    });
};


