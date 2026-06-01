# Ninh Hòa Invest AI V33 — Android Real Estate Intelligence App

![Android](https://img.shields.io/badge/Android-WebView-3DDC84?logo=android&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-App%20Logic-F7DF1E?logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-Mobile%20UI-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-Responsive%20Design-1572B6?logo=css3&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-APK%20Build-02303A?logo=gradle&logoColor=white)
![Offline First](https://img.shields.io/badge/Mode-Offline--First-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Ninh Hòa Invest AI** là một Android portfolio app tập trung vào khu vực **Ninh Hòa, Khánh Hòa**, hỗ trợ người dùng theo dõi tin tức bất động sản, phân tích tín hiệu khu vực, kiểm tra sơ bộ lô đất và lưu sổ tay đầu tư cá nhân.

> Đây là dự án **portfolio / case study**. App chỉ hỗ trợ sàng lọc thông tin ban đầu, không thay thế cơ quan nhà nước, luật sư, chuyên gia quy hoạch, đơn vị thẩm định giá hoặc nguồn dữ liệu pháp lý chính thức.

---

## Preview / Ảnh demo

<p align="center">
  <img src="screenshots/home-portfolio.jpg" width="220" alt="Home Portfolio" />
  <img src="screenshots/news-timeline.jpg" width="220" alt="News Timeline" />
  <img src="screenshots/news-analysis.jpg" width="220" alt="News Analysis" />
</p>

<p align="center">
  <img src="screenshots/land-check.jpg" width="220" alt="Land Check" />
  <img src="screenshots/region-profile.jpg" width="220" alt="Region Profile" />
  <img src="screenshots/investment-notebook.jpg" width="220" alt="Investment Notebook" />
</p>

---

## Project Summary / Tóm tắt dự án

| Hạng mục | Nội dung |
|---|---|
| Tên dự án | Ninh Hòa Invest AI |
| Phiên bản | V33 — Public Portfolio Edition |
| Lĩnh vực | Real Estate Intelligence / PropertyTech |
| Khu vực tập trung | Ninh Hòa, Khánh Hòa |
| Người dùng mục tiêu | Người quan tâm BĐS địa phương, nhà đầu tư nhỏ, người dùng non-tech |
| Nền tảng | Android app |
| Cách lưu dữ liệu | LocalStorage / local demo data |
| Backend | Chưa có trong bản portfolio |
| API tin tức thật | Chưa tích hợp trong bản portfolio |
| Mục tiêu chính | Theo dõi tin, phân tích tín hiệu, lưu ghi chú đầu tư, hỗ trợ kiểm tra sơ bộ |

---

## Problem / Vấn đề

Người quan tâm bất động sản tại một khu vực địa phương như Ninh Hòa thường gặp các vấn đề:

- Tin tức hạ tầng, pháp lý, quy hoạch và thị trường nằm rải rác ở nhiều nguồn.
- Khó phân biệt tin mới, tin cũ, tin có tác động cao và tin chỉ mang tính tham khảo.
- Không có nơi lưu lại lô đất, khu vực, ghi chú, link Google Maps và trạng thái kiểm tra.
- Dễ bỏ sót các bước kiểm chứng như pháp lý, quy hoạch, giá/m², thanh khoản và rủi ro đặt cọc.
- Người dùng phổ thông cần giao diện tiếng Việt rõ ràng, ít thao tác, dễ dùng trên điện thoại.

---

## Solution / Giải pháp

Ninh Hòa Invest AI xây dựng một trải nghiệm **mobile-first** giúp người dùng:

- Theo dõi tin tức liên quan đến Ninh Hòa và khu vực lân cận.
- Phân loại tin theo độ mới, mức tác động và nhóm chủ đề.
- Tạo góc nhìn đầu tư sơ bộ từ tin tức và dữ liệu nhập tay.
- Lưu hồ sơ lô đất/khu vực quan tâm.
- Ghi chú pháp lý, vị trí, tọa độ, link bản đồ và việc cần kiểm tra tiếp.
- Nhắc người dùng xác minh thông tin chính thức trước khi ra quyết định.

---

## Key Features / Tính năng chính

### 1. Bảng tin Ninh Hòa

Theo dõi các tin liên quan đến:

- Ninh Hòa
- Vân Phong
- Hạ tầng
- Pháp lý
- Quy hoạch
- Thị trường
- Tin cần lưu ý

Bộ lọc mô phỏng:

- Mới nhất
- Tác động cao
- Cần lưu ý
- 24h / 7 ngày / 30 ngày / cũ hơn

---

### 2. News Timeline Intelligence

Mô phỏng logic phân tích tin tức theo dòng thời gian:

- Độ mới của tin
- Điểm tác động
- Chất lượng tin
- Khu vực liên quan
- Nguồn chính
- Góc nhìn nhiều nguồn
- Góc nhìn đầu tư
- Rủi ro cần kiểm chứng

---

### 3. News Impact Analysis

Mỗi tin có thể được phân tích theo các lớp:

- Tác động đến khu vực nào
- Tác động ngắn hạn hay dài hạn
- Mức độ cần theo dõi
- Rủi ro thông tin chưa xác minh
- Việc cần kiểm tra tiếp

---

### 4. Trợ lý thửa đất & tọa độ

Người dùng có thể nhập thông tin sơ bộ về lô đất:

- Số thửa
- Tờ bản đồ
- Diện tích
- Loại đất
- Ghi chú quy hoạch
- Tọa độ góc ranh nếu có
- Link Google Maps
- Trạng thái kiểm tra

Mục tiêu là tạo một bản ghi ban đầu trước khi đi xác minh thực tế.

---

### 5. Hồ sơ khu vực

Module khu vực giúp gom tín hiệu theo từng địa bàn hoặc nhóm quan tâm:

- Khu vực
- Tin liên quan
- Tín hiệu hạ tầng
- Pháp lý cần kiểm tra
- Điểm tác động cao nhất
- Ghi chú cá nhân

---

### 6. Sổ tay đầu tư cá nhân

Người dùng có thể lưu lại:

- Lô đất đang theo dõi
- Tin tức đã lưu
- Khu vực quan tâm
- Ghi chú pháp lý
- Checklist kiểm tra
- Việc cần làm tiếp theo

---

## Mobile-first Vietnamese UX

Ứng dụng được thiết kế cho người dùng Việt Nam, ưu tiên:

- Chữ lớn, dễ đọc
- Card rõ ràng
- Ít thao tác
- Điều hướng dưới màn hình
- Nút lớn, dễ bấm
- Ngôn ngữ tiếng Việt dễ hiểu
- Trải nghiệm giống app mobile thật, không phải website thu nhỏ

---

## Product Thinking Highlights

Dự án thể hiện các năng lực sản phẩm:

- Xác định một ngách rõ ràng: **bất động sản Ninh Hòa / Khánh Hòa**.
- Thiết kế app theo hành vi người dùng phổ thông.
- Biến tin tức rời rạc thành timeline và intelligence cards.
- Tách rõ vai trò app: hỗ trợ sàng lọc, không thay thế thẩm định.
- Tối ưu UI/UX theo hướng mobile-native.
- Có disclaimer để tránh định vị sai về pháp lý/đầu tư.
- Có thể trình bày như một case study trong CV và phỏng vấn.

---

## Tech Stack / Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| HTML | Cấu trúc giao diện |
| CSS | Thiết kế UI mobile-first |
| JavaScript | Logic tương tác và xử lý dữ liệu demo |
| Android WebView | Đóng gói trải nghiệm web thành app Android |
| Java | Lớp Android native/WebView wrapper |
| Gradle | Build Android APK |
| GitHub Actions | Workflow build/tự động hóa |
| LocalStorage | Lưu dữ liệu offline/demo trên thiết bị |
| GitHub Codespaces | Môi trường chỉnh sửa/build project |

---

## Project Structure / Cấu trúc thư mục

```text
NinhHoaInvestAI/
├── .github/
│   └── workflows/
├── app/
│   └── src/
├── screenshots/
│   ├── home-portfolio.jpg
│   ├── news-timeline.jpg
│   ├── news-analysis.jpg
│   ├── land-check.jpg
│   ├── region-profile.jpg
│   └── investment-notebook.jpg
├── README.md
├── UPDATE_COMMANDS_PHONE.txt
├── build.gradle
└── settings.gradle
```

---

## APK Demo

Bạn có thể tạo GitHub Release cho APK demo với thông tin đề xuất:

```text
Tag: v33.0.0
Title: Ninh Hòa Invest AI V33 — Android APK Demo
```

Release notes gợi ý:

```md
Android APK demo for Ninh Hòa Invest AI V33 — a real estate intelligence portfolio app focused on Ninh Hòa, Khánh Hòa.

Includes:
- News Timeline Intelligence
- News Impact Analysis
- Land Check workflow
- Parcel & Coordinate Assistant
- Investment Notebook
- Region Profile
- Mobile-first Vietnamese UI
- Android WebView build with Gradle
```

---

## Build APK

Nếu project dùng Gradle Android:

```bash
./gradlew assembleDebug
```

APK thường nằm tại:

```text
app/build/outputs/apk/debug/
```

Nếu build bằng GitHub Actions, kiểm tra workflow tại:

```text
.github/workflows/
```

---

## Legal Disclaimer / Lưu ý pháp lý

Ninh Hòa Invest AI chỉ là app hỗ trợ tham khảo và sàng lọc thông tin ban đầu.

Ứng dụng **không thay thế**:

- Cơ quan nhà nước
- Văn phòng đăng ký đất đai
- Luật sư
- Chuyên gia quy hoạch
- Đơn vị thẩm định giá
- Kiểm tra pháp lý trực tiếp
- Nguồn dữ liệu chính thức về quy hoạch/pháp lý

Người dùng cần xác minh thông tin từ nguồn chính thức trước khi mua bán, đặt cọc hoặc ra quyết định đầu tư.

---

## Current Limitations / Giới hạn hiện tại

Phiên bản portfolio hiện tại có giới hạn:

- Dữ liệu demo/mô phỏng.
- Chưa tích hợp API tin tức thật.
- Chưa có backend/cloud database.
- Chưa có đăng nhập tài khoản.
- Chưa thay thế được tra cứu pháp lý chính thức.
- Chưa có bản đồ quy hoạch chính thức.
- Chưa có hệ thống xác minh nguồn dữ liệu tự động.

---

## Roadmap / Hướng phát triển

### Public Portfolio Edition

- [x] README có ảnh demo.
- [x] GitHub About + Topics.
- [x] Legal disclaimer rõ ràng.
- [x] CV snippet.
- [ ] GitHub Release APK.
- [ ] Demo video/GIF ngắn.
- [ ] Bổ sung thêm ảnh walkthrough.

### Future Commercial Direction

- [ ] Tích hợp nguồn tin chính thống.
- [ ] Thêm quản lý lô đất nâng cao.
- [ ] Đồng bộ cloud.
- [ ] Bản đồ/checklist vị trí.
- [ ] AI tóm tắt tin tức thật.
- [ ] Hệ thống cảnh báo theo khu vực.
- [ ] Gói Free/Pro cho người dùng quan tâm BĐS địa phương.
- [ ] Tài khoản người dùng và backup dữ liệu.

---

## Portfolio Value

This project demonstrates:

- Product thinking for a real local real estate use case.
- Mobile-first Vietnamese UX for non-technical users.
- Local-first app logic using WebView and LocalStorage.
- Real estate workflow design: news tracking, land check, region profile and investment notes.
- Android APK build workflow with Gradle and GitHub Actions.
- Clear legal/decision-making boundaries through disclaimers.
- Ability to turn a local business/investment idea into a structured Android portfolio project.

---

## CV Description

```text
Ninh Hòa Invest AI — Android Real Estate Intelligence App

Built an Android portfolio app focused on Ninh Hòa, Khánh Hòa, helping users track real estate news, classify market signals, store investment notes, and perform preliminary land parcel checks.

Designed mobile-first Vietnamese UX for non-technical users, with modules for news timeline intelligence, impact analysis, land scoring, investment notebook, legal checklist, and APK build workflow.

Tech stack: HTML, CSS, JavaScript, Android WebView, Java, Gradle, GitHub Actions, LocalStorage.
```

Short CV bullet:

```text
Built Ninh Hòa Invest AI, an Android real estate intelligence portfolio app focused on Ninh Hòa, Khánh Hòa, featuring local news timeline, investment signal analysis, preliminary land-check workflows, parcel notes, investment notebook, LocalStorage persistence, and Android APK build workflow with Gradle.
```

---

## GitHub About Suggestion

**Description**

```text
Android real estate intelligence portfolio app for tracking news, land notes, and investment signals in Ninh Hòa, Khánh Hòa.
```

**Topics**

```text
real-estate
property-tech
android
webview
javascript
html
css
gradle
localstorage
portfolio
vietnamese-app
khanh-hoa
ninh-hoa
ai-product
```

---

## Author

**Vũ Hoàng**  
AI Solutions Builder / Android App Portfolio

GitHub: [Megatavn](https://github.com/Megatavn)

---

## License

This project is released under the MIT License.
