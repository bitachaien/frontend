# 🎮 Mock Data System - Quick Start

## 🚀 Bật Mock Mode trong 3 Bước

### Bước 1: Tạo file .env.local

Tạo file `.env.local` trong thư mục root project:

```bash
NEXT_PUBLIC_ENABLE_MOCK=true
```

### Bước 2: Thêm MockInitializer vào Layout

Mở file `src/app/layout.tsx` và thêm import:

```tsx
import MockInitializer from "@/components/MockInitializer";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MockInitializer />
        {children}
      </body>
    </html>
  );
}
```

### Bước 3: Restart Dev Server

```bash
yarn dev
```

## ✅ Kiểm Tra Mock Mode

Khi mock mode được bật, bạn sẽ thấy:

1. **Banner màu tím** ở đầu trang với text "MOCK MODE"
2. **Console logs:**

   ```
   ✅ Auth mock initialized
   ✅ Content mock initialized
   🔧 Mock mode is ENABLED
   Test credentials: username=testuser, password=123456
   ```

## 🔑 Test Accounts

### ✅ Đăng nhập thành công

```
Username: testuser
Password: 123456
```

### ❌ Đăng nhập thất bại

```
Username: wronguser
Password: wrongpass
```

### ❌ Đăng ký thất bại

```
Username: existinguser  (username đã tồn tại)
Password: bất kỳ
```

## 💾 Mock Data Có Sẵn

- ✅ **User:** Balance 5,000,000 VND, VIP Level 3
- ✅ **Games:** 5 games mẫu (Slot, Casino, Fishing, Sport)
- ✅ **Promotions:** 3 khuyến mãi
- ✅ **Transactions:** Lịch sử giao dịch mẫu
- ✅ **Banks:** 8 ngân hàng Việt Nam
- ✅ **Referral:** 15 người được giới thiệu

## 🎯 Lợi Ích

✅ **Phát triển nhanh** - Không cần chờ backend
✅ **Test UI/UX** - Dữ liệu ổn định, nhất quán
✅ **Demo client** - Không phụ thuộc API thực
✅ **Zero config** - Chỉ cần 1 biến env

## 🔧 Tắt Mock Mode

### Cách 1: Xóa hoặc comment trong .env.local

```bash
# NEXT_PUBLIC_ENABLE_MOCK=true
```

### Cách 2: Set = false

```bash
NEXT_PUBLIC_ENABLE_MOCK=false
```

Sau đó restart dev server.

## 📚 Docs Đầy Đủ

Xem file `src/mocks/README.md` để biết thêm chi tiết về:

- Cách thêm mock data mới
- Cách thêm mock endpoints
- Tùy chỉnh responses
- Debugging tips

## 🐛 Troubleshooting

### Mock mode không hoạt động?

1. Kiểm tra file `.env.local` có đúng tên không (không phải `.env`)
2. Restart dev server sau khi thay đổi env
3. Kiểm tra console có logs initialization không
4. Đảm bảo `MockInitializer` được import trong layout

### API vẫn gọi thực?

1. Kiểm tra `NEXT_PUBLIC_ENABLE_MOCK=true` trong .env.local
2. Clear browser cache và reload
3. Check console logs xem mock có được init không

## 💡 Tips

- Mock mode tự động bật trong `development` nếu set env
- Tất cả responses có delay 500ms để giả lập network
- Mock data reset mỗi khi refresh page
- Banner mock chỉ hiện trong development mode
