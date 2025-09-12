document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.hero-carousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    const indicators = indicatorsContainer.querySelectorAll('.dot');

    let currentIndex = 0;
    let autoSlideInterval;

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        goToNextSlide();
        setTimeout(startAutoSlide, 500); // Pequeño retraso antes de reiniciar
    });

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        goToPrevSlide();
        setTimeout(startAutoSlide, 500); // Pequeño retraso antes de reiniciar
    });

    // Event listeners for indicators
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = index;
            updateCarousel();
            setTimeout(startAutoSlide, 500); // Pequeño retraso antes de reiniciar
        });
    });

    // Event listeners for btn-hero buttons to pause on hover
    const btnHeroes = document.querySelectorAll('.btn-hero');
    btnHeroes.forEach(btn => {
        btn.addEventListener('mouseenter', stopAutoSlide);
        btn.addEventListener('mouseleave', () => setTimeout(startAutoSlide, 500));
    });

    // Initialize carousel
    updateCarousel();
    startAutoSlide();
});