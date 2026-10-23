/* =====================================================================
   healthume — Global JS
   ===================================================================== */

(function () {
  'use strict';

  /* ── Reading Progress Bar ─────────────────────────────────────────── */
  function initReadingProgress() {
    if (!document.querySelector('.content-body, .article-card')) return;
    const bar = document.createElement('div');
    bar.id = 'reading-progress';
    document.body.prepend(bar);
    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docH > 0 ? (scrollTop / docH) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ── Back to Top ──────────────────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Scroll Reveal ────────────────────────────────────────────────── */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.card.h-100, .featured-card, .trending-item, .top-read-card, .sidebar-card, .section-heading, .tl-dr-box'
    );
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const viewportH = window.innerHeight;

    targets.forEach(function (el, i) {
      const rect = el.getBoundingClientRect();
      // Already in or very close to viewport — show immediately
      if (rect.top < viewportH + 100) {
        // visible, no animation needed
        return;
      }
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 6, 5) * 0.07) + 's';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(function (el) {
      if (el.classList.contains('reveal')) observer.observe(el);
    });
  }

  /* ── Health Alert Persistence ─────────────────────────────────────── */
  function initHealthAlert() {
    const alertBar = document.getElementById('health-alert');
    if (!alertBar) return;
    if (sessionStorage.getItem('healthAlertDismissed') === 'true') {
      alertBar.style.display = 'none';
      return;
    }
    const closeBtn = alertBar.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        sessionStorage.setItem('healthAlertDismissed', 'true');
      });
    }
  }

  /* ── Newsletter Mock ──────────────────────────────────────────────── */
  window.mockNewsletterSubscribe = function (form) {
    const input = form.querySelector('input[type="email"]');
    if (!input || !input.value) return;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check me-1"></i> Subscribed!';
      btn.disabled = true;
      btn.style.background = '#16a34a';
      setTimeout(function () {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }
    input.value = '';
  };

  /* ── Navbar Active Link ───────────────────────────────────────────── */
  function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      const href = (link.getAttribute('href') || '').split('/').pop();
      if (href && href === path) link.classList.add('active');
    });
  }

  /* ── Smooth Image Load Fade ───────────────────────────────────────── */
  function initImageFade() {
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      img.style.opacity = '0';
      img.style.transition = 'opacity .4s ease';
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', function () { img.style.opacity = '1'; });
        img.addEventListener('error', function () { img.style.opacity = '1'; });
      }
    });
  }

  /* ── Init on DOM ready ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initReadingProgress();
    initBackToTop();
    initScrollReveal();
    initHealthAlert();
    initActiveNav();
    initImageFade();
  });

})();
