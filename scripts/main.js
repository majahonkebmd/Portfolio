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

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
