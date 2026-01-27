# Phase 01: Project Setup

## 1.1 Directory Structure

```bash
# Create project structure
mkdir -p enzara/{css,js,assets/{images,icons}}
```

### Files to Create
```
enzara/
├── index.html          # Main landing page
├── css/
│   ├── variables.css   # CSS custom properties
│   ├── base.css        # Reset + typography
│   ├── components.css  # Buttons, cards, badges
│   └── sections.css    # 16 section styles
├── js/
│   ├── main.js         # Core functionality
│   └── animations.js   # Scroll animations
└── assets/
    ├── images/         # Product, testimonials, before-after
    └── icons/          # SVG icons
```

## 1.2 CSS Variables Setup

```css
/* variables.css */
:root {
  /* Colors - Eco Green + Pineapple Orange */
  --color-primary: #2E7D32;      /* Forest green */
  --color-primary-light: #4CAF50;
  --color-primary-dark: #1B5E20;
  --color-accent: #FF9800;        /* Pineapple orange */
  --color-accent-light: #FFB74D;

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-bg: #F5F5F0;
  --color-text: #212121;
  --color-text-muted: #757575;

  /* Semantic */
  --color-success: #4CAF50;
  --color-warning: #FFC107;
  --color-error: #F44336;
  --color-sale: #E53935;

  /* Typography */
  --font-primary: 'Be Vietnam Pro', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;

  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.2);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
}
```

## 1.3 Base HTML Template

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Nước Rửa Chén Enzyme ENZARA - 91% enzyme sinh học từ vỏ dứa, chanh. An toàn cho da tay, trẻ nhỏ, mẹ bầu.">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="assets/icons/favicon.svg">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/sections.css">

  <title>ENZARA - Nước Rửa Chén Enzyme Sinh Học | Giảm 33%</title>
</head>
<body>
  <!-- 16 Sections here -->

  <script src="js/animations.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

## 1.4 Asset Requirements

### Images Needed
| Asset | Description | Size |
|-------|-------------|------|
| hero-product.png | Product bottle hero shot | 600x800 |
| pineapple-enzyme.jpg | Vỏ dứa enzyme | 400x400 |
| before-after-1.jpg | Bát đĩa dầu mỡ/sạch | 800x400 |
| testimonial-1-3.jpg | 3 customer photos | 200x200 |
| icon-safe.svg | An toàn icon | 64x64 |
| icon-eco.svg | Sinh học icon | 64x64 |
| icon-saving.svg | Tiết kiệm icon | 64x64 |
| badge-certified.svg | Chứng nhận | 120x120 |

### Placeholder Images (Development)
```
https://placehold.co/600x800/2E7D32/white?text=ENZARA
https://placehold.co/400x400/FF9800/white?text=Enzyme
```

## 1.5 Development Tools

### Recommended
- Live Server (VS Code extension) for hot reload
- Browser DevTools for responsive testing
- Lighthouse for performance audit

### Testing Browsers
- Chrome (primary)
- Firefox
- Safari
- Mobile Chrome/Safari

## 1.6 Checklist

- [ ] Create directory structure
- [ ] Setup CSS variables
- [ ] Create base HTML template
- [ ] Add placeholder images
- [ ] Test live server
- [ ] Verify font loading
