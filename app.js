/* HEPRA OPTICAL — Premium App Logic v4 — Luxury UX
   Luxury order drawers · Contact lens flow · Enhanced products
*/
(function () {
  'use strict';

  const products = [
    { id: 1, name: 'Aether Classic', category: 'eyeglasses', shape: 'rectangle', price: 1499, mrp: 2499, rating: 4.8, reviews: 1248, colors: ['#1a1a1a', '#8B4513', '#2F4F4F'], size: 'Medium', dims: '52 □ 18 – 140', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5041?w=800&q=90', badge: 'BESTSELLER' },
    { id: 2, name: 'Nova Round', category: 'eyeglasses', shape: 'round', price: 1799, mrp: 2999, rating: 4.9, reviews: 892, colors: ['#1a1a1a', '#C0C0C0', '#4A3728'], size: 'Medium', dims: '49 □ 20 – 145', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=90', badge: 'NEW' },
    { id: 3, name: 'Vertex Square', category: 'eyeglasses', shape: 'square', price: 1299, mrp: 2199, rating: 4.7, reviews: 654, colors: ['#1a1a1a', '#003366', '#8B0000'], size: 'Large', dims: '54 □ 17 – 140', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=90&sat=-20', badge: null },
    { id: 4, name: 'Skyline Aviator', category: 'sunglasses', shape: 'aviator', price: 1999, mrp: 3499, rating: 4.8, reviews: 1102, colors: ['#1a1a1a', '#C0C0C0'], size: 'Medium', dims: '58 □ 14 – 140', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=90', badge: 'SALE' },
    { id: 5, name: 'Luxe Cat Eye', category: 'eyeglasses', shape: 'cateye', price: 1699, mrp: 2799, rating: 4.9, reviews: 487, colors: ['#1a1a1a', '#8B4513', '#FF69B4'], size: 'Small', dims: '50 □ 16 – 135', image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=90', badge: 'BESTSELLER' },
    { id: 6, name: 'Urban Wayfarer', category: 'eyeglasses', shape: 'wayfarer', price: 1399, mrp: 2299, rating: 4.6, reviews: 723, colors: ['#1a1a1a', '#2F4F4F', '#4A3728'], size: 'Medium', dims: '52 □ 18 – 145', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=90', badge: null },
    { id: 7, name: 'Clarity Rimless', category: 'eyeglasses', shape: 'rimless', price: 2199, mrp: 3999, rating: 4.8, reviews: 312, colors: ['#C0C0C0', '#1a1a1a'], size: 'Medium', dims: '51 □ 19 – 140', image: 'https://images.unsplash.com/photo-1625591340248-6d289f9e7f5f?w=800&q=90', badge: 'PREMIUM' },
    { id: 8, name: 'Pulse Half Rim', category: 'eyeglasses', shape: 'halfrim', price: 1599, mrp: 2599, rating: 4.7, reviews: 541, colors: ['#1a1a1a', '#003366'], size: 'Medium', dims: '53 □ 17 – 140', image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=800&q=90', badge: null }
  ];

  const contactLenses = [
    { id: 101, name: 'Daily Comfort', brand: 'HEPRA', type: 'Daily', bc: '8.6', dia: '14.2', power: '-0.50 to -10.00', pack: '30 lenses', price: 899, mrp: 1299 },
    { id: 102, name: 'Monthly Clear', brand: 'HEPRA', type: 'Monthly', bc: '8.7', dia: '14.0', power: '-0.25 to -12.00', pack: '6 lenses', price: 599, mrp: 899 },
    { id: 103, name: 'Toric Precision', brand: 'HEPRA', type: 'Toric', bc: '8.6', dia: '14.5', power: '-0.75 to -9.00', pack: '6 lenses', price: 1299, mrp: 1899 },
    { id: 104, name: 'Colour Glow', brand: 'HEPRA', type: 'Colour', bc: '8.6', dia: '14.2', power: '0.00 to -6.00', pack: '2 lenses', price: 499, mrp: 799 }
  ];

  const lensOptions = [
    { id: 'basic', name: 'Single Vision', desc: 'Everyday clarity · Clear vision at one distance', price: 0, tag: 'INCLUDED' },
    { id: 'ar', name: 'Anti-Reflection', desc: 'Reduced glare · Crystal clear · Better night driving', price: 499, tag: null },
    { id: 'blue', name: 'Blue Light Filter', desc: 'Computer & digital use · Filters harmful blue light', price: 699, tag: 'POPULAR' },
    { id: 'photo', name: 'Photochromic', desc: 'Clear indoors · Dark outdoors · UV protection', price: 1499, tag: null },
    { id: 'progressive', name: 'Progressive', desc: 'Distance + Intermediate + Near · Seamless vision', price: 2499, tag: 'PREMIUM' }
  ];

  let cart = JSON.parse(localStorage.getItem('hepra_cart') || '[]');
  let orderStep = 1;
  let orderType = 'eyeglasses'; // eyeglasses | contact
  let selectedProduct = null;
  let selectedLens = lensOptions[0];
  let selectedClType = 'Daily';
  let selectedPack = 30;
  let framePrice = 0;

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
      body.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:48px 0;font-weight:500;">Your cart is empty</p>';
    } else {
      body.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image || 'https://images.unsplash.com/photo-1574258495973-f010dfbb5041?w=100&q=80'}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-meta">
              ${item.lens ? 'Lens: ' + item.lens + '<br>' : ''}
              ${item.rx ? '<span style="color:var(--success);font-weight:650;">Prescription ✓</span>' : (item.size || '')}
            </div>
            <div class="cart-item-price">${formatPrice(item.price)} × ${item.qty}</div>
          </div>
          <button class="icon-btn" onclick="removeFromCart('${item.id}')" aria-label="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      `).join('');
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
    const total = subtotal + shipping;

    const el = (id) => document.getElementById(id);
    if (el('cartSubtotal')) el('cartSubtotal').textContent = formatPrice(subtotal);
    if (el('cartDiscount')) el('cartDiscount').textContent = '−₹0';
    if (el('cartShipping')) el('cartShipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    if (el('cartTotal')) el('cartTotal').textContent = formatPrice(total);

    const remaining = Math.max(0, 999 - subtotal);
    const pct = Math.min(100, (subtotal / 999) * 100);
    if (el('freeShipBar')) el('freeShipBar').style.width = pct + '%';
    if (el('freeShipText')) el('freeShipText').textContent =
      remaining > 0 ? `Add ${formatPrice(remaining)} more for FREE SHIPPING` : '🎉 You qualify for FREE SHIPPING';
  }

  window.removeFromCart = function (id) {
    cart = cart.filter(i => String(i.id) !== String(id));
    saveCart();
  };

  function addToCart(product, extras = {}) {
    cart.push({
      id: product.id + (extras.lens ? '_rx_' + Date.now() : ''),
      name: product.name,
      price: (product.price || 0) + (extras.lensPrice || 0),
      qty: 1,
      image: product.image,
      size: product.size,
      lens: extras.lens || null,
      rx: extras.rx || false
    });
    saveCart();
    closeOrderDrawer();
    openCart();
  }

  /* ========== RENDER PRODUCTS ========== */
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
              <button class="p-action try-on-btn" data-id="${p.id}" aria-label="Try On" title="Virtual Try-On">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <div class="product-hover-cta">
              <button class="btn btn-sm btn-secondary try-on-btn" data-id="${p.id}">Try On</button>
              <button class="btn btn-sm btn-primary" onclick="openEyeglassOrder(${p.id})">Select</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">${p.name}</h3>
            <div class="product-rating">
              <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
              <span>${p.rating} · ${p.reviews.toLocaleString('en-IN')}</span>
            </div>
            <div class="product-price">
              <span class="price-current">${formatPrice(p.price)}</span>
              <span class="price-mrp">${formatPrice(p.mrp)}</span>
              <span class="price-off">${off}% OFF</span>
            </div>
            <div class="product-meta">
              <div class="color-dots">
                ${(p.colors || []).map((c, i) => `<span class="color-dot ${i === 0 ? 'active' : ''}" style="background:${c}"></span>`).join('')}
              </div>
              <span class="frame-size-label">${p.size} · ${p.dims}</span>
            </div>
            <div class="product-cta-row">
              <button class="btn btn-sm btn-outline" onclick="openEyeglassOrder(${p.id})">BUY WITH Rx</button>
              <button class="btn btn-sm btn-primary" onclick="addFrameOnly(${p.id})">FRAME ONLY</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.try-on-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); openTryOn(); });
    });
  }

  function renderContactLenses() {
    const grid = document.getElementById('clGrid');
    if (!grid) return;
    grid.innerHTML = contactLenses.map(cl => `
      <article class="product-card">
        <div class="product-img-wrap" style="background:linear-gradient(145deg,#f4eef8,#e8ddf0);display:flex;align-items:center;justify-content:center;">
          <span style="font-size:3.5rem;">👁</span>
        </div>
        <div class="product-info">
          <h3 class="product-name">${cl.name}</h3>
          <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;font-weight:550;">${cl.brand} · ${cl.type}</div>
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
          <button class="btn btn-sm btn-primary mt-8" style="width:100%;" onclick="openContactOrder(${cl.id})">SELECT POWER</button>
        </div>
      </article>
    `).join('');
  }

  window.addFrameOnly = function (id) {
    const prod = products.find(p => p.id === id);
    if (prod) addToCart(prod);
  };

  /* ========== ORDER DRAWER (Right Side) ========== */
  function openOrderDrawer() {
    document.getElementById('orderBackdrop')?.classList.add('open');
    document.getElementById('orderDrawer')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderDrawer() {
    document.getElementById('orderBackdrop')?.classList.remove('open');
    document.getElementById('orderDrawer')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.openEyeglassOrder = function (id) {
    selectedProduct = products.find(p => p.id === id) || products[0];
    framePrice = selectedProduct.price;
    selectedLens = lensOptions[0];
    orderType = 'eyeglasses';
    orderStep = 1;
    renderOrderDrawer();
    openOrderDrawer();
  };

  window.openContactOrder = function (id) {
    selectedProduct = contactLenses.find(c => c.id === id) || contactLenses[0];
    orderType = 'contact';
    orderStep = 1;
    selectedClType = selectedProduct.type || 'Daily';
    selectedPack = 30;
    renderOrderDrawer();
    openOrderDrawer();
  };

  function renderOrderDrawer() {
    const drawer = document.getElementById('orderDrawer');
    if (!drawer) return;

    if (orderType === 'eyeglasses') {
      renderEyeglassSteps(drawer);
    } else {
      renderContactSteps(drawer);
    }
  }

  function renderEyeglassSteps(drawer) {
    const steps = ['Frame', 'Lens', 'Rx'];
    let bodyHTML = '';

    if (orderStep === 1) {
      bodyHTML = `
        <div class="order-frame-preview">
          <img src="${selectedProduct.image}" alt="${selectedProduct.name}" />
          <div>
            <h4>${selectedProduct.name}</h4>
            <p>${selectedProduct.size} · ${selectedProduct.dims}</p>
            <p style="font-weight:800;color:var(--primary);margin-top:4px;">${formatPrice(selectedProduct.price)}</p>
          </div>
        </div>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:16px;font-weight:500;">Confirm your frame, then choose lenses and prescription.</p>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-outline btn-sm" style="flex:1;" onclick="addFrameOnly(${selectedProduct.id});closeOrderDrawer();">Frame Only</button>
          <button class="btn btn-primary btn-sm" style="flex:1;" onclick="orderGoStep(2)">Continue to Lens →</button>
        </div>
      `;
    } else if (orderStep === 2) {
      bodyHTML = `
        <div class="order-frame-preview">
          <img src="${selectedProduct.image}" alt="" />
          <div>
            <h4>${selectedProduct.name}</h4>
            <p style="font-weight:700;">${formatPrice(framePrice)}</p>
          </div>
        </div>
        <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Select Lens Type</p>
        ${lensOptions.map(l => `
          <div class="order-option ${selectedLens.id === l.id ? 'selected' : ''}" onclick="selectLens('${l.id}')">
            <div>
              <h4>${l.name} ${l.tag ? `<span class="lens-tag">${l.tag}</span>` : ''}</h4>
              <p>${l.desc}</p>
            </div>
            <div class="opt-price">${l.price === 0 ? 'Included' : '+' + formatPrice(l.price)}</div>
          </div>
        `).join('')}
        <div class="order-price-bar">
          <span>Frame + Lens</span>
          <span class="total">${formatPrice(framePrice + selectedLens.price)}</span>
        </div>
      `;
    } else {
      bodyHTML = `
        <div class="order-frame-preview">
          <img src="${selectedProduct.image}" alt="" />
          <div>
            <h4>${selectedProduct.name}</h4>
            <p>${selectedLens.name} · ${formatPrice(framePrice + selectedLens.price)}</p>
          </div>
        </div>
        <div class="rx-options" style="margin-bottom:16px;">
          <button class="rx-opt-btn active" data-rx="upload" onclick="switchRxMode('upload',this)">UPLOAD Rx</button>
          <button class="rx-opt-btn" data-rx="manual" onclick="switchRxMode('manual',this)">ENTER MANUALLY</button>
        </div>
        <div id="rxUploadPane">
          <div class="upload-zone" id="orderUploadZone" onclick="document.getElementById('orderRxFile').click()">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <p style="font-weight:650;margin-bottom:4px;">Upload JPG, PNG or PDF</p>
            <p style="font-size:0.75rem;color:var(--text-muted);">Our opticians will verify</p>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" style="display:none;" id="orderRxFile" />
          </div>
        </div>
        <div id="rxManualPane" style="display:none;">
          <div class="rx-eye">
            <h4>RIGHT EYE (OD)</h4>
            <div class="rx-fields">
              <div class="form-group"><label>SPH</label><select><option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option><option>-2.00</option><option>-2.50</option><option>-3.00</option></select></div>
              <div class="form-group"><label>CYL</label><select><option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option></select></div>
              <div class="form-group"><label>AXIS</label><input type="number" min="0" max="180" placeholder="0–180" /></div>
            </div>
          </div>
          <div class="rx-eye" style="margin-top:12px;">
            <h4>LEFT EYE (OS)</h4>
            <div class="rx-fields">
              <div class="form-group"><label>SPH</label><select><option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option><option>-2.00</option><option>-2.50</option><option>-3.00</option></select></div>
              <div class="form-group"><label>CYL</label><select><option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option></select></div>
              <div class="form-group"><label>AXIS</label><input type="number" min="0" max="180" placeholder="0–180" /></div>
            </div>
          </div>
          <div class="form-row two" style="margin-top:12px;">
            <div class="form-group"><label>ADD</label><select><option>None</option><option>+1.00</option><option>+1.50</option><option>+2.00</option><option>+2.50</option></select></div>
            <div class="form-group"><label>PD (mm)</label><input type="number" placeholder="e.g. 63" min="50" max="80" /></div>
          </div>
        </div>
        <div class="order-price-bar" style="margin-top:16px;">
          <span>Total</span>
          <span class="total">${formatPrice(framePrice + selectedLens.price)}</span>
        </div>
      `;
    }

    drawer.innerHTML = `
      <div class="order-drawer-header">
        <h3>Customise Your Glasses</h3>
        <button class="icon-btn" onclick="closeOrderDrawer()" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="order-steps">
        ${steps.map((s, i) => `
          <div class="order-step ${i + 1 === orderStep ? 'active' : ''} ${i + 1 < orderStep ? 'done' : ''}">
            <div class="order-step-dot">${i + 1 < orderStep ? '' : i + 1}</div>
            <div class="order-step-label">${s}</div>
          </div>
        `).join('')}
      </div>
      <div class="order-drawer-body">${bodyHTML}</div>
      <div class="order-drawer-footer">
        ${orderStep > 1 ? `<button class="btn btn-outline" style="flex:1;" onclick="orderGoStep(${orderStep - 1})">Back</button>` : ''}
        ${orderStep < 3
          ? `<button class="btn btn-primary" style="flex:1;" onclick="orderGoStep(${orderStep + 1})">${orderStep === 1 ? 'Select Lens' : 'Add Prescription'}</button>`
          : `<button class="btn btn-primary" style="flex:1;" onclick="completeEyeglassOrder()">Add to Cart · ${formatPrice(framePrice + selectedLens.price)}</button>`
        }
      </div>
    `;

    // File upload handler
    setTimeout(() => {
      const fileInput = document.getElementById('orderRxFile');
      const zone = document.getElementById('orderUploadZone');
      if (fileInput && zone) {
        fileInput.addEventListener('change', () => {
          if (fileInput.files.length) {
            zone.innerHTML = `<p style="font-weight:700;color:var(--success);">✓ ${fileInput.files[0].name}</p>`;
          }
        });
      }
    }, 50);
  }

  function renderContactSteps(drawer) {
    const steps = ['Lens', 'Power', 'Pack'];
    let bodyHTML = '';

    if (orderStep === 1) {
      const types = ['Daily', 'Monthly', 'Toric', 'Multifocal', 'Colour'];
      bodyHTML = `
        <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Select Lens Type</p>
        ${types.map(t => `
          <div class="order-option ${selectedClType === t ? 'selected' : ''}" onclick="selectClType('${t}')">
            <div><h4>${t}</h4><p>${t === 'Daily' ? 'Fresh pair every day' : t === 'Monthly' ? 'Reuse for 30 days' : t === 'Toric' ? 'For astigmatism' : t === 'Multifocal' ? 'Near + distance' : 'Enhance eye colour'}</p></div>
          </div>
        `).join('')}
      `;
    } else if (orderStep === 2) {
      bodyHTML = `
        <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Enter Power</p>
        <div class="cl-power-grid">
          <div class="cl-power-box">
            <h5>Right Eye (OD)</h5>
            <select style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:8px;font-weight:600;">
              <option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option><option>-2.00</option><option>-2.50</option><option>-3.00</option><option>-4.00</option><option>-5.00</option>
            </select>
          </div>
          <div class="cl-power-box">
            <h5>Left Eye (OS)</h5>
            <select style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:8px;font-weight:600;">
              <option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option><option>-2.00</option><option>-2.50</option><option>-3.00</option><option>-4.00</option><option>-5.00</option>
            </select>
          </div>
        </div>
        <div class="form-row two">
          <div class="form-group"><label>BC</label><input type="text" value="${selectedProduct.bc || '8.6'}" /></div>
          <div class="form-group"><label>DIA</label><input type="text" value="${selectedProduct.dia || '14.2'}" /></div>
        </div>
      `;
    } else {
      const packs = [
        { qty: 30, price: selectedProduct.price || 899, label: '30 lenses' },
        { qty: 90, price: Math.round((selectedProduct.price || 899) * 2.7), label: '90 lenses' },
        { qty: 180, price: Math.round((selectedProduct.price || 899) * 4.8), label: '180 lenses' }
      ];
      bodyHTML = `
        <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Pack Quantity</p>
        <div class="pack-options">
          ${packs.map(p => `
            <div class="pack-opt ${selectedPack === p.qty ? 'selected' : ''}" onclick="selectPack(${p.qty}, ${p.price})">
              <div class="pack-qty">${p.label}</div>
              <div class="pack-price">${formatPrice(p.price)}</div>
            </div>
          `).join('')}
        </div>
        <div class="order-price-bar" style="margin-top:20px;">
          <span>${selectedClType} · ${selectedPack} lenses</span>
          <span class="total" id="clPackTotal">${formatPrice(packs.find(p => p.qty === selectedPack)?.price || selectedProduct.price)}</span>
        </div>
      `;
    }

    drawer.innerHTML = `
      <div class="order-drawer-header">
        <h3>Contact Lenses</h3>
        <button class="icon-btn" onclick="closeOrderDrawer()" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="order-steps">
        ${steps.map((s, i) => `
          <div class="order-step ${i + 1 === orderStep ? 'active' : ''} ${i + 1 < orderStep ? 'done' : ''}">
            <div class="order-step-dot">${i + 1 < orderStep ? '' : i + 1}</div>
            <div class="order-step-label">${s}</div>
          </div>
        `).join('')}
      </div>
      <div class="order-drawer-body">${bodyHTML}</div>
      <div class="order-drawer-footer">
        ${orderStep > 1 ? `<button class="btn btn-outline" style="flex:1;" onclick="orderGoStep(${orderStep - 1})">Back</button>` : ''}
        ${orderStep < 3
          ? `<button class="btn btn-primary" style="flex:1;" onclick="orderGoStep(${orderStep + 1})">Continue</button>`
          : `<button class="btn btn-primary" style="flex:1;" onclick="completeContactOrder()">Add to Cart</button>`
        }
      </div>
    `;
  }

  window.orderGoStep = function (step) {
    orderStep = step;
    renderOrderDrawer();
  };

  window.selectLens = function (id) {
    selectedLens = lensOptions.find(l => l.id === id) || lensOptions[0];
    renderOrderDrawer();
  };

  window.selectClType = function (t) {
    selectedClType = t;
    renderOrderDrawer();
  };

  window.selectPack = function (qty, price) {
    selectedPack = qty;
    renderOrderDrawer();
  };

  window.switchRxMode = function (mode, btn) {
    document.querySelectorAll('.rx-opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('rxUploadPane').style.display = mode === 'upload' ? 'block' : 'none';
    document.getElementById('rxManualPane').style.display = mode === 'manual' ? 'block' : 'none';
  };

  window.completeEyeglassOrder = function () {
    addToCart(selectedProduct, {
      lens: selectedLens.name,
      lensPrice: selectedLens.price,
      rx: true
    });
  };

  window.completeContactOrder = function () {
    const packPrice = selectedPack === 30 ? (selectedProduct.price || 899)
      : selectedPack === 90 ? Math.round((selectedProduct.price || 899) * 2.7)
      : Math.round((selectedProduct.price || 899) * 4.8);
    addToCart({
      id: selectedProduct.id,
      name: `${selectedProduct.name} (${selectedPack} lenses)`,
      price: packPrice,
      image: null
    });
  };

  window.closeOrderDrawer = closeOrderDrawer;

  /* ========== UI HELPERS ========== */
  function openCart() {
    document.getElementById('cartDrawer')?.classList.add('open');
    document.getElementById('backdrop')?.style && (document.getElementById('backdrop').style.display = 'block');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cartDrawer')?.classList.remove('open');
    document.getElementById('backdrop')?.style && (document.getElementById('backdrop').style.display = 'none');
    document.body.style.overflow = '';
  }

  function openTryOn() {
    document.getElementById('tryOnModal')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeTryOn() {
    document.getElementById('tryOnModal')?.classList.remove('open');
    document.body.style.overflow = '';
  }

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

  function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header?.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  function initMobileMenu() {
    document.getElementById('menuToggle')?.addEventListener('click', () => document.getElementById('mobileMenu')?.classList.add('open'));
    document.getElementById('menuClose')?.addEventListener('click', () => document.getElementById('mobileMenu')?.classList.remove('open'));
    document.getElementById('mobileMenu')?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('mobileMenu')?.classList.remove('open'));
    });
  }

  function initSearch() {
    document.getElementById('searchBtn')?.addEventListener('click', () => {
      document.getElementById('searchOverlay')?.classList.add('open');
      document.getElementById('searchInput')?.focus();
    });
    document.getElementById('searchOverlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'searchOverlay') e.target.classList.remove('open');
    });
  }

  function initCart() {
    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('bottomCart')?.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('backdrop')?.addEventListener('click', () => {
      closeCart();
      document.getElementById('mobileMenu')?.classList.remove('open');
    });
    document.getElementById('orderBackdrop')?.addEventListener('click', closeOrderDrawer);
  }

  function initTryOn() {
    document.getElementById('openTryOn')?.addEventListener('click', openTryOn);
    document.getElementById('heroTryOn')?.addEventListener('click', openTryOn);
    document.getElementById('bottomTryOn')?.addEventListener('click', (e) => { e.preventDefault(); openTryOn(); });
    document.getElementById('tryOnClose')?.addEventListener('click', closeTryOn);
  }

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
    initFAQ();
    initEyeTest();
    initFilters();
  });
})();
