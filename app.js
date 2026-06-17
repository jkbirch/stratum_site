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
  menuBtn.innerHTML =
    '<span class="mobile-menu-icon" aria-hidden="true">' +
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2">' +
    '<path d="M3 12h18M3 6h18M3 18h18"/>' +
    '</svg>' +
    '</span>';

  function setClosedState() {
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
  }

  function setOpenState() {
    mobileNav.classList.remove('is-closed');
    mobileNav.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close navigation');
    menuBtn.innerHTML =
      '<span class="mobile-menu-icon" aria-hidden="true">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2">' +
      '<path d="M6 6l12 12M6 18L18 6"/>' +
      '</svg>' +
      '</span>';
  }

  // Toggle on button click
  menuBtn.addEventListener('click', function() {
    const isOpen = mobileNav.classList.contains('is-open');
    if (isOpen) {
      setClosedState();
    } else {
      setOpenState();
    }
  });

  // Auto-close when any mobile nav link (or Contact button) is clicked,
  // EXCEPT the accordion trigger (which should only expand its submenu).
  mobileNav.querySelectorAll('.nav-link:not(.mobile-nav-accordion-trigger), .btn').forEach(function(link) {
    link.addEventListener('click', function() {
      setClosedState();
    });
  });
}

// Close mobile nav when a link is clicked
if (mobileNav && menuBtn) {
  mobileNav.querySelectorAll('.nav-link:not(.mobile-nav-accordion-trigger), .btn').forEach(function(link) {
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

  // --- Nav Dropdown (Desktop): click + keyboard support ---
  document.querySelectorAll('[data-nav-dropdown]').forEach(function(drop) {
    var trigger = drop.querySelector('.nav-dropdown-trigger');
    var menu = drop.querySelector('.nav-dropdown-menu');
    if (!trigger || !menu) return;

    function open() {
      drop.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
    function close() {
      drop.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function toggle() {
      if (trigger.getAttribute('aria-expanded') === 'true') close();
      else open();
    }

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle();
    });

    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        open();
        var firstItem = menu.querySelector('.nav-dropdown-item');
        if (firstItem) firstItem.focus();
      } else if (e.key === 'Escape') {
        close();
      }
    });

    menu.addEventListener('keydown', function(e) {
      var items = Array.prototype.slice.call(menu.querySelectorAll('.nav-dropdown-item'));
      var idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var next = items[(idx + 1) % items.length];
        if (next) next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = items[(idx - 1 + items.length) % items.length];
        if (prev) prev.focus();
      } else if (e.key === 'Escape') {
        close();
        trigger.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!drop.contains(e.target)) close();
    });
  });

  // --- Mobile Nav Accordion ---
  document.querySelectorAll('[data-mobile-accordion]').forEach(function(group) {
    var trigger = group.querySelector('.mobile-nav-accordion-trigger');
    var submenu = group.querySelector('.mobile-nav-submenu');
    if (!trigger || !submenu) return;

    // Default: expanded on the connector page (aria-expanded="true" already set), collapsed elsewhere
    var initiallyOpen = trigger.getAttribute('aria-expanded') === 'true';
    if (initiallyOpen) {
      submenu.removeAttribute('hidden');
    } else {
      submenu.setAttribute('hidden', '');
    }

    trigger.addEventListener('click', function() {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        submenu.setAttribute('hidden', '');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        submenu.removeAttribute('hidden');
      }
    });
  });

  // --- Pre-select 'Program of Interest' from ?program= query param ---
  (function preselectProgram() {
    var params = new URLSearchParams(window.location.search || '');
    var program = params.get('program');
    if (!program) return;
    var select = document.querySelector('#interest');
    if (!select) return;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === program) {
        select.selectedIndex = i;
        break;
      }
    }
  })();

  // --- Contact Form: fetch-based submission with validation ---
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate required fields
      var requiredFields = contactForm.querySelectorAll('[required]');
      var valid = true;
      requiredFields.forEach(function(field) {
        field.style.outline = '';
        if (!field.value.trim()) {
          field.style.outline = '2px solid var(--color-error, #e53e3e)';
          valid = false;
        }
      });
      if (!valid) {
        var firstInvalid = contactForm.querySelector('[required][style*="outline"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      var formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData
      })
      .then(function(res) {
        if (res.ok || res.redirected) {
          window.location.href = 'https://www.stratumassetintelligence.com/thank-you.html';
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(function() {
        btn.textContent = originalText;
        btn.disabled = false;
        var errMsg = contactForm.querySelector('.form-error-msg');
        if (!errMsg) {
          errMsg = document.createElement('p');
          errMsg.className = 'form-error-msg';
          errMsg.style.cssText = 'color:var(--color-error,#e53e3e);font-size:var(--text-sm);margin-top:var(--space-2);';
          btn.parentNode.insertBefore(errMsg, btn.nextSibling);
        }
        errMsg.textContent = 'Something went wrong. Please try again or email sales@stratumassetintelligence.com directly.';
      });
    });
  }
})();
