/* ════════════════════════════════════════
   TEMBO TRAILS — script.js
════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR SCROLL ──────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  // ── 2. MOBILE HAMBURGER ──────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu when a link is clicked
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });


  // ── 3. HERO SLIDESHOW ─────────────────────────────
  const slides     = document.querySelectorAll('.hero .slide');
  const slideDots  = document.querySelectorAll('.slide-dots .dot');
  let currentSlide = 0;
  let slideTimer;

  function goToSlide(idx) {
    slides[currentSlide].classList.remove('active');
    slideDots[currentSlide].classList.remove('active');
    currentSlide = idx;
    slides[currentSlide].classList.add('active');
    slideDots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startSlideShow() {
    slideTimer = setInterval(nextSlide, 5500);
  }

  slideDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(slideTimer);
      goToSlide(idx);
      startSlideShow();
    });
  });

  startSlideShow();


  // ── 4. SCROLL REVEAL ──────────────────────────────
  const revealItems = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach(item => revealObserver.observe(item));


  // ── 5. PACKAGE FILTER ─────────────────────────────
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const packageCards  = document.querySelectorAll('.package-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      packageCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.classList.remove('hidden');
          // re-trigger reveal animation
          card.classList.remove('revealed');
          setTimeout(() => card.classList.add('revealed'), 60);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  // ── 6. TESTIMONIALS SLIDER ────────────────────────
  const track     = document.getElementById('testimonials-track');
  const prevBtn   = document.getElementById('testi-prev');
  const nextBtn   = document.getElementById('testi-next');
  const dotsWrap  = document.getElementById('testi-dots');

  if (track) {
    const cards      = track.querySelectorAll('.testi-card');
    const cardCount  = cards.length;
    let current      = 0;
    let autoSlide;

    // Build dots
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'testi-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => {
        clearInterval(autoSlide);
        goToTesti(i);
        startAutoTesti();
      });
      dotsWrap.appendChild(d);
    });

    function getVisibleCount() {
      return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }

    function goToTesti(idx) {
      const visible = getVisibleCount();
      const maxIdx  = Math.max(0, cardCount - visible);
      current       = Math.max(0, Math.min(idx, maxIdx));

      const cardWidth = cards[0].offsetWidth + 16; // gap
      track.style.transform = `translateX(-${current * cardWidth}px)`;

      dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function startAutoTesti() {
      autoSlide = setInterval(() => {
        const visible = getVisibleCount();
        const maxIdx  = Math.max(0, cardCount - visible);
        goToTesti(current < maxIdx ? current + 1 : 0);
      }, 4000);
    }

    prevBtn?.addEventListener('click', () => {
      clearInterval(autoSlide);
      goToTesti(current - 1 < 0 ? 0 : current - 1);
      startAutoTesti();
    });

    nextBtn?.addEventListener('click', () => {
      clearInterval(autoSlide);
      const visible = getVisibleCount();
      const maxIdx  = Math.max(0, cardCount - visible);
      goToTesti(current + 1 > maxIdx ? 0 : current + 1);
      startAutoTesti();
    });

    window.addEventListener('resize', () => goToTesti(0));
    startAutoTesti();
  }


  // ── 7. SMOOTH ACTIVE NAV ON SCROLL ───────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  // ── 8. CONTACT FORM SUBMIT ────────────────────────
  window.handleContactSubmit = function(event) {
    event.preventDefault();
    showToast('🦁 Asante sana! Your safari enquiry has been received. We\'ll respond within 2 hours.');
    event.target.reset();
  };


  // ── 9. SEARCH BUTTON ──────────────────────────────
  document.querySelector('.search-btn')?.addEventListener('click', () => {
    showToast('🌍 Searching available safaris for your selection...');
    setTimeout(() => {
      document.getElementById('safaris')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  });


  // ── 10. NEWSLETTER FORM ───────────────────────────
  document.querySelector('.nl-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input?.value) {
      showToast('🐘 Karibu! You\'ve joined the Tembo Trails wildlife newsletter.');
      input.value = '';
    }
  });


  // ── 11. GALLERY LIGHTBOX (simple) ─────────────────
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:9999;
        background:rgba(0,0,0,0.92);
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;animation:fadeIn .25s ease;
      `;
      const style = document.createElement('style');
      style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
      document.head.appendChild(style);

      const bigImg = document.createElement('img');
      bigImg.src   = img.src.replace('w=500', 'w=1200');
      bigImg.style.cssText = `
        max-width:90vw;max-height:90vh;
        object-fit:contain;border-radius:8px;
        box-shadow:0 30px 80px rgba(0,0,0,0.6);
      `;

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '×';
      closeBtn.style.cssText = `
        position:absolute;top:1.5rem;right:2rem;
        background:none;border:none;color:#fff;font-size:3rem;
        cursor:pointer;line-height:1;opacity:0.7;
        transition:opacity .2s;
      `;
      closeBtn.onmouseover  = () => closeBtn.style.opacity = '1';
      closeBtn.onmouseout   = () => closeBtn.style.opacity = '0.7';

      overlay.appendChild(bigImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const close = () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
        document.head.removeChild(style);
      };
      overlay.addEventListener('click', close);
      bigImg.addEventListener('click', e => e.stopPropagation());
    });
  });


  // ── 12. FLOATING WHATSAPP BUTTON ─────────────────
  const wa = document.createElement('a');
  wa.href   = 'https://wa.me/254700723274';
  wa.target = '_blank';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.style.cssText = `
    position:fixed;
    bottom:2rem;left:2rem;
    z-index:900;
    width:52px;height:52px;
    background:#25D366;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 4px 20px rgba(37,211,102,0.45);
    font-size:1.5rem;
    transition:transform .25s, box-shadow .25s;
    text-decoration:none;
  `;
  wa.textContent = '💬';
  wa.onmouseover = () => {
    wa.style.transform  = 'scale(1.12)';
    wa.style.boxShadow  = '0 8px 28px rgba(37,211,102,0.6)';
  };
  wa.onmouseout = () => {
    wa.style.transform  = '';
    wa.style.boxShadow  = '0 4px 20px rgba(37,211,102,0.45)';
  };
  document.body.appendChild(wa);


  // ── 13. TOAST UTILITY ─────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // Expose globally
  window.showToast = showToast;


  // ── 14. COUNTER ANIMATION ─────────────────────────
  function animateCounter(el, target, suffix = '') {
    let start   = 0;
    const step  = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  // Trigger stat counters when hero is visible
  const statNums   = document.querySelectorAll('.stat-num');
  const rawTargets = [15, 4200, 30, 98];
  const suffixes   = ['+', '+', '+', '%'];

  let countersStarted = false;
  const heroObserver  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNums.forEach((el, i) => {
          setTimeout(() => animateCounter(el, rawTargets[i], suffixes[i]), i * 150);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.getElementById('hero');
  if (heroSection) heroObserver.observe(heroSection);


  // ── 15. PARALLAX HERO SCROLL ──────────────────────
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero    = document.getElementById('hero');
    if (hero && scrollY < hero.offsetHeight) {
      document.querySelector('.hero-content').style.transform =
        `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });

});