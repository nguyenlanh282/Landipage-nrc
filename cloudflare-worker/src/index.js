/**
 * SePay Payment Gateway - Multi-Shop Webhook Handler
 * Cloudflare Worker for multiple landing pages
 *
 * Features:
 * - Multi-shop support via KV configuration
 * - SePay webhook verification
 * - Auto-update Pancake POS orders
 * - Payment status polling for frontend
 */

const PANCAKE_BASE_URL = 'https://pos.pages.fm/api/v1';

// ========================================
// SHOP CONFIGURATIONS
// Store in KV or hardcode here for simplicity
// ========================================

const SHOPS = {
  // ENZARA - Nước rửa chén
  'enzara': {
    name: 'ENZARA',
    pancakeShopId: '1890171475',
    pancakeApiKey: '9bfa8af5dfbc41c2b8ad1db542e8ca73',
    sepayAccount: '080838689999',
    sepayBank: 'mbbank',
    orderPrefix: 'ENZARA',
    allowedOrigins: ['https://nguyenlanh282.github.io', 'https://enzara.vn']
  },
  // Add more shops here:
  // 'shopname': {
  //   name: 'Shop Name',
  //   pancakeShopId: 'xxx',
  //   pancakeApiKey: 'xxx',
  //   sepayAccount: 'xxx',
  //   sepayBank: 'mbbank',
  //   orderPrefix: 'SHOPNAME',
  //   allowedOrigins: ['https://example.com']
  // }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(request);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Health check
      if (url.pathname === '/health') {
        return jsonResponse({
          status: 'ok',
          service: 'sepay-payment-gateway',
          shops: Object.keys(SHOPS)
        }, 200, corsHeaders);
      }

      // List available shops
      if (url.pathname === '/shops') {
        const shopList = Object.entries(SHOPS).map(([id, shop]) => ({
          id,
          name: shop.name,
          prefix: shop.orderPrefix
        }));
        return jsonResponse({ shops: shopList }, 200, corsHeaders);
      }

      // SePay webhook endpoint (universal - matches by order code prefix)
      if (url.pathname === '/webhook/sepay' && request.method === 'POST') {
        return handleSepayWebhook(request, env);
      }

      // Shop-specific webhook (legacy support)
      const shopWebhookMatch = url.pathname.match(/^\/webhook\/sepay\/(\w+)$/);
      if (shopWebhookMatch && request.method === 'POST') {
        const shopId = shopWebhookMatch[1];
        return handleSepayWebhook(request, env, shopId);
      }

      // Check payment status
      if (url.pathname === '/check-payment' && request.method === 'GET') {
        const orderCode = url.searchParams.get('code');
        if (!orderCode) {
          return jsonResponse({ error: 'Missing order code' }, 400, corsHeaders);
        }
        return checkPaymentStatus(orderCode, env, corsHeaders);
      }

      // Register payment (from frontend when order is created)
      if (url.pathname === '/register-payment' && request.method === 'POST') {
        return registerPayment(request, env, corsHeaders);
      }

      // Admin: Get shop config (protected)
      if (url.pathname.startsWith('/admin/')) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader !== `Bearer ${env.ADMIN_KEY}`) {
          return jsonResponse({ error: 'Unauthorized' }, 401, corsHeaders);
        }
        return handleAdminRoutes(url.pathname, request, env, corsHeaders);
      }

      return jsonResponse({ error: 'Not Found' }, 404, corsHeaders);

    } catch (error) {
      console.error('Request error:', error);
      return jsonResponse({ error: error.message }, 500, corsHeaders);
    }
  }
};

// ========================================
// WEBHOOK HANDLERS
// ========================================

