// Main interactions for erimali.com
// - Dark mode toggle with localStorage persistence
// - Typing effect for hero tagline
// - Navbar shrink on scroll
// - Mobile navigation toggle

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const modeToggle = document.querySelector('.mode-toggle');
  const typingEl = document.querySelector('.typing');
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('nav');
  const navToggle = document.querySelector('.nav-toggle');

  // --- Theme handling ---
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    body.classList.add('dark');
  }

  modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const mode = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
  });

  // --- Typing effect ---
  const roles = ['Developer', 'Engineer', 'Researcher', 'Systems thinker'];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = roles[roleIndex];
    const displayed = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
    typingEl.textContent = displayed;

    if (!deleting && charIndex === current.length + 1) {
      deleting = true;
      setTimeout(type, 1200);
      return;
    }

    if (deleting && charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
    }

    const delay = deleting ? 60 : 120;
    setTimeout(type, delay);
  }

  type();

  // --- Navbar shrink on scroll ---
  const shrinkOffset = 20;
  window.addEventListener('scroll', () => {
    if (window.scrollY > shrinkOffset) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  // --- Mobile navigation toggle ---
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when clicking a link (mobile)
  nav.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'a' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});
