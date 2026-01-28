# Phase 01: Payment Method UI

## Context
- [Codebase Analysis](./reports/01-codebase-analysis.md)
- [Main Plan](./plan.md)

## Overview
| Field | Value |
|-------|-------|
| Date | 2026-01-29 |
| Priority | High |
| Status | Pending |
| Estimate | 1-2 hours |

Add payment method selection UI to the order form, allowing users to choose between COD and Bank Transfer.

## Key Insights

1. Current form has no payment selection - defaults to COD
2. Payment selector should appear after quantity, before submit button
3. Radio buttons preferred over dropdown for 2 options
4. Visual feedback needed to show selected method
5. Submit button text should change based on selection

## Requirements

### Functional
- [ ] Radio button group: COD (default) | Bank Transfer
- [ ] Visual indicator for selected option
- [ ] Submit button text updates dynamically
- [ ] Form validation unchanged

### Non-Functional
- [ ] Mobile-responsive layout
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Consistent with existing design system

## Architecture

### HTML Structure (after quantity-row)
```html
<div class="order-form__payment-method">
  <span class="order-form__payment-label">Phuong thuc thanh toan:</span>
  <div class="payment-method-selector">
    <label class="payment-method-option payment-method-option--selected">
      <input type="radio" name="payment_method" value="cod" checked>
      <span class="payment-method-option__icon">
        <!-- COD icon SVG -->
      </span>
      <span class="payment-method-option__content">
        <span class="payment-method-option__title">Thanh toan khi nhan hang (COD)</span>
        <span class="payment-method-option__desc">Tra tien mat khi nhan hang</span>
      </span>
    </label>
    <label class="payment-method-option">
      <input type="radio" name="payment_method" value="bank_transfer">
      <span class="payment-method-option__icon">
        <!-- Bank icon SVG -->
      </span>
      <span class="payment-method-option__content">
        <span class="payment-method-option__title">Chuyen khoan ngan hang</span>
        <span class="payment-method-option__desc">Quet ma QR de thanh toan</span>
      </span>
    </label>
  </div>
</div>
```

## Related Code Files

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | 942-954 | Quantity row and submit button |
| `css/sections.css` | N/A | Add new styles |
| `css/components.css` | Reference | Existing component patterns |

## Implementation Steps

### Step 1: Add HTML Markup
Insert payment method selector after line 948 (quantity-row closing div) in `index.html`:
```html
<div class="order-form__payment-method">
  <!-- Payment method options -->
</div>
```

### Step 2: Add CSS Styles
Add to `css/sections.css`:
```css
/* Payment Method Selector */
.order-form__payment-method { ... }
.payment-method-selector { ... }
.payment-method-option { ... }
.payment-method-option--selected { ... }
.payment-method-option:hover { ... }
.payment-method-option input[type="radio"] { ... }
```

### Step 3: Add JavaScript Logic
Add to `js/pancake-integration.js`:
```javascript
function initPaymentMethodSelector() {
  const radios = document.querySelectorAll('input[name="payment_method"]');
  radios.forEach(radio => {
    radio.addEventListener('change', handlePaymentMethodChange);
  });
}

function handlePaymentMethodChange(e) {
  // Update visual selection
  // Update submit button text
}
```

### Step 4: Update Submit Button Text
- COD: "Dat Hang - Thanh Toan Khi Nhan"
- Bank Transfer: "Dat Hang - Chuyen Khoan"

## Todo List

- [ ] Create payment method HTML structure
- [ ] Style payment method options (desktop)
- [ ] Style payment method options (mobile)
- [ ] Add selection state styling
- [ ] Implement JS selection handler
- [ ] Update submit button text dynamically
- [ ] Test keyboard navigation
- [ ] Test screen reader accessibility

## Success Criteria

1. Payment options display correctly on desktop and mobile
2. Selected option has clear visual indicator
3. Tab navigation works correctly
4. Submit button text changes based on selection
5. Default selection is COD

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaks existing form | High | Test COD flow after changes |
| Mobile layout issues | Medium | Test on multiple devices |
| Accessibility issues | Medium | Use semantic HTML, ARIA labels |

## Security Considerations

- No sensitive data in this phase
- Payment method value validated server-side by Pancake POS

## Next Steps

After completion, proceed to [Phase 02: QR Code Generation](./phase-02-qr-generation.md)
