// This file is run when YouTube is opened

// I have literally no idea why this is necessary, but it works and I cannot complain
(() => {
    /**
     * @param {number} max Maximum number (exclusive)
     * @returns {number} Random integer between 0 and `max`.
     */
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomImageUrl() {
        const imageFilePath = "images";
        const imageAmount = 4;
        const randomImageIndex = getRandomInt(imageAmount);

        let extension = "png";
        if (randomImageIndex > 1) {
            extension = "gif";
        }

        return chrome.runtime.getURL(`${imageFilePath}/${randomImageIndex}.${extension}`);
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

        const parent = thumbnail.parentElement;
        const iStyle = image.style;
        iStyle.position = "absolute";
        iStyle.zIndex = 0;
        iStyle.width = "30%";
        console.log(parent);

        // 0 - 4
        const randomInt = getRandomInt(5);
        switch (randomInt) {
            // Top left corner
            case 0: {
                iStyle.top = 0;
                iStyle.left = 0;
                break;
            }
            // Top right corner
            case 1: {
                iStyle.top = 0;
                iStyle.right = 0;
                break;
            }
            // Thumbnail face left
            case 2: {
                iStyle.top = "15%";
                iStyle.left = "10%";
                break;
            }
            // Thumbnail face right
            case 3: {
                iStyle.top = "15%";
                iStyle.right = "10%";
                break;
            }
            // Thumbnail face middle
            case 4: {
                iStyle.top = "15%";
                iStyle.left = "35%";
                break;
            }
        }

        parent.appendChild(image);
    }

    setInterval(() => {
        for (const thumbnail of getThumbnails()) {
            applyImage(thumbnail, getRandomImageUrl());
        }
    }, 1000);

    // This is indeed cursed
})();
