# Mock Data System - Hướng Dẫn Sử Dụng

Hệ thống mock data giúp bạn phát triển và test ứng dụng mà không cần backend thực.

## 📁 Cấu Trúc Files

```
src/mocks/
├── mockData.ts       # Dữ liệu giả lập
├── mockAdapter.ts    # Axios interceptors
├── index.ts          # Mock service configuration
└── README.md         # Hướng dẫn (file này)
```

## 🚀 Cách Sử Dụng

### 1. Enable Mock Mode

Thêm vào file `.env.local`:

```bash
NEXT_PUBLIC_ENABLE_MOCK=true
```

### 2. Initialize Mocks trong App

Mở file `src/app/layout.tsx` và thêm:

```tsx
"use client";

import { useEffect } from "react";
import { initializeMocks } from "@/mocks";

export default function RootLayout({ children }) {
  useEffect(() => {
    // Chỉ chạy ở client side
    if (typeof window !== "undefined") {
      initializeMocks();
    }
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Sử dụng Test Credentials

Khi mock mode được bật, sử dụng các thông tin sau để test:

#### ✅ Đăng nhập thành công

- **Username:** `testuser`
- **Password:** `123456`

#### ❌ Đăng nhập thất bại

- **Username:** `wronguser`
- **Password:** `wrongpass`

#### ❌ Đăng ký thất bại (username đã tồn tại)

- **Username:** `existinguser`

## 📊 Mock Data Có Sẵn

### Auth & User

- ✅ Login/Logout
- ✅ Register
- ✅ User Profile
- ✅ Change Password
- ✅ Update User Info

### Wallet

- ✅ Balance
- ✅ Transaction History
- ✅ Deposit
- ✅ Withdraw

### Games

- ✅ Game List (5 games mẫu)
- ✅ Game Providers
- ✅ Launch Game
- ✅ Favorite Games

### Promotions

- ✅ Promotion List (3 khuyến mãi)
- ✅ Promotion Detail
- ✅ Claim Promotion

### VIP System

- ✅ VIP Info (5 levels)
- ✅ VIP Benefits
- ✅ Claim VIP Rewards

### Friend Referral

- ✅ Referral Info
- ✅ Referral History
- ✅ Commission Data

### Bank & Payment

- ✅ Bank List (8 ngân hàng VN)
- ✅ User Bank Accounts
- ✅ Add Bank Account
- ✅ Deposit Methods

### Notifications

- ✅ Notification List
- ✅ Mark as Read

## 🎮 Mock User Data

Mock user mặc định:

```typescript
{
  username: "testuser",
  name: "Người Dùng Test",
  email: "testuser@example.com",
  phone: "0901234567",
  balance: 5000000,
  vipLevel: 3,
  vipPoints: 15000,
  referralCode: "TEST2024"
}
```

## 🔧 Tùy Chỉnh Mock Data

### Thêm Mock Response Mới

Mở `src/mocks/mockData.ts` và thêm:

```typescript
export const mockNewFeature = {
  status: true,
  data: {
    // Your mock data here
  },
};
```

### Thêm Mock Endpoint

Mở `src/mocks/mockAdapter.ts` và thêm:

```typescript
mock.onGet(/\/api\/new-endpoint/).reply(200, mockData.mockNewFeature);
```

## 🐛 Debugging

### Kiểm tra Mock Status

Trong console, bạn sẽ thấy:

```
✅ Auth mock initialized
✅ Content mock initialized
🔧 Mock mode is ENABLED - Using mock data for API calls
Test credentials: username=testuser, password=123456
```

### Disable Mock Mode

Có 2 cách:

1. **Trong code:**

```typescript
import { disableMocks } from "@/mocks";
disableMocks();
```

1. **Trong .env.local:**

```bash
NEXT_PUBLIC_ENABLE_MOCK=false
```

## 📝 Lưu Ý

- Mock mode chỉ hoạt động ở **client-side**
- Tất cả mock responses có delay **500ms** để giả lập network latency
- Mock data được lưu trong memory, refresh page sẽ reset về dữ liệu ban đầu
- Khi build production, nên tắt mock mode

## 🎯 Use Cases

### 1. Development mà không cần Backend

```bash
NEXT_PUBLIC_ENABLE_MOCK=true yarn dev
```

### 2. Testing UI/UX

Tất cả API calls sẽ trả về mock data, giúp test UI nhanh chóng.

### 3. Demo cho Client

Mock data ổn định, không phụ thuộc vào backend.

### 4. CI/CD Testing

Chạy tests với mock data thay vì gọi API thực.

## 🔗 Integration với Existing Code

Không cần thay đổi code API calls hiện tại. Mock adapter sẽ tự động intercept requests:

```typescript
// Code gốc không thay đổi
const response = await authService.signin(username, password);
// Mock adapter sẽ trả về mockLoginResponse thay vì gọi API thực
```

## 📞 Support

Nếu cần thêm mock data hoặc endpoints, liên hệ team dev.
