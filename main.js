// This file is run when YouTube is opened

// I have literally no idea why this is necessary, but it works and I cannot complain
(() => {
    // TODO: get random one and flip randomly
    function getRandomImageUrl() {
        const imageFilePath = "images";
        const imageAmount = 2;
        const randomImageIndex = Math.floor(Math.random() * imageAmount);

        return chrome.runtime.getURL(`${imageFilePath}/${randomImageIndex}.png`);
    }

    /**
     * @returns {NodeListOf<Element>} Thumbnails on the page
     */
    function getThumbnails() {
        const thumbnailQuery = "ytd-thumbnail:not(.ytd-video-preview, .ytd-rich-grid-slim-media) a > yt-image > img.yt-core-image:only-child:not(.yt-core-attributed-string__image-element),.ytp-videowall-still-image:not([style*='extension:'])";
        return document.querySelectorAll(thumbnailQuery);
    }

    /**
     * Adds the image over the thumbnail.
     * @param {Element} thumbnail
     * @param {string} imageUrl Url of the image to apply
     */
    function applyImage(thumbnail, imageUrl) {
        const image = new Image();
        image.src = imageUrl;
        image.style.zIndex = 0;
        image.style.position = "absolute";
        image.style.top = 0;
        image.style.left = 0;
        image.style.width = "30%";

        thumbnail.parentElement.appendChild(image);
    }

    // if (isEnabled) {
    // setInterval(getThumbnails, 100);
    // }

    setInterval(() => {
        for (const thumbnail of getThumbnails()) {
            applyImage(thumbnail, getRandomImageUrl());
        }
    }, 1000);

    // This is indeed cursed
})();