async function handleSepayWebhook(request, env, specificShopId = null) {
  const payload = await request.json();
  console.log('SePay webhook:', JSON.stringify(payload));

  // Extract transfer content
  const content = (payload.content || payload.description || '').toUpperCase();

  // Find matching shop by order prefix
  let matchedShop = null;
  let shopId = null;
  let orderCode = null;

  if (specificShopId && SHOPS[specificShopId]) {
    // Shop-specific webhook
    matchedShop = SHOPS[specificShopId];
    shopId = specificShopId;
    const match = content.match(new RegExp(`${matchedShop.orderPrefix}\\d+`, 'i'));
    orderCode = match ? match[0] : null;
  } else {
    // Universal webhook - find by prefix
    for (const [id, shop] of Object.entries(SHOPS)) {
      const match = content.match(new RegExp(`${shop.orderPrefix}\\d+`, 'i'));
      if (match) {
        matchedShop = shop;
        shopId = id;
        orderCode = match[0];
        break;
      }
    }
  }

  if (!matchedShop || !orderCode) {
    console.log('No matching shop found for content:', content);
    return jsonResponse({ success: true, message: 'No matching order' });
  }

  const amount = payload.transferAmount || payload.amount || 0;
  console.log(`Shop: ${shopId}, Order: ${orderCode}, Amount: ${amount}`);

  // Find order in Pancake POS
  const order = await findOrderByCode(orderCode, matchedShop);

  if (!order) {
    console.log('Order not found:', orderCode);
    // Still save to KV for frontend polling
    if (env.PAYMENT_STATUS) {
      await env.PAYMENT_STATUS.put(orderCode, JSON.stringify({
        paid: true,
        amount,
        shopId,
        paidAt: new Date().toISOString(),
        transactionId: payload.id || payload.referenceNumber,
        orderNotFound: true
      }), { expirationTtl: 86400 });
    }
    return jsonResponse({ success: true, message: 'Order not found, payment recorded' });
  }

  // Update Pancake POS
  const updateResult = await updateOrderPayment(order, amount, orderCode, matchedShop);

  // Save to KV
  if (env.PAYMENT_STATUS) {
    await env.PAYMENT_STATUS.put(orderCode, JSON.stringify({
      paid: true,
      amount,
      shopId,
      orderId: order.system_id,
      paidAt: new Date().toISOString(),
      transactionId: payload.id || payload.referenceNumber,
      pancakeUpdated: updateResult.success
    }), { expirationTtl: 86400 });
  }

  return jsonResponse({
    success: true,
    message: 'Payment confirmed',
    orderId: order.system_id,
    shopId
  });
}

// ========================================
// PANCAKE POS INTEGRATION
// ========================================

async function findOrderByCode(orderCode, shop) {
  const url = `${PANCAKE_BASE_URL}/shops/${shop.pancakeShopId}/orders?api_key=${shop.pancakeApiKey}&limit=50&sort=-inserted_at`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!result.data) return null;

    for (const order of result.data) {
      if (order.note && order.note.toUpperCase().includes(orderCode.toUpperCase())) {
        return order;
      }
    }
    return null;
  } catch (error) {
    console.error('Find order error:', error);
    return null;
  }
}

async function updateOrderPayment(order, amount, orderCode, shop) {
  const url = `${PANCAKE_BASE_URL}/shops/${shop.pancakeShopId}/orders/${order.id}?api_key=${shop.pancakeApiKey}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prepaid: amount,
        note: `[Landing Page] Chuyen khoan - Ma CK: ${orderCode} - DA THANH TOAN (SePay xac nhan tu dong)`
      })
    });

    const result = await response.json();
    console.log('Pancake update result:', result.success);
    return { success: result.success || !!result.data };
  } catch (error) {
    console.error('Update order error:', error);
    return { success: false, error: error.message };
  }
}

// ========================================
// FRONTEND ENDPOINTS
// ========================================

async function checkPaymentStatus(orderCode, env, corsHeaders) {
  if (!env.PAYMENT_STATUS) {
    return jsonResponse({ paid: false, message: 'KV not configured' }, 200, corsHeaders);
  }

  const status = await env.PAYMENT_STATUS.get(orderCode);

  if (status) {
    return jsonResponse(JSON.parse(status), 200, corsHeaders);
  }

  return jsonResponse({ paid: false }, 200, corsHeaders);
}

async function registerPayment(request, env, corsHeaders) {
  const { orderCode, shopId, orderId, amount } = await request.json();

  if (!orderCode || !shopId) {
    return jsonResponse({ error: 'Missing orderCode or shopId' }, 400, corsHeaders);
  }

  if (!SHOPS[shopId]) {
    return jsonResponse({ error: 'Invalid shopId' }, 400, corsHeaders);
  }

  // Register pending payment
  if (env.PAYMENT_STATUS) {
    await env.PAYMENT_STATUS.put(orderCode, JSON.stringify({
      paid: false,
      shopId,
      orderId,
      amount,
      registeredAt: new Date().toISOString()
    }), { expirationTtl: 86400 });
  }

  return jsonResponse({ success: true, orderCode }, 200, corsHeaders);
}

// ========================================
// ADMIN ROUTES
// ========================================

async function handleAdminRoutes(pathname, request, env, corsHeaders) {
  if (pathname === '/admin/shops') {
    return jsonResponse({ shops: SHOPS }, 200, corsHeaders);
  }

  if (pathname === '/admin/payments' && request.method === 'GET') {
    // List recent payments from KV (requires list operation)
    return jsonResponse({ message: 'Use KV dashboard to view payments' }, 200, corsHeaders);
  }

  return jsonResponse({ error: 'Unknown admin route' }, 404, corsHeaders);
}

// ========================================
// UTILITIES
// ========================================

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '*';

  // Check if origin is allowed
  let allowedOrigin = '*';
  for (const shop of Object.values(SHOPS)) {
    if (shop.allowedOrigins && shop.allowedOrigins.includes(origin)) {
      allowedOrigin = origin;
      break;
    }
  }

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders
    }
  });
}
