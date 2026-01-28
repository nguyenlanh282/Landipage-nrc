# SePay Payment Gateway - Multi-Shop

Backend xử lý webhook SePay cho nhiều landing page / shop.

## Tính năng

- ✅ Hỗ trợ nhiều shop với cấu hình riêng
- ✅ Tự động match đơn hàng theo mã prefix (ENZARA, SHOP2, ...)
- ✅ Cập nhật Pancake POS tự động
- ✅ API polling cho frontend check trạng thái
- ✅ CORS cho phép landing page gọi API

## Cấu trúc

```
cloudflare-worker/
├── src/
│   └── index.js      # Main worker code
├── wrangler.toml     # Cloudflare config
├── package.json
└── README.md
```

## Cách thêm shop mới

Sửa file `src/index.js`, thêm vào object `SHOPS`:

```javascript
const SHOPS = {
  'enzara': { ... },  // Shop hiện tại

  // Thêm shop mới:
  'newshop': {
    name: 'Tên Shop Mới',
    pancakeShopId: 'xxx',           // ID shop trên Pancake
    pancakeApiKey: 'xxx',           // API key Pancake
    sepayAccount: 'xxx',            // Số tài khoản SePay
    sepayBank: 'mbbank',            // Mã ngân hàng
    orderPrefix: 'NEWSHOP',         // Prefix mã đơn (viết HOA)
    allowedOrigins: [               // Domain landing page
      'https://newshop.com',
      'https://user.github.io'
    ]
  }
};
```

## API Endpoints

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/health` | GET | Health check, list shops |
| `/shops` | GET | Danh sách shop public |
| `/webhook/sepay` | POST | Nhận webhook SePay (universal) |
| `/webhook/sepay/:shopId` | POST | Webhook cho shop cụ thể |
| `/check-payment?code=XXX` | GET | Check trạng thái thanh toán |
| `/register-payment` | POST | Đăng ký đơn hàng chờ thanh toán |

## Deploy lần đầu

### 1. Cài Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Đăng nhập Cloudflare

```bash
wrangler login
```

Mở browser, đăng nhập tài khoản Cloudflare (tạo miễn phí nếu chưa có).

### 3. Tạo KV namespace

```bash
cd cloudflare-worker
wrangler kv:namespace create PAYMENT_STATUS
```

Output:
```
✨ Created namespace "PAYMENT_STATUS" with ID "xxxxx"
```

### 4. Cập nhật wrangler.toml

Mở `wrangler.toml`, thêm:

```toml
[[kv_namespaces]]
binding = "PAYMENT_STATUS"
id = "xxxxx"  # ID từ bước 3
```

### 5. Deploy

```bash
npm install
wrangler deploy
```

Output:
```
✨ Published sepay-payment-gateway
   https://sepay-payment-gateway.xxx.workers.dev
```

### 6. Cấu hình SePay

1. Đăng nhập https://my.sepay.vn
2. Vào **Cài đặt** → **Webhook**
3. Thêm URL: `https://sepay-payment-gateway.xxx.workers.dev/webhook/sepay`
4. Chọn: Giao dịch thành công

### 7. Cập nhật landing page

Sửa `js/pancake-integration.js`:

```javascript
webhookUrl: 'https://sepay-payment-gateway.xxx.workers.dev'
```

## Cách hoạt động

```
┌──────────────┐     ┌─────────────┐     ┌──────────────────┐
│ Landing Page │────▶│   SePay     │────▶│ Cloudflare Worker│
│              │     │   Webhook   │     │                  │
│ 1. Đặt hàng  │     │             │     │ 2. Nhận webhook  │
│    (QR code) │     │             │     │ 3. Match prefix  │
└──────────────┘     └─────────────┘     │ 4. Update POS    │
       │                                  │ 5. Save to KV    │
       │                                  └──────────────────┘
       │                                           │
       │    ┌─────────────────────────────────────┘
       │    │
       ▼    ▼
  ┌─────────────┐
  │ Polling     │
  │ /check-pay  │
  │ mỗi 10s     │
  └─────────────┘
```

## Test

```bash
# Health check
curl https://your-worker.workers.dev/health

# List shops
curl https://your-worker.workers.dev/shops

# Check payment
curl "https://your-worker.workers.dev/check-payment?code=ENZARA1234567890"
```

## Logs

```bash
wrangler tail
```

Xem realtime logs khi có webhook đến.

## Troubleshooting

**KV not configured**: Chưa tạo/link KV namespace

**Order not found**: Mã đơn không match hoặc đơn cũ > 50 đơn

**CORS error**: Thêm domain vào `allowedOrigins` của shop
