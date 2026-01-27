/* ENZARA - Main JavaScript */

(function() {
  'use strict';

  // ========================================
  // COUNTDOWN TIMER
  // ========================================

  function initCountdown() {
    const countdownEl = document.querySelector('.countdown');
    if (!countdownEl) return;

    // Set end date to 3 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(23, 59, 59, 999);

    function updateCountdown() {
      const now = new Date();
      const diff = endDate - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p>Khuyến mãi đã kết thúc!</p>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const daysEl = countdownEl.querySelector('[data-days]');
      const hoursEl = countdownEl.querySelector('[data-hours]');
      const minutesEl = countdownEl.querySelector('[data-minutes]');
      const secondsEl = countdownEl.querySelector('[data-seconds]');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ========================================
  // FAQ ACCORDION
  // ========================================

  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-item__question');

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // ========================================
  // QUANTITY SELECTOR
  // ========================================

  function initQuantitySelector() {
    const selectors = document.querySelectorAll('.quantity-selector');

    selectors.forEach(selector => {
      const minusBtn = selector.querySelector('[data-action="decrease"]');
      const plusBtn = selector.querySelector('[data-action="increase"]');
      const valueEl = selector.querySelector('.quantity-selector__value');

      if (!minusBtn || !plusBtn || !valueEl) return;

      minusBtn.addEventListener('click', () => {
        let value = parseInt(valueEl.value || valueEl.textContent) || 1;
        if (value > 1) {
          value--;
          updateQuantity(valueEl, value);
        }
      });

      plusBtn.addEventListener('click', () => {
        let value = parseInt(valueEl.value || valueEl.textContent) || 1;
        if (value < 99) {
          value++;
          updateQuantity(valueEl, value);
        }
      });
    });

    function updateQuantity(el, value) {
      if (el.tagName === 'INPUT') {
        el.value = value;
      } else {
        el.textContent = value;
      }

      // Dispatch event for other scripts
      el.dispatchEvent(new CustomEvent('quantityChange', {
        detail: { quantity: value },
        bubbles: true
      }));

      // Update order summary
      updateOrderSummary();
    }
  }

  // ========================================
  // ORDER FORM
  // ========================================

  const PRODUCT_PRICE = 50000;
  const SPONGE_BONUS_VALUE = 12000;
  const FREE_SHIPPING_MIN = 2;
  const SHIPPING_COST = 30000;

  function updateOrderSummary() {
    const quantityEl = document.querySelector('.quantity-selector__value');
    const quantity = parseInt(quantityEl?.value || quantityEl?.textContent) || 1;

    const subtotalEl = document.querySelector('[data-subtotal]');
    const shippingEl = document.querySelector('[data-shipping]');
    const totalEl = document.querySelector('[data-total]');

    const subtotal = quantity * PRODUCT_PRICE;
    const shipping = quantity >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Miễn phí' : formatCurrency(shipping);
    if (totalEl) totalEl.textContent = formatCurrency(total);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  }

  function initOrderForm() {
    const form = document.querySelector('#order-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Initialize summary
    updateOrderSummary();
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validate
    const errors = validateForm(formData);

    // Clear previous errors
    form.querySelectorAll('.input-error').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    if (Object.keys(errors).length > 0) {
      showFormErrors(form, errors);
      return;
    }

    // Get quantity
    const quantityEl = form.querySelector('.quantity-selector__value');
    const quantity = parseInt(quantityEl?.value || quantityEl?.textContent) || 1;

    // Prepare order data
    const orderData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      district: formData.get('district'),
      city: formData.get('city'),
      quantity: quantity,
      total: quantity * PRODUCT_PRICE + (quantity >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST)
    };

    // Show success message (in real app, this would submit to server)
    showOrderSuccess(orderData);
  }

  function validateForm(formData) {
    const errors = {};

    const name = formData.get('name')?.trim();
    const phone = formData.get('phone')?.trim();
    const address = formData.get('address')?.trim();

    if (!name) {
      errors.name = 'Vui lòng nhập họ tên';
    }

    if (!phone) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^0\d{9}$/.test(phone)) {
      errors.phone = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
    }

    if (!address) {
      errors.address = 'Vui lòng nhập địa chỉ';
    }

    return errors;
  }

  function showFormErrors(form, errors) {
    Object.entries(errors).forEach(([field, message]) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) {
        input.classList.add('error');
        const errorEl = document.createElement('p');
        errorEl.className = 'input-error';
        errorEl.textContent = message;
        input.parentNode.appendChild(errorEl);
      }
    });

    // Scroll to first error
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
  }

  function showOrderSuccess(orderData) {
    const successHTML = `
      <div class="order-success" style="text-align: center; padding: var(--space-8);">
        <div style="font-size: 64px; margin-bottom: var(--space-4);">🎉</div>
        <h3 style="color: var(--color-forest-green); margin-bottom: var(--space-4);">Đặt hàng thành công!</h3>
        <p style="margin-bottom: var(--space-2);">Cảm ơn <strong>${orderData.name}</strong> đã đặt hàng.</p>
        <p style="margin-bottom: var(--space-4);">Chúng tôi sẽ gọi điện xác nhận qua số <strong>${orderData.phone}</strong></p>
        <p style="font-size: var(--text-h3); font-weight: 700; color: var(--color-forest-green);">
          Tổng thanh toán: ${formatCurrency(orderData.total)}
        </p>
      </div>
    `;

    const form = document.querySelector('#order-form');
    if (form) {
      form.innerHTML = successHTML;
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ========================================
  // STOCK COUNTER (Fake urgency)
  // ========================================

  function initStockCounter() {
    const stockFill = document.querySelector('.scarcity__stock-fill');
    const stockText = document.querySelector('.scarcity__stock-text');

    if (!stockFill || !stockText) return;

    // Random stock between 15-35
    const stock = Math.floor(Math.random() * 20) + 15;
    const percentage = (stock / 100) * 100;

    stockFill.style.width = percentage + '%';
    stockText.textContent = `Chỉ còn ${stock} sản phẩm!`;
  }

  // ========================================
  // LIVE VIEWERS (Fake social proof)
  // ========================================

  function initLiveViewers() {
    const viewersEl = document.querySelector('.scarcity__viewers-count');
    if (!viewersEl) return;

    function updateViewers() {
      const base = 12;
      const variation = Math.floor(Math.random() * 8);
      viewersEl.textContent = base + variation;
    }

    updateViewers();
    setInterval(updateViewers, 5000 + Math.random() * 5000);
  }

  // ========================================
  // INITIALIZATION
  // ========================================

  function init() {
    initCountdown();
    initFaqAccordion();
    initQuantitySelector();
    initOrderForm();
    initStockCounter();
    initLiveViewers();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
