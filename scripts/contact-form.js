(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameField = form.querySelector('#contact-name');
  const emailField = form.querySelector('#contact-email');
  const messageField = form.querySelector('#contact-message');
  if (!nameField || !emailField || !messageField) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const destination = form.dataset.destination;
    if (!destination) return;

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  });
})();
