# 📦 Hệ Thống Dữ Liệu Giả Lập - Tóm Tắt

## ✅ Đã Tạo

### 📂 Files Chính

1. **`src/mocks/mockData.ts`** (542 dòng)
   - Dữ liệu giả lập cho tất cả features
   - User, Wallet, Games, Promotions, VIP, Referral, Banks, Notifications
   - Dữ liệu realistic với tiếng Việt

2. **`src/mocks/mockAdapter.ts`** (220 dòng)
   - Axios mock adapters
   - Intercept tất cả API calls
   - Setup cho authInstance và contentInstance

3. **`src/mocks/index.ts`** (92 dòng)
   - Mock service configuration
   - Enable/Disable mock mode
   - Export MOCK_CREDENTIALS và TEST_ACCOUNTS

4. **`src/components/MockInitializer/index.tsx`** (77 dòng)
   - Component khởi tạo mock
   - Hiển thị banner mock mode (chỉ trong dev)
   - Show test credentials

5. **`src/app/mock-demo/page.tsx`** (183 dòng)
   - Demo page để test mock APIs
   - Test login/register success/fail
   - Hiển thị responses

### 📚 Documentation

1. **`src/mocks/README.md`**
   - Hướng dẫn chi tiết
   - Cách tùy chỉnh mock data
   - Debugging guide

2. **`MOCK_QUICKSTART.md`**
   - Quick start trong 3 bước
   - Test accounts
   - Troubleshooting

3. **`.env.example`**
   - Template environment variables
   - Hướng dẫn config mock mode

### 📦 Dependencies

1. **`axios-mock-adapter@2.1.0`** ✅ Đã cài đặt

## 🚀 Cách Sử Dụng Nhanh

### Bước 1: Enable Mock Mode

Tạo file `.env.local`:

```bash
NEXT_PUBLIC_ENABLE_MOCK=true
```

### Bước 2: Thêm vào Layout

File `src/app/layout.tsx`:

```tsx
import MockInitializer from "@/components/MockInitializer";

// Thêm <MockInitializer /> vào body
```

### Bước 3: Test

- Access: `http://localhost:3010/mock-demo`
- Login với: `testuser` / `123456`

## 📊 Mock Data Summary

### Authentication

- ✅ Login success: testuser/123456
- ❌ Login fail: wronguser/wrongpass  
- ✅ Register success: any new username
- ❌ Register fail: existinguser (already exists)

### User Profile

- Balance: 5,000,000 VND
- VIP Level: 3 (Vàng)
- VIP Points: 15,000/25,000
- Referral Code: TEST2024

### Games (5 mẫu)

- Lucky 88 (Slot - Pragmatic Play)
- Rồng Hổ (Casino - Evolution Gaming)
- Baccarat (Casino - Evolution Gaming)
- Cá Vàng (Fishing - JDB Gaming)
- Bóng Đá Ảo (Sport - Betradar)

### Promotions (3 mẫu)

- Thưởng 100% Nạp Đầu (max 5M)
- Hoàn Trả Hàng Tuần (10%)
- Giải Đấu Slot (100M tổng giải)

### VIP System (5 levels)

- Level 1: Đồng (0 points)
- Level 2: Bạc (5,000 points)
- Level 3: Vàng (15,000 points) ⭐ Current
- Level 4: Bạch Kim (25,000 points)
- Level 5: Kim Cương (50,000 points)

### Wallet

- Balance: 5,000,000 VND
- Locked: 500,000 VND
- Available: 4,500,000 VND
- Transaction History: 4 mẫu

### Referral

- Total: 15 referrals
- Active: 12 referrals
- Commission: 3,500,000 VND
- Pending: 250,000 VND
- Rate: 0.5%

### Banks (8 ngân hàng VN)

- Vietcombank, Techcombank, MBBank, Vietinbank
- ACB, BIDV, TPBank, VPBank

### Payment Methods (3)

- Bank Transfer (100K - 50M)
- MoMo (100K - 20M)
- ZaloPay (100K - 20M)

## 🎯 API Endpoints Được Mock

### Auth

- `POST /auth/login`
- `POST /auth/register`
- `GET /api/auth/me`
- `POST /api/auth/update`
- `POST /api/auth/change-password`

### Wallet

- `GET /api/wallet/balance`
- `GET /api/wallet/transactions`
- `POST /api/wallet/deposit`
- `POST /api/wallet/withdraw`

### Games

- `GET /api/games` (with filters)
- `GET /api/games/providers`
- `POST /api/games/launch`
- `POST /api/games/favorite`

### Promotions

- `GET /api/promotions`
- `GET /api/promotions/:id`
- `POST /api/promotions/claim`

### VIP

- `GET /api/vip`
- `POST /api/vip/claim-reward`

### Referral

- `GET /api/referral`
- `GET /api/referral/history`

### Payment

- `GET /api/payment/banks`
- `GET /api/payment/user-banks`
- `POST /api/payment/add-bank`
- `GET /api/payment/deposit-methods`

### Notifications

- `GET /api/notifications`
- `POST /api/notifications/:id/read`

### Portal

- `GET /api/portal/config`

## 🔧 Tính Năng

✅ **Auto-intercept** - Tự động intercept tất cả axios requests
✅ **Network delay** - Giả lập network latency (500ms)
✅ **Realistic data** - Dữ liệu realistic với tiếng Việt
✅ **Easy toggle** - Bật/tắt dễ dàng qua env variable
✅ **Dev banner** - Hiển thị banner trong development mode
✅ **Test accounts** - Multiple test scenarios
✅ **Demo page** - Trang demo để test APIs
✅ **Full docs** - Documentation đầy đủ

## 🐛 Debug

Khi mock mode enabled, check console logs:

```
✅ Auth mock initialized
✅ Content mock initialized
🔧 Mock mode is ENABLED - Using mock data for API calls
Test credentials: username=testuser, password=123456
```

## 📝 Next Steps

### Để sử dụng

1. Tạo `.env.local` với `NEXT_PUBLIC_ENABLE_MOCK=true`
2. Thêm `<MockInitializer />` vào layout
3. Restart dev server
4. Access `/mock-demo` để test

### Để tắt

1. Set `NEXT_PUBLIC_ENABLE_MOCK=false` hoặc xóa
2. Restart dev server

### Để customize

1. Sửa `src/mocks/mockData.ts` để thay đổi data
2. Sửa `src/mocks/mockAdapter.ts` để thêm endpoints
3. Xem docs trong `src/mocks/README.md`

## ⚡ Performance

- Mock responses: ~500ms (configurable)
- Zero impact khi disabled
- No external dependencies
- In-memory data (no persistence)

## 🎓 Learning Resources

- Xem code trong `src/mocks/mockAdapter.ts` để học cách mock axios
- Demo page `/mock-demo` để xem examples
- README files cho detailed guides

---

**Tạo bởi:** Mock Data System Generator
**Version:** 1.0.0
**Date:** December 22, 2025
