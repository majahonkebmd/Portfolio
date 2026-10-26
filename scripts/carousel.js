(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    const previousButton = carousel.querySelector('[data-action="prev"]');
    const nextButton = carousel.querySelector('[data-action="next"]');
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const activeSlide = slides.findIndex((slide) => slide.classList.contains('is-active'));
    let index = activeSlide < 0 ? 0 : activeSlide;
    let timer = null;
    let paused = false;

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
      stop();
      if (slides.length < 2 || paused || reducedMotion.matches) return;
      timer = window.setInterval(() => show(index + 1), 5000);
    };

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
      paused = true;
      stop();
    });

    carousel.addEventListener('mouseleave', () => {
      paused = false;
      start();
    });

    carousel.addEventListener('focusin', () => {
      paused = true;
      stop();
    });

    carousel.addEventListener('focusout', (event) => {
      if (!event.relatedTarget || !carousel.contains(event.relatedTarget)) {
        paused = false;
        start();
      }
    });

    show(index);
    start();
  });
})();
