# Ninh Hòa Invest AI V7.1 – Source Link Fix

Bản V7.1 sửa lỗi bấm **Mở nguồn** nhưng bị mở ra trang XML/RSS của Google News.

## Điểm sửa chính

- Nút **Mở nguồn** không còn mở `news.google.com/rss/...` dạng XML.
- Các link tìm kiếm Google News RSS được chuyển sang trang Google News dạng đọc được.
- Khi đọc RSS Google News, app ưu tiên lấy link bài báo gốc trong phần mô tả.
- Các link RSS như Công báo Chính phủ được chuyển sang trang web chính để người dùng dễ đọc.
- Đổi cache tin sang `nhi_v71_news` để tránh dùng lại cache cũ chứa link RSS lỗi.
- Giữ toàn bộ tính năng V7: Khu đất, hồ sơ khu vực, so sánh khu vực, AI Briefing, AI phân tích lô đất, tra cứu pháp lý.

## Cách build APK bằng GitHub Actions

1. Upload/cập nhật source lên repo GitHub.
2. Vào tab **Actions**.
3. Chọn **Build APK**.
4. Đợi build xong.
5. Tải APK ở mục **Artifacts**.
