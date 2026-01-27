# Phase 03: Implementation

## 3.1 HTML Sections Structure

### Section 1: Hero AIDA - USP
```html
<header id="hero" class="section-hero">
  <nav class="nav">
    <img src="assets/icons/logo.svg" alt="ENZARA" class="logo">
    <a href="tel:0945139990" class="nav-phone">
      <span class="icon-phone"></span>0945.139.990
    </a>
    <a href="#order" class="btn-nav">Đặt Hàng Ngay</a>
  </nav>

  <div class="hero-content">
    <div class="hero-image">
      <span class="badge-sale">GIẢM 33%</span>
      <img src="assets/images/hero-product.png" alt="ENZARA">
    </div>
    <div class="hero-text">
      <h1>Nước Rửa Chén Enzyme <strong>ENZARA</strong></h1>
      <p class="hero-usp">91% Enzyme Sinh Học Từ Vỏ Dứa, Chanh</p>
      <ul class="hero-benefits">
        <li>✓ An toàn cho da tay, trẻ nhỏ, mẹ bầu</li>
        <li>✓ Không Paraben, SLS, SLES</li>
        <li>✓ Khử mùi tanh hiệu quả</li>
      </ul>
      <div class="hero-price">
        <span class="price-old">75.000đ</span>
        <span class="price-new">50.000đ</span>
      </div>
      <a href="#order" class="btn-cta">ĐẶT HÀNG NGAY - GIẢM 33%</a>
    </div>
  </div>
</header>
```

### Section 2: Sub-headline - Benefits
```html
<section id="benefits-quick" class="section-benefits-quick">
  <div class="benefits-grid">
    <div class="benefit-item"><span>🍍</span>91% Enzyme sinh học</div>
    <div class="benefit-item"><span>🤲</span>An toàn cho da</div>
    <div class="benefit-item"><span>👶</span>An toàn trẻ nhỏ</div>
    <div class="benefit-item"><span>🌿</span>Phân hủy 100%</div>
    <div class="benefit-item"><span>💧</span>Tiết kiệm 30% nước</div>
    <div class="benefit-item"><span>🍋</span>Khử mùi tanh</div>
  </div>
</section>
```

### Section 3: Pain Points
```html
<section id="problems" class="section-problems">
  <h2>Bạn Có Đang Gặp Phải Những Vấn Đề Này?</h2>
  <div class="problems-list">
    <div class="problem-item">
      <span class="icon-x">✗</span>
      <div>
        <h3>Da tay khô ráp, bong tróc</h3>
        <p>Hóa chất trong nước rửa chén thông thường gây hại cho da...</p>
      </div>
    </div>
    <div class="problem-item">
      <span class="icon-x">✗</span>
      <div>
        <h3>Lo lắng hóa chất độc hại</h3>
        <p>SLS, SLES, Paraben có thể gây kích ứng và ảnh hưởng sức khỏe...</p>
      </div>
    </div>
    <div class="problem-item">
      <span class="icon-x">✗</span>
      <div>
        <h3>Nước rửa không sạch dầu mỡ</h3>
        <p>Phải rửa đi rửa lại nhiều lần, tốn nước, tốn thời gian...</p>
      </div>
    </div>
    <div class="problem-item">
      <span class="icon-x">✗</span>
      <div>
        <h3>Mùi hôi tanh bám trên bát đĩa</h3>
        <p>Mùi cá, hải sản khó chịu không hết dù đã rửa sạch...</p>
      </div>
    </div>
  </div>
</section>
```

### Section 4: Authority
```html
<section id="authority" class="section-authority">
  <h2>Được Tin Dùng Bởi</h2>
  <div class="authority-badges">
    <img src="assets/images/badge-vsattp.svg" alt="Chứng nhận VSATTP">
    <img src="assets/images/badge-organic.svg" alt="Organic Certified">
    <img src="assets/images/badge-cruelty-free.svg" alt="Cruelty Free">
  </div>
  <div class="authority-stats">
    <div class="stat"><strong>10,000+</strong><span>Khách hàng tin dùng</span></div>
    <div class="stat"><strong>4.9/5</strong><span>Đánh giá trung bình</span></div>
    <div class="stat"><strong>98%</strong><span>Khách mua lại</span></div>
  </div>
</section>
```

