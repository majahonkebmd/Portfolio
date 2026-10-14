(() => {
  const toggle = document.querySelector('.mobile-toggle');
  const navigation = document.querySelector('.main-nav');

  if (toggle && navigation) {
    const closeNavigation = () => {
      navigation.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      navigation.classList.toggle('open', !isExpanded);
      toggle.setAttribute('aria-expanded', String(!isExpanded));
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNavigation);
    });

    document.addEventListener('click', (event) => {
      if (!navigation.contains(event.target) && !toggle.contains(event.target)) {
        closeNavigation();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNavigation();
        toggle.focus();
      }
    });
  }

  const year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
