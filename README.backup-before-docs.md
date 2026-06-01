# Ninh Hòa Invest AI V32 – Portfolio Ready Edition

**Ninh Hòa Invest AI** là ứng dụng Android hỗ trợ theo dõi tin tức, phân tích khu vực và kiểm tra sơ bộ lô đất dành cho nhà đầu tư bất động sản quan tâm đến **Ninh Hòa – Khánh Hòa**.

Bản V32 được tối ưu theo hướng **portfolio project**: dùng để đưa vào GitHub, CV, Facebook, LinkedIn hoặc trình bày trong phỏng vấn xin việc.

**Tác giả sản phẩm:** Vũ Hoàng

---

## Project Overview

Ninh Hòa Invest AI là một case study sản phẩm thực tế, xuất phát từ nhu cầu gia đình: cần một công cụ dễ dùng để theo dõi tin tức bất động sản Ninh Hòa, lưu hồ sơ đầu tư, kiểm tra thông tin lô đất và giảm rủi ro khi ra quyết định.

Ứng dụng không thay thế cơ quan nhà nước, luật sư hoặc chuyên gia thẩm định. App chỉ hỗ trợ sàng lọc ban đầu, gợi ý việc cần kiểm tra và giúp người dùng tổ chức thông tin tốt hơn.

---

## Problem

Nhà đầu tư nhỏ lẻ hoặc gia đình khi tìm hiểu đất tại Ninh Hòa thường gặp các vấn đề:

- Tin tức hạ tầng, quy hoạch, pháp lý nằm rải rác ở nhiều nguồn.
- Khó phân biệt tin mới, tin cũ, tin tác động cao và tin chỉ mang tính tham khảo.
- Không có nơi lưu lại lô đất, ghi chú, link Google Maps, tin liên quan và trạng thái thương vụ.
- Người không rành công nghệ dễ bị rối khi kiểm tra pháp lý, quy hoạch, giá/m², thanh khoản và rủi ro đặt cọc.

---

## Solution

Xây dựng một ứng dụng Android tập trung vào Ninh Hòa, có giao diện tiếng Việt dễ dùng, gồm:

- Bảng tin Ninh Hòa theo thời gian.
- Phân tích tác động tin tức theo góc nhìn nhà đầu tư.
- Kiểm tra sơ bộ lô đất.
- Trợ lý thửa đất và tọa độ.
- Sổ tay đầu tư cá nhân.
- Tri thức đầu tư: lưu bài báo/video về kinh doanh, bất động sản, pháp lý và đàm phán.
- Portfolio/Case Study Mode để trình bày dự án khi xin việc.

---

## Key Features

### 1. News Timeline Intelligence

Tin tức được phân loại theo:

- 24h qua
- 7 ngày
- 30 ngày
- Cũ hơn 30 ngày
- Tác động cao
- Cần lưu ý

App ưu tiên tin liên quan đến Ninh Hòa, Vân Phong, cao tốc Khánh Hòa – Buôn Ma Thuột, logistics, quy hoạch và pháp lý có ảnh hưởng đến khu vực.

### 2. News Impact Analysis

Mỗi tin có phân tích:

- Mức tác động
- Khu vực ảnh hưởng
- Nhóm tin: hạ tầng, quy hoạch, pháp lý, logistics, Vân Phong
- Góc nhìn đầu tư
- Rủi ro cần kiểm chứng
- Hành động đề xuất

### 3. Land Check

Người dùng nhập thông tin lô đất để app hỗ trợ chấm điểm sơ bộ:

- Pháp lý
- Quy hoạch
- Vị trí
- Thanh khoản
- Giá trị đầu tư

### 4. Parcel & Coordinate Assistant

Hỗ trợ nhập:

- Số thửa
- Tờ bản đồ
- Diện tích trên giấy
- Loại đất
- Link Google Maps
- Tọa độ X/Y nếu có

App có thể vẽ sơ bộ hình thửa, tính diện tích ước lượng và cảnh báo chênh lệch.

### 5. Personal Investment Notebook

Lưu và quản lý:

- Lô đất đang theo dõi
- Tin tức quan trọng
- Khu vực quan tâm
- Ghi chú pháp lý
- Báo cáo phân tích
- Trạng thái thương vụ

### 6. Portfolio Ready Mode

Bản V32 thêm mục **Dự án**, gồm:

- Giới thiệu dự án
- Case Study
- Vai trò của tác giả
- Kỹ năng thể hiện
- Demo Mode
- Roadmap
- Mô tả dùng trong CV

---

## My Role

Trong dự án này, Vũ Hoàng đảm nhiệm:

