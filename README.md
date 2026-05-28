# Ninh Hòa Invest AI V15.1 – GIS Recovery

Bản sửa phần GIS khi V15 không tìm được lớp tự động.

Điểm mới:
- Không nhúng WebView GIS bị chặn.
- Thử nhiều endpoint: gis.khanhhoa.gov.vn và gisportal.khanhhoa.gov.vn, cả /arcgis/rest và /server/rest.
- Đọc trang GIS chính thức bằng native fetch để bóc link MapServer/FeatureServer nếu có.
- Hiển thị log chẩn đoán GIS và nút Copy chẩn đoán để gửi lại khi lỗi.
- Tự retry khi thư viện bản đồ Leaflet tải chậm.

Nếu vẫn không tìm thấy lớp: nguồn GIS không cho APK truy vấn trực tiếp, cần chuyển sang hướng proxy ẩn/official data mirror. Người dùng cuối vẫn không cần nhập API.
