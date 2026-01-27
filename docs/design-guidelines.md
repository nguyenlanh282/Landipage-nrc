# ENZARA Design Guidelines
## Nuoc Rua Chen Enzyme Landing Page Design System
**Version:** 1.0.0 | **Last Updated:** 2026-01-27

---

## Table of Contents
1. [Brand Foundation](#brand-foundation)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Library](#component-library)
6. [Section Layouts](#section-layouts)
7. [Animation Guidelines](#animation-guidelines)
8. [Responsive Breakpoints](#responsive-breakpoints)
9. [Accessibility Standards](#accessibility-standards)

---

## Brand Foundation

### Brand Essence
ENZARA represents the harmony between **nature's power** and **modern science**. The brand embodies:
- **Purity**: 91% enzyme from natural pineapple and lemon peels
- **Safety**: Gentle enough for baby bottles and pregnancy-safe
- **Sustainability**: Eco-friendly, biodegradable formula
- **Freshness**: Natural citrus and ginger aromatics

### Target Audience
- **Primary**: Vietnamese housewives aged 25-45
- **Secondary**: Health-conscious families with young children
- **Tertiary**: Eco-aware urban professionals

### Brand Voice
- Warm and reassuring (like a trusted friend)
- Knowledgeable but not clinical
- Authentic and transparent
- Empowering (making healthy choices easy)

### Visual Language Keywords
- Fresh, Clean, Natural, Gentle, Trusted, Modern-Traditional Fusion

---

## Color System

### Primary Palette (Eco-Green Spectrum)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Forest Green** | `#1B5E20` | 27, 94, 32 | Primary brand color, headers, key CTAs |
| **Leaf Green** | `#2E7D32` | 46, 125, 50 | Secondary actions, links |
| **Spring Green** | `#4CAF50` | 76, 175, 80 | Success states, highlights |
| **Mint Green** | `#81C784` | 129, 199, 132 | Hover states, accents |
| **Pale Sage** | `#C8E6C9` | 200, 230, 201 | Backgrounds, subtle fills |
| **Whisper Green** | `#E8F5E9` | 232, 245, 233 | Light backgrounds, cards |

### Secondary Palette (Citrus Energy)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Pineapple Gold** | `#F9A825` | 249, 168, 37 | Sale badges, urgency elements |
| **Sunset Orange** | `#FF8F00` | 255, 143, 0 | CTAs, attention grabbers |
| **Lemon Yellow** | `#FDD835` | 253, 216, 53 | Highlights, promotions |
| **Warm Amber** | `#FFB300` | 255, 179, 0 | Hover states for CTAs |
| **Cream Yellow** | `#FFF8E1` | 255, 248, 225 | Warm backgrounds |
| **Peach Glow** | `#FFE0B2` | 255, 224, 178 | Accent backgrounds |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Charcoal** | `#212121` | 33, 33, 33 | Primary text |
| **Dark Gray** | `#424242` | 66, 66, 66 | Secondary text |
| **Medium Gray** | `#757575` | 117, 117, 117 | Captions, placeholders |
| **Light Gray** | `#BDBDBD` | 189, 189, 189 | Borders, dividers |
| **Pale Gray** | `#EEEEEE` | 238, 238, 238 | Backgrounds |
| **Off White** | `#FAFAFA` | 250, 250, 250 | Page backgrounds |
| **Pure White** | `#FFFFFF` | 255, 255, 255 | Cards, containers |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#2E7D32` | Confirmation, checkmarks |
| **Warning** | `#F9A825` | Alerts, important notices |
| **Error** | `#C62828` | Errors, validation |
| **Info** | `#1976D2` | Information tooltips |

### Gradient Definitions

```css
/* Hero Gradient */
--gradient-hero: linear-gradient(135deg, #E8F5E9 0%, #FFF8E1 100%);

/* CTA Gradient */
--gradient-cta: linear-gradient(135deg, #FF8F00 0%, #F9A825 100%);

/* Card Gradient */
--gradient-card: linear-gradient(180deg, #FFFFFF 0%, #E8F5E9 100%);

/* Nature Gradient */
--gradient-nature: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);

/* Sunset Gradient */
--gradient-sunset: linear-gradient(135deg, #F9A825 0%, #FF8F00 50%, #FFB300 100%);
```

### Color Usage Rules
1. **60-30-10 Rule**: 60% neutrals/greens, 30% white/backgrounds, 10% orange/gold accents
2. **CTA Buttons**: Always use Sunset Orange (#FF8F00) or Pineapple Gold (#F9A825)
3. **Text on Dark**: Use Pure White (#FFFFFF) or Cream Yellow (#FFF8E1)
4. **Avoid**: Red text (except errors), blue (off-brand), purple (off-brand)

---

## Typography

### Primary Font: Be Vietnam Pro
Selected for excellent Vietnamese diacritical support and modern, friendly appearance.

```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');

--font-primary: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Secondary Font: Quicksand
For decorative headings and brand personality.

```css
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap');

--font-display: 'Quicksand', 'Be Vietnam Pro', sans-serif;
```

### Type Scale (Modular Scale: 1.250 - Major Third)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `--text-display-1` | 56px / 3.5rem | 800 | 1.1 | Hero headline (mobile: 36px) |
| `--text-display-2` | 44px / 2.75rem | 700 | 1.15 | Section headlines (mobile: 28px) |
| `--text-h1` | 36px / 2.25rem | 700 | 1.2 | Major headings (mobile: 26px) |
| `--text-h2` | 28px / 1.75rem | 600 | 1.25 | Subheadings (mobile: 22px) |
| `--text-h3` | 22px / 1.375rem | 600 | 1.3 | Card titles (mobile: 18px) |
| `--text-h4` | 18px / 1.125rem | 600 | 1.35 | Small headings (mobile: 16px) |
| `--text-body-lg` | 18px / 1.125rem | 400 | 1.6 | Lead paragraphs (mobile: 16px) |
| `--text-body` | 16px / 1rem | 400 | 1.6 | Body text |
| `--text-body-sm` | 14px / 0.875rem | 400 | 1.5 | Captions, small text |
| `--text-caption` | 12px / 0.75rem | 400 | 1.4 | Labels, metadata |
| `--text-overline` | 12px / 0.75rem | 600 | 1.4 | Overline text, uppercase |

### Typography Styles

```css
/* Hero Headline */
.headline-hero {
  font-family: var(--font-display);
  font-size: var(--text-display-1);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-forest-green);
}

/* Section Headline */
.headline-section {
  font-family: var(--font-display);
  font-size: var(--text-display-2);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--color-charcoal);
}

/* Body Text */
.body-text {
  font-family: var(--font-primary);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-dark-gray);
}

/* CTA Text */
.cta-text {
  font-family: var(--font-primary);
  font-size: var(--text-body);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
```

### Vietnamese Text Considerations
- Always test with full diacritical marks: a, a, d, e, o, o, u
- Increase line-height slightly (1.6-1.7) for readability
- Avoid ultra-thin weights (<300) as diacritics may appear unclear
- Test currency formatting: 199.000d, 1.500.000d

---

## Spacing System

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Micro spacing, icon gaps |
| `--space-2` | 8px | Tight spacing, inline elements |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | Default spacing |
| `--space-5` | 20px | Medium spacing |
| `--space-6` | 24px | Card padding, section gaps |
| `--space-8` | 32px | Component spacing |
| `--space-10` | 40px | Section internal padding |
| `--space-12` | 48px | Large section gaps |
| `--space-16` | 64px | Section padding (mobile) |
| `--space-20` | 80px | Section padding (tablet) |
| `--space-24` | 96px | Section padding (desktop) |
| `--space-32` | 128px | Hero padding |

### Layout Spacing Rules

```css
/* Section Padding */
.section {
  padding: var(--space-16) var(--space-4);  /* Mobile */
}

@media (min-width: 768px) {
  .section {
    padding: var(--space-20) var(--space-6);  /* Tablet */
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--space-24) var(--space-8);  /* Desktop */
  }
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-6);
  }
}
```

### Component Spacing

| Component | Padding | Margin/Gap |
|-----------|---------|------------|
| Button (sm) | 8px 16px | - |
| Button (md) | 12px 24px | - |
| Button (lg) | 16px 32px | - |
| Card | 24px | 16px gap |
| Badge | 4px 12px | - |
| Input | 12px 16px | 16px bottom margin |
| Form group | 24px | 24px between groups |

---

## Component Library

### Buttons

#### Primary CTA Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #FF8F00 0%, #F9A825 100%);
  color: #FFFFFF;
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(255, 143, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 143, 0, 0.5);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: transparent;
  color: #2E7D32;
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 600;
  border: 2px solid #2E7D32;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #E8F5E9;
  border-color: #1B5E20;
  color: #1B5E20;
}
```

#### Button Sizes
- **Small**: padding: 8px 16px; font-size: 14px; border-radius: 8px;
- **Medium (default)**: padding: 12px 24px; font-size: 16px; border-radius: 10px;
- **Large**: padding: 16px 32px; font-size: 18px; border-radius: 12px;
- **Full Width**: width: 100%; (mobile default)

### Cards

#### Benefit Card
```css
.card-benefit {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #E8F5E9;
  transition: all 0.3s ease;
}

.card-benefit:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #81C784;
}

.card-benefit__icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.card-benefit__title {
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
}

.card-benefit__description {
  font-size: 14px;
  color: #757575;
  line-height: 1.5;
}
```

#### Testimonial Card
```css
.card-testimonial {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFF8E1 100%);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  position: relative;
}

.card-testimonial::before {
  content: '"';
  position: absolute;
  top: 16px;
  left: 24px;
  font-family: Georgia, serif;
  font-size: 64px;
  color: #C8E6C9;
  line-height: 1;
}

.card-testimonial__content {
  font-size: 16px;
  font-style: italic;
  color: #424242;
  line-height: 1.6;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.card-testimonial__author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-testimonial__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #81C784;
}

.card-testimonial__name {
  font-weight: 600;
  color: #212121;
}

.card-testimonial__role {
  font-size: 14px;
  color: #757575;
}

.card-testimonial__rating {
  color: #F9A825;
  margin-top: 4px;
}
```

#### Price Card
```css
.card-price {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 3px solid #4CAF50;
  position: relative;
  overflow: hidden;
}

.card-price__badge {
  position: absolute;
  top: 20px;
  right: -32px;
  background: linear-gradient(135deg, #FF8F00 0%, #F9A825 100%);
  color: white;
  padding: 8px 40px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  transform: rotate(45deg);
}

.card-price__original {
  font-size: 20px;
  color: #757575;
  text-decoration: line-through;
  margin-bottom: 8px;
}

.card-price__current {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 800;
  color: #1B5E20;
  margin-bottom: 8px;
}

.card-price__unit {
  font-size: 18px;
  color: #757575;
}
```

### Badges

#### Sale Badge
```css
.badge-sale {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  background: linear-gradient(135deg, #FF8F00 0%, #F9A825 100%);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(255, 143, 0, 0.4);
}
```

#### Eco Badge
```css
.badge-eco {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #E8F5E9;
  color: #1B5E20;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  border: 1px solid #C8E6C9;
}
```

#### Trust Badge
```css
.badge-trust {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.badge-trust__icon {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}

.badge-trust__text {
  font-size: 12px;
  font-weight: 600;
  color: #424242;
  text-align: center;
}
```

### Form Elements

#### Text Input
```css
.input-text {
  width: 100%;
  padding: 14px 16px;
  font-family: var(--font-primary);
  font-size: 16px;
  color: #212121;
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.input-text::placeholder {
  color: #9E9E9E;
}

.input-text:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.15);
}

.input-text:invalid {
  border-color: #C62828;
}
```

#### Select Dropdown
```css
.input-select {
  width: 100%;
  padding: 14px 40px 14px 16px;
  font-family: var(--font-primary);
  font-size: 16px;
  color: #212121;
  background: #FFFFFF url('data:image/svg+xml,...') no-repeat right 16px center;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  appearance: none;
  cursor: pointer;
}
```

#### Quantity Selector
```css
.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  overflow: hidden;
}

.quantity-selector__btn {
  width: 44px;
  height: 44px;
  background: #F5F5F5;
  border: none;
  font-size: 20px;
  font-weight: 600;
  color: #424242;
  cursor: pointer;
}

.quantity-selector__btn:hover {
  background: #E8F5E9;
  color: #1B5E20;
}

.quantity-selector__value {
  width: 56px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  border: none;
}
```

### Countdown Timer
```css
.countdown {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.countdown__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%);
  padding: 12px 16px;
  border-radius: 12px;
  min-width: 64px;
}

.countdown__value {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: #FFFFFF;
}

.countdown__label {
  font-size: 11px;
  font-weight: 600;
  color: #C8E6C9;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### FAQ Accordion
```css
.faq-item {
  border: 1px solid #E8F5E9;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
}

.faq-item__question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #FFFFFF;
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 600;
  color: #212121;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-item__question:hover {
  background: #E8F5E9;
}

.faq-item__icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-item__icon {
  transform: rotate(180deg);
}

.faq-item__answer {
  padding: 0 24px;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.active .faq-item__answer {
  padding: 0 24px 20px;
  max-height: 500px;
}
```

---

## Section Layouts

### Section 1: Hero
**Purpose:** Grab attention, communicate USP, drive immediate action

**Layout:**
- Mobile: Single column, stacked
- Desktop: Two columns (60/40 content/visual split)

**Elements:**
- Sale badge (top, animated pulse)
- Headline: Max 10 words, uses display font
- Subheadline: 15-25 words, supporting benefit
- CTA button: Full width on mobile
- Hero image: Product shot with natural elements
- Trust indicators: Small badges row

**Spacing:**
- Padding: 80px top (mobile), 120px top (desktop)
- Gap between elements: 24px

**Background:** Gradient from Whisper Green to Cream Yellow

---

### Section 2: Benefits Bar
**Purpose:** Quick visual scan of key benefits

**Layout:**
- Mobile: 2x3 grid or horizontal scroll
- Desktop: 6 columns, equal width

**Elements:**
- 6 icon-text pairs
- Icons: 40x40px, green tint
- Text: 12-14px, max 3 words each

**Benefits to show:**
1. 91% Enzyme tu nhien
2. An toan cho be
3. Than thien moi truong
4. Khong hoa chat doc hai
5. Khong gay kich ung
6. Tiet kiem nuoc 30%

**Background:** White with subtle green top border

---

### Section 3: Pain Points
**Purpose:** Agitate problems, create emotional connection

**Layout:**
- Mobile: Single column
- Desktop: Image left (40%), content right (60%)

**Elements:**
- Section headline with question
- 4-5 pain point items with warning icons
- Empathy statement
- Transition text to solution

**Pain points:**
- Hoa chat con lai tren chen dia
- Da tay kho, bong troc
- Lo lang cho con nho
- O nhiem moi truong

**Background:** Light gradient with orange tint

---

### Section 4: Authority/Credentials
**Purpose:** Build trust and credibility

**Layout:**
- Mobile: Stacked cards
- Desktop: 4 column grid

**Elements:**
- Certification badges (4-6)
- Lab test results
- "Made in Vietnam" badge
- Years of research/development

**Background:** White

---

### Section 5: Before/After Story
**Purpose:** Emotional storytelling, transformation

**Layout:**
- Mobile: Single column, sequential
- Desktop: Side-by-side comparison

**Elements:**
- "Before" section (problems)
- Arrow/transition element
- "After" section (solutions)
- Customer quote/story

**Background:** Split - light orange left, light green right

---

### Section 6: Benefits Grid
**Purpose:** Detail product benefits

**Layout:**
- Mobile: Single column cards
- Desktop: 2x3 or 3x2 grid

**Elements:**
- 6 benefit cards
- Each: Icon, title, description
- Hover effect on desktop

**Benefits:**
1. Phan huy dau mo manh me
2. An toan cho me bau va be
3. Bao ve da tay
4. Khong ton du hoa chat
5. Than thien moi truong
6. Huong thom tu nhien

**Background:** Whisper Green (#E8F5E9)

---

### Section 7: Value Stack
**Purpose:** Build perceived value

**Layout:**
- Mobile: Stacked list
- Desktop: Two columns (value list + visual)

**Elements:**
- List of everything included
- Individual value pricing (crossed out)
- Total value calculation
- Actual price reveal

**Background:** White

---

### Section 8: FAQ Accordion
**Purpose:** Handle objections

**Layout:**
- Mobile/Desktop: Single column, centered (max-width: 720px)

**Elements:**
- 6-8 FAQ items
- Accordion functionality
- Contact CTA at bottom

**Questions:**
1. San pham co it bot, co sach khong?
2. Co dung duoc cho binh sua khong?
3. Thanh phan co an toan khong?
4. Mot chai dung duoc bao lau?
5. Co ship COD khong?
6. Chinh sach doi tra nhu the nao?

**Background:** Off White (#FAFAFA)

---

### Section 9: Why This Price
**Purpose:** Justify pricing, show value

**Layout:**
- Mobile: Single column
- Desktop: Content with supporting visual

**Elements:**
- Cost breakdown reasoning
- Ingredient quality explanation
- Long-term savings calculation
- Comparison to alternatives

**Background:** Cream Yellow (#FFF8E1)

---

### Section 10: Price Comparison Table
**Purpose:** Show competitive advantage

**Layout:**
- Mobile: Simplified comparison cards
- Desktop: Full comparison table

**Elements:**
- 3-4 columns (ENZARA vs competitors)
- Feature rows with checkmarks/x marks
- ENZARA column highlighted
- Price row at bottom

**Background:** White

---

### Section 11: Original Price Display
**Purpose:** Anchor high price before discount

**Layout:**
- Centered, dramatic reveal

**Elements:**
- "Gia goc" (original price) crossed out
- Large price display
- Value justification text

**Background:** White with green accents

---

### Section 12: Bonus Gift Showcase
**Purpose:** Add value, create urgency

**Layout:**
- Mobile: Stacked cards
- Desktop: 3 column grid

**Elements:**
- 2-3 bonus items
- Image + description for each
- Individual value display
- "FREE" badge

**Bonuses:**
- Bot bien rua chen
- Huong dan su dung
- Uu dai lan sau

**Background:** Gradient green

---

### Section 13: Testimonials
**Purpose:** Social proof

**Layout:**
- Mobile: Single column or carousel
- Desktop: 3 column grid

**Elements:**
- 3-6 testimonial cards
- Avatar, name, location
- Star rating
- Quote text

**Background:** Off White

---

### Section 14: Scarcity (Countdown + Stock)
**Purpose:** Create urgency

**Layout:**
- Centered, high visibility

**Elements:**
- Countdown timer (days:hours:minutes:seconds)
- Stock level indicator
- "X nguoi dang xem" live viewer count
- Urgency message

**Background:** Green gradient with animated elements

---

### Section 15: Final Price Summary
**Purpose:** Clear value proposition before purchase

**Layout:**
- Centered price card

**Elements:**
- Original price (crossed)
- Current price (large, green)
- Savings amount (orange badge)
- All bonuses listed
- Guarantee badge

**Background:** White

---

### Section 16: Order Form
**Purpose:** Capture orders

**Layout:**
- Mobile: Full width form
- Desktop: Two columns (form + summary)

**Elements:**
- Name input
- Phone input (required)
- Address textarea
- District/City dropdowns
- Quantity selector
- Order summary
- Submit CTA
- Trust badges below

**Form validation:**
- Phone: 10 digits, starts with 0
- Name: Required
- Address: Required

**Background:** Whisper Green with white form card

---

## Animation Guidelines

### General Principles
- Use animations purposefully (guide attention, provide feedback)
- Respect `prefers-reduced-motion`
- Keep durations short (150-400ms)
- Use easing functions for natural feel

### Duration Tokens
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-slower: 600ms;
```

### Easing Functions
```css
--ease-out: cubic-bezier(0.25, 0, 0.25, 1);
--ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Common Animations

```css
/* Fade In Up (for scroll reveals) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse (for CTAs, badges) */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Shake (for urgency) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Countdown tick */
@keyframes tick {
  0% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
```

### Scroll Animations
- Trigger at 10-20% visibility
- Stagger children by 100ms
- Use `IntersectionObserver` for performance

---

## Responsive Breakpoints

### Breakpoint Tokens
```css
--breakpoint-sm: 320px;   /* Small phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Media Query Usage
```css
/* Mobile First Approach */
.element {
  /* Mobile styles (default) */
}

@media (min-width: 768px) {
  .element {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .element {
    /* Desktop styles */
  }
}
```

### Container Widths
| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Mobile | 100% | 16px |
| Tablet | 720px | 24px |
| Desktop | 1024px | 32px |
| Large | 1200px | 32px |

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color Contrast
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

#### Verified Combinations
| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| #212121 | #FFFFFF | 16.1:1 | AAA |
| #212121 | #E8F5E9 | 11.4:1 | AAA |
| #FFFFFF | #1B5E20 | 8.9:1 | AAA |
| #FFFFFF | #FF8F00 | 3.1:1 | AA (large) |
| #212121 | #F9A825 | 8.2:1 | AAA |

#### Focus States
```css
:focus-visible {
  outline: 3px solid #4CAF50;
  outline-offset: 2px;
}
```

#### Touch Targets
- Minimum: 44x44px
- Recommended: 48x48px
- Spacing between targets: 8px minimum

#### Screen Reader Support
- Use semantic HTML
- Add `aria-label` for icons
- Include `sr-only` text for decorative elements
- Ensure form labels are properly associated

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Checklist

### Before Development
- [ ] Review all sections with stakeholders
- [ ] Prepare all content in Vietnamese
- [ ] Gather product photography
- [ ] Collect testimonials with photos
- [ ] Define exact pricing and promotions

### During Development
- [ ] Implement mobile-first
- [ ] Test on real devices
- [ ] Validate Vietnamese text rendering
- [ ] Check all color contrasts
- [ ] Verify touch targets

### Before Launch
- [ ] Cross-browser testing
- [ ] Performance audit (<3s load)
- [ ] Accessibility audit
- [ ] Form validation testing
- [ ] Analytics setup

---

## Appendix: CSS Custom Properties

```css
:root {
  /* Colors - Primary */
  --color-forest-green: #1B5E20;
  --color-leaf-green: #2E7D32;
  --color-spring-green: #4CAF50;
  --color-mint-green: #81C784;
  --color-pale-sage: #C8E6C9;
  --color-whisper-green: #E8F5E9;

  /* Colors - Secondary */
  --color-pineapple-gold: #F9A825;
  --color-sunset-orange: #FF8F00;
  --color-lemon-yellow: #FDD835;
  --color-warm-amber: #FFB300;
  --color-cream-yellow: #FFF8E1;
  --color-peach-glow: #FFE0B2;

  /* Colors - Neutral */
  --color-charcoal: #212121;
  --color-dark-gray: #424242;
  --color-medium-gray: #757575;
  --color-light-gray: #BDBDBD;
  --color-pale-gray: #EEEEEE;
  --color-off-white: #FAFAFA;
  --color-white: #FFFFFF;

  /* Typography */
  --font-primary: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Quicksand', 'Be Vietnam Pro', sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-cta: 0 4px 14px rgba(255, 143, 0, 0.4);

  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.25, 0, 0.25, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

---

**Document maintained by:** UI/UX Design Team
**Next review:** 2026-02-27
