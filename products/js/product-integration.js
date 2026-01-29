/* ENZARA Product Pages - Pancake POS & SePay Integration */

(function() {
  'use strict';

  // ========================================
  // PANCAKE POS API CONFIGURATION
  // ========================================

  const PANCAKE_CONFIG = {
    baseUrl: 'https://pos.pages.fm/api/v1',
    shopId: '1890171475',
    apiKey: '9bfa8af5dfbc41c2b8ad1db542e8ca73',
    warehouseId: 'd5b4d4b3-2287-4823-a4f5-fdf25abd4164',
    orderSource: -7,

    // Products configuration
    products: {
      'nuoc-rua-chen-dua': {
        id: '64adb4dd-3600-4945-8a4d-aba9f1dc0d3a',
        variationId: 'bdc46298-8f9d-4a38-a171-57eb6f318132',
        name: 'Nuoc Rua Chen Huu Co ENZARA Huong Dua 500g',
        price: 75000,
        salePrice: 50000
      },
      'nuoc-rua-chen-gung': {
        id: '64adb4dd-3600-4945-8a4d-aba9f1dc0d3b', // Update with actual ID
        variationId: 'bdc46298-8f9d-4a38-a171-57eb6f318133', // Update with actual ID
        name: 'Nuoc Rua Chen Huu Co ENZARA Chiet Xuat Gung 500g',
        price: 75000,
        salePrice: 50000
      }
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
    workerUrl: 'https://sepay-payment-gateway.it-nguyenlanh.workers.dev'
  };

  // ========================================
  // DETECT CURRENT PRODUCT
  // ========================================

  function detectProduct() {
    const path = window.location.pathname;
    if (path.includes('nuoc-rua-chen-gung')) {
      return 'nuoc-rua-chen-gung';
    }
    return 'nuoc-rua-chen-dua'; // default
  }

  const currentProductKey = detectProduct();
  const currentProduct = PANCAKE_CONFIG.products[currentProductKey];

  // ========================================
  // UTILITIES
  // ========================================

  function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  }

  function generateOrderCode() {
    const prefix = currentProductKey === 'nuoc-rua-chen-gung' ? 'ENZG' : 'ENZD';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  function buildQRUrl(amount, orderCode) {
    const params = new URLSearchParams({
      acc: SEPAY_CONFIG.accountNumber,
      bank: SEPAY_CONFIG.bankCode,
      amount: amount.toString(),
      des: orderCode
    });
    return `${SEPAY_CONFIG.qrApiUrl}?${params.toString()}`;
  }

  function buildApiUrl(endpoint) {
    return `${PANCAKE_CONFIG.baseUrl}/shops/${PANCAKE_CONFIG.shopId}${endpoint}?api_key=${PANCAKE_CONFIG.apiKey}`;
  }

  // ========================================
  // CREATE PANCAKE ORDER
  // ========================================

  async function createPancakeOrder(orderData) {
    const url = buildApiUrl('/orders');

    const addressParts = [orderData.address];
    if (orderData.ward) addressParts.push(orderData.ward);
    if (orderData.city) addressParts.push(orderData.city);
    const fullAddress = addressParts.join(', ');

    const shippingFee = orderData.quantity >= 2 ? 0 : 30000;
    const itemTotal = orderData.quantity * currentProduct.salePrice;
    const total = itemTotal + shippingFee;

    const orderCode = generateOrderCode();

    const payload = {
      shipping_address: {
        full_name: orderData.fullName,
        phone_number: orderData.phone,
        address: orderData.address,
        full_address: fullAddress
      },
      parent_id: PANCAKE_CONFIG.orderSource,
      items: [{
        variation_id: currentProduct.variationId,
        quantity: orderData.quantity,
        price: currentProduct.salePrice,
        is_bonus: false
      }],
      warehouse_id: PANCAKE_CONFIG.warehouseId,
      payment_method: 'bank_transfer',
      shipping_fee: shippingFee,
      note: `[Landing Page] Chuyen khoan - ${currentProduct.name} - SL: ${orderData.quantity} - Ma CK: ${orderCode}`
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success || result.data) {
        return {
          success: true,
          orderId: result.data?.id || result.data?.order_id,
          orderNumber: result.data?.display_id || result.data?.system_id,
          orderCode: orderCode,
          total: result.data?.total_price || total,
          data: result.data
        };
      } else {
        console.error('Pancake POS Error:', result);
        return {
          success: false,
          error: result.message || 'Không thể tạo đơn hàng',
          orderCode: orderCode,
          total: total
        };
      }
    } catch (error) {
      console.error('Network Error:', error);
      // Still return order code for fallback
      return {
        success: false,
        error: 'Lỗi kết nối. Đơn hàng sẽ được xử lý thủ công.',
        orderCode: orderCode,
        total: total,
        networkError: true
      };
    }
  }

  // ========================================
  // REGISTER PAYMENT WITH SEPAY WORKER
  // ========================================

  async function registerPayment(orderCode, amount) {
    try {
      const response = await fetch(`${SEPAY_CONFIG.workerUrl}/register-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderCode: orderCode,
          shopId: 'enzara',
          amount: amount
        })
      });
      const data = await response.json();
      console.log('Payment registered:', data);
      return data;
    } catch (error) {
      console.error('Register payment error:', error);
      return null;
    }
  }

  // ========================================
  // FORM SUBMISSION HANDLER
  // ========================================

  async function handleOrderSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Đang xử lý...
    `;

    // Add spin animation
    if (!document.querySelector('#spin-style')) {
      const style = document.createElement('style');
      style.id = 'spin-style';
      style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    // Collect form data
    const orderData = {
      fullName: form.querySelector('#fullName').value.trim(),
      phone: form.querySelector('#phone').value.trim(),
      city: form.querySelector('#city').options[form.querySelector('#city').selectedIndex]?.text || '',
      ward: form.querySelector('#ward').options[form.querySelector('#ward').selectedIndex]?.text || '',
      address: form.querySelector('#address').value.trim(),
      note: form.querySelector('#note')?.value?.trim() || '',
      quantity: parseInt(form.querySelector('#quantity').value) || 1
    };

    // Calculate totals
    const subtotal = orderData.quantity * currentProduct.salePrice;
    const shipping = orderData.quantity >= 2 ? 0 : 30000;
    const total = subtotal + shipping;

    // Create order in Pancake POS
    const result = await createPancakeOrder(orderData);

    // Register payment with SePay worker
    await registerPayment(result.orderCode, result.total || total);

    // Save order data to localStorage for payment page
    const paymentData = {
      ...orderData,
      productKey: currentProductKey,
      productName: currentProduct.name,
      subtotal: subtotal,
      shipping: shipping,
      total: result.total || total,
      orderCode: result.orderCode,
      orderId: result.orderId,
      orderNumber: result.orderNumber,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('enzaraOrder', JSON.stringify(paymentData));

    // Redirect to payment page
    window.location.href = 'payment.html';
  }

  // ========================================
  // INITIALIZATION
  // ========================================

  function init() {
    const form = document.getElementById('orderForm');
    if (form) {
      form.addEventListener('submit', handleOrderSubmit);
    }

    // Update product info display if needed
    console.log('Product Integration initialized for:', currentProductKey);
    console.log('Product:', currentProduct);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging
  window.ENZARA_INTEGRATION = {
    config: PANCAKE_CONFIG,
    sepay: SEPAY_CONFIG,
    currentProduct: currentProduct,
    generateOrderCode: generateOrderCode,
    buildQRUrl: buildQRUrl
  };
})();
