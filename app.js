/* =====================================================
   HEPRA OPTICAL — App Logic
   Premium Eyewear E-commerce Interactions
   ===================================================== */

(function () {
  'use strict';

  // ---------- PRODUCT DATA ----------
  const products = [
    {
      id: 1,
      name: 'Aether Classic',
      category: 'eyeglasses',
      shape: 'rectangle',
      price: 1499,
      mrp: 2499,
      rating: 4.8,
      reviews: 1248,
      colors: ['#1a1a1a', '#8B4513', '#2F4F4F'],
      size: 'Medium',
      dims: '52 □ 18 – 140',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5041?w=400&q=80',
      badge: 'BESTSELLER'
    },
    {
      id: 2,
      name: 'Nova Round',
      category: 'eyeglasses',
      shape: 'round',
      price: 1799,
      mrp: 2999,
      rating: 4.9,
      reviews: 892,
      colors: ['#1a1a1a', '#C0C0C0', '#4A3728'],
      size: 'Medium',
      dims: '49 □ 20 – 145',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80',
      badge: 'NEW'
    },
    {
      id: 3,
      name: 'Vertex Square',
      category: 'eyeglasses',
      shape: 'square',
      price: 1299,
      mrp: 2199,
      rating: 4.7,
      reviews: 654,
      colors: ['#1a1a1a', '#003366', '#8B0000'],
      size: 'Large',
      dims: '54 □ 17 – 140',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&q=80',
      badge: null
    },
    {
      id: 4,
      name: 'Skyline Aviator',
      category: 'sunglasses',
      shape: 'aviator',
      price: 1999,
      mrp: 3499,
      rating: 4.8,
      reviews: 1102,
      colors: ['#1a1a1a', '#C0C0C0'],
      size: 'Medium',
      dims: '58 □ 14 – 140',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
      badge: 'SALE'
    },
    {
      id: 5,
      name: 'Luxe Cat Eye',
      category: 'eyeglasses',
      shape: 'cateye',
      price: 1699,
      mrp: 2799,
      rating: 4.9,
      reviews: 487,
      colors: ['#1a1a1a', '#8B4513', '#FF69B4'],
      size: 'Small',
      dims: '50 □ 16 – 135',
      image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400&q=80',
      badge: 'BESTSELLER'
    },
    {
      id: 6,
      name: 'Urban Wayfarer',
      category: 'eyeglasses',
      shape: 'wayfarer',
      price: 1399,
      mrp: 2299,
      rating: 4.6,
      reviews: 723,
      colors: ['#1a1a1a', '#2F4F4F', '#4A3728'],
      size: 'Medium',
      dims: '52 □ 18 – 145',
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&q=80',
      badge: null
    },
    {
      id: 7,
      name: 'Clarity Rimless',
      category: 'eyeglasses',
      shape: 'rimless',
      price: 2199,
      mrp: 3999,
      rating: 4.8,
      reviews: 312,
      colors: ['#C0C0C0', '#1a1a1a'],
      size: 'Medium',
      dims: '51 □ 19 – 140',
      image: 'https://images.unsplash.com/photo-1625591340248-6d289f9e7f5f?w=400&q=80',
      badge: 'PREMIUM'
    },
    {
      id: 8,
      name: 'Pulse Half Rim',
      category: 'eyeglasses',
      shape: 'halfrim',
      price: 1599,
      mrp: 2599,
      rating: 4.7,
      reviews: 541,
      colors: ['#1a1a1a', '#003366'],
      size: 'Medium',
      dims: '53 □ 17 – 140',
      image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=400&q=80',
      badge: null
    }
  ];

  const contactLenses = [
    {
      id: 101,
      name: 'Daily Comfort',
      brand: 'HEPRA',
      type: 'Daily',
      bc: '8.6',
      dia: '14.2',
      power: '-0.50 to -10.00',
      pack: '30 lenses',
      price: 899,
      mrp: 1299
    },
    {
      id: 102,
      name: 'Monthly Clear',
      brand: 'HEPRA',
      type: 'Monthly',
      bc: '8.7',
      dia: '14.0',
      power: '-0.25 to -12.00',
      pack: '6 lenses',
      price: 599,
      mrp: 899
    },
    {
      id: 103,
      name: 'Toric Precision',
      brand: 'HEPRA',
      type: 'Toric',
      bc: '8.6',
      dia: '14.5',
      power: '-0.75 to -9.00',
      pack: '6 lenses',
      price: 1299,
      mrp: 1899
    },
    {
      id: 104,
      name: 'Colour Glow',
      brand: 'HEPRA',
      type: 'Colour',
      bc: '8.6',
      dia: '14.2',
      power: '0.00 to -6.00',
      pack: '2 lenses',
      price: 499,
      mrp: 799
    }
  ];

  // ---------- STATE ----------
  let cart = JSON.parse(localStorage.getItem('hepra_cart') || '[]');
  let currentRxStep = 1;
  let selectedLensPrice = 0;
  let selectedFrame = null;
  let framePrice = 1499;

  // ---------- HELPERS ----------
  const formatPrice = (n) => '₹' + n.toLocaleString('en-IN');

  function saveCart() {
    localStorage.setItem('hepra_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById('cartBadge');
    const cartCount = document.getElementById('cartCount');
    if (badge) badge.textContent = count;
    if (cartCount) cartCount.textContent = count;

    const body = document.getElementById('cartBody');
    if (!body) return;

    if (cart.length === 0) {
      body.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0;">Your cart is empty. Start shopping!</p>';
    } else {
      body.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image || 'https://images.unsplash.com/photo-1574258495973-f010dfbb5041?w=100&q=80'}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-meta">
              ${item.color ? item.color + ' · ' : ''}${item.size || ''}
              ${item.lens ? '<br>Lens: ' + item.lens : ''}
              ${item.rx ? '<br><span style="color:var(--success);">Prescription Attached ✓</span>' : ''}
            </div>
            <div class="cart-item-price">${formatPrice(item.price)} × ${item.qty}</div>
          </div>
          <button class="icon-btn" onclick="removeFromCart(${item.id})" aria-label="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      `).join('');
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
    const discount = 0;
    const total = subtotal - discount + shipping;

    document.getElementById('cartSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('cartDiscount').textContent = '−' + formatPrice(discount);
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    document.getElementById('cartTotal').textContent = formatPrice(total);

    const remaining = Math.max(0, 999 - subtotal);
    const pct = Math.min(100, (subtotal / 999) * 100);
    document.getElementById('freeShipBar').style.width = pct + '%';
    document.getElementById('freeShipText').textContent =
      remaining > 0 ? `Add ${formatPrice(remaining)} more for FREE SHIPPING` : '🎉 You qualify for FREE SHIPPING';
  }

  window.removeFromCart = function (id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
  };

  function addToCart(product, extras = {}) {
    const existing = cart.find(i => i.id === product.id && !extras.lens);
    if (existing && !extras.lens) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id + (extras.lens ? '_rx' : ''),
        name: product.name,
        price: product.price + (extras.lensPrice || 0),
        qty: 1,
        image: product.image,
        color: product.colors ? 'Black' : '',
        size: product.size,
        lens: extras.lens || null,
        rx: extras.rx || false
      });
    }
    saveCart();
    openCart();
  }

  // ---------- RENDER PRODUCTS ----------
  function renderProducts(list, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = list.map(p => {
      const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
      return `
        <article class="product-card" data-id="${p.id}" data-shape="${p.shape || ''}">
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${p.name}" loading="lazy" width="400" height="400" />
            <div class="product-badges">
              ${p.badge ? `<span class="badge-tag ${p.badge === 'SALE' ? 'sale' : p.badge === 'NEW' ? 'new' : ''}">${p.badge}</span>` : ''}
            </div>
            <div class="product-actions">
              <button class="p-action" aria-label="Wishlist" title="Wishlist">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
              <button class="p-action" aria-label="Quick View" title="Quick View">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <div class="product-hover-cta">
              <button class="btn btn-sm btn-secondary try-on-btn" data-id="${p.id}">Try On</button>
              <button class="btn btn-sm btn-primary add-cart-btn" data-id="${p.id}">Add</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">${p.name}</h3>
            <div class="product-rating">
              <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
              <span>${p.rating} · ${p.reviews.toLocaleString('en-IN')} Reviews</span>
            </div>
            <div class="product-price">
              <span class="price-current">${formatPrice(p.price)}</span>
              <span class="price-mrp">${formatPrice(p.mrp)}</span>
              <span class="price-off">${off}% OFF</span>
            </div>
            <div class="product-meta">
              <div class="color-dots">
                ${(p.colors || []).map((c, i) => `<span class="color-dot ${i === 0 ? 'active' : ''}" style="background:${c}" title="Color"></span>`).join('')}
              </div>
              <span class="frame-size-label">${p.size || ''} · ${p.dims || ''}</span>
            </div>
            <div style="display:flex;gap:8px;margin-top:12px;">
              <button class="btn btn-sm btn-outline" style="flex:1;" onclick="openRxFlow(${p.id})">BUY WITH Rx</button>
              <button class="btn btn-sm btn-primary" style="flex:1;" onclick="addFrameOnly(${p.id})">FRAME ONLY</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind events
    grid.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prod = products.find(p => p.id === +btn.dataset.id);
        if (prod) addToCart(prod);
      });
    });
    grid.querySelectorAll('.try-on-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTryOn();
      });
    });
  }

  function renderContactLenses() {
    const grid = document.getElementById('clGrid');
    if (!grid) return;
    grid.innerHTML = contactLenses.map(cl => `
      <article class="product-card">
        <div class="product-img-wrap" style="background:linear-gradient(145deg,#e8ddf0,#f5f3f8);display:flex;align-items:center;justify-content:center;">
          <span style="font-size:3rem;">👁</span>
        </div>
        <div class="product-info">
          <h3 class="product-name">${cl.name}</h3>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:6px;">${cl.brand} · ${cl.type}</div>
          <div class="cl-specs">
            <span class="cl-spec">BC ${cl.bc}</span>
            <span class="cl-spec">DIA ${cl.dia}</span>
            <span class="cl-spec">${cl.power}</span>
            <span class="cl-spec">${cl.pack}</span>
          </div>
          <div class="product-price">
            <span class="price-current">${formatPrice(cl.price)}</span>
            <span class="price-mrp">${formatPrice(cl.mrp)}</span>
          </div>
          <button class="btn btn-sm btn-primary mt-8" style="width:100%;" onclick="addCL(${cl.id})">SELECT POWER</button>
        </div>
      </article>
    `).join('');
  }

  window.addFrameOnly = function (id) {
    const prod = products.find(p => p.id === id);
    if (prod) addToCart(prod);
  };

  window.addCL = function (id) {
    const cl = contactLenses.find(c => c.id === id);
    if (cl) {
      addToCart({
        id: cl.id,
        name: cl.name + ' (' + cl.pack + ')',
        price: cl.price,
        image: null
      });
    }
  };

  window.openRxFlow = function (id) {
    selectedFrame = products.find(p => p.id === id) || products[0];
    framePrice = selectedFrame.price;
    document.getElementById('rxFrameName').textContent = selectedFrame.name;
    document.getElementById('rxFramePrice').textContent = formatPrice(framePrice);
    document.getElementById('sumFrame').textContent = formatPrice(framePrice);
    updateLensSummary();
    currentRxStep = 1;
    showRxStep(1);
    document.getElementById('rxModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // ---------- RX FLOW ----------
  function showRxStep(step) {
    currentRxStep = step;
    document.querySelectorAll('.rx-step').forEach((el, i) => {
      el.style.display = i + 1 === step ? 'block' : 'none';
    });
    document.querySelectorAll('#rxSteps .step').forEach((el, i) => {
      el.classList.toggle('active', i + 1 === step);
      el.classList.toggle('done', i + 1 < step);
    });
    document.getElementById('rxBack').style.display = step > 1 ? 'inline-flex' : 'none';
    document.getElementById('rxNext').textContent = step === 3 ? 'ADD TO CART' : 'CONTINUE';
  }

  function updateLensSummary() {
    document.getElementById('sumLens').textContent = formatPrice(selectedLensPrice);
    document.getElementById('sumTotal').textContent = formatPrice(framePrice + selectedLensPrice);
  }

  // ---------- ANNOUNCEMENT SLIDER ----------
  function initAnnouncement() {
    const slider = document.getElementById('announcementSlider');
    if (!slider) return;
    let idx = 0;
    const slides = slider.children.length;
    setInterval(() => {
      idx = (idx + 1) % slides;
      slider.style.transform = `translateX(-${idx * 100}%)`;
    }, 4000);
  }

  // ---------- HEADER SCROLL ----------
  function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ---------- MOBILE MENU ----------
  function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const close = document.getElementById('menuClose');
    const menu = document.getElementById('mobileMenu');
    toggle?.addEventListener('click', () => menu.classList.add('open'));
    close?.addEventListener('click', () => menu.classList.remove('open'));
    menu?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  // ---------- SEARCH ----------
  function initSearch() {
    const btn = document.getElementById('searchBtn');
    const overlay = document.getElementById('searchOverlay');
    btn?.addEventListener('click', () => {
      overlay.classList.add('open');
      document.getElementById('searchInput')?.focus();
    });
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }

  // ---------- CART DRAWER ----------
  function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('backdrop').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('backdrop').style.display = 'none';
    document.body.style.overflow = '';
  }

  function initCart() {
    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('bottomCart')?.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('backdrop')?.addEventListener('click', () => {
      closeCart();
      document.getElementById('mobileMenu')?.classList.remove('open');
    });
  }

  // ---------- TRY-ON ----------
  function openTryOn() {
    document.getElementById('tryOnModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeTryOn() {
    document.getElementById('tryOnModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function initTryOn() {
    document.getElementById('openTryOn')?.addEventListener('click', openTryOn);
    document.getElementById('heroTryOn')?.addEventListener('click', openTryOn);
    document.getElementById('bottomTryOn')?.addEventListener('click', (e) => { e.preventDefault(); openTryOn(); });
    document.getElementById('tryOnClose')?.addEventListener('click', closeTryOn);
  }

  // ---------- RX MODAL ----------
  function initRxModal() {
    document.getElementById('rxClose')?.addEventListener('click', () => {
      document.getElementById('rxModal').classList.remove('open');
      document.body.style.overflow = '';
    });

    document.getElementById('rxNext')?.addEventListener('click', () => {
      if (currentRxStep < 3) {
        showRxStep(currentRxStep + 1);
      } else {
        // Add to cart with prescription
        if (selectedFrame) {
          const lensName = document.querySelector('.lens-option.selected')?.querySelector('h4')?.textContent?.trim() || 'Basic';
          addToCart(selectedFrame, {
            lens: lensName,
            lensPrice: selectedLensPrice,
            rx: true
          });
        }
        document.getElementById('rxModal').classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.getElementById('rxBack')?.addEventListener('click', () => {
      if (currentRxStep > 1) showRxStep(currentRxStep - 1);
    });

    // Lens selection
    document.querySelectorAll('.lens-option').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.lens-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedLensPrice = +opt.dataset.price;
        updateLensSummary();
      });
    });

    // Rx method
    document.querySelectorAll('.rx-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rx-opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const isUpload = btn.dataset.rx === 'upload';
        document.getElementById('rxUpload').style.display = isUpload ? 'block' : 'none';
        document.getElementById('rxManual').style.display = isUpload ? 'none' : 'block';
      });
    });

    // Upload zone
    const zone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('rxFile');
    zone?.addEventListener('click', () => fileInput?.click());
    zone?.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone?.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone?.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        zone.innerHTML = `<p style="font-weight:600;color:var(--success);">✓ ${e.dataTransfer.files[0].name} uploaded</p>`;
      }
    });
    fileInput?.addEventListener('change', () => {
      if (fileInput.files.length) {
        zone.innerHTML = `<p style="font-weight:600;color:var(--success);">✓ ${fileInput.files[0].name} uploaded</p>`;
      }
    });
  }

  // ---------- FAQ ----------
  function initFAQ() {
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  // ---------- EYE TEST TABS ----------
  function initEyeTest() {
    document.querySelectorAll('.eyetest-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.eyetest-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.eyetest-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab)?.classList.add('active');
      });
    });
  }

  // ---------- FACE SHAPE & FRAME SHAPE ----------
  function initFilters() {
    document.querySelectorAll('.face-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.face-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

    document.querySelectorAll('.shape-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.shape-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const shape = chip.dataset.shape;
        const filtered = shape === 'all' ? products : products.filter(p => p.shape === shape);
        renderProducts(filtered.length ? filtered : products, 'productGrid');
      });
    });
  }

  // ---------- INIT ----------
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products, 'productGrid');
    renderContactLenses();
    updateCartUI();
    initAnnouncement();
    initHeader();
    initMobileMenu();
    initSearch();
    initCart();
    initTryOn();
    initRxModal();
    initFAQ();
    initEyeTest();
    initFilters();
  });
})();
