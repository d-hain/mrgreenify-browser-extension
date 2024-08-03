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

    /**
     * @typedef {object} ImageUrlReturn
     * @property {string} imageUrl Url of the image
     * @property {number} imageIndex Index of the image
     * @returns {ImageUrlReturn}
     */
    function getRandomImageUrl() {
        const imageFilePath = "images";
        const imageAmount = 6;
        const randomImageIndex = getRandomInt(imageAmount);

        let extension = "png";
        if (randomImageIndex > 3) {
            extension = "gif";
        }

        return {
            imageUrl: chrome.runtime.getURL(`${imageFilePath}/${randomImageIndex}.${extension}`),
            imageIndex: randomImageIndex
        };
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
     * @param {number} imageIndex Index of the image
     */
    function applyImage(thumbnail, imageUrl, imageIndex) {
        const image = new Image();
        image.src = imageUrl;
        image.className = "mrgreen";

        const parent = thumbnail.parentElement;
        const iStyle = image.style;
        iStyle.position = "absolute";
        iStyle.zIndex = 0;
        iStyle.width = "30%";

        // Custom positions for Chad MrGreens
        const isMrChadFlex = imageIndex === 2;
        const isMrChadPoint = imageIndex === 3;

        if (isMrChadFlex || isMrChadPoint) {
            iStyle.width = "auto";
            iStyle.height = "100%";
        }

        if (isMrChadFlex) {
            const randomInt = getRandomInt(2);
            iStyle.bottom = 0;
            switch (randomInt) {
                // Left
                case 0: {
                    iStyle.left = 0;
                    break;
                }
                // Right
                case 1: {
                    iStyle.right = 0;
                    break;
                }
            }
        } else if (isMrChadPoint) {
            iStyle.bottom = 0;
            iStyle.left = 0;
        } else {
            // Normal MrGreens
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
                }
            }
        }

        parent.appendChild(image);
    }

    // Main loop
    setInterval(() => {
        chrome.storage.local.get("enabled", (data) => {
            if (!data.enabled) {
                const images = document.querySelectorAll(".mrgreen");
                for (const image of images) {
                    image.remove();
                }

                return;
            }

            for (const thumbnail of getThumbnails()) {
                const { imageUrl, imageIndex } = getRandomImageUrl();
                applyImage(thumbnail, imageUrl, imageIndex);
            }
        });
    }, 250);

    // This is indeed cursed
})();
