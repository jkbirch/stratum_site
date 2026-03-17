/* ========================================
   STRATUM ASSET INTELLIGENCE — Site JS
   ======================================== */

(function() {
  'use strict';

  // --- Theme Toggle ---
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', function() {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateToggleIcon();
    });
  }

  // --- Mobile Menu ---
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (menuBtn && mobileNav) {
  // Start closed
  mobileNav.classList.remove('is-open');
  mobileNav.classList.add('is-closed');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open navigation');

  menuBtn.addEventListener('click', function() {
    const isOpen = mobileNav.classList.contains('is-open');

    if (isOpen) {
      // Close menu
      mobileNav.classList.remove('is-open');
      mobileNav.classList.add('is-closed');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation');
      // Hamburger icon
      menuBtn.innerHTML =
        '<span class="mobile-menu-icon" aria-hidden="true">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2">' +
        '<path d="M3 12h18M3 6h18M3 18h18"/>' +
        '</svg>' +
        '</span>';
    } else {
      // Open menu
      mobileNav.classList.remove('is-closed');
      mobileNav.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close navigation');
      // X icon
      menuBtn.innerHTML =
        '<span class="mobile-menu-icon" aria-hidden="true">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2">' +
        '<path d="M6 6l12 12M6 18L18 6"/>' +
        '</svg>' +
        '</span>';
    }
  });
}

// Close mobile nav when a link is clicked
if (mobileNav && menuBtn) {
  mobileNav.querySelectorAll('.nav-link, .btn').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('is-open');
      mobileNav.classList.add('is-closed');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation');
      menuBtn.innerHTML =
        '<span class="mobile-menu-icon" aria-hidden="true">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2">' +
        '<path d="M3 12h18M3 6h18M3 18h18"/>' +
        '</svg>' +
        '</span>';
    });
  });
}

  // --- Sticky Header Scroll ---
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === './index.html')) {
      link.classList.add('active');
    }
  });

  // --- Scroll Reveal ---
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function(el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function(el) { el.classList.add('visible'); });
  }

  // --- Contact Form (no backend, just UX) ---
  /*
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      setTimeout(function() {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        contactForm.reset();
      }, 3000);
    });
  }
*/
})();
