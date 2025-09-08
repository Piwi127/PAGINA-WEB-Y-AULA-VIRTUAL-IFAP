document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex;
    let filteredImages = [];

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            filteredImages = [];

            galleryItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    filteredImages.push(item);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initial filter to populate filteredImages
    document.querySelector('.filter-btn.active').click();

    // Lightbox functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = filteredImages.indexOf(item);
            openLightbox(item.querySelector('img').src);
        });
    });

    function openLightbox(imageSrc) {
        lightboxImage.src = imageSrc;
        lightboxOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = filteredImages.length - 1;
        } else if (currentImageIndex >= filteredImages.length) {
            currentImageIndex = 0;
        }
        lightboxImage.src = filteredImages[currentImageIndex].querySelector('img').src;
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightboxOverlay.classList.contains('visible')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
});