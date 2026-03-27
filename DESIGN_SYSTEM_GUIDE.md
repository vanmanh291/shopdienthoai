# 🎨 Design System Implementation Guide

## Overview

Bạn đã thực hiện áp dụng **Minimalist Modern Design System** vào website shopdienthoai. Design system này mang theo:

- ✅ **Hệ thống màu sắc hiện đại** với accent Electric Blue (#0052FF)
- ✅ **Typography được chuẩn bị** (Calistoga + Inter)
- ✅ **Tokens CSS** cho spacing, shadows, border-radius
- ✅ **Responsive design** - hoạt động tốt trên mọi thiết bị
- ✅ **Accessibility** - tuân theo WCAG AA standards
- ✅ **Animations** - CSS-based cho hiệu ứng smooth

---

## 📂 Cấu trúc CSS Files

### 1. **design-tokens.css** (Nền tảng)
Chứa tất cả design tokens (CSS custom properties):
```css
--color-accent: #0052FF
--color-foreground: #0F172A
--color-background: #FAFAFA
--font-display: 'Calistoga', Georgia, serif
--font-body: 'Inter', system-ui, sans-serif
```

### 2. **design-system.css** (Hệ thống components)
- Base component styles (.btn, .card, .input)
- Utilities (.text-accent, .bg-inverted, etc.)
- Animations (@keyframes)
- Accessibility features

### 3. **pages.css** (Page-specific patterns)
- Hero sections (.banner-hero)
- Product cards (.product-featured)
- Category showcase (.category-card)
- CTA sections (.cta-section)
- Testimonial cards (.testimonial-card)

### 4. **style.css** (Legacy + Project-specific)
- Được refactor để sử dụng design tokens
- Giữ lại cấu trúc cũ của bạn
- Thêm hover effects, transitions

---

## 🎯 Sử dụng Tokens

### Colors
```html
<!-- Text colors -->
<div class="text-accent">Accent Blue</div>
<div class="text-foreground">Dark text</div>
<div class="text-muted">Muted grey</div>

<!-- Background -->
<div class="bg-muted">Light background</div>
<div class="bg-inverted">Dark background (white text)</div>
```

### Buttons
```html
<!-- Primary (Gradient) -->
<button class="btn btn-primary">Click me</button>

<!-- Secondary -->
<button class="btn btn-secondary">Secondary</button>

<!-- Ghost -->
<button class="btn btn-ghost">Ghost Button</button>

<!-- Sizes -->
<button class="btn btn-primary btn-size-lg">Large</button>
<button class="btn btn-primary btn-size-sm">Small</button>
```

### Cards
```html
<!-- Standard card -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<!-- Elevated card with hover lift effect -->
<div class="card card-elevated hover-lift">
  <h3>Elevated Card</h3>
</div>

<!-- Featured card (gradient border) -->
<div class="card-gradient-border">
  <div style="padding: 2rem;">
    <h3>Featured Content</h3>
  </div>
</div>
```

### Section Labels
```html
<div class="section-label">
  New Feature
</div>

<!-- With pulsing indicator -->
<div class="section-label pulse">
  Live Now
</div>
```

---

## 🚀 Advanced Patterns

### Inverted Section (Dark background)
```html
<section class="section-inverted">
  <h2>Black section with white text</h2>
  <p>Perfect for CTAs and key messages</p>
</section>
```

### Hero Banner
```html
<div class="banner-hero">
  <div class="banner-hero-content">
    <h1>Your <span class="gradient-text">Headline</span> Here</h1>
    <p>Supporting description text</p>
    <div class="banner-hero-cta">
      <button class="btn btn-primary">Primary CTA</button>
      <button class="btn btn-secondary">Secondary CTA</button>
    </div>
  </div>
  <div class="banner-hero-graphic">
    <!-- Decorative graphic elements -->
  </div>
</div>
```

### Product Featured Card
```html
<div class="product-featured">
  <img src="image.jpg" alt="Product" class="product-featured-image">
  <div class="product-featured-content">
    <span class="product-featured-badge">New</span>
    <h3 class="product-featured-name">Product Name</h3>
    <div class="product-featured-price">
      <span class="product-featured-price-new">$99.99</span>
      <span class="product-featured-price-old">$149.99</span>
    </div>
  </div>
</div>
```

### Testimonial Card
```html
<div class="testimonial-card">
  <div class="testimonial-card-stars">★★★★★</div>
  <p class="testimonial-card-text">Great product and service!</p>
  <div class="testimonial-card-author">
    <img src="avatar.jpg" alt="User" class="testimonial-card-avatar">
    <div class="testimonial-card-info">
      <h4>John Doe</h4>
      <p>Customer</p>
    </div>
  </div>
</div>
```

### Form Group
```html
<div class="form-group">
  <label>Email Address</label>
  <input type="email" placeholder="your@email.com">
  <span class="form-success">Email is valid ✓</span>
</div>
```

---

## 🎨 Gradient Text Effect

Để highlight từ quan trọng với gradient:

```html
<h1>
  Welcome to <span class="gradient-text">Our Store</span>
</h1>

<style>
.gradient-text {
  background: linear-gradient(to right, #0052FF, #4D7CFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
```

---

## 📱 Responsive Utilities

```html
<!-- Hide on mobile -->
<div class="hide-mobile">Desktop only content</div>

<!-- Hide on desktop -->
<div class="hide-desktop">Mobile only content</div>

<!-- Grid layouts -->
<div class="grid-2">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="grid-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## 🎬 Animations

### Fade In + Slide Up
```html
<div class="animate-fade-up">Content slides up and fades in</div>
```

### Float Animation
```html
<div class="animate-float">Gentle floating effect</div>
```

### Rotate
```html
<div class="animate-rotate">Spins continuously (60s)</div>
```

### Stagger (children)
```html
<div class="animate-stagger">
  <div>Item 1 - appears first</div>
  <div>Item 2 - appears second</div>
  <div>Item 3 - appears third</div>
</div>
```

---

## 🔧 CSS Customization

### Thay đổi màu Accent

Mở `design-tokens.css` và tìm:
```css
:root {
  --color-accent: #0052FF;  /* Electric Blue */
  --color-accent-secondary: #4D7CFF;  /* Light Blue for gradients */
}
```

Thay thế bằng màu của bạn.

### Thay đổi Font

```css
:root {
  --font-display: 'Your Font', serif;  /* Headlines */
  --font-body: 'Your Font', sans-serif;  /* Body text */
}
```

### Thay đổi Spacing

```css
:root {
  --spacing-lg: 1.5rem;  /* Adjust as needed */
  --spacing-xl: 2rem;
}
```

---

## ✅ Checklist - Những gì đã được cập nhật

- [x] **Colors**: Thay thế màu xanh lá cũ (#00483d) bằng Electric Blue (#0052FF)
- [x] **Buttons**: Tất cả buttons sử dụng gradient mới + hover effects
- [x] **Cards**: Product cards & service cards có box-shadow & borders mới
- [x] **Header/Footer**: Sử dụng dark foreground (#0F172A)
- [x] **Inputs**: Focus states với accent color
- [x] **Typography**: Import Calistoga + Inter fonts (via Google Fonts)
- [x] **CSS Structure**: Tokens, utilities, components được organize
- [x] **Responsive**: Mobile-first design patterns

---

## 📚 Tiếp theo (Optional Enhancements)

1. **Thêm animations vào các hình ảnh sản phẩm** - fade-in khi scroll
2. **Implement dark mode** - thêm CSS vars cho light/dark theme
3. **Create a design token tester page** - showcase tất cả components
4. **Add microinteractions** - loading states, success animations
5. **Optimize giảm CSS size** - merge & minify files

---

## 🐛 Troubleshooting

### Fonts không hiển thị
→ Kiểm tra Google Fonts link trong `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Calistoga&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Colors không đúng
→ Xác nhận rằng `design-tokens.css` được load trước `style.css`

### Animations chạy quá nhanh trên mobile
→ Thêm `prefers-reduced-motion` support (đã include trong file)

---

## 📖 Color Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | #0052FF | Primary actions, highlights |
| `--color-accent-secondary` | #4D7CFF | Gradients, secondary emphasis |
| `--color-foreground` | #0F172A | Primary text, dark sections |
| `--color-background` | #FAFAFA | Page background |
| `--color-card` | #FFFFFF | Card backgrounds |
| `--color-border` | #E2E8F0 | Subtle borders |
| `--color-muted` | #F1F5F9 | Muted backgrounds |

---

**Happy designing! 🎨**

For questions or updates, refer to the design-tokens.css file where all values can be customized.
