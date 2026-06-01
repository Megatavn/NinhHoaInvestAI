# Ninh Hòa Invest AI — Android Real Estate Intelligence App

![Android](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android&logoColor=white)
![HTML](https://img.shields.io/badge/UI-HTML%2FCSS-orange)
![JavaScript](https://img.shields.io/badge/Logic-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Gradle](https://img.shields.io/badge/Build-Gradle-02303A?logo=gradle&logoColor=white)
![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-green)
![Portfolio](https://img.shields.io/badge/Mode-Portfolio--Ready-blue)

**Ninh Hòa Invest AI** là ứng dụng Android hỗ trợ theo dõi tin tức, phân tích khu vực và kiểm tra sơ bộ lô đất dành cho người quan tâm đến bất động sản tại **Ninh Hòa, Khánh Hòa**.

Dự án được xây dựng theo hướng **portfolio project**: có bài toán thực tế, đối tượng người dùng rõ ràng, giao diện mobile-first, workflow phân tích bất động sản và quy trình build APK bằng GitHub/Codespaces.

> Đây là công cụ hỗ trợ tham khảo và sàng lọc thông tin ban đầu. Ứng dụng không thay thế cơ quan nhà nước, luật sư, chuyên gia quy hoạch hoặc chuyên gia thẩm định bất động sản.

---

## Preview / Ảnh demo

<p align="center">
  <img src="screenshots/home-portfolio.jpg" width="190" />
  <img src="screenshots/news-timeline.jpg" width="190" />
  <img src="screenshots/news-analysis.jpg" width="190" />
</p>

<p align="center">
  <img src="screenshots/land-check.jpg" width="190" />
  <img src="screenshots/investment-notebook.jpg" width="190" />
  <img src="screenshots/region-profile.jpg" width="190" />
</p>

---

## Giới thiệu nhanh

Nhiều nhà đầu tư nhỏ lẻ hoặc gia đình khi tìm hiểu đất tại Ninh Hòa thường gặp khó khăn vì thông tin nằm rải rác ở nhiều nguồn: tin tức hạ tầng, quy hoạch, pháp lý, giá khu vực, ghi chú lô đất, link bản đồ và trạng thái thương vụ.

**Ninh Hòa Invest AI** giải quyết bài toán này bằng cách tạo một app Android dễ dùng, tập trung vào:

- Theo dõi tin tức liên quan Ninh Hòa, Vân Phong, cao tốc, logistics và quy hoạch.
- Phân tích tác động tin tức theo góc nhìn nhà đầu tư.
- Kiểm tra sơ bộ lô đất bằng checklist pháp lý, quy hoạch, vị trí, giá trị và thanh khoản.
- Lưu hồ sơ đầu tư cá nhân, ghi chú, link bản đồ, trạng thái thương vụ.
- Trình bày dự án như một case study portfolio khi ứng tuyển hoặc giới thiệu năng lực xây sản phẩm.

---

## Project Summary / Tóm tắt dự án

| Hạng mục | Nội dung |
|---|---|
| App name | Ninh Hòa Invest AI |
| Type | Android real estate intelligence / investment notebook app |
| Main users | Nhà đầu tư cá nhân, gia đình, môi giới, người quan tâm BĐS Ninh Hòa |
| Main region | Ninh Hòa, Khánh Hòa |
| Core idea | Theo dõi tin tức + phân tích khu vực + kiểm tra sơ bộ lô đất + lưu hồ sơ đầu tư |
| Data approach | Tin tức và nguồn công khai, nhập liệu thủ công, demo data |
| Storage | LocalStorage / local app data |
| Build target | Android APK |
| Portfolio goal | Thể hiện product thinking, UI/UX mobile, workflow BĐS và AI-assisted development |

---

## Problem / Bài toán

Người mới hoặc nhà đầu tư nhỏ khi nghiên cứu bất động sản địa phương thường gặp các vấn đề:

- Tin tức hạ tầng, quy hoạch, pháp lý và thị trường nằm rải rác.
- Khó phân biệt tin mới, tin cũ, tin tác động cao và tin chỉ để tham khảo.
- Không có nơi lưu lô đất đang theo dõi, trạng thái thương vụ, ghi chú và đường link bản đồ.
- Người không rành công nghệ dễ bị rối khi kiểm tra pháp lý, quy hoạch, giá/m², thanh khoản và rủi ro đặt cọc.
- Dữ liệu bản đồ/quy hoạch miễn phí không ổn định, nên cần workflow thay thế dễ dùng hơn.

---

## Solution / Giải pháp

Ứng dụng tập trung vào trải nghiệm **mobile-first, tiếng Việt dễ hiểu, ít thao tác**, gồm các module:

1. **News Timeline Intelligence** — phân loại tin theo thời gian và mức tác động.
2. **News Impact Analysis** — giải thích tin tức theo góc nhìn đầu tư.
3. **Land Check** — kiểm tra sơ bộ lô đất bằng checklist/risk score.
4. **Parcel & Coordinate Assistant** — lưu số thửa, tờ bản đồ, loại đất, diện tích, tọa độ/link bản đồ.
5. **Personal Investment Notebook** — sổ tay đầu tư cá nhân.
6. **Region Profile** — hồ sơ khu vực, tiềm năng và yếu tố cần kiểm chứng.
7. **Portfolio Mode** — trình bày dự án như một case study sản phẩm.

---

## Key Features

### 1. News Timeline Intelligence

Tin tức được phân loại theo:

- 24 giờ qua
- 7 ngày
- 30 ngày
- Cũ hơn 30 ngày
- Tác động cao
- Cần lưu ý

Ứng dụng ưu tiên các chủ đề liên quan đến Ninh Hòa, Vân Phong, cao tốc Khánh Hòa – Buôn Ma Thuột, logistics, quy hoạch, pháp lý và hạ tầng khu vực.

### 2. News Impact Analysis

Mỗi tin có thể được trình bày theo cấu trúc:

- Mức tác động
- Khu vực ảnh hưởng
- Nhóm tin: hạ tầng, quy hoạch, pháp lý, logistics, Vân Phong
- Góc nhìn đầu tư
- Rủi ro cần kiểm chứng
- Hành động đề xuất

### 3. Land Check

Người dùng nhập thông tin lô đất để app hỗ trợ đánh giá sơ bộ:

- Pháp lý
- Quy hoạch
- Vị trí
- Thanh khoản
- Giá trị đầu tư
- Rủi ro cần hỏi thêm

### 4. Parcel & Coordinate Assistant

Hỗ trợ lưu thông tin:

- Số thửa
- Tờ bản đồ
- Diện tích trên giấy
- Loại đất
- Link Google Maps
- Tọa độ nếu có
- Ghi chú hiện trạng

### 5. Personal Investment Notebook

Quản lý hồ sơ cá nhân:

- Lô đất đang theo dõi
- Tin tức liên quan
- Ghi chú pháp lý
- Báo cáo phân tích
- Trạng thái thương vụ
- Checklist việc cần kiểm tra trước khi xuống tiền

### 6. Portfolio Ready Mode

Dự án có phần trình bày để phục vụ hồ sơ cá nhân:

- Product idea
- Case study
- Vai trò tác giả
- Kỹ năng thể hiện
- Demo mode
- Roadmap
- CV description

---

## Tech Stack / Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| Android WebView | Đóng gói app Android |
| HTML | Cấu trúc giao diện |
| CSS | Thiết kế UI mobile-first |
| JavaScript | Logic xử lý dữ liệu và tương tác |
| LocalStorage | Lưu dữ liệu local/offline |
| Gradle | Build APK |
| GitHub Actions | Build APK tự động |
| GitHub Codespaces | Môi trường chỉnh sửa/build project |

---

## Architecture / Kiến trúc tổng quan

```text
NinhHoaInvestAI/
├── app/                    # Android app source
├── screenshots/            # Ảnh demo cho README
├── .github/workflows/      # GitHub Actions build APK
├── README.md               # Portfolio README
├── build.gradle            # Gradle config
├── settings.gradle         # Gradle settings
└── UPDATE_COMMANDS_PHONE.txt
```

App được thiết kế theo hướng đơn giản, dễ bảo trì:

```text
User Input / Demo Data
        ↓
Local UI Logic
        ↓
News / Land / Notebook Modules
        ↓
LocalStorage
        ↓
Android WebView APK
```

---

## My Role / Vai trò của tác giả

Trong dự án này, **Vũ Hoàng** đảm nhiệm:

- Product idea
- Product thinking
- UI/UX direction
- AI-assisted development workflow
- Real estate analysis flow
- News filtering logic
- Investment notebook workflow
- Android APK build workflow
- GitHub/Codespaces project workflow
- Portfolio presentation

---

## Product Thinking Highlights

- Thiết kế cho người dùng non-tech.
- Tập trung vào một địa phương cụ thể thay vì gom dữ liệu quá rộng.
- Ưu tiên checklist và sổ tay đầu tư thay vì phụ thuộc hoàn toàn vào bản đồ/quy hoạch không ổn định.
- Tách tin theo độ mới để tránh nhầm tin cũ là tin mới.
- Đưa thông tin về dạng hành động: cần kiểm chứng gì, hỏi ai, lưu gì, rủi ro ở đâu.
- Có chế độ portfolio/case study để trình bày năng lực sản phẩm.

---

## Build APK

Có thể build APK bằng GitHub Actions hoặc Gradle/Codespaces.

### Build bằng GitHub Actions

1. Vào repository trên GitHub.
2. Chọn tab **Actions**.
3. Chạy workflow **Build APK**.
4. Tải file APK trong phần **Artifacts**.
5. Cài thử trên thiết bị Android.

### Build local/Codespaces

```bash
git clone https://github.com/Megatavn/NinhHoaInvestAI.git
cd NinhHoaInvestAI
./gradlew assembleDebug
```

APK thường nằm ở:

```text
app/build/outputs/apk/debug/app-debug.apk
```

---

## Current Limitations / Giới hạn hiện tại

- Chưa phải sản phẩm tư vấn đầu tư hoặc tư vấn pháp lý.
- Chưa thay thế dữ liệu chính thức từ cơ quan nhà nước.
- Chưa có backend/cloud sync.
- Chưa xác minh tự động toàn bộ quy hoạch/pháp lý.
- Một số phân tích chỉ mang tính demo hoặc rule-based.
- Người dùng vẫn cần kiểm tra trực tiếp tại cơ quan có thẩm quyền trước khi giao dịch.

---

## Roadmap / Hướng phát triển

- [ ] Chuẩn hóa thêm nguồn tin công khai liên quan Ninh Hòa – Khánh Hòa.
- [ ] Thêm bộ lọc tin theo khu vực và mức tác động.
- [ ] Thêm export báo cáo PDF cho từng lô đất.
- [ ] Thêm bản đồ hoặc liên kết bản đồ an toàn hơn nếu có nguồn dữ liệu phù hợp.
- [ ] Thêm optional backend/cloud sync.
- [ ] Thêm AI assistant thật với chế độ nguồn/citation rõ ràng.
- [ ] Thêm release APK chính thức trên GitHub Releases.

---

## CV Description

```text
Ninh Hòa Invest AI – Android Real Estate Intelligence App

Built an Android portfolio app focused on real estate intelligence for Ninh Hòa, Khánh Hòa. The app helps users track local infrastructure/news updates, analyze regional investment signals, run preliminary land-check workflows, save investment notes, manage parcel information and organize real estate research in a mobile-first Vietnamese interface.

Key skills demonstrated: product thinking, mobile UI/UX, AI-assisted development, local-first app logic, real estate workflow design, Android APK build, GitHub/Codespaces workflow and portfolio documentation.
```

---

## GitHub About Suggestion

**Description:**

```text
Android real estate intelligence app for Ninh Hòa, Khánh Hòa, featuring news timeline, land check, investment notebook and portfolio case study mode.
```

**Topics:**

```text
android
real-estate
investment
khanh-hoa
ninh-hoa
portfolio
webview
javascript
localstorage
vietnamese-app
product-thinking
ai-assisted-development
```

---

## Legal Disclaimer

Ninh Hòa Invest AI chỉ là công cụ hỗ trợ tham khảo và sàng lọc thông tin ban đầu. Người dùng cần kiểm tra pháp lý, quy hoạch, lộ giới, tranh chấp, thế chấp, chủ sở hữu và xác nhận tại cơ quan có thẩm quyền trước khi thực hiện bất kỳ giao dịch bất động sản nào.

---

## Author

**Vũ Hoàng**

Dự án được xây dựng từ nhu cầu thực tế của gia đình và phát triển thành portfolio project nhằm thể hiện năng lực xây sản phẩm bằng AI, tư duy sản phẩm, UI/UX mobile và quy trình triển khai Android APK.
