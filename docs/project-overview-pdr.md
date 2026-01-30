# ENZARA Product Landing Pages - Project Overview and Product Development Requirements (PDR)

**Version:** 1.0.0
**Last Updated:** 2026-01-30
**Project Status:** Production
**Deployment Platform:** Cloudflare Pages + Workers

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Product Development Requirements](#product-development-requirements)
4. [Technical Architecture](#technical-architecture)
5. [Product Portfolio](#product-portfolio)
6. [Business Requirements](#business-requirements)
7. [Success Metrics](#success-metrics)
8. [Project Timeline](#project-timeline)

---

## Executive Summary

ENZARA Product Landing Pages is a multi-product e-commerce landing page system for ENZARA Vietnam, a brand specializing in organic enzyme-based household cleaning products. The project consists of 5 individual product landing pages with integrated payment processing through Pancake POS and SePay payment gateway.

### Key Highlights

- **Platform:** Static HTML/CSS/JavaScript deployed on Cloudflare Pages
- **Payment Integration:** Pancake POS API + SePay bank transfer gateway via Cloudflare Worker
- **Products:** 5 organic cleaning products (dish soap, vegetable wash, bottle cleaner, multi-purpose cleaner)
- **Target Market:** Vietnamese health-conscious families, mothers with young children
- **Conversion Strategy:** 16-step AIDA-based sales funnel

---

## Project Overview

### Vision

Create high-converting, mobile-first landing pages for ENZARA's product line that emphasize product safety, natural ingredients, and environmental sustainability while providing seamless payment experience through both COD and bank transfer methods.

### Mission

Deliver a scalable, maintainable landing page system that:
- Converts visitors into customers through proven sales psychology techniques
- Provides multiple payment methods (COD and instant bank transfer)
- Integrates seamlessly with Pancake POS for order management
- Supports easy product addition and customization
- Maintains consistent brand identity across all product pages

### Scope

**In Scope:**
- 5 product-specific landing pages
- Shared CSS/JS component library
- Payment integration (Pancake POS + SePay)
- QR code payment flow
- Real-time payment verification via Cloudflare Worker
- Mobile-responsive design
- Vietnamese localization
- Domain mapping to Cloudflare Pages

**Out of Scope:**
- User authentication/accounts
- Shopping cart functionality
- Multi-product orders
- Admin dashboard
- Analytics dashboard (uses external tools)
- CMS integration

---

## Product Development Requirements

### 1. Functional Requirements

#### FR-001: Product Landing Pages
- **Priority:** P0 (Critical)
- **Description:** Each product must have a dedicated landing page following the 16-step AIDA sales structure
- **Acceptance Criteria:**
  - Hero section with product image and value proposition
  - Benefits bar with key selling points
  - Detailed product information sections
  - Customer testimonials
  - FAQ accordion
  - Order form with quantity selector
  - Payment method selection (COD/Bank Transfer)
  - Mobile-responsive design (320px - 1920px)

#### FR-002: Order Processing
- **Priority:** P0 (Critical)
- **Description:** Integrate with Pancake POS API for order creation and management
- **Acceptance Criteria:**
  - Create order in Pancake POS with customer details
  - Support both COD and bank transfer payment methods
  - Calculate shipping fees (free for 2+ items, 30,000 VND for 1 item)
  - Generate unique order codes for bank transfers
  - Display order confirmation with tracking link
  - Handle API errors gracefully with user-friendly messages

#### FR-003: Payment Gateway Integration
- **Priority:** P0 (Critical)
- **Description:** Implement SePay bank transfer integration for instant payment
- **Acceptance Criteria:**
  - Generate VietQR-compatible QR codes
  - Open payment page in new tab with QR code and bank details
  - Poll payment status every 3 seconds
  - Display 10-minute countdown timer
  - Auto-update Pancake POS order when payment confirmed
  - Show payment success/timeout status
  - Support manual retry mechanism

#### FR-004: Product Catalog Management
- **Priority:** P1 (High)
- **Description:** Support multiple products with individual configurations
- **Acceptance Criteria:**
  - Each product has own directory (nuoc-rua-chen-dua, etc.)
  - Shared CSS/JS components for consistency
  - Product-specific images and copy
  - Configurable pricing in JavaScript
  - Pancake POS product/variation ID mapping

#### FR-005: Address Auto-complete
- **Priority:** P2 (Medium)
- **Description:** Provide province/ward selection dropdowns
- **Acceptance Criteria:**
  - Load Vietnam provinces from external API
  - Load wards based on selected province
  - Store full address names for Pancake POS
  - Validate address completeness before submission

### 2. Non-Functional Requirements

#### NFR-001: Performance
- **Priority:** P0 (Critical)
- **Requirements:**
  - Page load time < 3 seconds on 3G connection
  - First Contentful Paint (FCP) < 1.5 seconds
  - Largest Contentful Paint (LCP) < 2.5 seconds
  - Time to Interactive (TTI) < 3.5 seconds
  - Minimize JavaScript bundle size
  - Optimize images (WebP format preferred)
  - Lazy load below-fold images

#### NFR-002: Availability
- **Priority:** P0 (Critical)
- **Requirements:**
  - 99.9% uptime via Cloudflare Pages SLA
  - Cloudflare Worker for payment gateway with automatic retries
  - Graceful degradation if payment API is unavailable
  - Static asset caching via CDN

#### NFR-003: Security
- **Priority:** P0 (Critical)
- **Requirements:**
  - HTTPS only (enforced by Cloudflare)
  - No sensitive data in client-side code
  - API keys stored as Cloudflare Worker secrets
  - CORS restrictions on payment webhook
  - Input validation and sanitization
  - XSS protection

#### NFR-004: Usability
- **Priority:** P0 (Critical)
- **Requirements:**
  - Mobile-first design
  - Touch-friendly buttons (min 44x44px)
  - Clear error messages in Vietnamese
  - Loading states for all async operations
  - Accessible form labels and ARIA attributes
  - Keyboard navigation support

#### NFR-005: Maintainability
- **Priority:** P1 (High)
- **Requirements:**
  - Modular CSS architecture (variables, base, components, sections)
  - Reusable JavaScript functions
  - Consistent naming conventions
  - Inline code documentation
  - Separate configuration from logic
  - Version control via Git

#### NFR-006: Scalability
- **Priority:** P1 (High)
- **Requirements:**
  - Support adding new products without code duplication
  - Shared component library
  - Template-based approach for consistency
  - Cloudflare Pages handles traffic scaling automatically
  - KV store for payment status (auto-scaling)

### 3. Technical Constraints

#### TC-001: Technology Stack
- **Constraint:** Must use vanilla HTML/CSS/JavaScript (no frameworks)
- **Rationale:** Minimize dependencies, maximize performance, reduce bundle size

#### TC-002: Deployment Platform
- **Constraint:** Must deploy on Cloudflare Pages
- **Rationale:** Client requirement, cost-effective, excellent performance

#### TC-003: Payment Integration
- **Constraint:** Must use Pancake POS API v1 and SePay payment gateway
- **Rationale:** Existing business systems integration

#### TC-004: Browser Support
- **Constraint:** Support modern browsers (Chrome 90+, Safari 14+, Firefox 88+, Edge 90+)
- **Rationale:** Target audience uses modern mobile browsers

---

## Technical Architecture

### System Components

1. **Static Landing Pages** (HTML/CSS/JS)
   - Deployed on Cloudflare Pages
   - Shared component library in `/css` and `/js`
   - Product-specific pages in `/products/*`

2. **Cloudflare Worker** (Payment Gateway)
   - Webhook receiver for SePay bank transfers
   - Payment status storage in KV
   - Auto-update Pancake POS orders
   - Multi-shop support

3. **External Integrations**
   - Pancake POS API (Order management)
   - SePay Payment Gateway (Bank transfers)
   - VietQR (QR code generation)
   - Vietnam Provinces API (Address autocomplete)

### Data Flow

```
User -> Landing Page -> Order Form -> Pancake POS API -> Order Created
                                   |
                                   v
                           Payment Method?
                                   |
                    +---------------+---------------+
                    |                               |
                 COD                         Bank Transfer
                    |                               |
                    v                               v
            Success Message               Payment Page (QR)
                                                   |
                                                   v
                                    User Transfers -> SePay
                                                   |
                                                   v
                                    Webhook -> Cloudflare Worker
                                                   |
                                                   v
                                    Update Pancake POS (prepaid)
                                                   |
                                                   v
                                    Frontend Polls -> Payment Confirmed
```

---

## Product Portfolio

### Current Products

1. **Nuoc Rua Chen Dua** (Pineapple Dish Soap)
   - Path: `/products/nuoc-rua-chen-dua/`
   - Price: 50,000 VND (sale) / 75,000 VND (original)
   - Volume: 500g
   - Key Feature: 91% pineapple enzyme

2. **Nuoc Rua Chen Gung** (Ginger Dish Soap)
   - Path: `/products/nuoc-rua-chen-gung/`
   - Price: 50,000 VND (sale) / 75,000 VND (original)
   - Volume: 500g
   - Key Feature: Ginger antibacterial

3. **Nuoc Rua Rau Cu** (Vegetable & Fruit Wash)
   - Path: `/products/nuoc-rua-rau-cu/`
   - Price: 50,000 VND
   - Volume: 500ml
   - Key Feature: Removes pesticides

4. **Nuoc Rua Binh Sua** (Baby Bottle Cleaner)
   - Path: `/products/nuoc-rua-binh-sua/`
   - Price: 50,000 VND
   - Volume: 500ml
   - Key Feature: Baby-safe formula

5. **Tay Da Nang** (Multi-Purpose Cleaner)
   - Path: `/products/tay-da-nang/`
   - Price: 55,000 VND
   - Volume: 500ml
   - Key Feature: All-surface cleaning

---

## Business Requirements

### BR-001: Conversion Optimization
- Implement 16-step AIDA sales structure
- Create urgency through countdown timers
- Display scarcity indicators (limited stock)
- Show social proof (live viewers, testimonials)
- Offer free shipping on 2+ items

### BR-002: Customer Experience
- Provide instant payment confirmation
- Send order tracking links
- Display clear shipping information
- Offer multiple payment methods
- Show responsive customer support contact

### BR-003: Brand Consistency
- Maintain ENZARA brand colors and typography
- Use consistent messaging about natural ingredients
- Emphasize safety and environmental benefits
- Professional product photography

### BR-004: Order Fulfillment
- Integrate with Pancake POS for warehouse management
- Auto-assign orders to ENZARA warehouse
- Track order status through Pancake system
- Generate shipping labels via Pancake

---

## Success Metrics

### Key Performance Indicators (KPIs)

1. **Conversion Rate:** > 2% (visitors to orders)
2. **Average Order Value:** > 100,000 VND
3. **Mobile Conversion Rate:** > 1.5%
4. **Payment Success Rate:** > 95% (bank transfer)
5. **Page Load Time:** < 3 seconds
6. **Bounce Rate:** < 60%
7. **Add to Cart Rate:** > 10%
8. **Order Completion Rate:** > 80%

### Business Metrics

1. **Monthly Orders:** Target 500+ orders/month
2. **Customer Acquisition Cost:** < 50,000 VND
3. **Return Customer Rate:** > 20%
4. **Average Customer Lifetime Value:** > 300,000 VND

---

## Project Timeline

### Phase 1: Foundation (Completed)
- Project setup and architecture design
- Design system and brand guidelines
- Shared component library
- First product landing page (Pineapple Dish Soap)

### Phase 2: Product Expansion (Completed)
- Additional product pages (4 more products)
- Payment integration (Pancake POS + SePay)
- Cloudflare Worker webhook handler
- Address autocomplete

### Phase 3: Optimization (Current)
- Performance optimization
- SEO improvements
- Analytics integration
- A/B testing setup

### Phase 4: Future Enhancements (Planned)
- Custom domain mapping
- Advanced analytics dashboard
- Customer review system
- Email marketing integration
- Multi-variant product support

---

## Risks and Mitigation

### Technical Risks

1. **Payment Gateway Downtime**
   - **Risk Level:** Medium
   - **Mitigation:** Fallback to COD, retry logic, user notifications

2. **Pancake POS API Rate Limits**
   - **Risk Level:** Low
   - **Mitigation:** Implement exponential backoff, queue system

3. **Mobile Performance**
   - **Risk Level:** Medium
   - **Mitigation:** Aggressive image optimization, code splitting, lazy loading

### Business Risks

1. **Low Conversion Rate**
   - **Risk Level:** High
   - **Mitigation:** A/B testing, user feedback, UX improvements

2. **High Cart Abandonment**
   - **Risk Level:** Medium
   - **Mitigation:** Simplified checkout, multiple payment options, trust signals

---

## Compliance and Standards

### Legal Requirements
- Privacy policy for customer data
- Terms and conditions
- Return and refund policy
- GDPR compliance (if applicable)

### Quality Standards
- WCAG 2.1 Level AA accessibility
- Mobile-first responsive design
- Cross-browser compatibility
- SEO best practices

---

## Contact and Support

**Project Owner:** ENZARA Vietnam
**Technical Lead:** Development Team
**Deployment Platform:** Cloudflare Pages
**Support Contact:** 0945.139.990

---

**Document History:**
- v1.0.0 (2026-01-30): Initial documentation created