### Section 5: Before/After Story
```html
<section id="story" class="section-story">
  <h2>Trước & Sau Khi Dùng ENZARA</h2>
  <div class="story-comparison">
    <div class="before">
      <img src="assets/images/before.jpg" alt="Trước">
      <h3>Trước</h3>
      <ul>
        <li>Da tay khô, nứt nẻ</li>
        <li>Dầu mỡ cứng đầu</li>
        <li>Mùi tanh bám</li>
      </ul>
    </div>
    <div class="after">
      <img src="assets/images/after.jpg" alt="Sau">
      <h3>Sau</h3>
      <ul>
        <li>Da tay mềm mại</li>
        <li>Sạch bóng dầu mỡ</li>
        <li>Thơm mát dịu nhẹ</li>
      </ul>
    </div>
  </div>
  <blockquote class="story-quote">
    "Từ khi dùng ENZARA, tay tôi không còn khô ráp nữa. Con gái 3 tuổi thích phụ mẹ rửa chén mà tôi không lo lắng!"
    <cite>- Chị Hương, Hà Nội</cite>
  </blockquote>
</section>
```

### Section 6: Product Benefits
```html
<section id="benefits" class="section-benefits">
  <h2>Tại Sao Chọn ENZARA?</h2>
  <div class="benefits-grid">
    <article class="benefit-card">
      <img src="assets/icons/enzyme.svg" alt="">
      <h3>91% Enzyme Sinh Học</h3>
      <p>Chiết xuất từ vỏ dứa, chanh tự nhiên. Phân giải dầu mỡ hiệu quả.</p>
    </article>
    <article class="benefit-card">
      <img src="assets/icons/safe.svg" alt="">
      <h3>An Toàn Cho Da Tay</h3>
      <p>Không gây khô, kích ứng. Phù hợp cho da nhạy cảm.</p>
    </article>
    <article class="benefit-card">
      <img src="assets/icons/baby.svg" alt="">
      <h3>An Toàn Trẻ Nhỏ, Mẹ Bầu</h3>
      <p>Không Paraben, SLS, SLES. Yên tâm cho cả gia đình.</p>
    </article>
    <article class="benefit-card">
      <img src="assets/icons/eco.svg" alt="">
      <h3>Phân Hủy Sinh Học 100%</h3>
      <p>Thân thiện môi trường. Không gây ô nhiễm nguồn nước.</p>
    </article>
    <article class="benefit-card">
      <img src="assets/icons/water.svg" alt="">
      <h3>Tiết Kiệm 30% Nước</h3>
      <p>Bọt ít, dễ xả. Giảm tiền nước đáng kể mỗi tháng.</p>
    </article>
    <article class="benefit-card">
      <img src="assets/icons/ginger.svg" alt="">
      <h3>Dịch Chiết Gừng Khử Mùi</h3>
      <p>Khử mùi tanh cá, hải sản hiệu quả. Hương thơm dễ chịu.</p>
    </article>
  </div>
</section>
```

### Section 7: Value Stack
```html
<section id="value" class="section-value">
  <h2>Bạn Sẽ Nhận Được</h2>
  <div class="value-stack">
    <div class="value-item">
      <span class="value-name">1 chai Nước Rửa Chén ENZARA 500ml</span>
      <span class="value-price">75.000đ</span>
    </div>
    <div class="value-item bonus">
      <span class="value-name">🎁 Bọt biển rửa chén cao cấp</span>
      <span class="value-price">12.000đ</span>
    </div>
    <div class="value-item bonus">
      <span class="value-name">🚚 Miễn phí vận chuyển (từ 2 sản phẩm)</span>
      <span class="value-price">30.000đ</span>
    </div>
    <div class="value-total">
      <span>Tổng giá trị:</span>
      <span class="total-price">117.000đ</span>
    </div>
    <div class="value-pay">
      <span>Bạn chỉ trả:</span>
      <span class="pay-price">50.000đ</span>
    </div>
  </div>
</section>
```

### Section 8: Objection Handling (FAQ)
```html
<section id="faq" class="section-faq">
  <h2>Câu Hỏi Thường Gặp</h2>
  <div class="faq-list">
    <details class="faq-item">
      <summary>Enzyme sinh học có thực sự sạch dầu mỡ?</summary>
      <p>Có! Enzyme từ vỏ dứa có khả năng phân giải protein và chất béo tự nhiên, hiệu quả hơn cả chất tẩy rửa hóa học...</p>
    </details>
    <details class="faq-item">
      <summary>Có an toàn cho trẻ nhỏ không?</summary>
      <p>Hoàn toàn an toàn. ENZARA không chứa Paraben, SLS, SLES - những chất gây kích ứng phổ biến...</p>
    </details>
    <details class="faq-item">
      <summary>Bọt ít có nghĩa là không sạch?</summary>
      <p>Ngược lại! Bọt nhiều là do SLS/SLES - chất tạo bọt hóa học. ENZARA dùng enzyme nên bọt ít nhưng làm sạch hiệu quả hơn...</p>
    </details>
    <details class="faq-item">
      <summary>Có thể dùng để rửa rau quả không?</summary>
      <p>Có thể! Thành phần tự nhiên 100% nên an toàn để rửa rau quả, bình sữa trẻ em...</p>
    </details>
  </div>
</section>
```

