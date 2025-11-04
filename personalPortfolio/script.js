// Simple interactivity: theme toggle, mobile menu, smooth scroll, contact form simulation

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const yearEl = document.getElementById('this-year');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Initialize year
  yearEl.textContent = new Date().getFullYear();

  // load theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeBtn.textContent = '☀️';
  } else {
    body.classList.remove('light-theme');
    themeBtn.textContent = '🌙';
  }

  // theme toggle
  themeBtn.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-theme');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu if open
      navLinks.classList.remove('open');
    });
  });

  // Contact form: simple simulation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      // Simulate sending...
      alert(`Thanks ${name}! Your message was "sent" (simulation). Replace this with EmailJS or Formspree for real sending.`);
      contactForm.reset();
    });
  }
});
