# Phase 02: Design System

## 2.1 Color Palette

### Primary Colors (Eco-friendly theme)
```
Green (Primary):
- #1B5E20 - Dark (headings)
- #2E7D32 - Base (buttons, links)
- #4CAF50 - Light (hover states)
- #E8F5E9 - Background tint

Orange (Accent - Pineapple):
- #E65100 - Dark
- #FF9800 - Base (CTAs, highlights)
- #FFB74D - Light
- #FFF3E0 - Background tint
```

### Semantic Colors
```
Sale/Discount: #E53935 (red)
Success: #4CAF50
Warning: #FFC107
Trust: #1976D2 (blue for badges)
```

## 2.2 Typography Scale

```css
/* Headings */
h1: 2.5rem (40px) - weight 800
h2: 2rem (32px) - weight 700
h3: 1.5rem (24px) - weight 600
h4: 1.25rem (20px) - weight 600

/* Body */
body: 1rem (16px) - weight 400
small: 0.875rem (14px)

/* Special */
.price-big: 3rem (48px) - weight 800
.price-old: 1.5rem - strikethrough
.badge: 0.75rem - uppercase
```

## 2.3 Component Designs

### CTA Button (Primary)
```css
.btn-cta {
  background: linear-gradient(135deg, #FF9800, #E65100);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.5);
}
```

### Price Display
```
┌─────────────────────────────────┐
│  ~~75.000đ~~ (strikethrough)    │
│  50.000đ     (large, green)     │
│  Tiết kiệm 25.000đ (red badge)  │
└─────────────────────────────────┘
```

### Benefit Card
```
┌──────────────────────┐
│     [icon]           │
│   Benefit Title      │
│   Description text   │
│   that explains...   │
└──────────────────────┘
```

### Testimonial Card
```
┌────────────────────────────────┐
│  ★★★★★                         │
│  "Quote from customer..."      │
│  ┌────┐                        │
│  │ 👤 │  Tên Khách Hàng        │
│  └────┘  Địa điểm              │
└────────────────────────────────┘
```

## 2.4 Section Layouts

### Section 1: Hero (AIDA)
```
┌─────────────────────────────────────────┐
│  [Nav: Logo | Hotline | CTA]            │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │             │  │ GIẢM 33%        │   │
│  │  [Product]  │  │ Nước Rửa Chén   │   │
│  │   Image     │  │ ENZARA          │   │
│  │             │  │                 │   │
│  │             │  │ 91% Enzyme...   │   │
│  │             │  │                 │   │
│  │             │  │ [CTA Button]    │   │
│  └─────────────┘  └─────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Section 3: Pain Points
```
┌─────────────────────────────────────────┐
│  Bạn có đang gặp phải?                  │
├─────────────────────────────────────────┤
│  ✗ Da tay khô ráp sau khi rửa chén      │
│  ✗ Lo lắng hóa chất độc hại             │
│  ✗ Nước rửa chén không sạch dầu mỡ      │
│  ✗ Mùi hôi tanh bám trên bát đĩa        │
└─────────────────────────────────────────┘
```

### Section 6: Benefits Grid
```
┌───────┬───────┬───────┐
│ Bene1 │ Bene2 │ Bene3 │
├───────┼───────┼───────┤
│ Bene4 │ Bene5 │ Bene6 │
└───────┴───────┴───────┘
```

### Section 10-11: Price Comparison
```
┌─────────────────────────────────────────┐
│  So sánh với sản phẩm khác              │
├──────────┬──────────┬──────────────────┤
│ Tiêu chí │ Khác     │ ENZARA ✓         │
├──────────┼──────────┼──────────────────┤
│ Enzyme   │ 0-20%    │ 91% ✓            │
│ Paraben  │ Có       │ Không ✓          │
│ SLS/SLES │ Có       │ Không ✓          │
│ Giá      │ 40-60k   │ 50k + Quà ✓      │
└──────────┴──────────┴──────────────────┘
```

### Section 14: Scarcity
```
┌─────────────────────────────────────────┐
│  ⏰ Chỉ còn 47 sản phẩm                  │
│  ████████████░░░░░░ 78% đã bán          │
│  Ưu đãi kết thúc trong: 02:45:30        │
└─────────────────────────────────────────┘
```

## 2.5 Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Mobile Adjustments
- Hero: Stack image above text
- Benefits: 1 column instead of 3
- Testimonials: Horizontal scroll
- Prices: Larger touch targets
- CTAs: Full width buttons

## 2.6 Animation Guidelines

```css
/* Fade in on scroll */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Pulse for CTAs */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* Counter animation for scarcity */
.countdown { font-variant-numeric: tabular-nums; }
```

## 2.7 Design Checklist

- [ ] Color palette defined
- [ ] Typography scale set
- [ ] Component styles documented
- [ ] Section layouts sketched
- [ ] Responsive strategy planned
- [ ] Animation guidelines ready
