/* ENZARA - Pancake POS Integration */

(function() {
  'use strict';

  // ========================================
  // PANCAKE POS API CONFIGURATION
  // ========================================

  const PANCAKE_CONFIG = {
    baseUrl: 'https://pos.pages.fm/api/v1',
    shopId: '1890171475',
    apiKey: '9bfa8af5dfbc41c2b8ad1db542e8ca73',
    warehouseId: 'd5b4d4b3-2287-4823-a4f5-fdf25abd4164', // ENZARA VIET NAM
    orderSource: -7, // Webcake Landing

    // Product: Nuoc Rua Chen Huu Co ENZARA Huong Dua 500g
    product: {
      id: '64adb4dd-3600-4945-8a4d-aba9f1dc0d3a',
      variationId: 'bdc46298-8f9d-4a38-a171-57eb6f318132',
      name: 'Nuoc Rua Chen Huu Co ENZARA Huong Dua 500g',
      price: 75000, // Original price
      salePrice: 50000 // Sale price on landing page
    }
  };

  // ========================================
  // SEPAY CONFIGURATION
  // ========================================

  const SEPAY_CONFIG = {
    accountNumber: '080838689999',
    bankCode: 'mbbank',
    accountName: 'ENZARA VIET NAM',
    qrApiUrl: 'https://qr.sepay.vn/img',
    // Cloudflare Worker URL for payment verification
    webhookUrl: 'https://sepay-payment-gateway.it-nguyenlanh.workers.dev'
  };

  // ========================================
  // API HELPERS
  // ========================================

  function buildApiUrl(endpoint) {
    return `${PANCAKE_CONFIG.baseUrl}/shops/${PANCAKE_CONFIG.shopId}${endpoint}?api_key=${PANCAKE_CONFIG.apiKey}`;
  }

  // Generate unique order code for bank transfer
  function generateOrderCode() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ENZARA${timestamp}${random}`;
  }

  // Build SePay QR code URL
  function buildQRUrl(amount, orderCode) {
    const params = new URLSearchParams({
      acc: SEPAY_CONFIG.accountNumber,
      bank: SEPAY_CONFIG.bankCode,
      amount: amount.toString(),
      des: orderCode
    });
    return `${SEPAY_CONFIG.qrApiUrl}?${params.toString()}`;
  }

  async function createPancakeOrder(orderData) {
    const url = buildApiUrl('/orders');

    // Build full address (Số nhà, Phường/Xã, Tỉnh/TP) - API v2 không có Quận/Huyện
    const addressParts = [orderData.address];
    if (orderData.ward) addressParts.push(orderData.ward);
    if (orderData.city) addressParts.push(orderData.city);
    const fullAddress = addressParts.join(', ');

    // Calculate shipping
    const shippingFee = orderData.quantity >= 2 ? 0 : 30000;
    const itemTotal = orderData.quantity * PANCAKE_CONFIG.product.salePrice;
    const total = itemTotal + shippingFee;

    // Generate order code for bank transfer
    const orderCode = orderData.paymentMethod === 'bank_transfer' ? generateOrderCode() : null;
    const paymentMethodLabel = orderData.paymentMethod === 'bank_transfer' ? 'Chuyen khoan' : 'COD';

    // Prepare order payload for Pancake POS
    const payload = {
      // Shipping address with customer info
      shipping_address: {
        full_name: orderData.name,
        phone_number: orderData.phone,
        address: orderData.address,
        full_address: fullAddress
      },

      // Order source
      parent_id: PANCAKE_CONFIG.orderSource,

      // Products
      items: [{
        variation_id: PANCAKE_CONFIG.product.variationId,
        quantity: orderData.quantity,
        price: PANCAKE_CONFIG.product.salePrice,
        is_bonus: false
      }],

      // Warehouse
      warehouse_id: PANCAKE_CONFIG.warehouseId,

      // Payment and shipping
      payment_method: orderData.paymentMethod === 'bank_transfer' ? 'bank_transfer' : 'cod',
      shipping_fee: shippingFee,

      // Note with landing page info and order code
      note: `[Landing Page] ${paymentMethodLabel} - SL: ${orderData.quantity} chai${orderCode ? ' - Ma CK: ' + orderCode : ''}`
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success || result.data) {
        // Use total_price from API response for accuracy
        const actualTotal = result.data?.total_price || total;

        return {
          success: true,
          orderId: result.data?.id || result.data?.order_id,
          orderNumber: result.data?.display_id || result.data?.system_id,
          trackingLink: result.data?.tracking_link,
          orderLink: result.data?.order_link,
          orderCode: orderCode,
          total: actualTotal,
          paymentMethod: orderData.paymentMethod,
          data: result.data
        };
      } else {
        console.error('Pancake POS Error:', result);
        return {
          success: false,
          error: result.message || result.error || 'Khong the tao don hang',
          errorCode: result.error_code
        };
      }
    } catch (error) {
      console.error('Network Error:', error);
      return {
        success: false,
        error: 'Loi ket noi mang. Vui long thu lai.',
        networkError: true
      };
    }
  }

  // ========================================
  // FORM INTEGRATION
  // ========================================

  function initPancakeIntegration() {
    const form = document.querySelector('#order-form');
    if (!form) return;

    // Override form submit
    form.addEventListener('submit', handlePancakeSubmit, true);

    // Initialize payment method selector
    initPaymentMethodSelector();
  }

  // ========================================
  // PAYMENT METHOD SELECTOR
  // ========================================

  function initPaymentMethodSelector() {
    const radios = document.querySelectorAll('input[name="payment_method"]');
    const submitBtnText = document.querySelector('#submit-btn-text');

    radios.forEach(radio => {
      radio.addEventListener('change', function() {
        // Update visual selection
        document.querySelectorAll('.payment-method-option').forEach(opt => {
          opt.classList.remove('payment-method-option--selected');
        });
        this.closest('.payment-method-option').classList.add('payment-method-option--selected');

        // Update submit button text
        if (submitBtnText) {
          if (this.value === 'bank_transfer') {
            submitBtnText.textContent = 'Đặt Hàng - Chuyển Khoản';
          } else {
            submitBtnText.textContent = 'Đặt Hàng - Thanh Toán Khi Nhận';
          }
        }
      });
    });
  }

  // ========================================
  // PAYMENT PAGE REDIRECT
  // ========================================

  function openPaymentPage(orderData, result) {
    // Save payment data to localStorage
    const paymentData = {
      orderCode: result.orderCode,
      amount: result.total,
      orderId: result.orderId,
      orderNumber: result.orderNumber,
      customerName: orderData.name,
      customerPhone: orderData.phone,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('enzara_payment', JSON.stringify(paymentData));

    // Open payment page in new tab
    window.open('payment.html', '_blank');

    // Show waiting message on current page
    showBankTransferWaiting(orderData, result);
  }

  function showBankTransferWaiting(orderData, result) {
    const waitingHTML = `
      <div class="order-success" style="text-align: center; padding: var(--space-8);">
        <div style="font-size: 64px; margin-bottom: var(--space-4);">🏦</div>
        <h3 style="color: var(--color-forest-green); margin-bottom: var(--space-4);">Đơn hàng đã được tạo!</h3>
        ${result.orderNumber ? `<p style="margin-bottom: var(--space-2); font-size: 14px; color: #666;">Mã đơn hàng: <strong>#${result.orderNumber}</strong></p>` : ''}
        <p style="margin-bottom: var(--space-2);">Mã chuyển khoản: <strong style="color: var(--color-sunset-orange); font-size: 18px;">${result.orderCode}</strong></p>
        <p style="margin-bottom: var(--space-4);">Số tiền: <strong style="font-size: var(--text-h3); color: var(--color-forest-green);">${formatCurrency(result.total)}</strong></p>
        <div style="margin: var(--space-6) 0; padding: var(--space-4); background: var(--color-cream-yellow); border-radius: var(--radius-md);">
          <p style="font-size: 14px;">
            <strong>Trang thanh toán đã mở ở tab mới.</strong><br>
            Vui lòng quét mã QR hoặc chuyển khoản theo hướng dẫn.
          </p>
        </div>
        <button onclick="window.open('payment.html', '_blank')" style="padding: 12px 24px; background: var(--color-forest-green); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
          Mở lại trang thanh toán
        </button>
        <p style="margin-top: var(--space-4); font-size: 13px; color: #666;">
          Chúng tôi sẽ liên hệ qua số <strong>${orderData.phone}</strong> để xác nhận đơn hàng.
        </p>
      </div>
    `;

    const form = document.querySelector('#order-form');
    if (form) {
      form.innerHTML = waitingHTML;
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Legacy modal functions (kept for backwards compatibility)
  let countdownInterval = null;
  let paymentCheckInterval = null;

  function showQRModal(orderData, result) {
    // Redirect to new payment page instead of showing modal
    openPaymentPage(orderData, result);
  }

  function startPaymentCheck(orderData, result, modal) {
    // Not used - payment check is now on payment.html page
    return;
  }

  function startCountdown(modal, seconds) {
    // Not used - countdown is now on payment.html page
    return;
  }

  async function updatePaymentStatus(orderId, amount, orderCode) {
    // Update order with prepaid amount to mark as paid
    const url = buildApiUrl(`/orders/${orderId}`);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prepaid: amount,
          note: `[Landing Page] Chuyen khoan - Ma CK: ${orderCode} - DA THANH TOAN`
        })
      });

      const result = await response.json();
      console.log('Payment status updated:', result);
      return result.success || result.data;
    } catch (error) {
      console.error('Failed to update payment status:', error);
      return false;
    }
  }

  function showBankTransferSuccess(orderData, result, isPaid) {
    const paymentStatus = isPaid
      ? '<span style="color: var(--color-success);">✓ Đã xác nhận thanh toán</span>'
      : '<span style="color: var(--color-sunset-orange);">⏳ Chờ xác nhận thanh toán</span>';

    const successHTML = `
      <div class="order-success" style="text-align: center; padding: var(--space-8);">
        <div style="font-size: 64px; margin-bottom: var(--space-4);">${isPaid ? '✅' : '⏳'}</div>
        <h3 style="color: var(--color-forest-green); margin-bottom: var(--space-4);">Đơn hàng đã được ghi nhận!</h3>
        ${result.orderNumber ? `<p style="margin-bottom: var(--space-2); font-size: 14px; color: #666;">Mã đơn hàng: <strong>#${result.orderNumber}</strong></p>` : ''}
        <p style="margin-bottom: var(--space-2);">Cảm ơn <strong>${orderData.name}</strong> đã đặt hàng.</p>
        <p style="margin-bottom: var(--space-2);">Mã chuyển khoản: <strong style="color: var(--color-sunset-orange);">${result.orderCode}</strong></p>
        <p style="margin-bottom: var(--space-4);">Trạng thái: ${paymentStatus}</p>
        <p style="font-size: var(--text-h3); font-weight: 700; color: var(--color-forest-green);">
          Số tiền: ${formatCurrency(result.total)}
        </p>
        <div style="margin-top: var(--space-6); padding: var(--space-4); background: var(--color-cream-yellow); border-radius: var(--radius-md);">
          <p style="font-size: 14px;">
            ${isPaid
              ? '<strong>Cảm ơn bạn đã thanh toán!</strong><br>Đơn hàng sẽ được xử lý và giao trong 2-4 ngày.'
              : '<strong>Lưu ý:</strong> Nếu bạn đã thanh toán, đơn hàng sẽ được xử lý sau khi chúng tôi xác nhận.<br>Chúng tôi sẽ liên hệ qua số <strong>' + orderData.phone + '</strong> để xác nhận.'
            }
          </p>
        </div>
      </div>
    `;

    const form = document.querySelector('#order-form');
    if (form) {
      form.innerHTML = successHTML;
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  async function handlePancakeSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('[type="submit"]');

    // Validate form first
    const errors = validateOrderForm(formData);

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

    // Get payment method
    const paymentMethod = form.querySelector('input[name="payment_method"]:checked')?.value || 'bank_transfer';

    // Get address from dropdowns (API v2: no district level)
    const citySelect = document.getElementById('city');
    const wardSelect = document.getElementById('ward');

    const cityName = citySelect?.selectedOptions[0]?.dataset?.name || '';
    const wardName = wardSelect?.selectedOptions[0]?.dataset?.name || '';

    // Prepare order data
    const orderData = {
      name: formData.get('name')?.trim(),
      phone: formData.get('phone')?.trim(),
      address: formData.get('address')?.trim(),
      ward: wardName,
      district: '', // API v2 không có cấp Quận/Huyện
      city: cityName,
      quantity: quantity,
      paymentMethod: paymentMethod
    };

    // Show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="icon-svg--sm" style="display: inline; vertical-align: middle; margin-right: 8px; animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Dang xu ly...
    `;

    // Add spin animation if not exists
    if (!document.querySelector('#pancake-spin-style')) {
      const style = document.createElement('style');
      style.id = 'pancake-spin-style';
      style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    // Submit to Pancake POS
    const result = await createPancakeOrder(orderData);

    if (result.success) {
      // Track conversion (if analytics available)
      trackConversion(orderData, result);

      // Handle based on payment method
      if (result.paymentMethod === 'bank_transfer') {
        // Show QR modal for bank transfer
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        showQRModal(orderData, result);
      } else {
        // COD - show regular success confirmation
        showOrderSuccess(orderData, result);
      }
    } else {
      // Error - restore button and show error
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      showOrderError(form, result.error);
    }
  }

  function validateOrderForm(formData) {
    const errors = {};

    const name = formData.get('name')?.trim();
    const phone = formData.get('phone')?.trim();
    const address = formData.get('address')?.trim();
    const city = formData.get('city');
    const ward = formData.get('ward');

    if (!name) {
      errors.name = 'Vui long nhap ho ten';
    }

    if (!phone) {
      errors.phone = 'Vui long nhap so dien thoai';
    } else if (!/^0\d{9}$/.test(phone.replace(/\s/g, ''))) {
      errors.phone = 'So dien thoai khong hop le (10 so, bat dau bang 0)';
    }

    if (!city) {
      errors.city = 'Vui long chon Tinh/Thanh pho';
    }

    if (!ward) {
      errors.ward = 'Vui long chon Phuong/Xa';
    }

    if (!address) {
      errors.address = 'Vui long nhap dia chi chi tiet';
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

  function showOrderError(form, errorMessage) {
    // Create error message element
    let errorContainer = form.querySelector('.order-error');
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.className = 'order-error';
      errorContainer.style.cssText = 'background: #fee; border: 1px solid #f88; padding: 16px; border-radius: 8px; margin-bottom: 16px; color: #c00;';
      form.insertBefore(errorContainer, form.firstChild);
    }

    errorContainer.innerHTML = `
      <p><strong>Loi:</strong> ${errorMessage}</p>
      <p style="font-size: 14px; margin-top: 8px;">Vui long thu lai hoac goi hotline: <a href="tel:0945139990" style="color: #c00; font-weight: bold;">0945.139.990</a></p>
    `;

    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function showOrderSuccess(orderData, result) {
    const shippingFee = orderData.quantity >= 2 ? 0 : 30000;
    const total = (orderData.quantity * PANCAKE_CONFIG.product.salePrice) + shippingFee;

    const trackingSection = result.trackingLink ? `
      <div style="margin-top: var(--space-4);">
        <a href="${result.trackingLink}" target="_blank" rel="noopener" style="display: inline-block; padding: 12px 24px; background: var(--color-leaf-green); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Theo doi don hang
        </a>
      </div>
    ` : '';

    const successHTML = `
      <div class="order-success" style="text-align: center; padding: var(--space-8);">
        <div style="font-size: 64px; margin-bottom: var(--space-4);">🎉</div>
        <h3 style="color: var(--color-forest-green); margin-bottom: var(--space-4);">Dat hang thanh cong!</h3>
        ${result.orderNumber ? `<p style="margin-bottom: var(--space-2); font-size: 14px; color: #666;">Ma don hang: <strong>#${result.orderNumber}</strong></p>` : ''}
        <p style="margin-bottom: var(--space-2);">Cam on <strong>${orderData.name}</strong> da dat hang.</p>
        <p style="margin-bottom: var(--space-4);">Chung toi se goi dien xac nhan qua so <strong>${orderData.phone}</strong></p>
        <p style="font-size: var(--text-h3); font-weight: 700; color: var(--color-forest-green);">
          Tong thanh toan: ${formatCurrency(total)}
        </p>
        ${trackingSection}
        <div style="margin-top: var(--space-6); padding: var(--space-4); background: var(--color-cream-yellow); border-radius: var(--radius-md);">
          <p style="font-size: 14px;">
            <strong>Thong tin giao hang:</strong><br>
            ${orderData.address}${orderData.district ? ', ' + orderData.district : ''}${orderData.city ? ', ' + orderData.city : ''}
          </p>
        </div>
      </div>
    `;

    const form = document.querySelector('#order-form');
    if (form) {
      form.innerHTML = successHTML;
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'd';
  }

  function trackConversion(orderData, result) {
    // Google Analytics (if available)
    if (typeof gtag === 'function') {
      gtag('event', 'purchase', {
        transaction_id: result.orderId,
        value: orderData.quantity * PANCAKE_CONFIG.product.salePrice,
        currency: 'VND',
        items: [{
          item_id: PANCAKE_CONFIG.product.id,
          item_name: PANCAKE_CONFIG.product.name,
          quantity: orderData.quantity,
          price: PANCAKE_CONFIG.product.salePrice
        }]
      });
    }

    // Facebook Pixel (if available)
    if (typeof fbq === 'function') {
      fbq('track', 'Purchase', {
        value: orderData.quantity * PANCAKE_CONFIG.product.salePrice,
        currency: 'VND',
        content_ids: [PANCAKE_CONFIG.product.id],
        content_type: 'product'
      });
    }

    console.log('Order submitted to Pancake POS:', {
      orderId: result.orderId,
      orderNumber: result.orderNumber,
      customer: orderData.name,
      quantity: orderData.quantity
    });
  }

  // ========================================
  // INITIALIZATION
  // ========================================

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPancakeIntegration);
  } else {
    initPancakeIntegration();
  }
})();
