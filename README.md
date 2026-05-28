# Ninh Hòa Invest AI V13 – Planning Reader

Bản V13 bổ sung công cụ đọc quy hoạch tại điểm trên bản đồ.

Tính năng chính:
- Giữ toàn bộ tính năng V12: tin tức, briefing, khu đất, phân tích lô đất, bản đồ, VN2000.
- Thêm nút **Đọc điểm giữa bản đồ** và **Đọc điểm ranh cuối**.
- App thử truy vấn lớp GIS công khai của Khánh Hòa qua ArcGIS REST nếu nguồn cho phép.
- Nếu đọc được thuộc tính, app hiển thị mã/loại đất như ODT, ONT, TMD, DKV, DGT, CLN, LUA...
- Nếu nguồn chặn truy vấn tự động, app chuyển sang chế độ kiểm chứng thủ công: copy tọa độ, mở GIS Khánh Hòa và Google Maps.
- Có cảnh báo pháp lý: kết quả chỉ dùng sàng lọc, không thay thế xác nhận từ cơ quan có thẩm quyền.

Lưu ý quan trọng:
- Để đọc chính xác 100% lô đất thuộc đất ở, thương mại dịch vụ, công viên, giao thông... cần lớp dữ liệu quy hoạch chính thức có thuộc tính và cho phép truy vấn.
- Nếu nguồn GIS không mở truy vấn/CORS, app không được phép “đoán bừa” từ màu bản đồ vì có thể gây rủi ro pháp lý.

