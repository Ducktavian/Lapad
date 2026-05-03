/* ============================================================
    CONTACT FORM — basic validation + mock send
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous note
    note.className = 'form-note';
    note.textContent = '';

    // Validate
    if (!name) {
      showNote('Please enter your name.', 'error'); return;
    }
    if (!email || !emailRe.test(email)) {
      showNote('Please enter a valid email address.', 'error'); return;
    }
    if (!message) {
      showNote('Please write a message.', 'error'); return;
    }

    

    // Simulate sending (replace with real API call / EmailJS / FormSubmit)
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Sending…';

    ////////////

    // Capture the form data
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="ph ph-paper-plane-tilt"></i> Send Message';
            showNote('✓ Message sent! I\'ll get back to you within 24 hours.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    }).catch(error => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ph ph-paper-plane-tilt"></i> Send Message';
        showNote('Oops! There was a problem sending your message.', 'error');
    });
  });

  function showNote(msg, type) {
    note.textContent = msg;
    note.className = 'form-note ' + type;
  }
})();