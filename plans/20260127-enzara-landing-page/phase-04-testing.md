# Phase 04: Testing & Optimization

## 4.1 Functional Testing

### Form Validation
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Empty name | "" | Show error, prevent submit |
| Empty phone | "" | Show error, prevent submit |
| Invalid phone | "123" | Show "Số điện thoại không hợp lệ" |
| Valid phone formats | "0945139990", "0945.139.990", "+84945139990" | Accept all |
| Empty address | "" | Show error, prevent submit |
| Valid submission | All fields valid | Show success message |

### Navigation
| Test Case | Expected Result |
|-----------|-----------------|
| Click "Đặt Hàng Ngay" nav button | Smooth scroll to #order |
| Click phone number | Open phone dialer |
| All anchor links | Smooth scroll to target section |

### Interactive Elements
| Test Case | Expected Result |
|-----------|-----------------|
| FAQ accordion | Toggle open/close on click |
| Countdown timer | Decrement every second |
| Stock counter | Display current stock |
| Quantity selector | Update price display |

## 4.2 Responsive Testing

### Breakpoints to Test
```
Mobile S:  320px  (iPhone SE)
Mobile M:  375px  (iPhone 12/13)
Mobile L:  425px  (Large phones)
Tablet:    768px  (iPad)
Laptop:    1024px (iPad Pro, small laptops)
Desktop:   1280px (Standard desktop)
Large:     1440px (Large monitors)
```

### Mobile Checklist
- [ ] Hero image stacks above text
- [ ] Benefits grid: 1-2 columns
- [ ] CTA buttons full width
- [ ] Font sizes readable (min 16px for body)
- [ ] Touch targets min 44x44px
- [ ] No horizontal scroll
- [ ] Form inputs don't zoom on focus

### Tablet Checklist
- [ ] 2-column layouts work
- [ ] Images properly sized
- [ ] Navigation spacing correct

### Desktop Checklist
- [ ] 3-column grids display correctly
- [ ] Max content width (1200px) centered
- [ ] Proper whitespace

## 4.3 Cross-Browser Testing

### Browsers to Test
| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest | High |
| Chrome Mobile | Latest | High |
| Safari | Latest | High |
| Safari iOS | Latest | High |
| Firefox | Latest | Medium |
| Edge | Latest | Medium |
| Samsung Internet | Latest | Medium |

### Known Issues to Check
- CSS Grid support (all modern browsers OK)
- CSS custom properties (all modern browsers OK)
- `<details>` element (Safari 14+ OK)
- Smooth scroll behavior (all modern browsers OK)
- IntersectionObserver (all modern browsers OK)

## 4.4 Performance Testing

### Lighthouse Targets
| Metric | Target | Tool |
|--------|--------|------|
| Performance | >90 | Lighthouse |
| Accessibility | >90 | Lighthouse |
| Best Practices | >90 | Lighthouse |
| SEO | >90 | Lighthouse |
| FCP | <1.8s | Lighthouse |
| LCP | <2.5s | Lighthouse |
| CLS | <0.1 | Lighthouse |

### Optimization Checklist
- [ ] Images compressed (WebP where possible)
- [ ] Images have width/height attributes
- [ ] CSS minified
- [ ] JS minified
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] Lazy load below-fold images

### Image Optimization
```bash
# Convert to WebP (smaller file size)
# Compress JPG/PNG before upload
# Target sizes:
# - Hero: <100KB
# - Product: <80KB
# - Testimonial: <30KB
# - Icons: <5KB (SVG preferred)
```

## 4.5 Accessibility Testing

### Checklist
- [ ] All images have alt text
- [ ] Form labels properly associated
- [ ] Color contrast ratio >4.5:1 for text
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] Language attribute set (lang="vi")
- [ ] Headings in logical order (h1 > h2 > h3)

### ARIA Usage
```html
<!-- Progress bar -->
<div class="bar-fill" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>

<!-- Countdown -->
<div class="countdown" aria-live="polite" aria-label="Thời gian còn lại">...</div>

<!-- Form errors -->
<span class="error" role="alert">Số điện thoại không hợp lệ</span>
```

## 4.6 SEO Checklist

### Meta Tags
```html
<title>ENZARA - Nước Rửa Chén Enzyme Sinh Học | Giảm 33%</title>
<meta name="description" content="Nước rửa chén enzyme ENZARA - 91% enzyme sinh học từ vỏ dứa, chanh. An toàn cho da tay, trẻ nhỏ, mẹ bầu. Không Paraben, SLS, SLES. Giảm 33% hôm nay!">
<meta name="keywords" content="nước rửa chén enzyme, enzara, rửa chén sinh học, an toàn cho bé">
<link rel="canonical" href="https://enzara.vn/">
```

### Open Graph
```html
<meta property="og:title" content="ENZARA - Nước Rửa Chén Enzyme Sinh Học">
<meta property="og:description" content="91% enzyme sinh học từ vỏ dứa, chanh. An toàn cho da tay, trẻ nhỏ, mẹ bầu.">
<meta property="og:image" content="https://enzara.vn/assets/images/og-image.jpg">
<meta property="og:url" content="https://enzara.vn/">
<meta property="og:type" content="product">
```

### Structured Data (JSON-LD)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nước Rửa Chén Enzyme ENZARA",
  "description": "91% enzyme sinh học từ vỏ dứa, chanh",
  "image": "https://enzara.vn/assets/images/hero-product.png",
  "brand": {"@type": "Brand", "name": "ENZARA"},
  "offers": {
    "@type": "Offer",
    "price": "50000",
    "priceCurrency": "VND",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "324"
  }
}
</script>
```

## 4.7 Pre-Launch Checklist

### Content
- [ ] All text proofread
- [ ] Phone number correct
- [ ] Prices accurate
- [ ] Images high quality

### Technical
- [ ] All links working
- [ ] Form submits correctly
- [ ] No console errors
- [ ] HTTPS enabled

### Tracking
- [ ] Google Analytics installed
- [ ] Facebook Pixel (if needed)
- [ ] Conversion tracking on form submit

### Backup
- [ ] Code backed up to Git
- [ ] Images backed up

## 4.8 Post-Launch Monitoring

### Week 1
- Monitor form submissions
- Check bounce rate
- Test on real devices from users
- Fix any reported bugs

### Ongoing
- A/B test headlines
- Optimize conversion rate
- Update testimonials
- Refresh scarcity elements