### Section 9: Why Selling
```html
<section id="why-price" class="section-why-price">
  <h2>Tại Sao Giá Ưu Đãi Đến Vậy?</h2>
  <div class="why-content">
    <p>ENZARA là thương hiệu mới, chúng tôi muốn <strong>nhiều gia đình Việt</strong> được trải nghiệm sản phẩm an toàn, chất lượng.</p>
    <p>Đây là <strong>giá ưu đãi ra mắt</strong>, chỉ áp dụng cho 500 khách hàng đầu tiên. Sau đó giá sẽ trở về 75.000đ.</p>
  </div>
</section>
```

### Section 10: Price Comparison
```html
<section id="compare" class="section-compare">
  <h2>So Sánh Với Sản Phẩm Khác</h2>
  <div class="compare-table">
    <table>
      <thead>
        <tr>
          <th>Tiêu chí</th>
          <th>NRC Thường</th>
          <th class="highlight">ENZARA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Enzyme sinh học</td><td>0-20%</td><td class="check">91% ✓</td></tr>
        <tr><td>Paraben</td><td class="bad">Có</td><td class="check">Không ✓</td></tr>
        <tr><td>SLS/SLES</td><td class="bad">Có</td><td class="check">Không ✓</td></tr>
        <tr><td>An toàn trẻ nhỏ</td><td class="bad">Không</td><td class="check">Có ✓</td></tr>
        <tr><td>Phân hủy sinh học</td><td class="bad">Không</td><td class="check">100% ✓</td></tr>
        <tr><td>Giá</td><td>40-60k</td><td class="check">50k + Quà ✓</td></tr>
      </tbody>
    </table>
  </div>
</section>
```

### Section 11-12: Real Price + Bonus
```html
<section id="pricing" class="section-pricing">
  <div class="pricing-box">
    <span class="pricing-label">Giá Gốc</span>
    <span class="pricing-old">75.000đ</span>
    <span class="pricing-label">Giá Ưu Đãi Hôm Nay</span>
    <span class="pricing-new">50.000đ</span>
    <span class="pricing-save">Tiết kiệm 25.000đ (33%)</span>
  </div>

  <div class="bonus-box">
    <h3>🎁 Quà Tặng Kèm</h3>
    <div class="bonus-item">
      <img src="assets/images/sponge.jpg" alt="Bọt biển">
      <div>
        <strong>Bọt biển rửa chén cao cấp</strong>
        <span>Trị giá 12.000đ - MIỄN PHÍ</span>
      </div>
    </div>
  </div>
</section>
```

### Section 13: Testimonials
```html
<section id="testimonials" class="section-testimonials">
  <h2>Khách Hàng Nói Gì?</h2>
  <div class="testimonials-grid">
    <article class="testimonial-card">
      <div class="stars">★★★★★</div>
      <p>"Dùng được 2 tuần, da tay mềm hẳn. Con gái 2 tuổi hay cầm bát đĩa chơi mà tôi yên tâm."</p>
      <div class="testimonial-author">
        <img src="assets/images/customer-1.jpg" alt="">
        <div><strong>Chị Mai</strong><span>Hà Nội</span></div>
      </div>
    </article>
    <article class="testimonial-card">
      <div class="stars">★★★★★</div>
      <p>"Bọt ít nhưng sạch bất ngờ. Mùi dứa chanh thơm nhẹ, không hắc như loại khác."</p>
      <div class="testimonial-author">
        <img src="assets/images/customer-2.jpg" alt="">
        <div><strong>Anh Tuấn</strong><span>TP.HCM</span></div>
      </div>
    </article>
    <article class="testimonial-card">
      <div class="stars">★★★★★</div>
      <p>"Mang bầu nên rất kỹ chọn sản phẩm. ENZARA thành phần tự nhiên, yên tâm sử dụng."</p>
      <div class="testimonial-author">
        <img src="assets/images/customer-3.jpg" alt="">
        <div><strong>Chị Linh</strong><span>Đà Nẵng</span></div>
      </div>
    </article>
  </div>
</section>
```

