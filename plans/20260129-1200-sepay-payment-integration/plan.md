# SePay Payment Integration Plan

**Project:** ENZARA Landing Page
**Date:** 2026-01-29
**Status:** Completed

## Overview

Add bank transfer payment option via SePay QR code to ENZARA landing page. Due to GitHub Pages static hosting limitation, payment confirmation will be manual via order code matching in Pancake POS.

## Phases

| # | Phase | Priority | Status | Link |
|---|-------|----------|--------|------|
| 1 | Payment Method UI | High | ✅ Completed | [phase-01-payment-ui.md](./phase-01-payment-ui.md) |
| 2 | QR Code Generation | High | ✅ Completed | [phase-02-qr-generation.md](./phase-02-qr-generation.md) |
| 3 | Order Flow Integration | High | ✅ Completed | [phase-03-order-flow.md](./phase-03-order-flow.md) |

## Architecture

```
[User] --> [Order Form] --> [Payment Method Selection]
                                    |
                    +---------------+---------------+
                    |                               |
                [COD Flow]                  [Bank Transfer Flow]
                    |                               |
            [Create Order]                  [Create Order]
            [payment_method: cod]           [payment_method: bank_transfer]
                    |                               |
            [Success Message]               [Show QR Modal]
                                                    |
                                            [User Scans QR]
                                                    |
                                            [User Pays via Bank App]
                                                    |
                                            [Staff Verifies in Pancake POS]
```

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add payment method selector, QR modal markup |
| `js/pancake-integration.js` | Payment method handling, QR generation, modal logic |
| `css/sections.css` | Payment selector and modal styles |

## Configuration Required

```javascript
const SEPAY_CONFIG = {
  accountNumber: '080838689999',
  bankCode: 'mbbank',
  accountName: 'ENZARA VIET NAM'
};
```

## Success Criteria

1. User can select COD or Bank Transfer payment
2. COD orders work unchanged
3. Bank Transfer orders display QR code with correct amount
4. Order code appears in both QR description and Pancake POS note
5. Modal provides clear payment instructions
6. Mobile-responsive QR display

## Effort Estimate

| Phase | Estimate |
|-------|----------|
| Phase 1 | 1-2 hours |
| Phase 2 | 1-2 hours |
| Phase 3 | 2-3 hours |
| Testing | 1-2 hours |
| **Total** | **5-9 hours** |

## Dependencies

- SePay account credentials (bank code, account number)
- Pancake POS API continues to work
- Business owner approval on payment flow

## Unresolved Questions

1. What bank account and code to use for SePay?
2. Payment confirmation timeout policy?
3. Should staff receive notification for bank transfer orders?
4. Fallback if SePay QR service is unavailable?
