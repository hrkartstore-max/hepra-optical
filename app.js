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
    { id: 8, name: 'Pulse Half Rim', category: 'eyeglasses', shape: 'halfrim', price: 1599, mrp: 2599, rating: 4.7, reviews: 541, colors: ['#1a1a1a', '#003366'], size: 'Medium', dims: '53 □ 17 – 140', image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=800&q=90', badge: null },
    { id: 9, name: 'Coastline Polarized', category: 'sunglasses', shape: 'wayfarer', price: 1799, mrp: 2999, rating: 4.7, reviews: 286, colors: ['#1a1a1a', '#5a3825'], size: 'Medium', dims: '54 □ 18 – 145', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=90', badge: 'UV PROTECTION' },
    { id: 10, name: 'Solstice Round', category: 'sunglasses', shape: 'round', price: 1599, mrp: 2699, rating: 4.6, reviews: 194, colors: ['#1a1a1a', '#C0C0C0'], size: 'Small', dims: '50 □ 20 – 140', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=90&sat=-15', badge: null },
    { id: 11, name: 'Metro Shield', category: 'sunglasses', shape: 'square', price: 1899, mrp: 3199, rating: 4.8, reviews: 231, colors: ['#1a1a1a', '#2F4F4F'], size: 'Large', dims: '56 □ 17 – 145', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=90', badge: 'NEW' },
    { id: 12, name: 'ScreenEase Pro', category: 'computer', shape: 'rectangle', price: 1499, mrp: 2499, rating: 4.8, reviews: 318, colors: ['#1a1a1a', '#003366'], size: 'Medium', dims: '52 □ 18 – 140', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=90', badge: 'BLUE LIGHT' },
    { id: 13, name: 'Focus Lite', category: 'computer', shape: 'round', price: 1299, mrp: 2199, rating: 4.7, reviews: 172, colors: ['#1a1a1a', '#8B4513'], size: 'Small', dims: '49 □ 20 – 140', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5041?w=800&q=90', badge: null },
    { id: 14, name: 'Digital Comfort', category: 'computer', shape: 'square', price: 1699, mrp: 2799, rating: 4.8, reviews: 204, colors: ['#1a1a1a', '#4A3728'], size: 'Large', dims: '54 □ 17 – 145', image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=800&q=90', badge: 'SCREEN READY' },
    { id: 15, name: 'Little Explorer', category: 'kids', shape: 'rectangle', price: 999, mrp: 1699, rating: 4.7, reviews: 143, colors: ['#003366', '#FF69B4'], size: 'Small', dims: '46 □ 16 – 130', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=90', badge: 'KIDS' },
    { id: 16, name: 'Junior Flex', category: 'kids', shape: 'round', price: 1099, mrp: 1799, rating: 4.8, reviews: 117, colors: ['#2F4F4F', '#8B4513'], size: 'Small', dims: '45 □ 16 – 130', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5041?w=800&q=90', badge: null },
    { id: 17, name: 'Playday Colour', category: 'kids', shape: 'square', price: 899, mrp: 1499, rating: 4.6, reviews: 96, colors: ['#FF69B4', '#003366'], size: 'Small', dims: '44 □ 15 – 125', image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=800&q=90', badge: 'VALUE' }
  ];
  window.HEPRA_PRODUCTS = products;

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

  const readStored = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value == null ? fallback : value; } catch (_) { return fallback; } };
  let cart = readStored('hepra_cart', []);
  let wishlist = new Set(readStored('hepra_wishlist', []).map(String));
  let orderStep = 1;
  let orderType = 'eyeglasses'; // eyeglasses | contact
  let selectedProduct = null;
  let selectedLens = lensOptions[0];
  const lensMaterials = [{id:'standard',name:'Standard 1.56',desc:'Everyday prescription range',price:0},{id:'thin',name:'Thin 1.60',desc:'Slimmer profile for stronger powers',price:700},{id:'ultrathin',name:'Ultra-thin 1.67',desc:'Lightweight look for higher powers',price:1400},{id:'premium',name:'Premium 1.74',desc:'Thinnest option for suitable prescriptions',price:2400}];
  const lensCoatings = [{id:'none',name:'Standard finish',desc:'Basic lens finish',price:0},{id:'ar',name:'Anti-reflective',desc:'Helps reduce reflections',price:399},{id:'blue',name:'Blue-light filter',desc:'Optional filter for digital-use preferences',price:599},{id:'uv',name:'UV protection',desc:'UV protection coating',price:299}];
  let selectedMaterial = lensMaterials[0];
  let selectedCoating = lensCoatings[0];
  const configuredLensPrice = () => selectedLens.price + selectedMaterial.price + selectedCoating.price;
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
              ${item.color ? '<div>Frame colour: <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:' + String(item.color).replace(/[^#a-fA-F0-9]/g, '') + ';border:1px solid #bbb"></span> ' + String(item.color) + '</div>' : ''}
              ${item.lens ? 'Lens: ' + item.lens + '<br>' : ''}
              ${item.rx ? '<span style="color:var(--success);font-weight:650;">Prescription details ✓</span>' : (item.size || '')}
              ${item.rxFileName ? '<div>File selected: ' + String(item.rxFileName).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])) + ' (not uploaded)</div>' : ''}
              ${item.rxDetails && typeof item.rxDetails.od === 'string' && typeof item.rxDetails.os === 'string' ? '<div>OD ' + item.rxDetails.od + ' · OS ' + item.rxDetails.os + (item.rxDetails.bc ? ' · BC ' + item.rxDetails.bc : '') + (item.rxDetails.dia ? ' · DIA ' + item.rxDetails.dia : '') + '</div>' : ''}
              ${item.rxDetails && item.rxDetails.mode === 'manual' ? '<div>Manual Rx entered · PD ' + (item.rxDetails.pd || 'not entered') + ' mm</div>' : ''}
            </div>
            <div class="cart-item-price">${formatPrice(item.price)} each · ${formatPrice(item.price * item.qty)}</div>
            <div class="cart-qty-controls"><button type="button" onclick="updateCartQty('${String(item.id).replace(/'/g, '&#39;')}', -1)" aria-label="Decrease quantity">−</button><span aria-live="polite">${item.qty}</span><button type="button" onclick="updateCartQty('${String(item.id).replace(/'/g, '&#39;')}', 1)" aria-label="Increase quantity">+</button></div>
          </div>
          <button class="icon-btn" onclick="removeFromCart('${String(item.id).replace(/'/g, '&#39;')}')" aria-label="Remove">
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
    const checkoutItems = el('checkoutItems');
    if (checkoutItems) checkoutItems.innerHTML = cart.length ? cart.map(item => '<div class="checkout-item"><span>' + item.name + ' × ' + item.qty + '<small style="display:block;color:var(--text-muted);margin-top:4px;">' + [item.size ? 'Size: ' + item.size : '', item.color ? 'Colour: ' + item.color : '', item.lens ? 'Lens: ' + item.lens : ''].filter(Boolean).join(' · ') + '</small></span><strong>' + formatPrice(item.price * item.qty) + '</strong></div>').join('') : '<p>Your cart is empty. Add products before checkout.</p>';
    if (el('coSubtotal')) el('coSubtotal').textContent = formatPrice(subtotal);
    if (el('coShipping')) el('coShipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    if (el('coTotal')) el('coTotal').textContent = formatPrice(total);
    const placeOrder = el('placeOrderBtn');
    if (placeOrder) placeOrder.disabled = cart.length === 0;
  }

  window.removeFromCart = function (id) {
    cart = cart.filter(i => String(i.id) !== String(id));
    saveCart();
  };
  window.updateCartQty = function (id, delta) {
    const item = cart.find(i => String(i.id) === String(id));
    if (!item) return;
    item.qty = Math.max(1, Math.min(99, Number(item.qty || 1) + Number(delta || 0)));
    saveCart();
  };
  function updateWishlistUI() {
    const count = document.getElementById('wishlistCount');
    if (count) count.textContent = wishlist.size;
    const grid = document.getElementById('wishlistGrid');
    if (!grid) return;
    const saved = products.filter(p => wishlist.has(String(p.id)));
    if (!saved.length) { grid.innerHTML = '<p class="wishlist-empty">Your wishlist is empty. Save frames you love and they will appear here.</p>'; return; }
    renderProducts(saved, 'wishlistGrid');
  }
  function toggleWishlist(id) {
    const key = String(id);
    if (wishlist.has(key)) wishlist.delete(key); else wishlist.add(key);
    try { localStorage.setItem('hepra_wishlist', JSON.stringify([...wishlist])); } catch (_) {}
    updateWishlistUI();
    document.querySelectorAll('.wishlist-toggle[data-id="' + key + '"]').forEach(button => {
      const saved = wishlist.has(key);
      button.classList.toggle('is-wishlisted', saved);
      button.setAttribute('aria-pressed', String(saved));
      button.setAttribute('aria-label', saved ? 'Remove from wishlist' : 'Add to wishlist');
    });
  }

  function addToCart(product, extras = {}) {
    const isContactPack = /^10[1-4]_pack_/.test(String(product.id));
    const selectedColor = extras.color || product.selectedColor || product.colors?.[0] || null;
    cart.push({
      id: String(product.id),
      name: product.name,
      price: (product.price || 0) + (extras.lensPrice || 0),
      qty: 1,
      image: product.image,
      size: extras.size || product.size,
      color: selectedColor,
      lens: extras.lens || null,
      lensId: extras.lensId || null,
      lensMaterial: extras.lensMaterial || 'standard',
      lensCoating: extras.lensCoating || 'none',
      rx: extras.rx || false,
      rxDetails: extras.rxDetails || null,
      rxFileName: extras.rxFileName || null,
      itemType: isContactPack ? 'contact-lens' : 'eyewear'
    });
    saveCart();
    closeOrderDrawer();
    openCart();
  }

  /* V15 — full product detail page */
  let activePdpProduct = null;
  window.pdpSelectedColor = null;
  const pdpGalleryImages = product => [product.image, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&q=85', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&q=85', 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=900&q=85'];
  function renderProductPage(product) {
    activePdpProduct = product;
    window.pdpSelectedSize = product.size || 'Medium';
    window.pdpSelectedColor = (product.colors || [])[0] || null;
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    const image = document.getElementById('pdpImage'); if (image) { image.src = product.image; image.alt = product.name; }
    setText('pdpName', product.name); setText('pdpReviews', product.rating + ' · ' + Number(product.reviews || 0).toLocaleString('en-IN') + ' Reviews');
    setText('pdpPrice', formatPrice(product.price)); setText('pdpMrp', formatPrice(product.mrp)); setText('pdpSummaryPrice', formatPrice(product.price));
    setText('pdpMobileProductName', product.name); setText('pdpMobileProductPrice', formatPrice(product.price));
    setText('pdpOff', (product.mrp ? Math.round((product.mrp-product.price)/product.mrp*100) : 0) + '% OFF');
    setText('pdpDims', 'Frame Size: ' + (product.size || 'Standard') + ' · ' + (product.dims || 'Dimensions vary by frame'));
    setText('pdpMaterial', product.category === 'sunglasses' ? 'Frame + sun lenses' : 'Frame material varies by model');
    setText('pdpWeight', 'Product-specific'); setText('pdpFit', product.size || 'Standard'); setText('pdpShape', String(product.shape || 'Classic').replace(/^./, c => c.toUpperCase()));
    setText('pdpDesc', product.name + ' is designed for everyday style and comfort. Check the frame dimensions and fit, then choose frame-only or configure your prescription lens package. Lens suitability and final fitting should be confirmed by an optician.');
    const thumbs = document.getElementById('pdpThumbs'); if (thumbs) thumbs.innerHTML = pdpGalleryImages(product).map((src, i) => '<button type="button" class="pdp-thumb ' + (i === 0 ? 'active' : '') + '" data-pdp-img="' + src + '" aria-label="View product image ' + (i+1) + '"><img src="' + src.replace(/w=900&q=85/, 'w=160&q=80') + '" alt="" loading="lazy"></button>').join('');
    const colors = document.getElementById('pdpColors'); if (colors) colors.innerHTML = (product.colors || []).map((color, i) => '<button type="button" class="color-dot ' + (i === 0 ? 'active' : '') + '" style="background:' + color + '" data-pdp-color="' + i + '" aria-label="Select frame colour ' + (i+1) + '" aria-pressed="' + (i === 0) + '"></button>').join('');
    setPdpColorHelp(window.pdpSelectedColor);
    const sizeOptions = document.getElementById('pdpSizeOptions'); if (sizeOptions) sizeOptions.innerHTML = ['Small','Medium','Large'].map(size => '<button type="button" class="pdp-size-option ' + (size === window.pdpSelectedSize ? 'active' : '') + '" data-pdp-size="' + size + '" aria-pressed="' + (size === window.pdpSelectedSize) + '">' + size + '</button>').join('');
    const related = document.getElementById('relatedGrid'); if (related) renderProducts(products.filter(item => item.id !== product.id).slice(0, 4), 'relatedGrid');
    document.title = product.name + ' | HEPRA Optical';
  }
  window.goToProduct = function(id) {
    const product = products.find(item => item.id === Number(id)); if (!product) return;
    renderProductPage(product);
    if (location.hash !== '#product') location.hash = 'product';
    document.querySelectorAll('.page').forEach(page => page.classList.toggle('active', page.id === 'page-product'));
    window.scrollTo(0, 0);
  };
  document.addEventListener('click', event => {
    const thumb = event.target.closest('[data-pdp-img]');
    if (thumb) { const img = document.getElementById('pdpImage'); if (img) img.src = thumb.getAttribute('data-pdp-img'); document.querySelectorAll('[data-pdp-img]').forEach(item => item.classList.toggle('active', item === thumb)); }
    const color = event.target.closest('[data-pdp-color]');
    if (color && activePdpProduct) { const idx = Number(color.getAttribute('data-pdp-color')); window.pdpSelectedColor = (activePdpProduct.colors || [])[idx] || null; document.querySelectorAll('[data-pdp-color]').forEach(item => { const active = item === color; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); }); setPdpColorHelp(window.pdpSelectedColor); }
    const size = event.target.closest('[data-pdp-size]');
    if (size) { window.pdpSelectedSize = size.getAttribute('data-pdp-size'); document.querySelectorAll('[data-pdp-size]').forEach(item => { const active = item === size; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); }); setPdpSizeHelp(window.pdpSelectedSize); }
    if ((event.target.closest('#pdpBuyRx') || event.target.closest('#pdpMobileBuyRx')) && activePdpProduct) { window.openEyeglassOrder(activePdpProduct.id); }
    if (event.target.closest('#pdpBuyFrame') && activePdpProduct) { addToCart(activePdpProduct, {size: window.pdpSelectedSize || activePdpProduct.size, color: window.pdpSelectedColor || activePdpProduct.colors?.[0]}); }
    if (event.target.closest('#pdpTryOn')) document.getElementById('tryOnModal')?.classList.add('open');
  });
  function setPdpSizeHelp(size) { const el = document.getElementById('pdpSizeHelp'); if (el) el.textContent = 'Selected: ' + size + ' · confirm availability'; }
  function setPdpColorHelp(color) { const el = document.getElementById('pdpColorHelp'); if (el) el.textContent = color ? 'Selected colour: ' + color + ' · display option, confirm availability' : 'Choose a frame colour'; }
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
              <button class="p-action wishlist-toggle ${wishlist.has(String(p.id)) ? 'is-wishlisted' : ''}" data-id="${p.id}" aria-label="${wishlist.has(String(p.id)) ? 'Remove from wishlist' : 'Add to wishlist'}" aria-pressed="${wishlist.has(String(p.id)) ? 'true' : 'false'}" title="Wishlist">
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
            <div class="product-card-kicker"><span>HEPRA EDIT</span><span class="product-card-id">NO. ${String(p.id).padStart(2, '0')}</span></div>
            <h3 class="product-name"><button type="button" class="product-title-link" onclick="goToProduct(${p.id})">${p.name}</button></h3>
            <div class="product-rating">
              <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
              <span>${p.rating} · ${p.reviews.toLocaleString('en-IN')}</span>
            </div>
            <div class="product-price">
              <span class="price-current">${formatPrice(p.price)}</span>
              <span class="price-mrp">${formatPrice(p.mrp)}</span>
              <span class="price-off"><span aria-hidden="true">↓</span> ${off}% OFF</span>
            </div>
            <div class="product-meta">
              <div class="color-dots">
                ${(p.colors || []).map((c, i) => `<span class="color-dot ${i === 0 ? 'active' : ''}" style="background:${c}"></span>`).join('')}
              </div>
              <span class="frame-size-label">${p.size} · ${p.dims}</span>
            </div>
            <div class="product-cta-row">
              <button class="btn btn-sm btn-outline" aria-label="Choose lenses and prescription for ${p.name}" onclick="openEyeglassOrder(${p.id})">WITH PRESCRIPTION <span aria-hidden="true">↗</span></button>
              <button class="btn btn-sm btn-primary" aria-label="Buy ${p.name} frame only" onclick="addFrameOnly(${p.id})">FRAME ONLY</button>
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
    selectedProduct = { ...(products.find(p => p.id === id) || products[0]), size: (activePdpProduct && activePdpProduct.id === id && window.pdpSelectedSize) ? window.pdpSelectedSize : (products.find(p => p.id === id) || products[0]).size, selectedColor: (activePdpProduct && activePdpProduct.id === id && window.pdpSelectedColor) ? window.pdpSelectedColor : ((products.find(p => p.id === id) || products[0]).colors || [])[0] || null };
    framePrice = selectedProduct.price;
    selectedLens = lensOptions[0];
    selectedMaterial = lensMaterials[0];
    selectedCoating = lensCoatings[0];
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
    selectedPack = Number.parseInt(selectedProduct.pack, 10) || 30;
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
        <div class="lens-configurator-group">
          <p class="lens-configurator-heading">Lens material / index</p>
          ${lensMaterials.map(m => '<button type="button" class="lens-configurator-option ' + (selectedMaterial.id === m.id ? 'selected' : '') + '" onclick="selectLensMaterial(\'' + m.id + '\')" aria-pressed="' + (selectedMaterial.id === m.id) + '"><span><strong>' + m.name + '</strong><small>' + m.desc + '</small></span><b>' + (m.price ? '+' + formatPrice(m.price) : 'Included') + '</b></button>').join('')}
        </div>
        <div class="lens-configurator-group">
          <p class="lens-configurator-heading">Coating / treatment</p>
          ${lensCoatings.map(c => '<button type="button" class="lens-configurator-option ' + (selectedCoating.id === c.id ? 'selected' : '') + '" onclick="selectLensCoating(\'' + c.id + '\')" aria-pressed="' + (selectedCoating.id === c.id) + '"><span><strong>' + c.name + '</strong><small>' + c.desc + '</small></span><b>' + (c.price ? '+' + formatPrice(c.price) : 'Included') + '</b></button>').join('')}
        </div>
        <div class="order-price-bar">
          <span>Frame + lens package</span>
          <span class="total">${formatPrice(framePrice + configuredLensPrice())}</span>
        </div>
      `;
    } else {
      bodyHTML = `
        <div class="order-frame-preview">
          <img src="${selectedProduct.image}" alt="" />
          <div>
            <h4>${selectedProduct.name}</h4>
            <p>${selectedLens.name} · ${formatPrice(framePrice + configuredLensPrice())}</p>
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
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" style="display:none;" id="orderRxFile" aria-label="Prescription file" />
            <p id="rxUploadError" role="alert" hidden style="color:#b42318;font-size:.8rem;margin-top:8px;"></p>
          </div>
        </div>
        <div id="rxManualPane" style="display:none;">
          <div class="rx-eye">
            <h4>RIGHT EYE (OD)</h4>
            <div class="rx-fields">
              <div class="form-group"><label>SPH</label><select data-rx-field="odSph"><option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option><option>-2.00</option><option>-2.50</option><option>-3.00</option><option>-4.00</option><option>-5.00</option><option>-6.00</option></select></div>
              <div class="form-group"><label>CYL</label><select data-rx-field="odCyl"><option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option><option>-2.00</option><option>-2.50</option><option>-3.00</option></select></div>
              <div class="form-group"><label>AXIS</label><input data-rx-field="odAxis" type="number" min="0" max="180" placeholder="0–180" /></div>
            </div>
          </div>
          <div class="rx-eye" style="margin-top:12px;">
            <h4>LEFT EYE (OS)</h4>
            <div class="rx-fields">
              <div class="form-group"><label>SPH</label><select data-rx-field="osSph"><option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option><option>-2.00</option><option>-2.50</option><option>-3.00</option><option>-4.00</option><option>-5.00</option><option>-6.00</option></select></div>
              <div class="form-group"><label>CYL</label><select data-rx-field="osCyl"><option>0.00</option><option>-0.50</option><option>-1.00</option><option>-1.50</option><option>-2.00</option><option>-2.50</option><option>-3.00</option></select></div>
              <div class="form-group"><label>AXIS</label><input data-rx-field="osAxis" type="number" min="0" max="180" placeholder="0–180" /></div>
            </div>
          </div>
          <div class="form-row two" style="margin-top:12px;">
            <div class="form-group"><label>ADD</label><select data-rx-field="add"><option value="">None</option><option>+1.00</option><option>+1.50</option><option>+2.00</option><option>+2.50</option><option>+3.00</option></select></div>
            <div class="form-group"><label>PD (mm)</label><input data-rx-field="pd" type="number" placeholder="e.g. 63" min="50" max="80" /></div>
          </div>
        </div>
        <div class="order-price-bar" style="margin-top:16px;">
          <span>Total</span>
          <span class="total">${formatPrice(framePrice + configuredLensPrice())}</span>
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
          : `<button class="btn btn-primary" style="flex:1;" onclick="completeEyeglassOrder()">Add to Cart · ${formatPrice(framePrice + configuredLensPrice())}</button>`
        }
      </div>
    `;

    // File upload handler
    setTimeout(() => {
      const fileInput = document.getElementById('orderRxFile');
      const zone = document.getElementById('orderUploadZone');
      if (fileInput && zone) {
        fileInput.addEventListener('change', () => {
          const file = fileInput.files && fileInput.files[0];
          const error = document.getElementById('rxUploadError');
          if (error) { error.hidden = true; error.textContent = ''; }
          if (!file) return;
          const validType = /^(image\/(jpeg|png)|application\/pdf)$/.test(file.type) || /\.(jpe?g|png|pdf)$/i.test(file.name);
          if (!validType || file.size > 10 * 1024 * 1024) {
            fileInput.value = '';
            if (error) { error.hidden = false; error.textContent = !validType ? 'Use a JPG, PNG or PDF prescription file.' : 'File must be 10 MB or smaller.'; }
            zone.textContent = 'Choose a JPG, PNG or PDF up to 10 MB';
            return;
          }
          zone.textContent = '✓ ' + file.name + ' selected';
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
            <select data-cl-power="od" aria-label="Right eye contact lens power" style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:8px;font-weight:600;">
              <option>0.00</option><option>-0.50</option><option>-0.75</option><option>-1.00</option><option>-1.25</option><option>-1.50</option><option>-1.75</option><option>-2.00</option><option>-2.25</option><option>-2.50</option><option>-2.75</option><option>-3.00</option><option>-3.50</option><option>-4.00</option><option>-4.50</option><option>-5.00</option><option>-5.50</option><option>-6.00</option>
            </select>
          </div>
          <div class="cl-power-box">
            <h5>Left Eye (OS)</h5>
            <select data-cl-power="os" aria-label="Left eye contact lens power" style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:8px;font-weight:600;">
              <option>0.00</option><option>-0.50</option><option>-0.75</option><option>-1.00</option><option>-1.25</option><option>-1.50</option><option>-1.75</option><option>-2.00</option><option>-2.25</option><option>-2.50</option><option>-2.75</option><option>-3.00</option><option>-3.50</option><option>-4.00</option><option>-4.50</option><option>-5.00</option><option>-5.50</option><option>-6.00</option>
            </select>
          </div>
        </div>
        <div class="form-row two">
          <div class="form-group"><label>BC</label><input data-cl-spec="bc" type="number" min="8" max="10" step="0.1" value="${selectedProduct.bc || '8.6'}" required /></div>
          <div class="form-group"><label>DIA</label><input data-cl-spec="dia" type="number" min="13" max="15" step="0.1" value="${selectedProduct.dia || '14.2'}" required /></div>
        </div>
      `;
    } else {
      // Build pack sizes from the product's actual base pack (e.g. 30, 6 or 2 lenses).
      const baseQty = Number.parseInt(selectedProduct.pack, 10) || 30;
      const basePrice = Number(selectedProduct.price) || 899;
      const packs = [
        { qty: baseQty, price: basePrice, label: baseQty + ' lenses' },
        { qty: baseQty * 3, price: Math.round(basePrice * 2.7), label: (baseQty * 3) + ' lenses' },
        { qty: baseQty * 6, price: Math.round(basePrice * 4.8), label: (baseQty * 6) + ' lenses' }
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
  window.selectLensMaterial = function (id) { selectedMaterial = lensMaterials.find(item => item.id === id) || lensMaterials[0]; renderOrderDrawer(); };
  window.selectLensCoating = function (id) { selectedCoating = lensCoatings.find(item => item.id === id) || lensCoatings[0]; renderOrderDrawer(); };

  window.selectClType = function (t) {
    selectedClType = t;
    renderOrderDrawer();
  };

  window.selectPack = function (qty, price) {
    const baseQty = Number.parseInt(selectedProduct?.pack, 10) || 30;
    if (![baseQty, baseQty * 3, baseQty * 6].includes(Number(qty))) return;
    selectedPack = Number(qty);
    renderOrderDrawer();
  };

  window.switchRxMode = function (mode, btn) {
    document.querySelectorAll('.rx-opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('rxUploadPane').style.display = mode === 'upload' ? 'block' : 'none';
    document.getElementById('rxManualPane').style.display = mode === 'manual' ? 'block' : 'none';
  };

  window.completeEyeglassOrder = function () {
    const fileInput = document.getElementById('orderRxFile');
    const file = fileInput?.files?.[0] || null;
    const manualPane = document.getElementById('rxManualPane');
    const manualMode = manualPane && manualPane.style.display !== 'none';
    let rxDetails = null;
    if (manualMode) {
      const get = key => document.querySelector('[data-rx-field="' + key + '"]')?.value?.trim() || '';
      const odAxis = get('odAxis'), osAxis = get('osAxis'), pd = get('pd');
      if ((odAxis && (+odAxis < 0 || +odAxis > 180)) || (osAxis && (+osAxis < 0 || +osAxis > 180))) {
        alert('Axis must be between 0 and 180 degrees.'); return;
      }
      if (pd && (+pd < 50 || +pd > 80)) { alert('PD must be between 50 and 80 mm.'); return; }
      rxDetails = { mode:'manual', od:{ sph:get('odSph'), cyl:get('odCyl'), axis:odAxis }, os:{ sph:get('osSph'), cyl:get('osCyl'), axis:osAxis }, add:get('add'), pd };
    } else {
      const error = document.getElementById('rxUploadError');
      if (!file) { if(error){error.hidden=false;error.textContent='Choose a prescription file, or select Enter Manually.';} return; }
      if (!/^(image\/(jpeg|png)|application\/pdf)$/.test(file.type) && !/\.(jpe?g|png|pdf)$/i.test(file.name)) {
        if(error){error.hidden=false;error.textContent='Use a JPG, PNG or PDF prescription file.';} return;
      }
      if (file.size > 10 * 1024 * 1024) { if(error){error.hidden=false;error.textContent='File must be 10 MB or smaller.';} return; }
      rxDetails = { mode:'upload', fileName:file.name, fileSize:file.size, note:'File selected in this browser demo; it has not been uploaded to a server.' };
    }
    addToCart(selectedProduct, { lens:selectedLens.name + ' · ' + selectedMaterial.name + ' · ' + selectedCoating.name, lensId:selectedLens.id, lensPrice:configuredLensPrice(), rx:true, rxDetails, rxFileName:file?.name || null, lensMaterial:selectedMaterial.id, lensCoating:selectedCoating.id });
  };

  window.completeContactOrder = function () {
    const baseQty = Number.parseInt(selectedProduct.pack, 10) || 30;
    const basePrice = Number(selectedProduct.price) || 899;
    const packMultiplier = selectedPack === baseQty ? 1
      : selectedPack === baseQty * 3 ? 2.7
      : selectedPack === baseQty * 6 ? 4.8
      : null;
    if (packMultiplier === null) { renderOrderDrawer(); return; }
    const od = document.querySelector('[data-cl-power="od"]')?.value || '';
    const os = document.querySelector('[data-cl-power="os"]')?.value || '';
    const bc = document.querySelector('[data-cl-spec="bc"]')?.value || '';
    const dia = document.querySelector('[data-cl-spec="dia"]')?.value || '';
    if (!od || !os || !bc || !dia || Number(bc) < 8 || Number(bc) > 10 || Number(dia) < 13 || Number(dia) > 15) {
      alert('Please check OD/OS power, BC and DIA before adding to cart.'); return;
    }
    const packPrice = Math.round(basePrice * packMultiplier);
    const rxDetails = { type:selectedClType, od, os, bc, dia, pack:selectedPack };
    addToCart({
      id: selectedProduct.id + '_pack_' + selectedPack + '_' + od + '_' + os,
      name: `${selectedProduct.name} · ${selectedClType} · OD ${od} / OS ${os} · ${selectedPack} lenses`,
      price: packPrice,
      image: null
    }, { rx:true, rxDetails });
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
    const menu = document.getElementById('mobileMenu');
    const toggle = document.getElementById('menuToggle');
    const closeButton = document.getElementById('menuClose');
    const setMenuOpen = (isOpen) => {
      menu?.classList.toggle('open', isOpen);
      toggle?.setAttribute('aria-expanded', String(isOpen));
      if (menu) menu.setAttribute('aria-hidden', String(!isOpen));
      document.body.classList.toggle('mobile-menu-open', isOpen);
    };
    toggle?.setAttribute('aria-controls', 'mobileMenu');
    toggle?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
    toggle?.addEventListener('click', () => setMenuOpen(true));
    closeButton?.addEventListener('click', () => {
      setMenuOpen(false);
      toggle?.focus();
    });
    menu?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setMenuOpen(false));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu?.classList.contains('open')) {
        setMenuOpen(false);
        toggle?.focus();
      }
    });
  }

  function initSearch() {
    const overlay = document.getElementById('searchOverlay'), input = document.getElementById('searchInput');
    document.getElementById('searchBtn')?.addEventListener('click', () => { overlay?.classList.add('open'); input?.focus(); });
    input?.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      const matches = products.filter(p => [p.name,p.category,p.shape,p.size,p.dims].join(' ').toLowerCase().includes(q));
      const grid = document.getElementById('searchResultsGrid'), results = document.getElementById('searchResults'), empty = document.getElementById('searchEmpty');
      if (grid) renderProducts(q ? matches : [], 'searchResultsGrid');
      if (results) results.hidden = !q;
      if (empty) { empty.hidden = !q || matches.length > 0; empty.textContent = 'No frames found. Try another name or frame shape.'; }
    });
    input?.addEventListener('keydown', e => { if (e.key === 'Escape') overlay?.classList.remove('open'); if (e.key === 'Enter' && input.value.trim()) { overlay?.classList.remove('open'); location.hash = 'eyeglasses'; } });
    overlay?.addEventListener('click', e => { if (e.target.id === 'searchOverlay') overlay.classList.remove('open'); });
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
    document.querySelectorAll('.face-card').forEach(card => card.addEventListener('click', () => { document.querySelectorAll('.face-card').forEach(c => c.classList.remove('active')); card.classList.add('active'); }));
    document.addEventListener('click', event => {
      const chip = event.target.closest('.shape-chip'); if (!chip) return;
      const page = chip.closest('.page'), grid = page?.querySelector('.product-grid'); if (!page || !grid) return;
      page.querySelectorAll('.shape-chip').forEach(c => c.classList.toggle('active', c === chip));
      const category = page.id.replace('page-', ''), shape = chip.dataset.shape || 'all';
      let base = products;
      if (['eyeglasses', 'sunglasses', 'computer', 'kids'].includes(category)) base = products.filter(p => p.category === category);
      renderProducts(shape === 'all' ? base : base.filter(p => p.shape === shape), grid.id);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products, 'productGrid');
    renderProducts(products.filter(p => p.category === 'eyeglasses'), 'eyeglassesGrid');
    renderProducts(products.filter(p => p.category === 'sunglasses'), 'sunglassesGrid');
    renderProducts(products.filter(p => p.category === 'computer'), 'computerGrid');
    renderProducts(products.filter(p => p.category === 'kids'), 'kidsGrid');
    renderContactLenses();
    updateWishlistUI();
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
    document.addEventListener('click', event => { const button = event.target.closest('.wishlist-toggle'); if (button) { event.preventDefault(); toggleWishlist(button.dataset.id); } });
    const checkoutForm = document.getElementById('checkoutForm');
    let pendingOnlineOrderReference = null;
    let paymentInProgress = false;
    async function loadRazorpayCheckout() {
      if (window.Razorpay) return true;
      return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
      });
    }
    function clearCartAfterOrder(form, button, label) {
      cart = [];
      saveCart();
      form.reset();
      pendingOnlineOrderReference = null;
      if (button) { button.disabled = true; button.textContent = label; }
    }
    checkoutForm?.addEventListener('submit', async event => {
      event.preventDefault();
      if (paymentInProgress) return;
      if (!cart.length && !pendingOnlineOrderReference) { alert('Your cart is empty. Add a product before checkout.'); return; }
      if (!checkoutForm.reportValidity()) return;

      const notice = document.getElementById('checkoutNotice');
      const button = document.getElementById('placeOrderBtn');
      const fields = new FormData(checkoutForm);
      const paymentMethod = String(fields.get('pay') || '');
      const payload = {
        customer: {
          fullName: String(fields.get('fullName') || '').trim(),
          mobile: String(fields.get('mobile') || '').trim(),
          email: String(fields.get('email') || '').trim()
        },
        address: {
          line1: String(fields.get('address') || '').trim(),
          pincode: String(fields.get('pincode') || '').trim(),
          city: String(fields.get('city') || '').trim(),
          state: String(fields.get('state') || '').trim()
        },
        paymentMethod,
        items: cart.map(item => ({
          id: String(item.id),
          quantity: Number(item.qty) || 1,
          lensId: item.lensId || 'basic',
          lensMaterial: item.lensMaterial || 'standard',
          lensCoating: item.lensCoating || 'none',
          size: item.size || '',
          color: item.color || ''
        }))
      };

      const setNotice = message => { if (notice) { notice.hidden = false; notice.textContent = message; } };
      if (button) { button.disabled = true; button.textContent = paymentMethod === 'cod' ? 'SAVING ORDER…' : 'PREPARING PAYMENT…'; }
      paymentInProgress = true;
      try {
        let order;
        if (pendingOnlineOrderReference) {
          order = { reference: pendingOnlineOrderReference };
        } else {
          setNotice('Saving your order securely…');
          const response = await fetch('/api/orders', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload), credentials: 'same-origin'
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok || !result.ok || !result.order?.reference) throw new Error(result.error || 'Order could not be saved. Please try again.');
          order = result.order;
          if (paymentMethod !== 'cod') pendingOnlineOrderReference = order.reference;
        }

        if (paymentMethod === 'cod') {
          setNotice('Order saved: ' + order.reference + '. Total: ' + formatPrice(order.total) + '. Cash on Delivery selected.');
          clearCartAfterOrder(checkoutForm, button, 'ORDER SAVED · CASH ON DELIVERY');
          return;
        }

        setNotice('Connecting to secure payment checkout…');
        const paymentResponse = await fetch('/api/payments/create-order', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: order.reference }), credentials: 'same-origin'
        });
        const paymentData = await paymentResponse.json().catch(() => ({}));
        if (!paymentResponse.ok || !paymentData.ok || !paymentData.paymentOrder?.id || !paymentData.keyId) {
          throw new Error(paymentData.error || 'Could not start payment. Your unpaid order reference is ' + order.reference + '. Retry to continue.');
        }
        if (!await loadRazorpayCheckout()) throw new Error('Payment checkout could not load. Your order ' + order.reference + ' is saved but unpaid. Retry when your connection is stable.');
        const checkout = new window.Razorpay({
          key: paymentData.keyId,
          amount: paymentData.paymentOrder.amount,
          currency: paymentData.paymentOrder.currency || 'INR',
          name: 'HEPRA Optical',
          description: 'Order ' + order.reference,
          order_id: paymentData.paymentOrder.id,
          prefill: paymentData.customer,
          notes: { orderReference: order.reference },
          theme: { color: '#400378' },
          modal: { ondismiss: () => {
            paymentInProgress = false;
            if (button) { button.disabled = false; button.textContent = 'RETRY PAYMENT'; }
            setNotice('Payment window closed. Order ' + order.reference + ' remains unpaid. Your cart is kept; submit again to retry.');
          }},
          handler: async payment => {
            try {
              setNotice('Verifying payment with the server…');
              const verifyResponse = await fetch('/api/payments/verify', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference: order.reference, razorpay_order_id: payment.razorpay_order_id, razorpay_payment_id: payment.razorpay_payment_id, razorpay_signature: payment.razorpay_signature }),
                credentials: 'same-origin'
              });
              const verified = await verifyResponse.json().catch(() => ({}));
              if (!verifyResponse.ok || !verified.ok || verified.paymentStatus !== 'paid') throw new Error(verified.error || 'Payment verification is pending. Do not retry payment until order status is checked.');
              setNotice('Payment verified. Order ' + order.reference + ' is confirmed. Thank you!');
              clearCartAfterOrder(checkoutForm, button, 'PAYMENT VERIFIED · ORDER CONFIRMED');
            } catch (error) {
              setNotice((error.message || 'Payment verification could not complete.') + ' Reference: ' + order.reference + '. Do not pay again yet; contact support to confirm status.');
              if (button) { button.disabled = false; button.textContent = 'CHECK PAYMENT STATUS / RETRY'; }
            } finally {
              paymentInProgress = false;
            }
          }
        });
        checkout.on('payment.failed', event => {
          setNotice('Payment failed or was cancelled. Order ' + order.reference + ' remains unpaid. Your cart is kept; you can retry.');
          if (button) { button.disabled = false; button.textContent = 'RETRY PAYMENT'; }
          paymentInProgress = false;
        });
        checkout.open();
      } catch (error) {
        setNotice(error.message || 'Checkout is unavailable. Your cart has been kept.');
        if (button) { button.disabled = false; button.textContent = pendingOnlineOrderReference ? 'RETRY PAYMENT' : 'RETRY CHECKOUT'; }
        paymentInProgress = false;
      }
    });;
  });
})();
