(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-carousel]').forEach((carousel, carouselIndex) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    const previousButton = carousel.querySelector('[data-action="prev"]');
    const nextButton = carousel.querySelector('[data-action="next"]');
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const activeSlide = slides.findIndex((slide) => slide.classList.contains('is-active'));
    let index = activeSlide < 0 ? 0 : activeSlide;
    let timer = null;
    let initialTimer = null;
    let isHovered = false;
    let hasFocus = false;
    const startDelay = (carouselIndex * 1300) % 5000;

    const stop = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const show = (requestedIndex) => {
      index = ((requestedIndex % slides.length) + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === index;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === index;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-pressed', String(isActive));
      });
    };

    const start = () => {
      if (initialTimer !== null) {
        window.clearTimeout(initialTimer);
        initialTimer = null;
      }
      stop();
      if (slides.length < 2 || isHovered || hasFocus || reducedMotion.matches) return;
      timer = window.setInterval(() => show(index + 1), 5000);
    };

    if (typeof reducedMotion.addEventListener === 'function') {
      reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) {
          if (initialTimer !== null) {
            window.clearTimeout(initialTimer);
            initialTimer = null;
          }
          stop();
        } else {
          start();
        }
      });
    }

    if (previousButton) {
      previousButton.addEventListener('click', () => {
        show(index - 1);
        start();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        show(index + 1);
        start();
      });
    }

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        show(dotIndex);
        start();
      });
    });

    carousel.addEventListener('mouseenter', () => {
      isHovered = true;
      stop();
    });

    carousel.addEventListener('mouseleave', () => {
      isHovered = false;
      start();
    });

    carousel.addEventListener('focusin', () => {
      hasFocus = true;
      stop();
    });

    carousel.addEventListener('focusout', (event) => {
      if (!event.relatedTarget || !carousel.contains(event.relatedTarget)) {
        hasFocus = false;
        start();
      }
    });

    show(index);
    if (!reducedMotion.matches) {
      initialTimer = window.setTimeout(start, startDelay);
    }
  });
})();
