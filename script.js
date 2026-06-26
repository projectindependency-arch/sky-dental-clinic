(function() {
  const categories = [
    {
      title: "Basic & Preventive",
      icon: "🛡️",
      services: [
        { icon: '✨', name: 'Teeth Cleaning', subtitle: 'Scaling & Polishing', price: '₹800 - ₹1,500' },
        { icon: '🛡️', name: 'Tooth Colored Fillings', subtitle: 'Composite', price: '₹800 - ₹1,200' },
        { icon: '✂️', name: 'Simple Tooth Extraction', subtitle: 'Safe & Painless', price: '₹500 - ₹1,000' },
      ]
    },
    {
      title: "Advanced Treatments",
      icon: "⭐",
      services: [
        { icon: '📊', name: 'Root Canal Treatment', subtitle: 'Single-Sitting RCT', price: '₹2,500 - ₹4,500' },
        { icon: '👑', name: 'Zirconia/Ceramic Crowns', subtitle: 'Premium Caps', price: '₹3,500 - ₹8,000' },
        { icon: '💉', name: 'Dental Implants', subtitle: 'Permanent Solution', price: '₹20,000 - ₹35,000' },
        { icon: '⭐', name: 'Surgical Wisdom Tooth Removal', subtitle: 'Expert Care', price: '₹2,500 - ₹5,000' },
      ]
    },
    {
      title: "Orthodontics & Cosmetic",
      icon: "✨",
      services: [
        { icon: '😊', name: 'Traditional Metal Braces', subtitle: 'Full Treatment', price: '₹25,000 - ₹35,000' },
        { icon: '🌬️', name: 'Clear Aligners', subtitle: 'Invisible Braces', price: '₹50,000 - ₹80,000+' },
        { icon: '🎨', name: 'Professional Teeth Whitening', subtitle: 'Brighten Your Smile', price: '₹5,000 - ₹10,000' },
      ]
    }
  ];

  let currentCategory = 0;
  let currentItem = 0;
  let autoplayInterval = null;

  const categoryIcon = document.getElementById('categoryIcon');
  const categoryTitle = document.getElementById('categoryTitle');
  const categoryDots = document.getElementById('categoryDots');
  const serviceCard = document.getElementById('serviceCard');
  const serviceIcon = document.getElementById('serviceIcon');
  const serviceName = document.getElementById('serviceName');
  const serviceSubtitle = document.getElementById('serviceSubtitle');
  const servicePrice = document.getElementById('servicePrice');
  const itemDots = document.getElementById('itemDots');
  const carouselCard = document.getElementById('carouselCard');

  function updateCarousel() {
    const cat = categories[currentCategory];
    const svc = cat.services[currentItem];

    if (categoryIcon) categoryIcon.textContent = cat.icon;
    if (categoryTitle) categoryTitle.textContent = cat.title;

    if (serviceCard) {
      serviceCard.style.animation = 'none';
      serviceCard.offsetHeight;
      serviceCard.style.animation = 'serviceCardFadeIn 0.5s ease forwards';
    }

    if (serviceIcon) serviceIcon.textContent = svc.icon;
    if (serviceName) serviceName.textContent = svc.name;
    if (serviceSubtitle) serviceSubtitle.textContent = svc.subtitle;
    if (servicePrice) servicePrice.textContent = svc.price;

    renderCategoryDots();
    renderItemDots();
  }

  function renderCategoryDots() {
    if (!categoryDots) return;
    categoryDots.innerHTML = '';
    categories.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `category-dot ${i === currentCategory ? 'active' : ''}`;
      dot.onclick = () => {
        currentCategory = i;
        currentItem = 0;
        resetAutoplay();
        updateCarousel();
      };
      categoryDots.appendChild(dot);
    });
  }

  function renderItemDots() {
    if (!itemDots) return;
    itemDots.innerHTML = '';
    categories[currentCategory].services.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `item-dot ${i === currentItem ? 'active' : ''}`;
      dot.onclick = () => {
        currentItem = i;
        resetAutoplay();
        updateCarousel();
      };
      itemDots.appendChild(dot);
    });
  }

  function nextItem() {
    const cat = categories[currentCategory];
    currentItem = (currentItem + 1) % cat.services.length;
    if (currentItem === 0) {
      currentCategory = (currentCategory + 1) % categories.length;
    }
    updateCarousel();
  }

  function prevItem() {
    const cat = categories[currentCategory];
    currentItem = (currentItem - 1 + cat.services.length) % cat.services.length;
    updateCarousel();
  }

  function nextCategory() {
    currentCategory = (currentCategory + 1) % categories.length;
    currentItem = 0;
    updateCarousel();
  }

  function prevCategory() {
    currentCategory = (currentCategory - 1 + categories.length) % categories.length;
    currentItem = 0;
    updateCarousel();
  }

  function startAutoplay() {
    if (!autoplayInterval) {
      autoplayInterval = setInterval(nextItem, 4000);
    }
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-value'));
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const update = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = target * easeProgress;
      const displayVal = isDecimal ? currentVal.toFixed(1) : Math.round(currentVal);
      const valueEl = el.querySelector('.stat-value');
      if (valueEl) valueEl.textContent = displayVal + suffix;
      if (currentFrame < totalFrames) {
        requestAnimationFrame(update);
      } else {
        if (valueEl) valueEl.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
      }
    };
    requestAnimationFrame(update);
  }

  function createFX() {
    const orbContainer = document.getElementById('heroOrbs');
    const particleContainer = document.getElementById('heroParticles');
    const socialParticles = document.getElementById('socialParticles');

    if (orbContainer) {
      for (let i = 0; i < 12; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        const size = 50 + Math.random() * 70;
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        orb.style.left = (Math.random() * 95) + '%';
        orb.style.animation = `floatUp ${15 + Math.random() * 10}s ease-out infinite`;
        orb.style.animationDelay = (Math.random() * 10) + 's';
        orbContainer.appendChild(orb);
      }
    }

    if (particleContainer) {
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = (Math.random() * 95) + '%';
        p.style.animation = `particleFloat ${10 + Math.random() * 8}s linear infinite`;
        p.style.animationDelay = (Math.random() * 8) + 's';
        particleContainer.appendChild(p);
      }
    }

    if (socialParticles) {
      for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = (Math.random() * 95) + '%';
        p.style.animation = `particleFloat ${12 + Math.random() * 10}s linear infinite`;
        p.style.animationDelay = (Math.random() * 5) + 's';
        socialParticles.appendChild(p);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    createFX();
    updateCarousel();
    startAutoplay();

    const nextCatBtn = document.getElementById('nextCategory');
    const prevCatBtn = document.getElementById('prevCategory');
    const nextItemBtn = document.getElementById('nextItem');
    const prevItemBtn = document.getElementById('prevItem');

    if (nextCatBtn) nextCatBtn.onclick = () => { nextCategory(); resetAutoplay(); };
    if (prevCatBtn) prevCatBtn.onclick = () => { prevCategory(); resetAutoplay(); };
    if (nextItemBtn) nextItemBtn.onclick = () => { nextItem(); resetAutoplay(); };
    if (prevItemBtn) prevItemBtn.onclick = () => { prevItem(); resetAutoplay(); };

    if (carouselCard) {
      carouselCard.onmouseenter = stopAutoplay;
      carouselCard.onmouseleave = startAutoplay;
    }

    const scrollWrapper = document.getElementById('main-scroll-wrapper');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('stat-card')) {
            entry.target.classList.add('animate');
            animateCounter(entry.target);
          } else if (entry.target.classList.contains('testimonial-card')) {
            entry.target.classList.add('animate');
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: scrollWrapper,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05
    });

    document.querySelectorAll('.stat-card, .testimonial-card').forEach(el => observer.observe(el));
  });
})();
