# ENZARA Landing Pages - System Architecture

**Version:** 1.0.0
**Last Updated:** 2026-01-30
**Architecture Type:** Jamstack (Static Site + Serverless Functions)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Data Flow Diagrams](#data-flow-diagrams)
4. [Integration Architecture](#integration-architecture)
5. [Deployment Architecture](#deployment-architecture)
6. [Security Architecture](#security-architecture)
7. [Scalability and Performance](#scalability-and-performance)
8. [Monitoring and Logging](#monitoring-and-logging)
9. [Disaster Recovery](#disaster-recovery)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Landing Page │  │ Payment Page │  │ localStorage │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          │ HTTPS            │ HTTPS            │ Client-side
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────────┐
│                    Cloudflare Edge Network                        │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │            Cloudflare Pages (Static Hosting)                 │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │ │
│  │  │  HTML    │  │   CSS    │  │    JS    │  │  Images  │   │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │        Cloudflare Worker (Payment Gateway)                   │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │ │
│  │  │   Webhook    │  │  Payment     │  │   KV Store   │     │ │
│  │  │   Handler    │  │  Verifier    │  │  (24h TTL)   │     │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │ │
│  └─────────────────────────────────────────────────────────────┘ │
└───────────┬──────────────────────┬──────────────────────────────┘
            │                      │
            │ HTTPS API            │ HTTPS Webhook
            │                      │
┌───────────▼──────────┐  ┌────────▼─────────┐  ┌──────────────┐
│   Pancake POS API    │  │ SePay Gateway    │  │   VietQR     │
│   (Order Management) │  │ (Bank Transfers) │  │ (QR Codes)   │
└──────────────────────┘  └──────────────────┘  └──────────────┘
```

### Architecture Principles

1. **Jamstack:** JavaScript, APIs, and Markup
2. **Static-First:** Pre-rendered HTML for performance
3. **Serverless:** Cloudflare Workers for dynamic functionality
4. **Edge Computing:** Global CDN distribution
5. **API-Driven:** Integration via REST APIs
6. **Progressive Enhancement:** Works without JavaScript (forms submit to API)
7. **Mobile-First:** Optimized for mobile devices

---

## System Components

### 1. Frontend Layer (Static Assets)

#### 1.1 Landing Pages
**Technology:** HTML5, CSS3, Vanilla JavaScript
**Deployment:** Cloudflare Pages
**CDN:** Cloudflare Global Network (275+ cities)

**Components:**
- **HTML Templates:** Product-specific landing pages
- **CSS Modules:**
  - `variables.css` - Design tokens (colors, spacing, typography)
  - `base.css` - Reset, typography, global styles
  - `components.css` - UI components (buttons, forms, cards)
  - `sections.css` - Landing page sections
- **JavaScript Modules:**
  - `main.js` - Core functionality (countdown, forms, validation)
  - `animations.js` - Scroll effects, transitions
  - `pancake-integration.js` - Order creation, payment handling

**Features:**
- 16-step AIDA sales funnel structure
- Mobile-responsive design (320px - 1920px)
- Lazy loading for images
- Client-side form validation
- Real-time order summary updates
- Countdown timers and scarcity indicators

#### 1.2 Payment Pages
**Technology:** HTML5, CSS3, JavaScript
**Purpose:** Handle bank transfer QR code display and payment verification

**Components:**
- QR code generation (VietQR API)
- Bank account details display
- 10-minute countdown timer
- Payment status polling (3-second intervals)
- Success/timeout messaging

**Data Storage:** localStorage (temporary, client-side)
```javascript
{
  orderCode: "ENZARA1738234567123",
  amount: 50000,
  orderId: "pancake-order-id",
  orderNumber: "POS-12345",
  customerName: "Nguyen Van A",
  customerPhone: "0945139990",
  createdAt: "2026-01-30T10:00:00Z"
}
```

### 2. Backend Layer (Serverless)

#### 2.1 Cloudflare Worker (Payment Gateway)
**Runtime:** V8 JavaScript Engine
**Location:** Cloudflare Edge (auto-routed to nearest datacenter)
**Execution Time Limit:** 50ms CPU time
**Memory Limit:** 128MB

**Endpoints:**

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/health` | Health check | None |
| GET | `/shops` | List configured shops | None |
| POST | `/webhook/sepay` | SePay webhook receiver | Webhook signature (disabled in dev) |
| GET | `/check-payment?code={code}` | Payment status polling | None |
| POST | `/register-payment` | Register new payment | None |
| GET | `/admin/*` | Admin routes | Bearer token |

**Key Functions:**

1. **Webhook Handler (`handleSepayWebhook`)**
   ```javascript
   async function handleSepayWebhook(request, env) {
     // 1. Verify webhook signature (disabled in dev)
     // 2. Parse transfer description for order code
     // 3. Match shop by order code prefix
     // 4. Find order in Pancake POS
     // 5. Update order.prepaid with amount
     // 6. Store payment status in KV
     // 7. Return success response
   }
   ```

2. **Payment Status Checker (`checkPaymentStatus`)**
   ```javascript
   async function checkPaymentStatus(orderCode, env) {
     // 1. Read from KV store by order code
     // 2. Return payment status
     return { paid: boolean, amount, paidAt, transactionId };
   }
   ```

3. **Order Code Matcher**
   - Supports multi-shop configuration
   - Matches by prefix: `ENZ*` (ENZARA), `TEST*` (Test shop)
   - Example: `ENZARA1738234567123` → Shop: "enzara"

**Shop Configuration:**
```javascript
const SHOPS = {
  'enzara': {
    name: 'ENZARA',
    pancakeShopId: '1890171475',
    pancakeApiKey: '***',
    sepayAccount: '080838689999',
    sepayBank: 'mbbank',
    orderPrefix: 'ENZ',
    allowedOrigins: ['https://enzara.vn', 'https://nguyenlanh282.github.io']
  }
}
```

#### 2.2 KV Store (Payment Status)
**Technology:** Cloudflare Workers KV
**Consistency:** Eventually consistent (global replication)
**Access Pattern:** Read-heavy (polling from frontend)
**TTL:** 24 hours (auto-expiration)

**Data Model:**
```javascript
// Key: orderCode (string)
// Value: JSON object
{
  "paid": true,
  "amount": 50000,
  "shopId": "enzara",
  "orderId": "pancake-order-uuid",
  "paidAt": "2026-01-30T10:30:00Z",
  "transactionId": "sepay-tx-123456",
  "pancakeUpdated": true
}
```

**Operations:**
- `PUT`: Store payment status when webhook received
- `GET`: Retrieve status when frontend polls
- Auto-expire: 24 hours after creation

### 3. External Integrations

#### 3.1 Pancake POS API
**Base URL:** `https://pos.pages.fm/api/v1`
**Authentication:** API Key in query string
**Rate Limits:** Unknown (no documented limits)

**API Endpoints Used:**

1. **Create Order** - `POST /shops/{shopId}/orders`
   ```json
   Request:
   {
     "shipping_address": {
       "full_name": "Nguyen Van A",
       "phone_number": "0945139990",
       "address": "123 Nguyen Trai",
       "full_address": "123 Nguyen Trai, Phuong 1, TP HCM"
     },
     "parent_id": -7,  // Webcake Landing source
     "items": [{
       "variation_id": "bdc46298-8f9d-4a38-a171-57eb6f318132",
       "quantity": 2,
       "price": 50000,
       "is_bonus": false
     }],
     "warehouse_id": "d5b4d4b3-2287-4823-a4f5-fdf25abd4164",
     "payment_method": "bank_transfer",
     "shipping_fee": 0,
     "note": "[Landing Page] Chuyen khoan - SL: 2 chai - Ma CK: ENZARA..."
   }

   Response:
   {
     "success": true,
     "data": {
       "id": "order-uuid",
       "display_id": "POS-12345",
       "system_id": "12345",
       "total_price": 100000,
       "tracking_link": "https://pancake.vn/tracking/...",
       "order_link": "https://pancake.vn/orders/..."
     }
   }
   ```

2. **Update Order** - `PUT /shops/{shopId}/orders/{orderId}`
   ```json
   Request:
   {
     "prepaid": 100000,
     "note": "[Landing Page] Chuyen khoan - Ma CK: ENZARA... - DA THANH TOAN"
   }

   Response:
   {
     "success": true,
     "data": { /* updated order */ }
   }
   ```

3. **List Orders** - `GET /shops/{shopId}/orders?limit=50&sort=-inserted_at`
   - Used to find order by order code in note field
   - Returns recent orders sorted by creation date

**Error Handling:**
- Network errors: Retry with exponential backoff
- API errors: Display user-friendly message
- Validation errors: Show field-specific errors

#### 3.2 SePay Payment Gateway
**Purpose:** Bank transfer payment processing for Vietnamese banks
**Integration Type:** Webhook-based

**VietQR API** - `https://qr.sepay.vn/img`
**Parameters:**
- `acc`: Account number (e.g., 080838689999)
- `bank`: Bank code (e.g., mbbank)
- `amount`: Transfer amount in VND
- `des`: Transfer description (order code)

**QR Code Example:**
```
https://qr.sepay.vn/img?acc=080838689999&bank=mbbank&amount=50000&des=ENZARA1738234567123
```

**Webhook Payload (from SePay):**
```json
{
  "id": "sepay-tx-123456",
  "referenceNumber": "FT123456789",
  "amount": 50000,
  "transferAmount": 50000,
  "content": "ENZARA1738234567123 thanh toan don hang",
  "description": "ENZARA1738234567123",
  "accountNumber": "080838689999",
  "bankCode": "mbbank",
  "createdAt": "2026-01-30T10:30:00Z"
}
```

**Webhook Flow:**
1. Customer transfers money via mobile banking
2. Bank processes transfer
3. SePay receives bank notification
4. SePay sends webhook to Cloudflare Worker
5. Worker parses order code from `content` or `description`
6. Worker updates order and stores status in KV

#### 3.3 Vietnam Provinces API
**Purpose:** Address autocomplete (province/ward selection)
**API:** External third-party service (exact URL in code)
**Usage:** Dropdown population for shipping address

#### 3.4 Google Fonts
**Fonts:**
- Be Vietnam Pro (400, 500, 600, 700, 800)
- Quicksand (500, 600, 700)

**Optimization:**
- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`
- Subset to Vietnamese characters (if available)
- Display swap for faster rendering

---

## Data Flow Diagrams

### Order Creation Flow (COD)

```
User fills form
    ↓
Click "Đặt Hàng - Thanh Toán Khi Nhận"
    ↓
JavaScript validates form
    ↓ (valid)
Call createPancakeOrder({ paymentMethod: 'cod', ... })
    ↓
POST https://pos.pages.fm/api/v1/shops/1890171475/orders
    ↓
Pancake POS creates order
    ↓ (response)
{ success: true, orderId: "...", displayId: "POS-12345" }
    ↓
Display success message
    ↓
Show order number and tracking link
```

### Order Creation Flow (Bank Transfer)

```
User fills form
    ↓
Click "Đặt Hàng - Chuyển Khoản"
    ↓
JavaScript validates form
    ↓ (valid)
Generate order code: ENZARA{timestamp}{random}
    ↓
Call createPancakeOrder({ paymentMethod: 'bank_transfer', orderCode: "..." })
    ↓
POST https://pos.pages.fm/api/v1/shops/1890171475/orders
    ↓
Pancake POS creates order (prepaid: 0)
    ↓ (response)
{ success: true, orderId: "...", orderCode: "ENZARA..." }
    ↓
Save payment data to localStorage
    ↓
Open payment.html in new tab
    ↓
Payment page loads data from localStorage
    ↓
Display QR code: https://qr.sepay.vn/img?...&des=ENZARA...
    ↓
Display bank details and countdown timer (10 min)
    ↓
Start polling: every 3 seconds call /check-payment?code=ENZARA...
```

### Payment Verification Flow

```
Customer scans QR code
    ↓
Transfer money via mobile banking app
    ↓
Bank processes transfer
    ↓
SePay receives bank notification
    ↓
SePay sends webhook to Cloudflare Worker
    ↓
POST https://sepay-payment-gateway.it-nguyenlanh.workers.dev/webhook/sepay
    ↓
Worker parses order code from webhook payload.content
    ↓
Worker matches shop by prefix: ENZARA... → "enzara" shop
    ↓
Worker searches Pancake POS orders for matching note
    ↓
GET https://pos.pages.fm/api/v1/shops/1890171475/orders?limit=50
    ↓ (find order)
PUT https://pos.pages.fm/api/v1/shops/1890171475/orders/{orderId}
    { prepaid: 50000, note: "...DA THANH TOAN..." }
    ↓
Worker stores in KV: ENZARA... → { paid: true, amount: 50000, ... }
    ↓
Frontend polls: GET /check-payment?code=ENZARA...
    ↓
Worker reads from KV
    ↓ (response)
{ paid: true, amount: 50000, paidAt: "..." }
    ↓
Frontend displays success message
    ↓
Stop polling, clear countdown
```

---

## Integration Architecture

### API Integration Patterns

#### 1. REST API Integration (Pancake POS)
**Pattern:** Request-Response
**Protocol:** HTTPS
**Authentication:** API Key (query parameter)
**Data Format:** JSON

**Error Handling Strategy:**
```javascript
async function callPancakeAPI(endpoint, options) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return await response.json();
      }

      if (response.status >= 500) {
        // Server error - retry
        attempt++;
        await sleep(Math.pow(2, attempt) * 1000);
        continue;
      }

      // Client error - don't retry
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      attempt++;
      await sleep(Math.pow(2, attempt) * 1000);
    }
  }
}
```

#### 2. Webhook Integration (SePay)
**Pattern:** Event-Driven (Push)
**Protocol:** HTTPS POST
**Authentication:** Signature verification (disabled in dev)
**Data Format:** JSON

**Webhook Receiver Pattern:**
```javascript
async function handleWebhook(request, env) {
  // 1. Verify signature
  const isValid = verifySepayWebhook(request, env);
  if (!isValid) return jsonResponse({ error: 'Unauthorized' }, 401);

  // 2. Parse payload
  const payload = await request.json();

  // 3. Process asynchronously (idempotent)
  const orderCode = extractOrderCode(payload.content);

  // 4. Update systems
  await updateOrder(orderCode, payload.amount);

  // 5. Respond quickly (SePay expects fast response)
  return jsonResponse({ success: true });
}
```

**Idempotency:** Same webhook can be received multiple times
- Check if payment already processed in KV
- Skip update if already marked as paid

#### 3. Client-Side Polling (Payment Status)
**Pattern:** Polling
**Interval:** 3 seconds
**Timeout:** 10 minutes
**Fallback:** Manual check button

```javascript
let pollCount = 0;
const maxPolls = 200; // 10 minutes at 3-second intervals

const pollInterval = setInterval(async () => {
  pollCount++;

  if (pollCount >= maxPolls) {
    clearInterval(pollInterval);
    showTimeoutMessage();
    return;
  }

  const status = await checkPaymentStatus(orderCode);

  if (status.paid) {
    clearInterval(pollInterval);
    showSuccessMessage();
  }
}, 3000);
```

---

## Deployment Architecture

### Cloudflare Pages Deployment

**Build Configuration:**
```yaml
Framework: None (Static Site)
Build Command: (none)
Build Output Directory: /
Root Directory: /
Branch: master
```

**Deployment Process:**
1. Push code to GitHub repository
2. Cloudflare Pages auto-deploys on git push
3. Build runs on Cloudflare's build system
4. Assets distributed to 275+ edge locations globally
5. HTTPS certificate auto-provisioned (Let's Encrypt)

**Environment Variables:**
- None required for static site
- Worker secrets set via `wrangler secret put`

### Cloudflare Worker Deployment

**Deployment via Wrangler CLI:**
```bash
cd cloudflare-worker
wrangler deploy
```

**Secrets Management:**
```bash
# Set secrets (not in code)
wrangler secret put SEPAY_WEBHOOK_SECRET
wrangler secret put ADMIN_KEY
```

**Configuration (`wrangler.toml`):**
```toml
name = "sepay-payment-gateway"
main = "src/index.js"
compatibility_date = "2024-01-01"
account_id = "d4a30462b305677d4a98c834d8e5f06c"

[[kv_namespaces]]
binding = "PAYMENT_STATUS"
id = "c7c7142e2a1d4eaca7ecaabdaceed881"
```

### Custom Domain Mapping

**Primary Domain:** `enzara.vn`
**Subdomains (planned):**
- `www.enzara.vn` → Main site
- `nuoc-rua-chen-dua.enzara.vn` → Pineapple dish soap
- `nuoc-rua-chen-gung.enzara.vn` → Ginger dish soap

**DNS Configuration:**
- CNAME record: `enzara.vn` → `nguyenlanh282.github.io`
- Or A/AAAA records to Cloudflare Pages IP

---

## Security Architecture

### Frontend Security

1. **HTTPS Enforced**
   - All traffic over TLS 1.3
   - Auto-redirect HTTP to HTTPS
   - HSTS header enabled

2. **Content Security Policy (CSP)**
   ```
   Content-Security-Policy:
     default-src 'self';
     script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
     style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
     img-src 'self' https://qr.sepay.vn data:;
     connect-src 'self' https://pos.pages.fm https://*.workers.dev;
   ```

3. **XSS Protection**
   - Input sanitization via built-in browser protections
   - No use of `eval()` or `innerHTML` with user data
   - Use `textContent` for dynamic text

4. **CSRF Protection**
   - Not needed (no cookies, no session state)
   - API calls use CORS

### Backend Security (Cloudflare Worker)

1. **API Key Security**
   - Stored as Worker secrets (not in code)
   - Accessed via `env.PANCAKE_API_KEY`
   - Never exposed to client

2. **Webhook Authentication**
   - Signature verification (disabled in dev, should enable in prod)
   - IP whitelist (optional, via Cloudflare firewall)

3. **CORS Configuration**
   ```javascript
   const allowedOrigins = [
     'https://enzara.vn',
     'https://nguyenlanh282.github.io'
   ];

   if (allowedOrigins.includes(origin)) {
     headers['Access-Control-Allow-Origin'] = origin;
   }
   ```

4. **Rate Limiting**
   - Cloudflare automatic DDoS protection
   - Worker CPU time limits (50ms)
   - Custom rate limiting (if needed via KV)

### Data Security

1. **Customer Data**
   - Transmitted over HTTPS only
   - No storage in frontend (except temporary localStorage)
   - Stored in Pancake POS (third-party responsibility)

2. **Payment Data**
   - No card numbers stored
   - Bank transfer uses SePay (PCI DSS compliant)
   - Order codes are non-sensitive (random, unpredictable)

3. **KV Data**
   - Auto-expires after 24 hours
   - No sensitive data (payment status only, not customer info)
   - Eventually consistent (acceptable for payment status)

---

## Scalability and Performance

### Frontend Scalability

**Cloudflare Pages:**
- Auto-scales to handle millions of requests
- 275+ edge locations globally
- HTTP/2 and HTTP/3 support
- Brotli compression
- Smart caching (static assets cached indefinitely)

**Performance Optimizations:**
- Minified CSS/JS (optional, not critical for small files)
- Lazy loading images
- Inline critical CSS
- Defer non-critical JavaScript
- Font display: swap

**Lighthouse Scores Target:**
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95

### Backend Scalability

**Cloudflare Worker:**
- Auto-scales globally
- No cold starts (always warm)
- Handles 10M+ requests/day (free tier: 100k/day)
- Sub-millisecond response time

**KV Store:**
- Scales to billions of keys
- Eventually consistent (global replication)
- Read-optimized (good for polling pattern)
- 1000 writes/second per key (more than sufficient)

### Database Scalability

**Pancake POS:**
- Managed by Pancake (assumed to scale)
- Rate limits unknown (assume reasonable)
- Retry logic handles temporary failures

---

## Monitoring and Logging

### Frontend Monitoring

**Tools:**
- Google Analytics (optional, not implemented yet)
- Cloudflare Web Analytics (privacy-friendly)
- Real User Monitoring (RUM) via Cloudflare

**Metrics:**
- Page load time
- Conversion rate (visitors → orders)
- Bounce rate
- Form abandonment rate

### Backend Monitoring

**Cloudflare Worker Analytics:**
- Request count
- Success rate (2xx responses)
- Error rate (4xx, 5xx responses)
- CPU time usage
- Invocations per day

**Logging:**
```bash
# Tail logs in real-time
wrangler tail

# Filter by status code
wrangler tail --status=error
```

**Custom Logging:**
```javascript
console.log('Payment webhook received:', {
  orderCode,
  amount,
  shopId
});

console.error('Order update failed:', error);
```

### Error Tracking

**Strategy:**
- Log all errors to Cloudflare Worker logs
- Alert on high error rates (manual check for now)
- Future: Integrate with Sentry or similar service

---

## Disaster Recovery

### Backup Strategy

**Static Assets:**
- Source code: GitHub repository (primary)
- Version control: Git commits (full history)
- No backups needed (can redeploy from git)

**Worker Code:**
- Source code: GitHub repository
- Deployed version: Cloudflare stores deployed version
- Rollback: `wrangler rollback`

**KV Data:**
- TTL: 24 hours (expires automatically)
- Not critical (payment status can be re-verified)
- No backup needed

### Failure Scenarios

1. **Cloudflare Pages Down**
   - **Probability:** Very low (99.99% uptime SLA)
   - **Impact:** Site unavailable
   - **Mitigation:** Cloudflare's redundancy handles this
   - **Recovery:** Automatic (Cloudflare handles)

2. **Cloudflare Worker Down**
   - **Probability:** Very low
   - **Impact:** Payment verification unavailable
   - **Mitigation:** Orders still created (COD still works)
   - **Recovery:** Automatic (Cloudflare handles)

3. **Pancake POS API Down**
   - **Probability:** Low
   - **Impact:** Cannot create orders
   - **Mitigation:** Show error message, collect customer info manually
   - **Recovery:** Retry when API is back up

4. **SePay Down**
   - **Probability:** Low
   - **Impact:** Bank transfer QR code may not work
   - **Mitigation:** Fallback to COD, manual bank transfer info
   - **Recovery:** Wait for SePay to restore

### Rollback Procedures

**Frontend Rollback:**
```bash
# Cloudflare Pages: Use dashboard to rollback to previous deployment
# Or redeploy from previous git commit
git revert <commit-hash>
git push origin master
```

**Worker Rollback:**
```bash
wrangler rollback [deployment-id]
# Or redeploy previous version
git checkout <previous-commit>
cd cloudflare-worker
wrangler deploy
```

---

## Future Architecture Improvements

1. **Implement Webhook Signature Verification**
   - Add SePay signature validation
   - Prevent unauthorized webhook calls

2. **Add Caching Layer**
   - Cache product data in KV or R2
   - Reduce API calls to Pancake POS

3. **Implement Queue System**
   - Use Cloudflare Queues for order processing
   - Retry failed orders automatically

4. **Add Analytics Pipeline**
   - Stream events to analytics platform
   - Real-time conversion tracking

5. **Multi-Region Failover**
   - Backup payment gateway
   - Alternative order creation method

6. **API Gateway**
   - Centralize all external API calls
   - Rate limiting and monitoring

---

**Document Version:** 1.0.0
**Last Updated:** 2026-01-30
**Architecture Owner:** ENZARA Development Team
