# Ninh Hòa Invest AI V25 – AI Đọc Sổ & Chấm Điểm Lô Đất

Tác giả sản phẩm: **Vũ Hoàng**

## Điểm mới V25

- Thêm mục **AI Đọc sổ & chấm điểm lô đất** trong tab **Kiểm tra**.
- Cho phép chọn ảnh sổ đỏ/sổ hồng để đọc chữ bằng OCR trên thiết bị Android.
- Trích thông tin quan trọng: số thửa, tờ bản đồ, diện tích, loại đất, thời hạn, địa chỉ, ghi chú quy hoạch.
- Dán link Google Maps và nhập giá bán để tạo báo cáo sàng lọc.
- Chấm điểm: pháp lý, quy hoạch, vị trí, thanh khoản, đầu tư.
- Phát hiện cảnh báo như: đất nông nghiệp/đất lúa, quy hoạch giao thông, lộ giới, diện tích bị ảnh hưởng.
- Tạo câu hỏi cần hỏi chủ đất/môi giới trước khi đặt cọc.
- Lưu báo cáo vào **Sổ tay đầu tư cá nhân**.

## Lưu ý pháp lý

Kết quả chỉ dùng để sàng lọc ban đầu. Trước khi mua/bán hoặc đặt cọc, người dùng cần đối chiếu sổ, số tờ/số thửa, quy hoạch/lộ giới, trích lục địa chính và xác nhận tại cơ quan có thẩm quyền.

## Build APK

Dùng GitHub Actions trong repo:

```bash
gradle --no-daemon assembleDebug
```

APK debug nằm trong:

```text
app/build/outputs/apk/debug/
```
