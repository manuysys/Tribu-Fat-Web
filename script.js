/* ============================================
   TRIBU FAT – Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // --- Menu Tab Filtering ---
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;

      // Filter cards with animation
      cards.forEach(card => {
        if (card.dataset.category === category) {
          card.style.display = '';
          // Re-trigger fade in
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Show initial category (simples)
  const initialTab = document.querySelector('.menu-tab.active');
  if (initialTab) {
    const initialCategory = initialTab.dataset.category;
    cards.forEach(card => {
      if (card.dataset.category !== initialCategory) {
        card.style.display = 'none';
      }
    });
  }

  // --- Scroll Reveal Animation (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Navbar Background on Scroll ---
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar.style.padding = '10px 0';
      navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
      navbar.style.padding = '16px 0';
      navbar.style.background = 'rgba(26, 26, 26, 0.85)';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 20;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Current Year in Footer ---
  const year = new Date().getFullYear();
  const footerText = document.querySelector('.footer-bottom p');
  if (footerText) {
    footerText.textContent = footerText.textContent.replace('2026', year);
  }

});
