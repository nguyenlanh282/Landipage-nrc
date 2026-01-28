# Phase 03: Order Flow Integration

## Context
- [Codebase Analysis](./reports/01-codebase-analysis.md)
- [Main Plan](./plan.md)
- Depends on: [Phase 01](./phase-01-payment-ui.md), [Phase 02](./phase-02-qr-generation.md)

## Overview
| Field | Value |
|-------|-------|
| Date | 2026-01-29 |
| Priority | High |
| Status | Pending |
| Estimate | 2-3 hours |

Integrate payment method selection into order submission flow. Route to COD success or QR modal based on selection. Update Pancake POS payload with payment method and order code.

## Key Insights

1. Current flow only handles COD - need to branch based on payment method
2. Order code must be generated BEFORE Pancake API call
3. Order code goes in both: Pancake note field AND QR description
4. Bank transfer orders still create Pancake order (for staff tracking)
5. Success flow differs: COD shows message, Bank shows QR modal

## Requirements

### Functional
- [ ] Read selected payment method from form
- [ ] Generate order code before API call
- [ ] Include order code in Pancake note
- [ ] Set payment_method in Pancake payload
- [ ] COD: show success message (unchanged)
- [ ] Bank Transfer: show QR modal
- [ ] Update order summary to show payment method
- [ ] Analytics tracking for both payment methods

### Non-Functional
- [ ] No breaking changes to COD flow
- [ ] Error handling for both flows
- [ ] Consistent UX between methods

## Architecture

### Modified Order Flow
```
Form Submit
    |
    v
Validate Form
    |
    v
Generate Order Code
    |
    v
Get Payment Method
    |
    v
Build Pancake Payload (with order code in note)
    |
    v
Call Pancake API
    |
    +-- Error --> Show Error Message
    |
    +-- Success
           |
           v
    Payment Method?
           |
           +-- COD --> showOrderSuccess()
           |
           +-- Bank --> QRModal.show(amount, orderCode)
```

### Modified Pancake Payload
```javascript
const payload = {
  // ... existing fields ...
  payment_method: paymentMethod,  // 'cod' or 'bank_transfer'
  note: `[Landing Page] Don hang tu ENZARA Landing Page - SL: ${qty} chai - Ma don: ${orderCode}`
};
```

## Related Code Files

| File | Lines | Purpose |
|------|-------|---------|
| `js/pancake-integration.js` | 35-117 | createPancakeOrder function |
| `js/pancake-integration.js` | 131-200 | handlePancakeSubmit function |
| `js/pancake-integration.js` | 264-301 | showOrderSuccess function |

## Implementation Steps

### Step 1: Modify handlePancakeSubmit()
```javascript
async function handlePancakeSubmit(e) {
  // ... existing validation ...

  // Generate order code early
  const orderCode = generateOrderCode();

  // Get payment method
  const paymentMethod = form.querySelector('input[name="payment_method"]:checked')?.value || 'cod';

  // ... build orderData ...
  orderData.orderCode = orderCode;
  orderData.paymentMethod = paymentMethod;

  // ... call createPancakeOrder ...
}
```

### Step 2: Modify createPancakeOrder()
```javascript
async function createPancakeOrder(orderData) {
  // ... existing code ...

  const payload = {
    // ... existing fields ...
    payment_method: orderData.paymentMethod,
    note: `[Landing Page] Don hang tu ENZARA Landing Page - SL: ${orderData.quantity} chai - Ma don: ${orderData.orderCode}`
  };

  // ... API call ...
}
```

### Step 3: Modify Success Handler
```javascript
if (result.success) {
  if (orderData.paymentMethod === 'cod') {
    showOrderSuccess(orderData, result);
  } else {
    const total = calculateTotal(orderData);
    QRModal.show(total, orderData.orderCode);
    showBankTransferPending(orderData, result);
  }
  trackConversion(orderData, result);
}
```

### Step 4: Add Bank Transfer Pending State
```javascript
function showBankTransferPending(orderData, result) {
  const form = document.querySelector('#order-form');
  form.innerHTML = `
    <div class="order-pending" style="text-align: center; padding: var(--space-8);">
      <div style="font-size: 64px; margin-bottom: var(--space-4);">...</div>
      <h3>Don hang da duoc tao!</h3>
      ${result.orderNumber ? `<p>Ma don hang: <strong>#${result.orderNumber}</strong></p>` : ''}
      <p>Ma chuyen khoan: <strong>${orderData.orderCode}</strong></p>
      <p>Vui long hoan tat thanh toan trong vong 30 phut.</p>
      <button onclick="QRModal.show(${calculateTotal(orderData)}, '${orderData.orderCode}')" class="btn btn-primary">
        Xem Ma QR
      </button>
    </div>
  `;
}
```

### Step 5: Update Analytics Tracking
```javascript
function trackConversion(orderData, result) {
  const total = calculateTotal(orderData);

  if (typeof gtag === 'function') {
    gtag('event', 'purchase', {
      transaction_id: result.orderId,
      value: total,
      currency: 'VND',
      payment_type: orderData.paymentMethod,  // Add this
      items: [...]
    });
  }

  // ... fbq tracking ...
}
```

### Step 6: Update Order Summary Display
Show selected payment method in summary sidebar:
```javascript
function updateOrderSummary(quantity, paymentMethod) {
  // ... existing total calculation ...

  // Add payment method display
  const paymentDisplay = paymentMethod === 'cod'
    ? 'Thanh toan khi nhan hang'
    : 'Chuyen khoan ngan hang';

  // Update DOM
}
```

## Todo List

- [ ] Add orderCode generation in handlePancakeSubmit
- [ ] Add paymentMethod reading from form
- [ ] Modify createPancakeOrder payload
- [ ] Branch success handling by payment method
- [ ] Implement showBankTransferPending()
- [ ] Integrate QRModal.show() call
- [ ] Update analytics with payment_type
- [ ] Update order summary display
- [ ] Test COD flow unchanged
- [ ] Test bank transfer flow end-to-end
- [ ] Test error handling for both methods

## Success Criteria

1. COD orders work exactly as before
2. Bank transfer orders create Pancake order with correct note
3. QR modal displays after bank transfer order creation
4. Order code appears in Pancake POS for staff matching
5. Analytics track payment method
6. Error states handled gracefully for both methods

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Break COD flow | Critical | Extensive testing before deploy |
| Payment method not saved | High | Verify Pancake API accepts field |
| Order code missing from note | High | Test in Pancake POS admin |
| QR modal not showing | High | Add fallback logging |

## Security Considerations

- Order code validated on Pancake side
- No payment processing client-side
- Bank details are display-only (already public)

## Testing Checklist

### COD Flow
- [ ] Submit order with COD selected
- [ ] Verify success message displays
- [ ] Check order in Pancake POS
- [ ] Verify payment_method = 'cod'
- [ ] Verify order code in note

### Bank Transfer Flow
- [ ] Submit order with Bank Transfer selected
- [ ] Verify QR modal displays
- [ ] Check QR has correct amount
- [ ] Check QR has correct order code
- [ ] Check order in Pancake POS
- [ ] Verify payment_method = 'bank_transfer'
- [ ] Verify order code in note
- [ ] Test copy button works
- [ ] Test modal close buttons

### Error Cases
- [ ] Network error shows appropriate message
- [ ] API error shows appropriate message
- [ ] QR image load error shows fallback

## Next Steps

After all phases complete:
1. Get SePay credentials from business owner
2. Configure SEPAY_CONFIG values
3. Deploy to GitHub Pages
4. Test with real bank transfer
5. Train staff on order verification workflow
