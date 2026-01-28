/**
 * ENZARA SePay Webhook Handler
 * Cloudflare Worker to receive SePay payment notifications
 * and update Pancake POS order status
 */

const PANCAKE_BASE_URL = 'https://pos.pages.fm/api/v1';

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', service: 'enzara-sepay-webhook' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // SePay webhook endpoint
    if (url.pathname === '/webhook/sepay' && request.method === 'POST') {
      return handleSepayWebhook(request, env);
    }

    // Check payment status endpoint (for frontend polling)
    if (url.pathname === '/check-payment' && request.method === 'GET') {
      const orderCode = url.searchParams.get('code');
      if (!orderCode) {
        return jsonResponse({ error: 'Missing order code' }, 400);
      }
      return checkPaymentStatus(orderCode, env);
    }

    return new Response('Not Found', { status: 404 });
  }
};

/**
 * Handle SePay webhook notification
 * SePay sends: { id, gateway, transactionDate, accountNumber, code, content, transferType, transferAmount, ... }
 */
async function handleSepayWebhook(request, env) {
  try {
    const payload = await request.json();

    console.log('SePay webhook received:', JSON.stringify(payload));

    // Extract order code from transfer content
    // Format: ENZARA1706529600123
    const content = payload.content || payload.description || '';
    const orderCodeMatch = content.match(/ENZARA\d+/i);

    if (!orderCodeMatch) {
      console.log('No ENZARA order code found in content:', content);
      return jsonResponse({ success: true, message: 'No matching order code' });
    }

    const orderCode = orderCodeMatch[0].toUpperCase();
    const amount = payload.transferAmount || payload.amount || 0;

    console.log(`Processing payment: ${orderCode}, amount: ${amount}`);

    // Find order in Pancake POS by searching notes
    const order = await findOrderByCode(orderCode, env);

    if (!order) {
      console.log('Order not found for code:', orderCode);
      return jsonResponse({ success: true, message: 'Order not found' });
    }

    console.log(`Found order #${order.system_id}, total: ${order.total_price}`);

    // Verify amount matches (allow small variance for fees)
    const expectedAmount = order.total_price || order.money_to_collect;
    const amountDiff = Math.abs(amount - expectedAmount);

    if (amountDiff > 1000) { // Allow 1000 VND variance
      console.log(`Amount mismatch: received ${amount}, expected ${expectedAmount}`);
      // Still update but note the discrepancy
    }

    // Update order status in Pancake POS
    const updateResult = await updateOrderPayment(order.id, amount, orderCode, env);

    if (updateResult.success) {
      console.log(`Order #${order.system_id} marked as paid`);

      // Store payment confirmation in KV (for frontend polling)
      if (env.PAYMENT_STATUS) {
        await env.PAYMENT_STATUS.put(orderCode, JSON.stringify({
          paid: true,
          amount: amount,
          orderId: order.system_id,
          paidAt: new Date().toISOString(),
          transactionId: payload.id || payload.referenceNumber
        }), { expirationTtl: 86400 }); // 24 hour TTL
      }

      return jsonResponse({
        success: true,
        message: 'Payment confirmed',
        orderId: order.system_id
      });
    } else {
      console.error('Failed to update order:', updateResult.error);
      return jsonResponse({ success: false, error: 'Failed to update order' }, 500);
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return jsonResponse({ success: false, error: error.message }, 500);
  }
}

/**
 * Find order in Pancake POS by order code in notes
 */
async function findOrderByCode(orderCode, env) {
  const url = `${PANCAKE_BASE_URL}/shops/${env.PANCAKE_SHOP_ID}/orders?api_key=${env.PANCAKE_API_KEY}&limit=50&sort=-inserted_at`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!result.data || !Array.isArray(result.data)) {
      return null;
    }

    // Search for order with matching code in note
    for (const order of result.data) {
      if (order.note && order.note.includes(orderCode)) {
        return order;
      }
    }

    return null;
  } catch (error) {
    console.error('Error finding order:', error);
    return null;
  }
}

/**
 * Update order payment status in Pancake POS
 */
async function updateOrderPayment(orderId, amount, orderCode, env) {
  const url = `${PANCAKE_BASE_URL}/shops/${env.PANCAKE_SHOP_ID}/orders/${orderId}?api_key=${env.PANCAKE_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prepaid: amount,
        note: `[Landing Page] Chuyen khoan - Ma CK: ${orderCode} - DA THANH TOAN (SePay xac nhan)`
      })
    });

    const result = await response.json();
    return { success: result.success || !!result.data, data: result.data };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Check payment status (for frontend polling)
 */
async function checkPaymentStatus(orderCode, env) {
  if (!env.PAYMENT_STATUS) {
    return jsonResponse({ paid: false, message: 'KV not configured' });
  }

  const status = await env.PAYMENT_STATUS.get(orderCode);

  if (status) {
    return jsonResponse(JSON.parse(status), 200, {
      'Access-Control-Allow-Origin': '*'
    });
  }

  return jsonResponse({ paid: false }, 200, {
    'Access-Control-Allow-Origin': '*'
  });
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

function handleCORS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
