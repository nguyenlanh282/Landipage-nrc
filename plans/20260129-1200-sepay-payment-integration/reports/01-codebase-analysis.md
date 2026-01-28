# Codebase Analysis Report

**Date:** 2026-01-29
**Project:** ENZARA Landing Page - SePay Payment Integration

## Current Architecture

### Stack
- Pure static HTML/CSS/JS hosted on GitHub Pages
- No backend server, no database
- External API: Pancake POS for order management

### File Structure
```
Z:\Landipage-nrc\
├── index.html              # Single-page landing
├── css/
│   ├── variables.css       # CSS custom properties
│   ├── base.css            # Reset, typography
│   ├── components.css      # Reusable UI components
│   ├── sections.css        # Section-specific styles
│   └── icons.css           # Icon utilities
└── js/
    ├── animations.js       # Scroll animations
    ├── pancake-integration.js  # Order processing
    └── main.js             # General interactions
```

## Pancake Integration Analysis

### Configuration (pancake-integration.js)
```javascript
PANCAKE_CONFIG = {
  baseUrl: 'https://pos.pages.fm/api/v1',
  shopId: '1890171475',
  apiKey: '9bfa8af5dfbc41c2b8ad1db542e8ca73',
  warehouseId: 'd5b4d4b3-2287-4823-a4f5-fdf25abd4164',
  orderSource: -7,  // Webcake Landing
  product: {
    id: '64adb4dd-3600-4945-8a4d-aba9f1dc0d3a',
    variationId: 'bdc46298-8f9d-4a38-a171-57eb6f318132',
    name: 'Nuoc Rua Chen Huu Co ENZARA Huong Dua 500g',
    price: 75000,
    salePrice: 50000
  }
}
```

### Current Order Flow
1. Form submit triggers `handlePancakeSubmit()`
2. Validates input fields (name, phone, address)
3. Calculates shipping: free if qty >= 2, else 30,000d
4. Sends POST to Pancake POS `/orders` endpoint
5. On success: shows confirmation with order number
6. On error: displays error message with retry option

### Payload Structure
```javascript
{
  shipping_address: { full_name, phone_number, address, full_address },
  parent_id: -7,
  items: [{ variation_id, quantity, price, is_bonus: false }],
  warehouse_id: '...',
  payment_method: 'cod',
  shipping_fee: 0|30000,
  note: '[Landing Page] ...'
}
```

## Order Form Analysis (index.html)

### Current Form Fields
- name (required)
- phone (required)
- address (required)
- district (optional)
- city (optional)
- quantity selector (default: 2)

### Form Location
Section 16: ORDER FORM, ID `#order`
Form ID: `#order-form`
Lines 905-1018 in index.html

### Order Summary Display
- Subtotal (data-subtotal)
- Shipping (data-shipping)
- Total (data-total)
- Dynamic update based on quantity

## SePay QR API

### QR Generation URL
```
https://qr.sepay.vn/img?acc={ACCOUNT}&bank={BANK}&amount={AMOUNT}&des={DESCRIPTION}
```

### Parameters
| Param | Description | Example |
|-------|-------------|---------|
| acc | Bank account number | 0123456789 |
| bank | Bank code (lowercase) | mbbank, vietcombank, techcombank |
| amount | Payment amount in VND | 100000 |
| des | Transaction description | ENZARA1706520000123 |

### Webhook Limitation
- SePay webhook requires server endpoint to receive payment confirmation
- GitHub Pages cannot handle webhooks (static hosting)
- **Mitigation:** Manual verification via Pancake POS + unique order codes

## Key Insights

### Integration Constraints
1. No server = no webhook = no automatic payment confirmation
2. Must rely on manual verification by shop staff
3. Order code in payment description enables matching

### Recommended Approach
1. Client-side QR generation using SePay img API
2. Unique order code format: `ENZARA{timestamp}` in payment description
3. Order note in Pancake POS includes same code for matching
4. Staff verifies payment in bank statement, updates order in Pancake

### UI Integration Points
1. Add payment method radio buttons before submit button
2. COD flow remains unchanged
3. Bank transfer flow shows QR modal after order creation
4. Modal displays: QR code, payment amount, order code, instructions

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Payment not confirmed | Medium | Staff manual verification, clear customer instructions |
| Wrong amount paid | Low | Amount encoded in QR, clear display |
| Order code mismatch | Low | Auto-generated unique codes, copy button |
| QR image fails to load | Medium | Fallback with manual transfer details |

## Unresolved Questions

1. **SePay Account Details:** Need bank code and account number from business owner
2. **Payment Timeout:** How long to wait before considering payment failed?
3. **Partial Payment:** How to handle if customer pays wrong amount?
4. **Cancellation Policy:** Can customer cancel bank transfer order and switch to COD?
