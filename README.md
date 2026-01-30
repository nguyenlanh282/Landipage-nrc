# ENZARA Product Landing Pages

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)](https://pages.cloudflare.com/)
[![License](https://img.shields.io/badge/license-Proprietary-red)](LICENSE)

High-converting landing pages for ENZARA Vietnam's organic enzyme-based household cleaning products. Built with vanilla HTML/CSS/JavaScript and deployed on Cloudflare Pages with integrated payment processing.

## Table of Contents

- [Features](#features)
- [Products](#products)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Payment Integration](#payment-integration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **5 Product Landing Pages** - Individual pages for each ENZARA product
- **16-Step AIDA Sales Funnel** - Proven conversion structure
- **Dual Payment Methods** - COD and instant bank transfer via SePay
- **Real-Time Payment Verification** - Auto-update orders when payment received
- **Mobile-First Responsive Design** - Optimized for all devices (320px - 1920px)
- **Pancake POS Integration** - Seamless order management
- **VietQR Payment** - QR code generation for Vietnamese bank transfers
- **Performance Optimized** - <3s load time on 3G, Lighthouse score >90
- **Vietnamese Localization** - Complete Vietnamese language support
- **Zero Dependencies** - Vanilla JavaScript, no frameworks

## Products

| Product | Price | Path |
|---------|-------|------|
| Nước Rửa Chén Dứa (Pineapple Dish Soap) | 50,000đ | `/products/nuoc-rua-chen-dua/` |
| Nước Rửa Chén Gừng (Ginger Dish Soap) | 50,000đ | `/products/nuoc-rua-chen-gung/` |
| Nước Rửa Rau Củ (Vegetable Wash) | 50,000đ | `/products/nuoc-rua-rau-cu/` |
| Nước Rửa Bình Sữa (Baby Bottle Cleaner) | 50,000đ | `/products/nuoc-rua-binh-sua/` |
| Tẩy Đa Năng (Multi-Purpose Cleaner) | 55,000đ | `/products/tay-da-nang/` |

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript (ES6+)** - No frameworks
- **Google Fonts** - Be Vietnam Pro, Quicksand

### Backend
- **Cloudflare Worker** - Serverless payment gateway
- **Cloudflare KV** - Payment status storage (24h TTL)
- **Pancake POS API** - Order management
- **SePay Gateway** - Bank transfer processing
- **VietQR API** - QR code generation

### Deployment
- **Cloudflare Pages** - Static site hosting (275+ edge locations)
- **GitHub** - Version control and CI/CD trigger
- **Wrangler** - Cloudflare Worker deployment CLI

## Quick Start

### Prerequisites

- Git
- Node.js 18+ (for Cloudflare Worker development only)
- Cloudflare account (free tier)
- Pancake POS account and API key
- SePay payment gateway account

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/Landipage-nrc.git
cd Landipage-nrc

# No build step required for static site
# Open index.html in browser to preview

# For Cloudflare Worker development
cd cloudflare-worker
npm install
```

### Local Development

**Static Site (Landing Pages):**
```bash
# Option 1: Simple HTTP server
python -m http.server 8000

# Option 2: Live Server (VS Code extension)
# Install "Live Server" extension, right-click index.html → Open with Live Server

# Option 3: npx serve
npx serve
```

**Cloudflare Worker (Payment Gateway):**
```bash
cd cloudflare-worker

# Start local development server
npm run dev

# Worker available at http://localhost:8787
```

### Configuration

**1. Update Pancake POS Configuration** (`js/pancake-integration.js`):
```javascript
const PANCAKE_CONFIG = {
  shopId: 'YOUR_SHOP_ID',
  apiKey: 'YOUR_API_KEY',
  warehouseId: 'YOUR_WAREHOUSE_ID',
  product: {
    id: 'PRODUCT_ID',
    variationId: 'VARIATION_ID',
    // ...
  }
};
```

**2. Update SePay Configuration** (`js/pancake-integration.js`):
```javascript
const SEPAY_CONFIG = {
  accountNumber: 'YOUR_ACCOUNT_NUMBER',
  bankCode: 'YOUR_BANK_CODE',
  accountName: 'YOUR_ACCOUNT_NAME',
  webhookUrl: 'YOUR_WORKER_URL'
};
```

**3. Configure Cloudflare Worker** (`cloudflare-worker/wrangler.toml`):
```toml
account_id = "YOUR_ACCOUNT_ID"

[[kv_namespaces]]
binding = "PAYMENT_STATUS"
id = "YOUR_KV_NAMESPACE_ID"
```

**4. Set Worker Secrets:**
```bash
cd cloudflare-worker
wrangler secret put SEPAY_WEBHOOK_SECRET
wrangler secret put ADMIN_KEY
```

## Project Structure

```
Z:\Landipage-nrc\
├── assets/                     # Images, icons, static assets
│   ├── icons/
│   └── images/
├── css/                        # Shared stylesheets
│   ├── variables.css           # Design tokens
│   ├── base.css                # Global styles
│   ├── components.css          # UI components
│   ├── sections.css            # Landing page sections
│   └── icons.css               # Icon utilities
├── js/                         # Shared JavaScript
│   ├── main.js                 # Core functionality
│   ├── animations.js           # Scroll effects
│   └── pancake-integration.js  # Payment integration
├── products/                   # Product landing pages
│   ├── nuoc-rua-chen-dua/
│   │   ├── index.html          # Landing page
│   │   └── payment.html        # Payment page
│   ├── nuoc-rua-chen-gung/
│   ├── nuoc-rua-rau-cu/
│   ├── nuoc-rua-binh-sua/
│   └── tay-da-nang/
├── cloudflare-worker/          # Payment gateway
│   ├── src/
│   │   └── index.js            # Worker code
│   ├── package.json
│   └── wrangler.toml
├── docs/                       # Documentation
│   ├── project-overview-pdr.md
│   ├── codebase-summary.md
│   ├── code-standards.md
│   ├── system-architecture.md
│   └── design-guidelines.md
├── index.html                  # Root landing page
├── payment.html                # Root payment page
└── README.md                   # This file
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Project Overview & PDR](docs/project-overview-pdr.md)** - Product requirements, business goals, success metrics
- **[Codebase Summary](docs/codebase-summary.md)** - Complete code walkthrough, file-by-file analysis
- **[Code Standards](docs/code-standards.md)** - Coding conventions, naming, best practices
- **[System Architecture](docs/system-architecture.md)** - Technical architecture, data flow, integrations
- **[Design Guidelines](docs/design-guidelines.md)** - Brand guidelines, color system, typography

## Deployment

### Cloudflare Pages (Static Site)

**Automatic Deployment (Recommended):**

1. Connect GitHub repository to Cloudflare Pages
2. Configure build settings:
   - Framework: None
   - Build command: (leave empty)
   - Build output directory: `/`
3. Push to `master` branch → Auto-deploys

**Manual Deployment:**

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy (from project root)
wrangler pages publish . --project-name=enzara-landing-pages
```

### Cloudflare Worker (Payment Gateway)

```bash
cd cloudflare-worker

# Deploy to production
npm run deploy

# Or use wrangler directly
wrangler deploy

# View logs
npm run tail
```

### Custom Domain

1. Go to Cloudflare Pages dashboard
2. Select your project
3. Navigate to "Custom domains"
4. Add domain: `enzara.vn`
5. Update DNS:
   - Add CNAME: `enzara.vn` → `nguyenlanh282.github.io`
   - Or use Cloudflare's provided DNS records

## Payment Integration

### Order Flow

1. **Customer Submits Order**
   - Fills out form (name, phone, address, quantity)
   - Selects payment method (COD or Bank Transfer)

2. **Order Created in Pancake POS**
   - JavaScript calls `createPancakeOrder()`
   - Pancake API returns order ID and tracking link

3. **COD Orders**
   - Show success message
   - Display order number and tracking link
   - Done

4. **Bank Transfer Orders**
   - Generate unique order code: `ENZARA{timestamp}{random}`
   - Open payment page in new tab
   - Display VietQR QR code
   - Show 10-minute countdown timer
   - Start polling payment status (every 3 seconds)

5. **Payment Verification**
   - Customer scans QR code and transfers money
   - SePay receives bank notification
   - SePay sends webhook to Cloudflare Worker
   - Worker updates Pancake order (sets `prepaid` amount)
   - Worker stores status in KV
   - Frontend polls KV and shows success when paid

### Testing Payments

Use the TEST shop configuration for testing:

```javascript
// In cloudflare-worker/src/index.js
const SHOPS = {
  'test': {
    sepayAccount: '86886799799',
    bankCode: 'mbbank',
    orderPrefix: 'TEST'
  }
}
```

Test with small amounts (1,000 VND) to verify webhook flow.

## Development

### Code Style

- **HTML:** Semantic tags, BEM class names
- **CSS:** BEM convention, mobile-first, CSS variables
- **JavaScript:** ES6+, camelCase, IIFE modules, JSDoc comments

See [Code Standards](docs/code-standards.md) for details.

### CSS Architecture

```
1. variables.css   - Design tokens (colors, spacing, fonts)
2. base.css        - Reset, typography, global styles
3. components.css  - Reusable UI components
4. sections.css    - Page-specific sections
5. icons.css       - Icon utilities
```

### JavaScript Modules

- **main.js** - Core functionality (forms, countdown, FAQ)
- **animations.js** - Scroll effects, transitions
- **pancake-integration.js** - Order creation, payment handling

### Adding a New Product

1. **Create product directory:**
   ```bash
   mkdir products/new-product
   ```

2. **Copy template files:**
   ```bash
   cp products/nuoc-rua-chen-dua/index.html products/new-product/
   cp products/nuoc-rua-chen-dua/payment.html products/new-product/
   ```

3. **Update product details:**
   - Change product name, images, copy
   - Update Pancake product ID and variation ID
   - Update pricing

4. **Add product images:**
   ```bash
   # Add to assets/images/
   product-new-hero.jpg
   product-new-detail-1.jpg
   ```

5. **Test locally:**
   ```bash
   # Open in browser
   http://localhost:8000/products/new-product/
   ```

### Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile 90+

### Performance Targets

- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.5s
- Lighthouse Performance Score: >90

## Contributing

This is a private project for ENZARA Vietnam. External contributions are not accepted.

For internal team members:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes following [Code Standards](docs/code-standards.md)
3. Test thoroughly on mobile and desktop
4. Commit with descriptive message: `git commit -m "feat: add new feature"`
5. Push and create Pull Request
6. Request code review from team lead

### Commit Message Format

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, perf, test, chore
Scope: payment, order-form, css, js, docs
Subject: Short description in present tense

Examples:
feat(payment): add SePay bank transfer integration
fix(order-form): validate phone number correctly
docs(readme): update deployment instructions
```

## Troubleshooting

### Common Issues

**1. Payment page doesn't open**
- Check if popup blocker is enabled (disable for this site)
- Ensure localStorage is enabled in browser

**2. QR code not loading**
- Check internet connection
- Verify VietQR API is accessible: `https://qr.sepay.vn`
- Check browser console for CORS errors

**3. Payment not confirming**
- Verify order code matches transfer description exactly
- Check Cloudflare Worker logs: `wrangler tail`
- Ensure KV namespace is bound correctly
- Check SePay webhook is reaching Worker

**4. Order not created in Pancake POS**
- Verify API key is correct
- Check network tab for API response
- Ensure product variation ID is valid
- Check Pancake POS API status

**5. Images not loading**
- Check image paths are correct (relative to HTML file)
- Verify images exist in `/assets/images/`
- Check file extensions match (case-sensitive)

### Debug Mode

Enable console logging:

```javascript
// In pancake-integration.js
const DEBUG = true;

if (DEBUG) console.log('Order data:', orderData);
```

### Cloudflare Worker Logs

```bash
cd cloudflare-worker

# Tail logs in real-time
wrangler tail

# Filter by status code
wrangler tail --status=error

# Filter by IP
wrangler tail --ip=1.2.3.4
```

## License

Proprietary - Copyright (c) 2026 ENZARA Vietnam. All rights reserved.

This code is private and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

**Project Owner:** ENZARA Vietnam
**Support:** 0945.139.990
**Email:** (contact email)
**Website:** https://enzara.vn

## Acknowledgments

- **Cloudflare** - Pages and Workers platform
- **Pancake POS** - Order management system
- **SePay** - Vietnamese payment gateway
- **Google Fonts** - Typography (Be Vietnam Pro, Quicksand)
- **VietQR** - QR code generation for bank transfers

---

**Last Updated:** 2026-01-30
**Version:** 1.0.0
**Status:** Production
