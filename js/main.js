/**
 * MAIN.JS - Core Interactivity, Unified Intersection Observer, Parallax, & Contact Form
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Helper Utilities & DOM Selectors Caching
  // --------------------------------------------------------------------------
  function animateCounter(el, target, duration) {
    if (!el) return;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // --------------------------------------------------------------------------
  // 2. Hero Section Typewriter Role Effect
  // --------------------------------------------------------------------------
  function initTypewriter() {
    const roles = ["BIM Modeler", "Revit Specialist", "MEP Coordinator", "Point Cloud to BIM"];
    const roleEl = document.getElementById('roleText');
    if (!roleEl) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }

    typeLoop();
  }

  // --------------------------------------------------------------------------
  // 3. Mouse Parallax for Floating Shapes & Cube Scene
  // --------------------------------------------------------------------------
  function initParallax() {
    const shapes = document.querySelectorAll('.float-shape');
    const scene = document.getElementById('scene');
    const isTouch = window.matchMedia('(hover: none)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || reduced) return;

    let requestTick = false;

    window.addEventListener('mousemove', (e) => {
      if (!requestTick) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5);
          const y = (e.clientY / window.innerHeight - 0.5);

          shapes.forEach(el => {
            const depth = parseFloat(el.dataset.depth) || 15;
            el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
          });

          if (scene) {
            scene.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 12}deg)`;
          }

          requestTick = false;
        });
        requestTick = true;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Unified Intersection Observer for Scroll Reveals & Progress Meters
  // --------------------------------------------------------------------------
  function initScrollObservers() {
    // A. General Scroll Reveal Targets
    const revealTargets = document.querySelectorAll(
      '.profile-card, .bio, .skill-card, .platform-card, .testi-card, .contact-info, .contact-form'
    );

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));

    // B. About Section Journey Timeline & Progress Line
    const aboutTimelineItems = document.querySelectorAll('.about .timeline-item');
    const aboutProgressBar = document.getElementById('timelineProgress');
    const totalAboutItems = aboutTimelineItems.length;
    let maxAboutSeen = 0;

    if (aboutTimelineItems.length > 0) {
      const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const idx = parseInt(entry.target.dataset.idx, 10);
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (idx + 1 > maxAboutSeen) {
              maxAboutSeen = idx + 1;
              if (aboutProgressBar) {
                aboutProgressBar.style.height = (maxAboutSeen / totalAboutItems * 100) + '%';
              }
            }
          }
        });
      }, { threshold: 0.35 });

      aboutTimelineItems.forEach((item, i) => {
        item.dataset.idx = i;
        aboutObserver.observe(item);
      });
    }

    // C. Experience Section Career Timeline & Spine Progress
    const expItems = document.querySelectorAll('.experience .timeline-item');
    const expProgressBar = document.querySelector('.experience #timelineProgress') || document.querySelector('.experience .timeline-progress');
    const totalExpItems = expItems.length;
    let maxExpSeen = 0;

    if (expItems.length > 0) {
      const expObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const idx = parseInt(entry.target.dataset.idx, 10);
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (idx + 1 > maxExpSeen) {
              maxExpSeen = idx + 1;
              if (expProgressBar) {
                expProgressBar.style.height = (maxExpSeen / totalExpItems * 100) + '%';
              }
            }
          }
        });
      }, { threshold: 0.35 });

      expItems.forEach((item, i) => {
        item.dataset.idx = i;
        expObserver.observe(item);
      });
    }

    // D. Skills Section Circular Gauge
    const featuredCard = document.getElementById('featuredCard');
    const ringFill = document.getElementById('ringFill');
    const ringCounter = document.getElementById('ringCounter');
    const CIRCUMFERENCE = 2 * Math.PI * 80; // ~502.65px

    if (featuredCard && ringFill && ringCounter) {
      const ringObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const level = parseFloat(ringFill.dataset.level) || 96;
            const offset = CIRCUMFERENCE - (level / 100) * CIRCUMFERENCE;
            featuredCard.classList.add('in-view');
            ringFill.style.strokeDashoffset = offset;
            animateCounter(ringCounter, level, 1400);
            ringObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      ringObserver.observe(featuredCard);
    }

    // E. Skills Section Progress Bars
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillBars.length > 0) {
      const barObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const level = parseFloat(bar.dataset.level) || 0;
            const fillEl = bar.querySelector('.fill');
            const counterEl = bar.querySelector('.counter');

            bar.classList.add('in-view');
            if (fillEl) fillEl.style.width = level + '%';
            if (counterEl) animateCounter(counterEl, level, 1200);

            barObserver.unobserve(bar);
          }
        });
      }, { threshold: 0.3 });

      skillBars.forEach(bar => barObserver.observe(bar));
    }
  }

  // --------------------------------------------------------------------------
  // 5. Contact Form Simulation & Feedback
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitLabel = document.getElementById('submitLabel');
    const status = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in your name, email, and message.';
        status.className = 'form-status error';
        return;
      }

      submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Sending...';
      status.textContent = '';
      status.className = 'form-status';

      setTimeout(() => {
        if (submitLabel) submitLabel.textContent = 'Send Message';
        submitBtn.disabled = false;
        status.textContent = "Message sent! Thank you for reaching out.";
        status.className = 'form-status success';
        form.reset();
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 6. Dynamic Footer Copyright Year
  // --------------------------------------------------------------------------
  function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // --------------------------------------------------------------------------
  // 7. Initialize Everything on DOM Content Loaded
  // --------------------------------------------------------------------------
  function init() {
    initTypewriter();
    initParallax();
    initScrollObservers();
    initContactForm();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
