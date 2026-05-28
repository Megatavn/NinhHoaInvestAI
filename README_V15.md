# Ninh Hòa Invest AI V15 – Planning Layer Pro

Bản V15 sửa vấn đề GIS chính thức bị chặn nhúng WebView bằng cách không nhúng trang `public/8192` trực tiếp nữa. App chuyển sang hướng sản phẩm đúng hơn: quét ArcGIS REST, tự tìm MapServer/FeatureServer trong các thư mục con, bật lớp màu quy hoạch nếu dịch vụ cho phép và đọc thuộc tính tại điểm bằng Identify/Query.

## Điểm mới
- Không còn phụ thuộc iframe/WebView của GIS Khánh Hòa.
- Quét cả ArcGIS root và folders con, khắc phục lỗi V14 chỉ quét root nên dễ báo “Không có lớp tự động”.
- Bảng chẩn đoán GIS: trạng thái, dịch vụ đang dùng, lớp đọc.
- Danh sách lớp GIS tìm được, có thể chọn lớp khác.
- Bật/tắt lớp màu quy hoạch trong bản đồ app.
- Đọc quy hoạch tại tâm bản đồ, điểm ranh cuối, GPS hoặc VN2000.
- Giải mã mã đất: ODT, ONT, TMD, DGT, DKV, CLN, LUA, SKC, SON, MNC...
- Lưu kết quả kiểm tra quy hoạch để đối chiếu sau.

## Lưu ý pháp lý
Kết quả trong app chỉ hỗ trợ sàng lọc đầu tư. Trước khi giao dịch vẫn cần kiểm tra số tờ/số thửa, trích lục địa chính, kế hoạch sử dụng đất và xác nhận tại cơ quan có thẩm quyền.
