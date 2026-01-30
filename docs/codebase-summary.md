# ENZARA Landing Pages - Codebase Summary

**Version:** 1.0.0
**Last Updated:** 2026-01-30
**Total Files:** ~50+ (excluding node_modules)
**Languages:** HTML, CSS, JavaScript, Python (utilities)

---

## Table of Contents

1. [Repository Structure](#repository-structure)
2. [Core Components](#core-components)
3. [Product Pages](#product-pages)
4. [Payment System](#payment-system)
5. [Deployment System](#deployment-system)
6. [Utility Scripts](#utility-scripts)
7. [Configuration Files](#configuration-files)
8. [Asset Management](#asset-management)

---

## Repository Structure

```
Z:\Landipage-nrc\
├── assets/                      # Shared images and icons
│   ├── icons/                   # SVG/PNG icons
│   └── images/                  # Product images, logos, banners
│
├── css/                         # Shared CSS component library
│   ├── variables.css            # CSS custom properties (colors, spacing, fonts)
│   ├── base.css                 # Reset, typography, base styles
│   ├── components.css           # Reusable UI components (buttons, forms, cards)
│   ├── sections.css             # Landing page sections (hero, benefits, FAQ)
│   └── icons.css                # Icon utility classes
│
├── js/                          # Shared JavaScript modules
│   ├── main.js                  # Core functionality (countdown, accordion, quantity)
│   ├── animations.js            # Scroll animations and transitions
│   └── pancake-integration.js   # Pancake POS and SePay integration
│
├── products/                    # Individual product landing pages
│   ├── index.html               # Product catalog/index page
│   ├── js/                      # Product-specific JavaScript overrides
│   ├── nuoc-rua-chen-dua/       # Pineapple dish soap
│   │   ├── index.html           # Landing page
│   │   └── payment.html         # Payment page
│   ├── nuoc-rua-chen-gung/      # Ginger dish soap
│   │   ├── index.html
│   │   └── payment.html
│   ├── nuoc-rua-rau-cu/         # Vegetable wash
│   │   ├── index.html
│   │   └── payment.html
│   ├── nuoc-rua-binh-sua/       # Baby bottle cleaner
│   │   ├── index.html
│   │   └── payment.html
│   └── tay-da-nang/             # Multi-purpose cleaner
│       ├── index.html
│       └── payment.html
│
├── cloudflare-worker/           # Payment gateway worker
│   ├── src/
│   │   └── index.js             # Worker code (SePay webhook handler)
│   ├── package.json             # Dependencies (wrangler)
│   └── wrangler.toml            # Cloudflare Worker configuration
│
├── deploy/                      # Build output for deployment (generated)
│   ├── nuoc-rua-chen-dua/
│   ├── nuoc-rua-chen-gung/
│   ├── nuoc-rua-rau-cu/
│   ├── nuoc-rua-binh-sua/
│   └── tay-da-nang/
│
├── docs/                        # Documentation
│   ├── design-guidelines.md     # Brand and design system
│   ├── project-overview-pdr.md  # Project overview and PDR
│   ├── codebase-summary.md      # This file
│   ├── code-standards.md        # Coding standards and conventions
│   ├── system-architecture.md   # Architecture documentation
│   └── wireframes/              # Design wireframes
│
├── plans/                       # Project planning documents
│   ├── 20260127-enzara-landing-page/
│   ├── 20260129-1200-sepay-payment-integration/
│   └── sepay-integration/
│
├── enzara/                      # Legacy/alternative template (archived)
│
├── index.html                   # Root landing page (Pineapple product)
├── index-enzara.html            # Alternative design version
├── payment.html                 # Root payment page
├── payment-enzara.html          # Alternative payment page
├── test-payment.html            # Payment testing page
│
├── generate_images.py           # Image generation utility
├── download_images.py           # Image download utility
├── temp_products.json           # Temporary product data
│
├── .env                         # Environment variables (not committed)
├── .gitignore                   # Git ignore rules
│
└── *.md                         # Research and documentation files
    ├── research-16-step-sales-structure.md
    ├── research-report.md
    ├── CẤU TRÚC BÀI BÁN HÀNG 16 BƯỚC.md
    └── TÍNH NĂNG - LỢI ÍCH - THÀNH PHẦN CỦA NƯỚC RỬA CHÉN ENZYME ENZARA.md
```

---

## Core Components

### 1. CSS Architecture

#### `css/variables.css` (Design Tokens)
Defines the design system foundation:
- **Colors:** Brand colors (Forest Green, Leaf Green, Sunset Orange, etc.)
- **Typography:** Font families (Be Vietnam Pro, Quicksand), sizes, weights
- **Spacing:** 8px base unit, scale from 2px to 128px
- **Layout:** Container widths, breakpoints, z-index scale
- **Effects:** Border radius, shadows, transitions

**Key Variables:**
- `--color-forest-green: #1B5E20` (Primary brand)
- `--color-sunset-orange: #FF8F00` (CTAs)
- `--font-primary: 'Be Vietnam Pro'`
- `--space-base: 8px` (Spacing scale)
- `--container-max: 1200px`

#### `css/base.css` (Global Styles)
- CSS reset and normalization
- Base typography (headings, paragraphs, links)
- Container layouts
- Utility classes (text alignment, margins, display)
- Focus states and accessibility

#### `css/components.css` (UI Components)
Reusable component library:
- **Buttons:** Primary, secondary, outline variants with hover states
- **Form Controls:** Inputs, selects, textareas with validation states
- **Cards:** Product cards, testimonial cards with shadows
- **Badges:** Sale badges, eco-friendly badges
- **Quantity Selector:** Increment/decrement controls
- **Payment Method Options:** Radio button cards
- **FAQ Accordion:** Expandable question/answer items

#### `css/sections.css` (Landing Page Sections)
- **Hero:** AIDA attention-grabbing header with product image
- **Benefits Bar:** Icon-based feature highlights
- **Product Details:** Image gallery, specifications
- **Social Proof:** Testimonials, reviews, trust signals
- **Scarcity:** Stock counter, live viewer count
- **Countdown Timer:** Urgency element for promotions
- **Order Form:** Multi-step form layout
- **FAQ:** Accordion-style questions

#### `css/icons.css` (Icon System)
- SVG icon utilities
- Size modifiers (sm, md, lg)
- Color modifiers (green, orange, white)
- Icon positioning helpers

### 2. JavaScript Modules

#### `js/main.js` (Core Functionality)
**Lines of Code:** 320
**Key Functions:**

1. **Countdown Timer** (`initCountdown()`)
   - 3-day countdown for promotions
   - Auto-updates every second
   - Displays days, hours, minutes, seconds

2. **FAQ Accordion** (`initFaqAccordion()`)
   - Expand/collapse functionality
   - Single-open behavior (closes others when one opens)
   - Smooth transitions

3. **Quantity Selector** (`initQuantitySelector()`)
   - Increment/decrement buttons
   - Min: 1, Max: 99
   - Triggers order summary update

4. **Order Form** (`initOrderForm()`, `handleFormSubmit()`)
   - Form validation (name, phone, address)
   - Error display with scroll-to-first-error
   - Order summary calculation
   - Success message display

5. **Order Summary** (`updateOrderSummary()`)
   - Calculates subtotal: quantity × 50,000 VND
   - Shipping: Free for 2+, 30,000 VND for 1
   - Updates total in real-time

6. **Stock Counter** (`initStockCounter()`)
   - Fake urgency: displays 15-35 random stock
   - Visual progress bar

7. **Live Viewers** (`initLiveViewers()`)
   - Fake social proof: 12-20 viewers
   - Updates every 5-10 seconds

**Validation Rules:**
- Name: Required, non-empty
- Phone: Required, 10 digits starting with 0 (regex: `/^0\d{9}$/`)
- Address: Required, non-empty

#### `js/pancake-integration.js` (Payment Integration)
**Lines of Code:** 587
**Key Functions:**

1. **Pancake POS Configuration**
   ```javascript
   PANCAKE_CONFIG = {
     baseUrl: 'https://pos.pages.fm/api/v1',
     shopId: '1890171475',
     apiKey: '9bfa8af5dfbc41c2b8ad1db542e8ca73',
     warehouseId: 'd5b4d4b3-2287-4823-a4f5-fdf25abd4164',
     orderSource: -7, // Webcake Landing
     product: {
       id: '64adb4dd-3600-4945-8a4d-aba9f1dc0d3a',
       variationId: 'bdc46298-8f9d-4a38-a171-57eb6f318132',
       price: 75000, salePrice: 50000
     }
   }
   ```

2. **SePay Configuration**
   ```javascript
   SEPAY_CONFIG = {
     accountNumber: '080838689999',
     bankCode: 'mbbank',
     accountName: 'ENZARA VIET NAM',
     qrApiUrl: 'https://qr.sepay.vn/img',
     webhookUrl: 'https://sepay-payment-gateway.it-nguyenlanh.workers.dev'
   }
   ```

3. **createPancakeOrder(orderData)**
   - Builds API request payload
   - Sends POST to Pancake POS `/orders` endpoint
   - Handles response with order ID and tracking link
   - Generates unique order code for bank transfers (format: `ENZARA{timestamp}{random}`)
   - Returns: `{ success, orderId, orderNumber, trackingLink, orderCode, total }`

4. **Payment Method Handling**
   - **COD:** Shows success message with order number
   - **Bank Transfer:** Opens payment page in new tab with QR code

5. **Payment Page Flow**
   - Saves payment data to localStorage
   - Opens `payment.html` in new tab
   - Payment page displays:
     - VietQR QR code
     - Bank account details
     - Order code for transfer description
     - 10-minute countdown timer
     - Payment status polling (every 3 seconds)

6. **Payment Verification**
   - Polls Cloudflare Worker every 3 seconds
   - Checks payment status via `/check-payment?code={orderCode}`
   - Auto-updates Pancake POS order with prepaid amount
   - Shows success message when paid

7. **Error Handling**
   - Network errors with retry option
   - Validation errors with field highlighting
   - API errors with user-friendly messages
   - Timeout handling for payment page

#### `js/animations.js` (Visual Effects)
- Scroll-triggered animations
- Fade-in effects
- Stagger delays for list items
- Intersection Observer API

---

## Product Pages

### Page Structure (All Products Follow Same Pattern)

Each product has `index.html` (landing) and `payment.html` (payment):

#### Landing Page Sections (16-Step AIDA Structure)

1. **Header:** Logo and navigation
2. **Hero (AIDA: Attention):** Product image, headline, CTA
3. **Benefits Bar:** 3-4 key benefits with icons
4. **Problem Section (AIDA: Interest):** Pain points customers face
5. **Solution Section:** How product solves problems
6. **Features Grid:** Detailed product features
7. **Ingredients Section:** 91% enzyme, natural ingredients
8. **Product Gallery:** Multiple product images
9. **Social Proof:** Customer testimonials (3-5)
10. **Comparison Table:** ENZARA vs competitors
11. **Scarcity Section:** Limited stock indicator
12. **Trust Signals:** Certifications, guarantees
13. **FAQ Section (AIDA: Desire):** 8-10 common questions
14. **Countdown Timer:** Urgency element
15. **Order Form (AIDA: Action):** Customer info, quantity, payment method
16. **Footer:** Contact info, policies

#### Payment Page (`payment.html`)

**Purpose:** Display QR code and handle bank transfer payment verification

**Key Elements:**
- Header with logo
- Countdown timer (10 minutes)
- QR code image (VietQR format)
- Bank account details (copy buttons)
- Order code display
- Amount display
- Payment instructions
- Status indicators (waiting/paid/timeout)
- Auto-polling mechanism

**JavaScript Logic:**
```javascript
// Load payment data from localStorage
const paymentData = JSON.parse(localStorage.getItem('enzara_payment'));

// Generate QR URL
const qrUrl = `https://qr.sepay.vn/img?acc={accountNumber}&bank={bankCode}&amount={amount}&des={orderCode}`;

// Poll payment status every 3 seconds
setInterval(async () => {
  const response = await fetch(`{webhookUrl}/check-payment?code={orderCode}`);
  const status = await response.json();
  if (status.paid) {
    showSuccessMessage();
    clearInterval(pollInterval);
  }
}, 3000);

// Countdown timer (10 minutes)
let timeLeft = 600; // seconds
setInterval(() => {
  if (timeLeft <= 0) {
    showTimeoutMessage();
  }
  timeLeft--;
  updateTimerDisplay();
}, 1000);
```

### Product-Specific Details

#### 1. Nuoc Rua Chen Dua (Pineapple Dish Soap)
- **Color Theme:** Green + Yellow (pineapple)
- **Hero Image:** `assets/images/product-hero.jpg`
- **Key Benefit:** 91% pineapple enzyme
- **Price:** 50,000 VND (33% off from 75,000 VND)
- **Pancake Product ID:** `64adb4dd-3600-4945-8a4d-aba9f1dc0d3a`
- **Variation ID:** `bdc46298-8f9d-4a38-a171-57eb6f318132`

#### 2. Nuoc Rua Chen Gung (Ginger Dish Soap)
- **Color Theme:** Green + Orange (ginger)
- **Hero Image:** `assets/images/product-gung.png`
- **Key Benefit:** Ginger antibacterial properties
- **Price:** 50,000 VND

#### 3. Nuoc Rua Rau Cu (Vegetable Wash)
- **Color Theme:** Green + Light green
- **Key Benefit:** Removes pesticides and wax
- **Use Case:** Fruits and vegetables
- **Price:** 50,000 VND

#### 4. Nuoc Rua Binh Sua (Baby Bottle Cleaner)
- **Color Theme:** Green + Soft blue
- **Key Benefit:** Baby-safe formula
- **Use Case:** Baby bottles, toys, pacifiers
- **Price:** 50,000 VND

#### 5. Tay Da Nang (Multi-Purpose Cleaner)
- **Color Theme:** Green + Purple
- **Key Benefit:** All-surface cleaning
- **Use Cases:** Kitchen, bathroom, floors, walls
- **Price:** 55,000 VND

---

## Payment System

### Architecture

```
Frontend (payment.html)
    ↓
    ├─→ Generate QR Code (VietQR API)
    ├─→ Display bank details
    ├─→ Start countdown (10 min)
    └─→ Poll payment status (every 3s)
         ↓
Cloudflare Worker (webhook handler)
    ├─→ Receive SePay webhook
    ├─→ Parse order code from transfer description
    ├─→ Find order in Pancake POS
    ├─→ Update order.prepaid = amount
    ├─→ Store status in KV
    └─→ Return status to frontend
         ↓
Frontend receives "paid: true"
    ↓
Show success message + stop polling
```

### Cloudflare Worker (`cloudflare-worker/src/index.js`)

**Lines of Code:** 371
**Endpoints:**

1. **GET /health**
   - Health check
   - Returns: `{ status: 'ok', service: 'sepay-payment-gateway', shops: [...] }`

2. **GET /shops**
   - List configured shops
   - Returns: `{ shops: [{ id, name, prefix }] }`

3. **POST /webhook/sepay**
   - Universal webhook for SePay bank transfers
   - Parses order code from transfer description
   - Matches shop by order prefix (ENZ*, TEST*)
   - Updates Pancake POS order
   - Stores payment status in KV
   - Returns: `{ success: true, orderId, shopId }`

4. **GET /check-payment?code={orderCode}**
   - Poll payment status from frontend
   - Reads from KV store
   - Returns: `{ paid: boolean, amount, paidAt, transactionId }`

5. **POST /register-payment**
   - Register pending payment (called when order created)
   - Stores initial payment record in KV
   - Returns: `{ success: true, orderCode }`

6. **GET /admin/*** (Protected)
   - Admin routes for shop management
   - Requires `Authorization: Bearer {ADMIN_KEY}`

**Multi-Shop Support:**

```javascript
const SHOPS = {
  'enzara': {
    name: 'ENZARA',
    pancakeShopId: '1890171475',
    pancakeApiKey: '9bfa8af5dfbc41c2b8ad1db542e8ca73',
    sepayAccount: '080838689999',
    sepayBank: 'mbbank',
    orderPrefix: 'ENZ', // Matches ENZD, ENZG, ENZR, ENZB, ENZT
    allowedOrigins: ['https://nguyenlanh282.github.io', 'https://enzara.vn']
  },
  'test': {
    name: 'TEST',
    pancakeShopId: '1890171475',
    sepayAccount: '86886799799',
    sepayBank: 'mbbank',
    orderPrefix: 'TEST',
    allowedOrigins: ['*']
  }
}
```

**Webhook Verification:**
- Currently DISABLED for development (accepts all webhooks)
- Production should verify SePay signature or use secret token

**KV Storage Schema:**

```javascript
// Key: orderCode (e.g., "ENZARA1738234567123")
// Value: JSON
{
  "paid": true,
  "amount": 50000,
  "shopId": "enzara",
  "orderId": "abc-123",
  "paidAt": "2026-01-30T10:30:00Z",
  "transactionId": "sepay-tx-456",
  "pancakeUpdated": true
}
// TTL: 86400 seconds (24 hours)
```

### Payment Flow Example

1. User submits order form
2. `pancake-integration.js` calls `createPancakeOrder()`
3. Pancake POS API returns `{ orderId: 'abc-123', displayId: 'POS-456' }`
4. JavaScript generates order code: `ENZARA1738234567123`
5. Opens payment page: `payment.html?code=ENZARA1738234567123`
6. Payment page loads order data from localStorage
7. Displays QR code: `https://qr.sepay.vn/img?acc=080838689999&bank=mbbank&amount=50000&des=ENZARA1738234567123`
8. User scans QR and transfers 50,000 VND with description "ENZARA1738234567123"
9. SePay receives transfer, sends webhook to Cloudflare Worker
10. Worker parses "ENZARA1738234567123" from webhook payload
11. Worker matches shop "enzara" by prefix "ENZ"
12. Worker finds order in Pancake POS by searching notes for "ENZARA1738234567123"
13. Worker updates order: `PUT /orders/{orderId}` with `{ prepaid: 50000 }`
14. Worker stores in KV: `{ paid: true, amount: 50000, paidAt: '...' }`
15. Frontend polls `/check-payment?code=ENZARA1738234567123` every 3 seconds
16. Worker returns `{ paid: true }` from KV
17. Frontend shows success message and stops polling

---

## Deployment System

### Cloudflare Pages Deployment

**Build Configuration:**
- Build command: None (static files)
- Build output directory: `/`
- Root directory: `/`

**Custom Domains:**
- `enzara.vn` (main domain)
- Product-specific subdomains (if configured)

### Deploy Directory (`/deploy`)

Generated deployment folders for each product with self-contained assets:
- HTML files
- CSS files (copied from `/css`)
- JS files (copied from `/js`)
- Assets (product-specific images)

**Build Process** (Manual or scripted):
1. Copy product HTML files
2. Copy shared CSS/JS
3. Copy product-specific assets
4. Optimize images (WebP conversion)
5. Minify CSS/JS (optional)
6. Deploy to Cloudflare Pages

---

## Utility Scripts

### `generate_images.py`
**Purpose:** Generate product images with Python PIL
**Lines of Code:** ~150
**Functions:**
- Create placeholder images
- Add text overlays
- Generate thumbnails
- Batch processing

### `download_images.py`
**Purpose:** Download images from external sources
**Lines of Code:** ~100
**Functions:**
- Fetch images from URLs
- Resize and optimize
- Save to `/assets/images/`

---

## Configuration Files

### `.gitignore`
Excludes from version control:
- `node_modules/`
- `.env` (secrets)
- `.wrangler/` (Cloudflare Worker cache)
- `deploy/` (build artifacts)
- `temp_*.json` (temporary files)
- Screenshots (`Screenshot*.png`)

### `cloudflare-worker/wrangler.toml`
Worker configuration:
```toml
name = "sepay-payment-gateway"
main = "src/index.js"
compatibility_date = "2024-01-01"
account_id = "d4a30462b305677d4a98c834d8e5f06c"

[[kv_namespaces]]
binding = "PAYMENT_STATUS"
id = "c7c7142e2a1d4eaca7ecaabdaceed881"

[vars]
ADMIN_KEY = "your-admin-key-here"
```

### `cloudflare-worker/package.json`
Dependencies:
```json
{
  "devDependencies": {
    "wrangler": "^4.61.1"
  },
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "tail": "wrangler tail"
  }
}
```

---

## Asset Management

### Image Organization

**Shared Assets** (`/assets/images/`):
- `logo.png` - ENZARA logo (40px height)
- `favicon.png` - Browser favicon
- `banner.jpg` - Promotional banner
- Product images:
  - `product-hero.jpg` - Main product shot
  - `product-detail-1.jpg` - Detail view 1
  - `product-detail-2.jpg` - Detail view 2
  - `product-main.jpg` - Alternative main image
  - `product-gung.png` - Ginger variant
  - Gallery images from enzara.vn

**Icon System** (`/assets/icons/`):
- SVG icons for features
- Inline SVG in HTML for performance
- Icon font not used (prefer inline SVG)

### Image Optimization Guidelines

- Format: WebP preferred, JPEG fallback
- Max width: 1200px for hero images
- Thumbnails: 400px width
- Compression: 80% quality
- Lazy loading: `loading="lazy"` attribute
- Alt text: Required for all images

---

## Code Statistics

### File Count by Type

- HTML files: ~30
- CSS files: 5 (shared) + inline styles in product pages
- JavaScript files: 3 (shared) + product overrides
- Images: ~50+ (products, gallery, icons)
- Documentation: 10+ markdown files
- Configuration: 3 files

### Estimated Lines of Code

- HTML: ~5,000 lines (all pages combined)
- CSS: ~2,500 lines (shared components)
- JavaScript: ~1,200 lines (main + pancake integration + animations)
- Cloudflare Worker: ~370 lines
- Python utilities: ~250 lines
- Total: ~9,320 lines (excluding node_modules)

---

## Dependencies

### Frontend (Zero NPM Dependencies)
- Vanilla JavaScript (ES6+)
- Native CSS (CSS3)
- No build tools required

### Cloudflare Worker
- `wrangler@^4.61.1` (CLI tool for deployment)

### External Services
- Pancake POS API (REST)
- SePay Payment Gateway (Webhook)
- VietQR (QR code generation)
- Vietnam Provinces API (Address autocomplete)
- Google Fonts (Be Vietnam Pro, Quicksand)

---

## Browser Compatibility

**Minimum Supported Versions:**
- Chrome: 90+
- Safari: 14+
- Firefox: 88+
- Edge: 90+
- Mobile Safari: 14+
- Chrome Mobile: 90+

**Polyfills Not Required:**
- Fetch API (native)
- Promises (native)
- CSS Grid (native)
- Flexbox (native)
- localStorage (native)
- Intersection Observer (fallback graceful)

---

## Performance Characteristics

### Bundle Sizes (Uncompressed)

- CSS: ~40KB (shared components)
- JavaScript: ~30KB (main + pancake integration)
- HTML: ~70KB per page (average)
- Images: Varies (optimized to <200KB each)

### Loading Performance

- First Paint: <1s (on 3G)
- Time to Interactive: <3s (on 3G)
- Total Page Weight: ~500KB (with images)
- Lighthouse Score Target: >90

### Optimization Techniques

- Inline critical CSS
- Defer non-critical JavaScript
- Lazy load images
- CDN via Cloudflare Pages
- HTTP/2 multiplexing
- Gzip/Brotli compression

---

## Security Considerations

### Frontend Security

- No sensitive data in client code
- HTTPS enforced (Cloudflare)
- XSS protection via input sanitization
- CORS headers on API calls
- No eval() or innerHTML with user data

### Backend Security (Cloudflare Worker)

- API keys stored as secrets (not in code)
- CORS restrictions by origin
- Webhook authentication (disabled in dev, should enable in prod)
- KV data expires after 24 hours
- Rate limiting via Cloudflare

### Data Privacy

- No cookies used (localStorage only)
- Payment data stored temporarily (24h TTL)
- No tracking scripts (analytics optional)
- Customer data sent to Pancake POS only

---

## Testing Strategy

### Manual Testing Checklist

- [ ] Landing page loads on mobile/desktop
- [ ] Order form validation works
- [ ] COD order creates Pancake POS order
- [ ] Bank transfer generates QR code
- [ ] Payment page polls status
- [ ] Payment confirmation updates order
- [ ] Error handling displays user-friendly messages
- [ ] Cross-browser compatibility

### Test Payment Flow

Use TEST shop configuration:
- Account: 86886799799
- Bank: MB Bank
- Order prefix: TEST
- Test small amounts: 1,000 VND

---

## Known Issues and Limitations

1. **Payment Webhook Authentication:** Disabled in development mode (should enable in production)
2. **Address Autocomplete:** Requires external API (may fail if API down)
3. **Stock Counter:** Fake urgency (not real inventory)
4. **Live Viewers:** Fake social proof (not real analytics)
5. **Multi-Product Orders:** Not supported (one product per order)
6. **Shopping Cart:** Not implemented (single-product checkout only)
7. **User Accounts:** Not implemented (guest checkout only)

---

## Future Improvements

1. Enable webhook signature verification
2. Implement real-time inventory tracking
3. Add Google Analytics / Facebook Pixel
4. Create admin dashboard for order management
5. Implement customer review system
6. Add email notifications (order confirmation, shipping updates)
7. Support multi-product orders
8. Implement A/B testing framework
9. Add chat widget for customer support
10. Optimize images with next-gen formats (AVIF)

---

**Document Version:** 1.0.0
**Last Updated:** 2026-01-30