### Section 14: Scarcity
```html
<section id="scarcity" class="section-scarcity">
  <div class="scarcity-box">
    <div class="scarcity-stock">
      <span class="stock-icon">🔥</span>
      <span class="stock-text">Chỉ còn <strong id="stock-count">47</strong> sản phẩm</span>
    </div>
    <div class="scarcity-bar">
      <div class="bar-fill" style="width: 78%"></div>
    </div>
    <p class="scarcity-sold">Đã bán 453/500 sản phẩm ưu đãi</p>
    <div class="countdown">
      <span>Ưu đãi kết thúc trong:</span>
      <div class="countdown-timer">
        <span id="hours">02</span>:<span id="minutes">45</span>:<span id="seconds">30</span>
      </div>
    </div>
  </div>
</section>
```

### Section 15-16: Final Price + CTA
```html
<section id="order" class="section-order">
  <h2>Đặt Hàng Ngay</h2>

  <div class="order-summary">
    <div class="order-price">
      <span class="old">75.000đ</span>
      <span class="new">50.000đ</span>
      <span class="badge-save">-33%</span>
    </div>
    <p class="order-bonus">+ Tặng bọt biển 12.000đ + Free ship từ 2SP</p>
  </div>

  <form id="order-form" class="order-form">
    <div class="form-group">
      <label for="name">Họ và tên *</label>
      <input type="text" id="name" name="name" required placeholder="Nguyễn Văn A">
    </div>
    <div class="form-group">
      <label for="phone">Số điện thoại *</label>
      <input type="tel" id="phone" name="phone" required placeholder="0945.139.990">
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ nhận hàng *</label>
      <textarea id="address" name="address" required placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/TP"></textarea>
    </div>
    <div class="form-group">
      <label for="quantity">Số lượng</label>
      <select id="quantity" name="quantity">
        <option value="1">1 chai - 50.000đ</option>
        <option value="2">2 chai - 100.000đ (Free ship)</option>
        <option value="3">3 chai - 150.000đ (Free ship)</option>
      </select>
    </div>
    <button type="submit" class="btn-cta btn-order">
      ĐẶT HÀNG NGAY
      <span class="btn-sub">Thanh toán khi nhận hàng (COD)</span>
    </button>
  </form>

  <div class="order-trust">
    <span>🔒 Bảo mật thông tin</span>
    <span>📦 Giao hàng 2-4 ngày</span>
    <span>↩️ Đổi trả 7 ngày</span>
  </div>
</section>

<footer class="footer">
  <p>ENZARA - Nước Rửa Chén Enzyme Sinh Học</p>
  <p>Hotline: <a href="tel:0945139990">0945.139.990</a></p>
  <p>Website: <a href="https://enzara.vn">enzara.vn</a></p>
</footer>
```

## 3.2 JavaScript Implementation

### main.js
```javascript
// Form validation & submission
document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const quantity = document.getElementById('quantity').value;

  // Phone validation (Vietnam)
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  if (!phoneRegex.test(phone.replace(/\./g, ''))) {
    alert('Vui lòng nhập số điện thoại hợp lệ');
    return;
  }

  // Success - redirect or show confirmation
  alert(`Cảm ơn ${name}! Đơn hàng ${quantity} chai ENZARA đã được ghi nhận. Chúng tôi sẽ gọi xác nhận trong 30 phút.`);

  // Track conversion (placeholder)
  if (typeof gtag === 'function') {
    gtag('event', 'purchase', { value: quantity * 50000, currency: 'VND' });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
```

### animations.js
```javascript
// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Countdown timer
function startCountdown(hours, minutes, seconds) {
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  setInterval(() => {
    if (totalSeconds <= 0) return;
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    document.getElementById('hours').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
  }, 1000);
}

// Start 2h 45m 30s countdown
startCountdown(2, 45, 30);

// Stock counter (simulate decrease)
let stock = 47;
setInterval(() => {
  if (Math.random() > 0.7 && stock > 10) {
    stock--;
    document.getElementById('stock-count').textContent = stock;
  }
}, 30000);
```

## 3.3 Implementation Order

1. **Day 1 Morning**: Setup files, CSS variables, base styles
2. **Day 1 Afternoon**: Sections 1-6 (Hero, Benefits, Problems, Authority, Story, Benefits Detail)
3. **Day 2 Morning**: Sections 7-12 (Value, FAQ, Why, Compare, Price, Bonus)
4. **Day 2 Afternoon**: Sections 13-16 (Testimonials, Scarcity, Final CTA, Form)
5. **Day 2 Evening**: JavaScript, animations, responsive fixes

## 3.4 Checklist

- [ ] HTML structure complete
- [ ] CSS styling complete
- [ ] Responsive breakpoints working
- [ ] Form validation working
- [ ] Animations smooth
- [ ] Cross-browser tested
