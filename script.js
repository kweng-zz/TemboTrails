/* ════════════════════════════════════════
   SUNSET ADVENTURES — Main JavaScript
════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. MOBILE HAMBURGER MENU ──────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });


  // ── 2. SCROLL REVEAL ANIMATIONS ──────────────────
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


  // ── 3. DESTINATION MODAL ──────────────────────────
  const WA_NUMBER = '254784210268';

 const destinationData = {
    wasini: {
      name: 'Wasini Island',
      badge: 'Most Popular',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTapT-4zHE_RK11X9L5s39dVGHEsGL7TgLljY3XumujtrupHfXGMxlFTLIX&s=10',
      meta: 'South Coast, Kenya · Full Day Tour (7-8 hours)',
      highlights: ['⛵ Dhow Sailing', '🐬 Dolphin Spotting', '🤿 Coral Snorkeling', '🍤 Seafood Lunch'],
      pricing: [
        { tier: 'Kenyan Residents', price: 'KES 4,999', period: 'per person' },
        { tier: 'Non-Residents', price: '$85 USD', period: 'per person' },
        { tier: 'Private Tour', price: 'From $150 USD', period: 'per person (depends on group size)' }
      ]
    },
    mombasa: {
      name: 'Mombasa City Tour',
      badge: '',
      image: 'https://easternvacations-kenya.com/wp-content/uploads/2023/09/Mombasa-city-tursks-tour-evacations.jpg',
      meta: 'Mombasa Island, Kenya · Half Day (4-5 hrs) or Full Day (7-8 hrs)',
      highlights: ['🏰 Fort Jesus', '🏛️ Old Town', '🕌 Hindu Temple', '🐘 Haller Park', '🌊 Mama Ngina Waterfront', '🌶️ Spice Market'],
      pricing: [
        { tier: 'Half Day Tour', price: 'From $60 USD', period: 'per person (depends on group size)' },
        { tier: 'Full Day Tour', price: 'From $90 USD', period: 'per person' }
      ]
    },
    malindi: {
      name: 'Malindi Full Day Tour',
      badge: '',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc64qKfX_M6SN0z6RDpwdsElQ-f6xJbhl72TH3UQbBYg&s=10',
      meta: 'Malindi, Kenya · Full Day Tour',
      highlights: ['🐠 Marine Park', '⛲ Vasco da Gama Pillar', '🛍️ Beach Markets', '🍤 Seafood Lunch'],
      pricing: [
        { tier: 'Group Joining', price: 'KES 5,000', period: 'per person' },
        { tier: 'Private Tour', price: 'KES 18,000', period: 'per group' },
        { tier: 'Child (3-12yrs)', price: 'KES 2,800', period: 'per child' }
      ]
    },
    tsavo: {
      name: 'Tsavo East Safari',
      badge: '',
      image: 'https://images.unsplash.com/photo-1658926342182-512ff6dcc08e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      meta: 'Tsavo East National Park · Day Trip or Multi-day Safari',
      highlights: ['🐘 Elephant Herds', '🦁 Big Cats', '💦 Lugard Falls', '🪨 Mudanda Rock', '🚙 4×4 Game Drives'],
      pricing: [
        { tier: 'Day Trip (Group Joining)', price: 'KES 7,500', period: 'per person' },
        { tier: 'Private Day Safari', price: 'From $280 USD', period: 'per person' },
        { tier: 'Multi-Day Safari', price: 'From $380 USD', period: 'per person' }
      ]
    },
    zanzibar: {
      name: 'Zanzibar & Tanzania',
      badge: '',
      image: 'https://images.unsplash.com/photo-1683322753580-6bf07759dbfe?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      meta: 'Zanzibar, Tanzania · 3-7 Nights',
      highlights: ['🏛️ Stone Town', '🌶️ Spice Farm Tour', '🐢 Turtle Aquarium', '🤿 Snorkelling', '🏖️ East Coast Beaches', '⛵ Sunset Dhow Cruise'],
      pricing: [
        { tier: '3 Nights', price: 'From KES 55,000', period: 'per person' },
        { tier: '5 Nights', price: 'From KES 85,000', period: 'per person' },
        { tier: '7 Nights', price: 'From KES 110,000', period: 'per person' }
      ]
    }
  };

  const modalOverlay = document.getElementById('destModal');
  const modalClose = document.getElementById('modalClose');
  const modalHero = document.getElementById('modalHero');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalPricing = document.getElementById('modalPricing');
  const modalCta = document.getElementById('modalCta');

  function openModal(key) {
    const data = destinationData[key];
    if (!data || !modalOverlay) return;

    modalHero.style.backgroundImage = `url('${data.image}')`;
    modalBadge.textContent = data.badge || '';
    modalTitle.textContent = data.name;
    modalMeta.textContent = data.meta;

    modalHighlights.innerHTML = data.highlights
      .map(h => `<span class="highlight-chip">${h}</span>`)
      .join('');

    modalPricing.innerHTML = data.pricing.map(p => `
      <div class="pricing-card">
        <span class="pricing-tier">${p.tier}</span>
        <span class="pricing-amount">${p.price}</span>
        <span class="pricing-period">${p.period}</span>
      </div>
    `).join('');

    const message = `Hi Sunset Adventures, I'd like to book/inquire about the ${data.name} tour.`;
    modalCta.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Card click handlers
  document.querySelectorAll('.dest-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if WhatsApp button was clicked
      if (e.target.closest('.dest-wa-btn')) return;
      const key = card.dataset.dest;
      if (key) openModal(key);
    });
  });

  // Info button click handlers
  document.querySelectorAll('.dest-info-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.dest;
      if (key) openModal(key);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  // ── 4. TESTIMONIALS SLIDER ────────────────────────
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  const dotsWrap = document.getElementById('testiDots');

  if (track) {
    const cards = track.querySelectorAll('.testimonial-card');
    const cardCount = cards.length;
    let current = 0;
    let autoSlide;

    // Build dots
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        clearInterval(autoSlide);
        goToSlide(i);
        startAutoSlide();
      });
      dotsWrap.appendChild(dot);
    });

    function getVisibleCount() {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function goToSlide(idx) {
      const visible = getVisibleCount();
      const maxIdx = Math.max(0, cardCount - visible);
      current = Math.max(0, Math.min(idx, maxIdx));

      const cardWidth = cards[0].offsetWidth + 16;
      track.style.transform = `translateX(-${current * cardWidth}px)`;

      dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function startAutoSlide() {
      autoSlide = setInterval(() => {
        const visible = getVisibleCount();
        const maxIdx = Math.max(0, cardCount - visible);
        goToSlide(current < maxIdx ? current + 1 : 0);
      }, 4000);
    }

    prevBtn?.addEventListener('click', () => {
      clearInterval(autoSlide);
      goToSlide(current - 1);
      startAutoSlide();
    });

    nextBtn?.addEventListener('click', () => {
      clearInterval(autoSlide);
      const visible = getVisibleCount();
      const maxIdx = Math.max(0, cardCount - visible);
      goToSlide(current + 1 > maxIdx ? 0 : current + 1);
      startAutoSlide();
    });

    window.addEventListener('resize', () => goToSlide(0));
    startAutoSlide();
  }


  // ── 5. STAT COUNTER ANIMATION ─────────────────────
  function animateCounter(el, target) {
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + '+';
      }
    }, 16);
  }

  const statNums = document.querySelectorAll('.stat-num');
  const targets = [15, 4200, 30, 98];
  let countersStarted = false;

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNums.forEach((el, i) => {
          setTimeout(() => animateCounter(el, targets[i]), i * 200);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.getElementById('hero');
  if (heroSection) heroObserver.observe(heroSection);


  // ── 6. CONTACT FORM HANDLER ───────────────────────
  window.handleContactSubmit = function(event) {
    event.preventDefault();
    showToast('🌅 Thank you! Your enquiry has been received. Our team will contact you shortly.');
    event.target.reset();
    return false;
  };


  // ── 7. TOAST UTILITY ──────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  window.showToast = showToast;


  // ── 8. GALLERY LIGHTBOX ───────────────────────────
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.92); display: flex;
        align-items: center; justify-content: center;
        cursor: pointer;
      `;

      const bigImg = document.createElement('img');
      bigImg.src = img.src.replace('w=600', 'w=1200');
      bigImg.style.cssText = `
        max-width: 90vw; max-height: 90vh;
        object-fit: contain; border-radius: 8px;
        box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      `;

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '×';
      closeBtn.style.cssText = `
        position: absolute; top: 1.5rem; right: 2rem;
        background: none; border: none; color: #fff;
        font-size: 3rem; cursor: pointer; opacity: 0.7;
        transition: opacity 0.2s;
      `;
      closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
      closeBtn.onmouseout = () => closeBtn.style.opacity = '0.7';

      overlay.appendChild(bigImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const close = () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      };
      overlay.addEventListener('click', close);
      bigImg.addEventListener('click', e => e.stopPropagation());
    });
  });


  // ── 9. SMOOTH SCROLL FOR NAV LINKS ────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


});

/// ── HERO SLIDESHOW WITH PAGINATION DOTS ─────────────────
const heroSlides = document.querySelectorAll('.hero-slide');
const paginationDots = document.querySelectorAll('.pagination-dot');
let currentSlide = 0;
let slideInterval;
const totalSlides = heroSlides.length;

function goToSlide(index) {
  // Remove active class from current slide and dot
  heroSlides[currentSlide].classList.remove('active');
  paginationDots[currentSlide].classList.remove('active');
  
  // Update current slide index
  currentSlide = index;
  
  // Add active class to new slide and dot
  heroSlides[currentSlide].classList.add('active');
  paginationDots[currentSlide].classList.add('active');
}

function nextSlide() {
  const next = (currentSlide + 1) % totalSlides;
  goToSlide(next);
}

function startSlideshow() {
  stopSlideshow(); // Clear any existing interval
  slideInterval = setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds
}

function stopSlideshow() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

// Pagination dot click handlers
paginationDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.dataset.slide);
    stopSlideshow();
    goToSlide(slideIndex);
    startSlideshow();
  });
});

// Pause auto-scroll on hover
const heroSection = document.getElementById('hero');
heroSection?.addEventListener('mouseenter', stopSlideshow);
heroSection?.addEventListener('mouseleave', startSlideshow);

// Start the auto-scrolling slideshow
if (heroSlides.length > 0) {
  startSlideshow();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    stopSlideshow();
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
    startSlideshow();
  } else if (e.key === 'ArrowRight') {
    stopSlideshow();
    nextSlide();
    startSlideshow();
  }
});

// ── DYNAMIC MOBILE STYLESHEET LOADING ─────────────────
function loadMobileCSS() {
  const isMobile = window.innerWidth < 768;
  const existingLink = document.querySelector('link[href="mobile.css"]');
  
  if (isMobile && !existingLink) {
    // Load mobile CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'mobile.css';
    link.media = 'screen and (max-width: 767px)';
    document.head.appendChild(link);
  } else if (!isMobile && existingLink) {
    // Remove mobile CSS on desktop
    existingLink.remove();
  }
}

// Run on load
loadMobileCSS();

// Run on resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(loadMobileCSS, 250);
});