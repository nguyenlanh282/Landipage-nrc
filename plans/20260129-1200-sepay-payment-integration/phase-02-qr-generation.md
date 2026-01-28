# Phase 02: QR Code Generation

## Context
- [Codebase Analysis](./reports/01-codebase-analysis.md)
- [Main Plan](./plan.md)
- Depends on: [Phase 01](./phase-01-payment-ui.md)

## Overview
| Field | Value |
|-------|-------|
| Date | 2026-01-29 |
| Priority | High |
| Status | Pending |
| Estimate | 1-2 hours |

Implement SePay QR code generation and display modal for bank transfer payments.

## Key Insights

1. SePay provides img endpoint - no SDK needed
2. QR code is a simple `<img>` tag with dynamic URL
3. Order code in description enables payment matching
4. Modal should include fallback text details for manual transfer
5. QR loads from external domain - handle load errors

## Requirements

### Functional
- [ ] Generate unique order code (ENZARA + timestamp)
- [ ] Build SePay QR URL with correct parameters
- [ ] Display QR in modal overlay
- [ ] Show payment amount, order code, instructions
- [ ] Provide "Copy Order Code" button
- [ ] Include fallback manual transfer details
- [ ] Handle QR image load error

### Non-Functional
- [ ] QR code at least 200x200px for scanability
- [ ] Modal responsive on mobile
- [ ] Close modal on background click or ESC
- [ ] Accessible modal (focus trap, ARIA)

## Architecture

### SePay QR URL Format
```
https://qr.sepay.vn/img?acc={ACCOUNT}&bank={BANK}&amount={AMOUNT}&des={DESCRIPTION}
```

### Order Code Generation
```javascript
function generateOrderCode() {
  const timestamp = Date.now();
  return `ENZARA${timestamp}`;
}
// Example: ENZARA1706520000123
```

### QR URL Builder
```javascript
function buildSePayQRUrl(amount, orderCode) {
  const params = new URLSearchParams({
    acc: SEPAY_CONFIG.accountNumber,
    bank: SEPAY_CONFIG.bankCode,
    amount: amount,
    des: orderCode
  });
  return `https://qr.sepay.vn/img?${params.toString()}`;
}
```

### Modal HTML Structure
```html
<div class="qr-modal" id="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-modal-title">
  <div class="qr-modal__backdrop"></div>
  <div class="qr-modal__content">
    <button class="qr-modal__close" aria-label="Dong">&times;</button>
    <h3 class="qr-modal__title" id="qr-modal-title">Quet Ma QR De Thanh Toan</h3>

    <div class="qr-modal__qr-container">
      <img class="qr-modal__qr-image" src="" alt="Ma QR thanh toan">
      <div class="qr-modal__qr-error" hidden>Khong tai duoc ma QR</div>
    </div>

    <div class="qr-modal__info">
      <p class="qr-modal__amount">So tien: <strong data-qr-amount></strong></p>
      <p class="qr-modal__code">
        Noi dung CK: <strong data-qr-code></strong>
        <button class="qr-modal__copy" data-copy-code>Sao chep</button>
      </p>
    </div>

    <div class="qr-modal__instructions">
      <p>1. Mo ung dung ngan hang cua ban</p>
      <p>2. Chon "Quet ma QR"</p>
      <p>3. Quet ma QR tren man hinh</p>
      <p>4. Xac nhan thanh toan</p>
    </div>

    <div class="qr-modal__fallback">
      <p><strong>Hoac chuyen khoan thu cong:</strong></p>
      <p>Ngan hang: <span data-bank-name></span></p>
      <p>So TK: <span data-account-number></span></p>
      <p>Chu TK: <span data-account-name></span></p>
      <p>So tien: <span data-amount></span></p>
      <p>Noi dung: <span data-transfer-code></span></p>
    </div>

    <p class="qr-modal__note">Don hang se duoc xu ly sau khi chung toi xac nhan thanh toan</p>
  </div>
</div>
```

## Related Code Files

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | End of body | Add modal markup |
| `js/pancake-integration.js` | N/A | Add QR generation functions |
| `css/sections.css` | N/A | Add modal styles |

## Implementation Steps

### Step 1: Add SePay Configuration
Add to `pancake-integration.js`:
```javascript
const SEPAY_CONFIG = {
  accountNumber: 'TBD',
  bankCode: 'TBD',
  bankName: 'TBD',
  accountName: 'ENZARA VIET NAM'
};
```

### Step 2: Add Order Code Generator
```javascript
function generateOrderCode() {
  return `ENZARA${Date.now()}`;
}
```

### Step 3: Add QR URL Builder
```javascript
function buildSePayQRUrl(amount, orderCode) {
  const params = new URLSearchParams({
    acc: SEPAY_CONFIG.accountNumber,
    bank: SEPAY_CONFIG.bankCode,
    amount: amount.toString(),
    des: orderCode
  });
  return `https://qr.sepay.vn/img?${params.toString()}`;
}
```

### Step 4: Add Modal HTML
Insert before `</body>` in `index.html`

### Step 5: Add Modal Styles
Add to `css/sections.css`:
```css
.qr-modal { position: fixed; inset: 0; z-index: 1000; ... }
.qr-modal__backdrop { ... }
.qr-modal__content { ... }
.qr-modal__qr-image { width: 200px; height: 200px; ... }
```

### Step 6: Add Modal Controller
```javascript
const QRModal = {
  show(amount, orderCode) { ... },
  hide() { ... },
  init() { ... }
};
```

### Step 7: Add Copy Button Logic
```javascript
function copyOrderCode(code) {
  navigator.clipboard.writeText(code);
  // Show feedback
}
```

### Step 8: Handle QR Image Error
```javascript
qrImage.addEventListener('error', () => {
  qrImage.hidden = true;
  qrError.hidden = false;
});
```

## Todo List

- [ ] Add SEPAY_CONFIG object
- [ ] Implement generateOrderCode()
- [ ] Implement buildSePayQRUrl()
- [ ] Create modal HTML markup
- [ ] Style modal (desktop)
- [ ] Style modal (mobile)
- [ ] Implement QRModal controller
- [ ] Add copy to clipboard functionality
- [ ] Handle QR image load error
- [ ] Add ESC key to close modal
- [ ] Add backdrop click to close
- [ ] Implement focus trap for accessibility

## Success Criteria

1. QR code displays with correct amount and order code
2. Modal is properly centered and responsive
3. Copy button works and shows feedback
4. Fallback details display correctly
5. QR error state shows when image fails to load
6. Modal closes on ESC/backdrop click

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| SePay API unavailable | High | Show fallback manual transfer details |
| QR too small on mobile | Medium | Minimum 200px, test on devices |
| Order code collision | Very Low | Timestamp-based generation |
| Clipboard API unsupported | Low | Fallback to text selection |

## Security Considerations

- Order codes should not be predictable (timestamp sufficient)
- Bank account info displayed client-side is public knowledge
- No sensitive customer data in QR code

## Next Steps

After completion, proceed to [Phase 03: Order Flow Integration](./phase-03-order-flow.md)
