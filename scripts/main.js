/* Mobile nav toggle */
const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileToggle && mainNav) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Footer year */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* -----------------------------------------------------------
   Media carousels (hobbies page)
   - Prev / next arrows + dots
   - Auto-advance every ~5s
   - Each carousel starts on a different offset so they
     don't all change at the same time
   - Pauses while the user hovers the carousel
   ----------------------------------------------------------- */
document.querySelectorAll('[data-carousel]').forEach((carousel, carouselIndex) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  if (slides.length === 0) return;

  const prevBtn = carousel.querySelector('[data-action="prev"]');
  const nextBtn = carousel.querySelector('[data-action="next"]');
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));

  let index = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (index < 0) index = 0;

  let timer = null;
  let paused = false;

  const INTERVAL_MS = 5000;
  /* Stagger start so cards don't advance in lockstep */
  const START_OFFSET_MS = (carouselIndex * 1200) % INTERVAL_MS;

  const show = (nextIndex) => {
    if (slides.length === 0) return;
    index = ((nextIndex % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  };

  const goNext = () => show(index + 1);
  const goPrev = () => show(index - 1);

  const stopAuto = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    if (slides.length < 2 || paused) return;
    timer = setInterval(goNext, INTERVAL_MS);
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goPrev();
      /* Restart timer after manual control so rhythm stays smooth */
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goNext();
      startAuto();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      show(i);
      startAuto();
    });
  });

  /* Pause autoplay while hovering so the user can look at an image */
  carousel.addEventListener('mouseenter', () => {
    paused = true;
    stopAuto();
  });
  carousel.addEventListener('mouseleave', () => {
    paused = false;
    startAuto();
  });

  /* Initial staggered start */
  show(index);
  setTimeout(() => {
    if (!paused) startAuto();
  }, START_OFFSET_MS);
});

/* -----------------------------------------------------------
   Contact form (contact page)
   Builds a mailto link from the Name / Email / Message fields
   so messages reach the inbox without a backend service.
   ----------------------------------------------------------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.querySelector('#contact-name').value.trim();
    const email = contactForm.querySelector('#contact-email').value.trim();
    const message = contactForm.querySelector('#contact-message').value.trim();
    const destination = contactForm.dataset.destination || 'majahonkedlamini5@gmail.com';

    const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);

    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  });
}
