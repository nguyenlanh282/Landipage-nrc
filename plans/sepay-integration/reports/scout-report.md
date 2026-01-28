# Scout Report: Payment Integration & Order Processing Analysis

**Mission**: Map existing payment/order processing code and identify SePay integration points  
**Date**: 2026-01-29  
**Codebase**: Landipage-nrc (ENZARA Landing Page)

---

## Executive Summary

- **Architecture**: Static landing page (HTML/CSS/JS) with client-side form handling
- **Current Payment**: Pancake POS API integration for COD orders
- **No Backend**: Pure frontend, no server-side code, no existing payment gateway
- **SePay Gap**: Zero SePay infrastructure - needs full implementation from scratch

---

## 1. Current Payment Integration: Pancake POS

**File**: `Z:\Landipage-nrc\js\pancake-integration.js` (352 lines)

### Key Components

**API Configuration** (lines 10-25):
```javascript
PANCAKE_CONFIG = {
  baseUrl: 'https://pos.pages.fm/api/v1',
  shopId: '1890171475',
  apiKey: '9bfa8af5dfbc41c2b8ad1db542e8ca73',
  warehouseId: 'd5b4d4b3-2287-4823-a4f5-fdf25abd4164',
  orderSource: -7,
  product: {
    id: '64adb4dd-3600-4945-8a4d-aba9f1dc0d3a',
    variationId: 'bdc46298-8f9d-4a38-a171-57eb6f318132',
    price: 75000,
    salePrice: 50000
  }
}
```

**Order Flow**:
1. Form submit → `handlePancakeSubmit()` (line 131)
2. Validate form → `validateOrderForm()` (line 202)
3. Create order → `createPancakeOrder()` (line 35)
4. POST to Pancake API with COD payment
5. Success → `showOrderSuccess()` (line 264)
6. Track conversion → GA/FB Pixel (line 307)

**Payment Method**: Hardcoded COD only (line 74)
```javascript
payment_method: 'cod'
```

**Critical Pattern**: Client-side API call with exposed credentials in frontend JS

---

## 2. Order Form Structure

**File**: `Z:\Landipage-nrc\index.html` (lines 905-1019)

### Form Fields (line 913-955)
- `name` - Customer name (required)
- `phone` - Phone number (required, validates 10 digits starting with 0)
- `address` - Street address (required)
- `district` - District (optional)
- `city` - City (optional)
- Quantity selector (default: 2, min: 1, max: 99)

### Form ID
```html
<form class="order-form__form" id="order-form">
```

### Submit Button
```html
<button type="submit" class="btn btn-primary btn-lg">
  Đặt Hàng - Thanh Toán Khi Nhận
</button>
```

### Order Summary Panel (lines 957-989)
- Real-time price calculation
- Shows: subtotal, shipping fee, total
- Free shipping threshold: 2+ products
- Shipping cost: 30,000đ for 1 product

---

## 3. Form Handling Logic

**File**: `Z:\Landipage-nrc\js\main.js` (lines 123-262)

### Constants
```javascript
PRODUCT_PRICE = 50000
FREE_SHIPPING_MIN = 2
SHIPPING_COST = 30000
```

### Key Functions
- `initOrderForm()` - Sets up form listener (line 153)
- `handleFormSubmit()` - Default form handler (line 163, overridden by Pancake)
- `validateForm()` - Phone/address validation (line 200)
- `updateOrderSummary()` - Dynamic price calculation (line 132)
- `showOrderSuccess()` - Success screen (line 244)

### Validation Rules (lines 200-222)
- Name: Required, any string
- Phone: Required, must match `/^0\d{9}$/` (Vietnamese format)
- Address: Required, any string
- District/City: Optional

---

## 4. Environment Variables

**File**: `Z:\Landipage-nrc\.env`

```env
GEMINI_API_KEY=AIzaSyD6s2piSt5lJ_WsFiDpCeZAc_qzsTS7Aes
```

**Analysis**: Only contains Gemini API key (likely for image generation scripts). No payment gateway credentials stored here.

---

## 5. Project Structure