- Product idea
- Product thinking
- UI/UX direction
- AI-assisted development
- News filtering logic
- Real estate analysis flow
- Android APK build workflow
- GitHub/Codespaces project workflow

---

## Tech Stack

- Android WebView App
- HTML/CSS/JavaScript
- Gradle / Android build
- GitHub Actions build APK
- LocalStorage for offline personal notebook
- Google News RSS/source links for public news discovery

---

## Product Thinking Highlights

- Thiết kế cho người dùng non-tech.
- Tập trung Ninh Hòa thay vì gom tin quá rộng.
- Không ép GIS khi nguồn công khai không ổn định.
- Không yêu cầu quyền vị trí khi không cần bản đồ.
- Bỏ ảnh minh họa giả trong feed tin tức để app chuyên nghiệp hơn.
- Tách tin mới 24h/7 ngày/30 ngày để tránh nhầm tin cũ là tin mới.
- Thêm Demo Mode để nhà tuyển dụng có thể hiểu app nhanh hơn.

---

## What I Learned

- Cách biến nhu cầu thật của gia đình thành sản phẩm.
- Cách dùng AI để xây app theo nhiều vòng cải tiến.
- Cách thiết kế trải nghiệm cho người dùng phổ thông.
- Cách xử lý dữ liệu tin tức không ổn định.
- Cách cân bằng giữa tính năng AI và rủi ro pháp lý.
- Cách build APK bằng GitHub Actions.
- Cách trình bày sản phẩm thành portfolio project.

---

## CV Description

```text
Ninh Hòa Invest AI – Android Real Estate Intelligence App
- Xây dựng ứng dụng Android hỗ trợ theo dõi tin tức, phân tích khu vực và kiểm tra sơ bộ lô đất tại Ninh Hòa, Khánh Hòa.
- Thiết kế trải nghiệm mobile-first cho người dùng non-tech, tập trung vào tiếng Việt dễ hiểu và thao tác đơn giản.
- Phát triển các module: news intelligence, timeline filter, investment notebook, land parcel scoring, legal checklist, coordinate assistant.
- Tối ưu logic lọc tin theo độ mới, mức tác động, khu vực và nguồn tin.
- Triển khai build APK bằng GitHub Actions và quản lý mã nguồn trên GitHub.
```

---

## Build APK

Sau khi push code lên GitHub:

1. Vào repository.
2. Chọn tab **Actions**.
3. Chạy workflow **Build APK**.
4. Tải file APK trong phần **Artifacts**.
5. Cài trên Android.

---

## Update Commands in Codespaces

```bash
unzip -o NinhHoaInvestAI_NoAPI_V32_PortfolioReadyEdition.zip
cp -r NinhHoaInvestAI_NoAPI_V32_PortfolioReadyEdition/. .
rm -rf NinhHoaInvestAI_NoAPI_V32_PortfolioReadyEdition NinhHoaInvestAI_NoAPI_V32_PortfolioReadyEdition.zip
rm -f README_V*.md UPDATE_COMMANDS_PHONE_V*.txt

git add -A
git commit -m "Update V32 Portfolio Ready Edition"
git push
```

---

## Legal Disclaimer

Ninh Hòa Invest AI chỉ là công cụ hỗ trợ tham khảo và sàng lọc thông tin ban đầu. Người dùng cần kiểm tra pháp lý, quy hoạch, lộ giới, tranh chấp, thế chấp, chủ sở hữu và xác nhận tại cơ quan có thẩm quyền trước khi giao dịch bất động sản.

---

## Author

**Vũ Hoàng**

Dự án được xây dựng từ nhu cầu thực tế của gia đình và được phát triển thành portfolio project để thể hiện năng lực xây sản phẩm bằng AI, tư duy sản phẩm, UI/UX và quy trình triển khai Android APK.


---

## V32.1 – News Logic Critical Fix

Bản này kiểm tra lại logic tin tức và bổ sung cơ chế giữ các tin hạ tầng cấp vùng cực quan trọng, đặc biệt nhóm tin về **cao tốc Khánh Hòa – Buôn Ma Thuột**. Ứng dụng không còn gộp tất cả tin cao tốc thành một tin duy nhất, giúp người dùng thấy được nhiều nguồn như Thanh Niên, VnExpress, PLO, Tuổi Trẻ nếu cùng đưa tin về một chủ đề quan trọng.

Các tin hạ tầng/logistics quan trọng có thể được ghim vào nhóm **Cần lưu ý** và **Tác động cao**, kể cả khi bài viết không nhắc trực tiếp “Ninh Hòa” nhưng có ảnh hưởng rõ đến kết nối vùng Khánh Hòa – Vân Phong – Ninh Hòa.
