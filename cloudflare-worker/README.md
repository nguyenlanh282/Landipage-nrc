# ENZARA SePay Webhook - Cloudflare Worker

Xử lý webhook từ SePay để tự động xác nhận thanh toán và cập nhật Pancake POS.

## Cách hoạt động

1. Khách hàng chuyển khoản với nội dung `ENZARA...`
2. SePay gửi webhook đến Worker
3. Worker tìm đơn hàng trong Pancake POS theo mã
4. Cập nhật trạng thái `prepaid` và note
5. Frontend polling để hiển thị trạng thái

## Deploy

### 1. Cài đặt Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

### 2. Tạo KV namespace (để lưu trạng thái thanh toán)

```bash
wrangler kv:namespace create PAYMENT_STATUS
```

Copy ID vào `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "PAYMENT_STATUS"
id = "your-kv-id-here"
```

### 3. Deploy

```bash
cd cloudflare-worker
npm install
npm run deploy
```

### 4. Cấu hình SePay Webhook

Đăng nhập SePay Dashboard → Webhooks → Thêm webhook:
- URL: `https://enzara-sepay-webhook.your-subdomain.workers.dev/webhook/sepay`
- Events: Giao dịch thành công

## Endpoints

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/health` | GET | Health check |
| `/webhook/sepay` | POST | Nhận webhook từ SePay |
| `/check-payment?code=ENZARA...` | GET | Kiểm tra trạng thái (cho frontend) |

## Test

```bash
# Health check
curl https://enzara-sepay-webhook.xxx.workers.dev/health

# Check payment status
curl "https://enzara-sepay-webhook.xxx.workers.dev/check-payment?code=ENZARA1234567890"
```