```
Landipage-nrc/
├── index.html              # Main landing page (1039 lines)
├── js/
│   ├── pancake-integration.js  # Pancake POS API client
│   ├── main.js                 # Form handling, UI logic
│   └── animations.js           # Scroll animations
├── css/                    # Styles (not analyzed)
├── assets/                 # Images
├── .env                    # Gemini API key only
├── generate_images.py      # Image generation script
└── download_images.py      # Image download script
```

**No Backend Files Found**:
- No Node.js server files
- No API routes/endpoints
- No webhook handlers
- No server-side payment processing

---

## 6. Current Order Processing Flow

```
User fills form
    ↓
Clicks "Đặt Hàng"
    ↓
pancake-integration.js intercepts submit (line 128)
    ↓
Validates form client-side
    ↓
Calls Pancake POS API directly from browser
    ↓
Creates COD order in Pancake system
    ↓
Shows success message with order ID
    ↓
Tracks conversion (GA/FB)
```

**Security Issue**: API key exposed in client-side JS (line 13)

---

## 7. SePay Integration Gaps

### What Exists
- ✅ Order form UI with all required fields
- ✅ Form validation logic
- ✅ Quantity selector
- ✅ Price calculation
- ✅ Success/error message handling
- ✅ Order data collection

### What's Missing
- ❌ SePay API integration code
- ❌ Payment gateway UI/buttons
- ❌ QR code display logic
- ❌ Payment status polling
- ❌ Webhook receiver (needs backend)
- ❌ Backend API server
- ❌ SePay credentials (.env or config)
- ❌ Database for order tracking
- ❌ Payment confirmation flow

---

## 8. SePay Integration Points

### Required Changes

**1. Backend Server** (New)
- Node.js/Express server needed
- API endpoint: `POST /api/sepay/create-payment`
- Webhook endpoint: `POST /api/webhooks/sepay`
- Store SePay credentials securely

**2. Frontend Payment Flow** (Modify)
- Add payment method selector: COD vs Bank Transfer
- Show SePay QR code on bank transfer selection
- Poll payment status or listen to webhooks
- Update `js/pancake-integration.js` or create `js/sepay-integration.js`

**3. Form Modifications** (Minimal)
- Add payment method radio buttons before submit
- Conditionally show QR/wait screen
- Keep existing form fields (compatible with both flows)

**4. Order Flow Split**
```
COD → Pancake POS API (existing)
Bank Transfer → SePay → Webhook → Pancake POS
```

---

## 9. Configuration Files Needed

**Missing Files**:
1. `.env` additions:
   ```env
   SEPAY_API_KEY=xxx
   SEPAY_ACCOUNT_NUMBER=xxx
   SEPAY_ACCOUNT_NAME=xxx
   SEPAY_BANK_CODE=xxx
   ```

2. `server.js` (new):
   - Express server
   - SePay API client
   - Webhook handler
   - Pancake POS integration

3. `package.json` (new):
   - Dependencies: express, axios, body-parser, etc.

---

## 10. Technical Recommendations

### Priority 1: Backend Infrastructure
- Create Node.js server for secure API calls
- Move Pancake API key to backend
- Implement SePay payment creation endpoint
- Add webhook receiver for payment confirmation

### Priority 2: Frontend Integration
- Add payment method selector UI
- Create QR code display component
- Implement payment status polling
- Preserve existing COD flow

### Priority 3: Error Handling
- Network failure recovery
- Payment timeout handling
- Webhook signature verification
- Order status reconciliation

---

## Unresolved Questions

1. **Hosting**: Where will backend server be deployed? (Vercel, Heroku, VPS?)
2. **Database**: PostgreSQL, MySQL, or MongoDB for order tracking?
3. **Webhook Security**: How to verify SePay webhook signatures?
4. **Order ID Mapping**: How to link SePay transactions to Pancake orders?
5. **Concurrent Payments**: Handle multiple users paying simultaneously?
6. **Payment Expiry**: Timeout for unpaid bank transfer orders?
7. **Refunds**: Process for handling failed/cancelled payments?

---

**Status**: Ready for implementation planning  
**Next Step**: Design SePay integration architecture with backend server
