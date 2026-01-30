# ENZARA Landing Pages - Code Standards and Conventions

**Version:** 1.0.0
**Last Updated:** 2026-01-30
**Applies To:** All HTML, CSS, JavaScript files in the project

---

## Table of Contents

1. [Project Structure Standards](#project-structure-standards)
2. [HTML Standards](#html-standards)
3. [CSS Standards](#css-standards)
4. [JavaScript Standards](#javascript-standards)
5. [Naming Conventions](#naming-conventions)
6. [File Organization](#file-organization)
7. [Code Quality Guidelines](#code-quality-guidelines)
8. [Accessibility Standards](#accessibility-standards)
9. [Performance Standards](#performance-standards)
10. [Version Control Standards](#version-control-standards)

---

## Project Structure Standards

### Directory Organization

```
Root Level:
├── assets/          # Static assets (images, icons)
├── css/             # Shared stylesheets (variables, base, components, sections)
├── js/              # Shared JavaScript modules
├── products/        # Product-specific landing pages
├── cloudflare-worker/  # Payment gateway worker
├── docs/            # Project documentation
├── deploy/          # Build output (generated, not committed)
└── plans/           # Project planning documents

Product Level:
products/{product-name}/
├── index.html       # Landing page
└── payment.html     # Payment page
```

### File Naming

- **Lowercase with hyphens:** `nuoc-rua-chen-dua/index.html`
- **Descriptive names:** `pancake-integration.js` not `integration.js`
- **No spaces or special characters:** Use `-` or `_`
- **Consistent extensions:** `.html`, `.css`, `.js`, `.md`

### Asset Naming

- **Images:** `product-{variant}-{view}.{ext}` (e.g., `product-dua-hero.jpg`)
- **Icons:** `icon-{name}.svg` (e.g., `icon-checkmark.svg`)
- **Logos:** `logo-{variant}.png` (e.g., `logo-white.png`)

---

## HTML Standards

### Document Structure

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="...">
  <meta name="keywords" content="...">

  <!-- Open Graph tags -->
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:type" content="product">

  <!-- Fonts (preconnect for performance) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="..." rel="stylesheet">

  <!-- Stylesheets (order matters) -->
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/sections.css">

  <title>Page Title | ENZARA</title>
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
</head>
<body>
  <!-- Content -->

  <!-- Scripts at end of body for performance -->
  <script src="js/animations.js"></script>
  <script src="js/main.js"></script>
  <script src="js/pancake-integration.js"></script>
</body>
</html>
```

### Semantic HTML

**Use Semantic Tags:**
```html
<header>   <!-- Site header -->
<nav>      <!-- Navigation -->
<main>     <!-- Main content -->
<section>  <!-- Content section -->
<article>  <!-- Independent content -->
<aside>    <!-- Sidebar content -->
<footer>   <!-- Footer -->
```

**Avoid:**
```html
<div class="header">  <!-- Use <header> instead -->
<div class="nav">     <!-- Use <nav> instead -->
```

### Heading Hierarchy

```html
<h1>Page Title</h1>           <!-- One per page -->
  <h2>Section Title</h2>      <!-- Multiple allowed -->
    <h3>Subsection Title</h3> <!-- Nested under h2 -->
      <h4>Detail Title</h4>   <!-- Nested under h3 -->
```

**Rules:**
- One `<h1>` per page
- No skipping levels (h1 → h3 is invalid)
- Hierarchy must be logical

### Form Best Practices

```html
<form id="order-form" novalidate>
  <div class="form-group">
    <label for="customer-name">Họ và tên *</label>
    <input
      type="text"
      id="customer-name"
      name="name"
      class="form-control"
      required
      aria-required="true"
      aria-describedby="name-error"
      autocomplete="name"
    >
    <!-- Error message inserted by JavaScript -->
  </div>

  <button type="submit" class="btn btn-primary">
    <span id="submit-btn-text">Đặt Hàng</span>
  </button>
</form>
```

**Form Standards:**
- Always use `<label>` with `for` attribute
- Include `id` on form inputs
- Use `name` attribute for form submission
- Add `autocomplete` attributes for better UX
- Use `aria-*` attributes for accessibility
- Mark required fields with `*` in label
- Use `novalidate` to prevent browser validation (use custom JS validation)

### Image Best Practices

```html
<img
  src="assets/images/product-hero.jpg"
  alt="Nước Rửa Chén Hữu Cơ ENZARA Hương Dứa"
  width="400"
  height="400"
  loading="lazy"
>
```

**Image Standards:**
- Always include `alt` text (descriptive, not decorative)
- Specify `width` and `height` to prevent layout shift
- Use `loading="lazy"` for below-fold images
- Omit `loading` for hero/above-fold images

### Link Best Practices

```html
<!-- Internal links -->
<a href="#order" class="btn btn-primary">Đặt Hàng Ngay</a>

<!-- External links -->
<a
  href="https://pancake.vn"
  target="_blank"
  rel="noopener noreferrer"
>
  Pancake POS
</a>

<!-- Phone links -->
<a href="tel:0945139990">0945.139.990</a>
```

**Link Standards:**
- Use `target="_blank"` for external links
- Always add `rel="noopener noreferrer"` with `target="_blank"`
- Use `href="tel:..."` for phone numbers
- Use `href="mailto:..."` for emails

### Comments

```html
<!-- ========================================
     SECTION 1: HERO AIDA
     ======================================== -->
<section class="hero" id="hero">
  <!-- Hero content -->
</section>

<!-- ========================================
     SECTION 2: BENEFITS BAR
     ======================================== -->
<section class="benefits-bar" id="benefits-bar">
  <!-- Benefits content -->
</section>
```

**Comment Standards:**
- Use section headers for major sections
- Comment complex structures
- Avoid over-commenting obvious code
- Use Vietnamese or English consistently

---

## CSS Standards

### Architecture: ITCSS-inspired

```
1. Variables (css/variables.css)    - Design tokens, CSS custom properties
2. Base (css/base.css)              - Reset, typography, global styles
3. Components (css/components.css)  - Reusable UI components
4. Sections (css/sections.css)      - Page-specific sections
5. Utilities (inline or icons.css)  - Helper classes
```

### CSS Custom Properties (Variables)

```css
/* css/variables.css */
:root {
  /* Colors */
  --color-forest-green: #1B5E20;
  --color-leaf-green: #2E7D32;
  --color-sunset-orange: #FF8F00;

  /* Typography */
  --font-primary: 'Be Vietnam Pro', sans-serif;
  --font-accent: 'Quicksand', sans-serif;
  --text-base: 16px;
  --text-h1: 2.5rem;
  --text-h2: 2rem;

  /* Spacing (8px base unit) */
  --space-1: 2px;
  --space-2: 4px;
  --space-3: 8px;
  --space-4: 16px;
  --space-8: 64px;

  /* Layout */
  --container-max: 1200px;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;

  /* Effects */
  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --transition-base: all 0.3s ease;
}
```

**Variable Naming:**
- Use `--prefix-name` format
- Group by category (color, font, space, etc.)
- Descriptive names (not `--color-1`, use `--color-forest-green`)

### BEM Naming Convention

**Block Element Modifier (BEM):**

```css
/* Block */
.hero { }

/* Element */
.hero__title { }
.hero__subtitle { }
.hero__image { }

/* Modifier */
.hero--dark { }
.hero__title--large { }
```

**Rules:**
- Block: `.component-name`
- Element: `.component-name__element-name`
- Modifier: `.component-name--modifier-name`
- Use single hyphen for multi-word names: `.order-form`, `.payment-method`
- Use double underscore for elements: `__`
- Use double hyphen for modifiers: `--`

### Class Naming Examples

```html
<!-- Good -->
<div class="product-card">
  <img class="product-card__image" src="...">
  <h3 class="product-card__title">Product Name</h3>
  <p class="product-card__price product-card__price--sale">50,000đ</p>
</div>

<!-- Avoid -->
<div class="card">
  <img class="cardImage" src="...">
  <h3 class="CardTitle">Product Name</h3>
  <p class="price sale">50,000đ</p>
</div>
```

### CSS Formatting

```css
/* Component: Button */
.btn {
  display: inline-block;
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
  font-weight: 600;
  text-align: center;
  border-radius: var(--radius-md);
  transition: var(--transition-base);
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-sunset-orange) 0%, var(--color-pineapple-gold) 100%);
  color: var(--color-white);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

**Formatting Rules:**
- One selector per line
- Opening brace on same line as selector
- One property per line
- Alphabetical property order (preferred but not required)
- Space after colon
- Semi-colon after every property
- Closing brace on new line
- Blank line between rule sets

### Mobile-First Responsive Design

```css
/* Mobile first (default) */
.hero {
  padding: var(--space-4);
  flex-direction: column;
}

/* Tablet and up */
@media (min-width: 768px) {
  .hero {
    padding: var(--space-6);
    flex-direction: row;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .hero {
    padding: var(--space-8);
  }
}
```

**Breakpoints:**
- Mobile: 320px - 767px (default)
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Wide: 1440px+

### CSS Performance

```css
/* Good - Efficient selectors */
.btn { }
.btn-primary { }
.hero__title { }

/* Avoid - Inefficient selectors */
div.btn { }                    /* Don't qualify with tag */
.hero .container .title { }    /* Too specific */
#hero > div > h1 { }           /* Avoid IDs and complex nesting */
```

**Rules:**
- Keep specificity low
- Avoid IDs in CSS (use classes)
- Avoid !important (except utilities)
- Minimize nesting depth (max 3 levels)
- Use shorthand properties where possible

---

## JavaScript Standards

### Code Style

```javascript
/* ENZARA - Module Name */

(function() {
  'use strict';

  // ========================================
  // CONSTANTS AND CONFIGURATION
  // ========================================

  const PRODUCT_PRICE = 50000;
  const SHIPPING_COST = 30000;
  const FREE_SHIPPING_MIN = 2;

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================

  function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  }

  // ========================================
  // INITIALIZATION
  // ========================================

  function init() {
    initCountdown();
    initOrderForm();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

**Style Rules:**
- Use IIFE to avoid global namespace pollution
- Use `'use strict';` mode
- Use `const` for constants, `let` for variables (avoid `var`)
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants
- Add section comments for major blocks
- Use JSDoc for function documentation (optional but recommended)

### Variable Naming

```javascript
// Good
const productPrice = 50000;
const customerName = formData.get('name');
const isPaymentComplete = false;

// Avoid
const price = 50000;           // Not specific enough
const name = formData.get('name');  // Too generic
const complete = false;        // Unclear what is complete
```

**Naming Rules:**
- Use descriptive names (no single letters except loop counters)
- Boolean variables start with `is`, `has`, `should`
- Functions start with verb: `get`, `set`, `update`, `init`, `handle`
- Use singular for single values, plural for arrays/collections

### Function Standards

```javascript
/**
 * Creates a Pancake POS order
 * @param {Object} orderData - Customer and order information
 * @param {string} orderData.name - Customer name
 * @param {string} orderData.phone - Customer phone (10 digits)
 * @param {number} orderData.quantity - Order quantity
 * @returns {Promise<Object>} Order result with orderId and status
 */
async function createPancakeOrder(orderData) {
  // Validate input
  if (!orderData || !orderData.name) {
    throw new Error('Invalid order data');
  }

  // Build request
  const url = buildApiUrl('/orders');
  const payload = { /* ... */ };

  // Send request
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, orderId: result.data.id };
    } else {
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.error('Create order failed:', error);
    return { success: false, error: 'Network error' };
  }
}
```

**Function Rules:**
- One function, one purpose (Single Responsibility)
- Keep functions short (<50 lines preferred)
- Use early returns for error cases
- Always handle errors (try/catch for async)
- Return consistent data structures
- Add JSDoc comments for complex functions

### DOM Manipulation

```javascript
// Good - Cache selectors
function initQuantitySelector() {
  const selector = document.querySelector('.quantity-selector');
  if (!selector) return;

  const minusBtn = selector.querySelector('[data-action="decrease"]');
  const plusBtn = selector.querySelector('[data-action="increase"]');
  const valueEl = selector.querySelector('.quantity-selector__value');

  minusBtn.addEventListener('click', () => {
    // Handle click
  });
}

// Avoid - Repeated queries
function badExample() {
  document.querySelector('.btn').addEventListener('click', () => {
    document.querySelector('.value').textContent =
      parseInt(document.querySelector('.value').textContent) + 1;
  });
}
```

**DOM Rules:**
- Cache DOM queries (don't query repeatedly)
- Check element exists before using: `if (!element) return;`
- Use event delegation for dynamic elements
- Use data attributes for JavaScript hooks: `data-action="submit"`
- Prefer `classList.add/remove()` over `className =`

### Event Handling

```javascript
// Good - Named function for clarity
function handleFormSubmit(e) {
  e.preventDefault();
  e.stopPropagation();

  // Handle submission
}

form.addEventListener('submit', handleFormSubmit);

// Good - Arrow function for simple handlers
plusBtn.addEventListener('click', () => {
  quantity++;
  updateDisplay();
});
```

**Event Rules:**
- Always call `preventDefault()` for form submissions
- Use `stopPropagation()` when needed to prevent bubbling
- Remove event listeners when element is removed
- Use named functions for complex handlers
- Use arrow functions for simple inline handlers

### Async/Await Standards

```javascript
// Good - Proper error handling
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Fetch failed:', error);
    return { success: false, error: error.message };
  }
}

// Avoid - No error handling
async function badFetch() {
  const response = await fetch(url);
  return await response.json();  // Will crash on error
}
```

**Async Rules:**
- Always use try/catch with async/await
- Return consistent result objects: `{ success, data?, error? }`
- Log errors to console
- Show user-friendly error messages in UI
- Handle network failures gracefully

### Comments

```javascript
// Single-line comment for brief explanations

/**
 * Multi-line JSDoc comment for functions
 * @param {string} name - Parameter description
 * @returns {number} Return value description
 */

/*
 * Multi-line comment for longer explanations
 * that span multiple lines
 */
```

**Comment Rules:**
- Comment "why", not "what" (code should be self-documenting)
- Use JSDoc for public functions
- Section headers for major code blocks
- Update comments when code changes
- Avoid commented-out code (use version control instead)

---

## Naming Conventions

### File Names

| Type | Convention | Example |
|------|-----------|---------|
| HTML | kebab-case | `index.html`, `payment.html` |
| CSS | kebab-case | `variables.css`, `components.css` |
| JavaScript | kebab-case | `main.js`, `pancake-integration.js` |
| Images | kebab-case | `product-hero.jpg`, `icon-checkmark.svg` |
| Directories | kebab-case | `nuoc-rua-chen-dua/`, `cloudflare-worker/` |

### CSS Class Names (BEM)

| Type | Convention | Example |
|------|-----------|---------|
| Block | kebab-case | `.product-card`, `.order-form` |
| Element | block__element | `.product-card__title`, `.order-form__input` |
| Modifier | block--modifier | `.btn--primary`, `.card--featured` |

### JavaScript Names

| Type | Convention | Example |
|------|-----------|---------|
| Variables | camelCase | `productPrice`, `customerName` |
| Constants | UPPER_SNAKE_CASE | `PRODUCT_PRICE`, `SHIPPING_COST` |
| Functions | camelCase | `createOrder()`, `updateSummary()` |
| Classes | PascalCase | `OrderManager`, `PaymentGateway` |
| Private | _prefixed | `_internalFunction()` |

### ID Names

| Type | Convention | Example |
|------|-----------|---------|
| Form fields | kebab-case | `customer-name`, `phone-number` |
| Sections | kebab-case | `hero`, `benefits-bar` |

---

## File Organization

### CSS File Structure

```css
/* css/components.css */

/* ========================================
   COMPONENT: BUTTON
   ======================================== */

.btn { /* Base styles */ }
.btn-primary { /* Primary variant */ }
.btn-secondary { /* Secondary variant */ }
.btn:hover { /* Hover state */ }
.btn:active { /* Active state */ }
.btn:disabled { /* Disabled state */ }

/* ========================================
   COMPONENT: FORM CONTROLS
   ======================================== */

.form-control { /* Base input */ }
.form-control:focus { /* Focus state */ }
.form-control.error { /* Error state */ }
.input-error { /* Error message */ }
```

### JavaScript File Structure

```javascript
/* ENZARA - Module Name */

(function() {
  'use strict';

  // ========================================
  // CONFIGURATION
  // ========================================

  const CONFIG = { /* ... */ };

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================

  function utilityFunction() { /* ... */ }

  // ========================================
  // FEATURE: Feature Name
  // ========================================

  function featureInit() { /* ... */ }
  function featureHandler() { /* ... */ }

  // ========================================
  // INITIALIZATION
  // ========================================

  function init() {
    featureInit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

---

## Code Quality Guidelines

### DRY Principle (Don't Repeat Yourself)

```javascript
// Good - Reusable function
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

const price1 = formatCurrency(50000);
const price2 = formatCurrency(100000);

// Avoid - Repeated code
const price1 = new Intl.NumberFormat('vi-VN').format(50000) + 'đ';
const price2 = new Intl.NumberFormat('vi-VN').format(100000) + 'đ';
```

### Single Responsibility Principle

```javascript
// Good - Each function has one job
function validatePhone(phone) {
  return /^0\d{9}$/.test(phone);
}

function showError(field, message) {
  const errorEl = document.createElement('p');
  errorEl.className = 'input-error';
  errorEl.textContent = message;
  field.parentNode.appendChild(errorEl);
}

// Avoid - Function does too much
function validateAndShowPhoneError(phone, field) {
  const isValid = /^0\d{9}$/.test(phone);
  if (!isValid) {
    const errorEl = document.createElement('p');
    errorEl.className = 'input-error';
    errorEl.textContent = 'Invalid phone';
    field.parentNode.appendChild(errorEl);
  }
  return isValid;
}
```

### Error Handling

```javascript
// Good - Graceful degradation
function initFeature() {
  const element = document.querySelector('.feature');
  if (!element) {
    console.warn('Feature element not found');
    return; // Fail silently
  }

  // Feature code
}

// Good - User-friendly error messages
try {
  await createOrder(data);
} catch (error) {
  console.error('Order creation failed:', error);
  showErrorMessage('Không thể tạo đơn hàng. Vui lòng thử lại.');
}
```

### Magic Numbers

```javascript
// Good - Named constants
const FREE_SHIPPING_THRESHOLD = 2;
const SHIPPING_COST = 30000;

if (quantity >= FREE_SHIPPING_THRESHOLD) {
  shipping = 0;
} else {
  shipping = SHIPPING_COST;
}

// Avoid - Magic numbers
if (quantity >= 2) {
  shipping = 0;
} else {
  shipping = 30000;
}
```

---

## Accessibility Standards

### Semantic HTML

```html
<!-- Good -->
<button type="button" class="btn">Click Me</button>

<!-- Avoid -->
<div class="btn" onclick="handleClick()">Click Me</div>
```

### ARIA Attributes

```html
<button
  type="button"
  aria-label="Tăng số lượng"
  aria-controls="quantity-value"
>
  +
</button>

<div
  role="alert"
  aria-live="polite"
  class="error-message"
>
  Error message here
</div>
```

### Keyboard Navigation

```javascript
// Ensure keyboard accessibility
element.addEventListener('click', handleClick);
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
});
```

### Color Contrast

- Text on background: Minimum 4.5:1 ratio
- Large text (18pt+): Minimum 3:1 ratio
- Use tools like WebAIM Contrast Checker

---

## Performance Standards

### Image Optimization

```html
<!-- Good -->
<img
  src="product-hero.webp"
  alt="Product"
  width="400"
  height="400"
  loading="lazy"
>

<!-- Fallback for older browsers -->
<picture>
  <source srcset="product-hero.webp" type="image/webp">
  <source srcset="product-hero.jpg" type="image/jpeg">
  <img src="product-hero.jpg" alt="Product">
</picture>
```

### JavaScript Performance

```javascript
// Good - Debounce expensive operations
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

window.addEventListener('resize', debounce(handleResize, 250));

// Good - Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

window.addEventListener('scroll', throttle(handleScroll, 100));
```

### CSS Performance

```css
/* Good - Avoid expensive properties */
.element {
  transform: translateX(100px);  /* GPU-accelerated */
  opacity: 0.5;                  /* GPU-accelerated */
}

/* Avoid - Triggers layout */
.element {
  left: 100px;     /* Triggers layout */
  width: 50%;      /* Triggers layout */
}
```

---

## Version Control Standards

### Commit Messages

```
Format: <type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, no logic change)
- refactor: Code refactoring
- perf: Performance improvement
- test: Adding tests
- chore: Build process or auxiliary tool changes

Examples:
feat(payment): add SePay bank transfer integration
fix(order-form): validate phone number correctly
docs(readme): update deployment instructions
style(css): format components.css with prettier
refactor(js): extract payment logic to separate module
perf(images): optimize hero images to WebP format
```

### Branch Naming

```
main           - Production-ready code
develop        - Development branch
feature/*      - New features
fix/*          - Bug fixes
hotfix/*       - Critical production fixes

Examples:
feature/sepay-integration
fix/order-form-validation
hotfix/payment-webhook-error
```

### Pull Request Guidelines

1. **Title:** Clear, descriptive (same as commit message format)
2. **Description:** What changed and why
3. **Testing:** How to test the changes
4. **Screenshots:** For UI changes
5. **Checklist:**
   - [ ] Code follows style guide
   - [ ] Tested on mobile and desktop
   - [ ] No console errors
   - [ ] Documentation updated (if needed)

---

## Code Review Checklist

### HTML Review
- [ ] Semantic HTML used appropriately
- [ ] All images have alt text
- [ ] Forms have proper labels and ARIA attributes
- [ ] No inline styles (use CSS classes)
- [ ] Scripts loaded at end of body

### CSS Review
- [ ] BEM naming convention followed
- [ ] CSS variables used for colors, spacing
- [ ] Mobile-first responsive design
- [ ] No !important (except utilities)
- [ ] Accessibility: sufficient color contrast

### JavaScript Review
- [ ] Code wrapped in IIFE or module
- [ ] Constants used for magic numbers
- [ ] Error handling for async operations
- [ ] DOM queries cached
- [ ] No global variables polluting namespace
- [ ] Functions have single responsibility
- [ ] Comments explain "why", not "what"

### Performance Review
- [ ] Images optimized (WebP, lazy loading)
- [ ] CSS/JS minified for production
- [ ] No unnecessary re-renders or recalculations
- [ ] Debounce/throttle expensive operations
- [ ] Network requests minimized

### Accessibility Review
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] ARIA attributes used correctly
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA

---

**Document Version:** 1.0.0
**Last Updated:** 2026-01-30
**Maintained By:** ENZARA Development Team
