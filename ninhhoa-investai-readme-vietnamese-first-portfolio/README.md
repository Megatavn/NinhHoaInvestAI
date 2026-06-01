# Ninh Hòa Invest AI V33 — Public Portfolio Edition

![Android](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android&logoColor=white)
![WebView](https://img.shields.io/badge/Android-WebView-4285F4?logo=googlechrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/Logic-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-green)
![Gradle](https://img.shields.io/badge/Build-Gradle-02303A?logo=gradle&logoColor=white)
![Portfolio](https://img.shields.io/badge/Type-Portfolio--Case--Study-blue)
![Language](https://img.shields.io/badge/README-Vietnamese--First-orange)

<p align="center">
  <img src="screenshots/home-portfolio.jpg" width="180" alt="Ninh Hòa Invest AI Home" />
  <img src="screenshots/news-timeline.jpg" width="180" alt="News Timeline" />
  <img src="screenshots/news-analysis.jpg" width="180" alt="News Analysis" />
  <img src="screenshots/land-check.jpg" width="180" alt="Land Check Assistant" />
</p>

## VN — Giới thiệu nhanh

**Ninh Hòa Invest AI** là một app Android dạng portfolio/case study tập trung vào khu vực **Ninh Hòa, Khánh Hòa**.  
Ứng dụng hỗ trợ người dùng theo dõi tin tức bất động sản, phân tích tín hiệu đầu tư, ghi chú lô đất, lưu hồ sơ khu vực và tạo sổ tay đầu tư cá nhân ngay trên điện thoại.

Dự án được thiết kế theo hướng **mobile-first, tiếng Việt-first, dễ dùng cho người non-tech**, đồng thời đủ chuyên nghiệp để trình bày trên **GitHub, CV, LinkedIn và phỏng vấn việc làm**.

> Đây là dự án portfolio/case study. App chỉ hỗ trợ sàng lọc thông tin ban đầu, không thay thế cơ quan nhà nước, luật sư, chuyên gia quy hoạch hoặc đơn vị thẩm định bất động sản.

## EN — Portfolio Summary

**Ninh Hòa Invest AI** is an Android real estate intelligence portfolio app focused on **Ninh Hòa, Khánh Hòa, Vietnam**.

It demonstrates mobile-first product thinking for a local real estate use case, featuring news timeline tracking, investment signal analysis, preliminary land-check workflows, region profiles, investment notes, LocalStorage persistence, and Android APK build workflow with Gradle.

---

## Project Summary / Tóm tắt dự án

| Hạng mục | Nội dung |
|---|---|
| Tên dự án | Ninh Hòa Invest AI |
| Phiên bản | V33 — Public Portfolio Edition |
| Lĩnh vực | Real Estate Intelligence / PropertyTech |
| Khu vực tập trung | Ninh Hòa, Khánh Hòa |
| Người dùng mục tiêu | Nhà đầu tư nhỏ lẻ, môi giới, người mới tìm hiểu BĐS địa phương |
| Trạng thái | Portfolio MVP / Android demo |
| Ngôn ngữ sản phẩm | Tiếng Việt-first |
| Ngôn ngữ README | Tiếng Việt-first + tiếng Anh chuyên nghiệp cho GitHub/CV |

---

## Problem / Bài toán

Người quan tâm bất động sản tại Ninh Hòa thường gặp các vấn đề:

- Tin tức hạ tầng, quy hoạch, pháp lý và thị trường nằm rải rác ở nhiều nguồn.
- Khó phân biệt tin mới, tin cũ, tin có tác động cao và tin chỉ mang tính tham khảo.
- Không có nơi lưu lại lô đất, ghi chú, link Google Maps, tin liên quan và trạng thái kiểm tra.
- Dễ bỏ sót các bước kiểm chứng như pháp lý, quy hoạch, giá/m², thanh khoản và rủi ro đặt cọc.
- Người dùng phổ thông cần giao diện rõ ràng, ít thao tác và dễ hiểu bằng tiếng Việt.

---

## Solution / Giải pháp

Ninh Hòa Invest AI xây dựng một app Android tập trung vào **Real Estate Intelligence** cho khu vực Ninh Hòa.

Ứng dụng đóng vai trò như một lớp hỗ trợ ban đầu:

- Gom và tổ chức tin tức liên quan đến Ninh Hòa/Khu vực lân cận.
- Phân loại mức độ tác động của tin theo logic sản phẩm.
- Gợi ý góc nhìn đầu tư sơ bộ.
- Lưu hồ sơ khu vực/lô đất.
- Nhắc người dùng kiểm chứng rủi ro trước khi ra quyết định.

---

## Key Features / Tính năng chính

### 1. Bảng tin Ninh Hòa

Theo dõi các tin liên quan đến Ninh Hòa, Vân Phong, pháp lý, hạ tầng, quy hoạch và thị trường.

Bộ lọc mô phỏng:

- Mới nhất.
- Tác động cao.
- Cần lưu ý.
- Tin Ninh Hòa.
- 24h / 7 ngày / 30 ngày / cũ hơn.

### 2. News Timeline Intelligence

Mô phỏng logic phân tích tin theo dòng thời gian:

- Độ mới của tin.
- Điểm tác động.
- Chất lượng tin.
- Khu vực liên quan.
- Nguồn chính.
- Góc nhìn nhiều nguồn.
- Góc nhìn đầu tư.
- Rủi ro cần kiểm chứng.

### 3. Trợ lý thửa đất & tọa độ

Module hỗ trợ người dùng nhập thông tin cơ bản về lô đất:

- Số thửa.
- Tờ bản đồ.
- Diện tích.
- Loại đất.
- Ghi chú quy hoạch.
- Tọa độ góc ranh nếu có.
- Link Google Maps.

Mục tiêu là tạo bản ghi sơ bộ trước khi kiểm tra thực tế.

### 4. Hồ sơ khu vực

Module giúp gom tín hiệu theo từng địa bàn, ví dụ:

- Ninh Diêm.
- Vân Phong.
- Khu công nghiệp.
- Pháp lý.
- Tin liên quan.
- Điểm tác động cao nhất.

### 5. Sổ tay đầu tư cá nhân

Người dùng có thể lưu lại:

- Lô đất đang theo dõi.
- Tin tức đã lưu.
- Khu vực quan tâm.
- Ghi chú pháp lý/cá nhân.
- Việc cần kiểm tra tiếp.

### 6. Mobile-first Vietnamese UX

Ứng dụng ưu tiên trải nghiệm mobile thật:

- Chữ lớn, dễ đọc.
- Card rõ ràng.
- Ít thao tác.
- Điều hướng dưới màn hình.
- Nút lớn, dễ bấm.
- Giao diện giống app mobile, không phải website thu nhỏ.

---

## Screenshots / Ảnh demo

### Trang chủ / Portfolio Hero

![Home Portfolio](screenshots/home-portfolio.jpg)

### Bảng tin Ninh Hòa

![News Timeline](screenshots/news-timeline.jpg)

### Phân tích tin theo dòng thời gian

![News Analysis](screenshots/news-analysis.jpg)

### Trợ lý thửa đất & tọa độ

![Land Check](screenshots/land-check.jpg)

### Hồ sơ khu vực

![Region Profile](screenshots/region-profile.jpg)

### Sổ tay đầu tư cá nhân

![Investment Notebook](screenshots/investment-notebook.jpg)

---

## Product Thinking Highlights

Dự án thể hiện các năng lực sản phẩm:

- Xác định một ngách rõ ràng: bất động sản Ninh Hòa/Khánh Hòa.
- Thiết kế app theo hành vi người dùng phổ thông.
- Biến tin tức rời rạc thành timeline/intelligence cards.
- Tách rõ vai trò của app: hỗ trợ sàng lọc, không thay thế thẩm định.
- Tối ưu UI/UX theo hướng mobile-native.
- Xây dựng case study có thể trình bày trong CV/phỏng vấn.

---

## Tech Stack / Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| HTML | Cấu trúc giao diện |
| CSS | Thiết kế UI mobile-first |
| JavaScript | Logic tương tác và xử lý dữ liệu |
| Android WebView | Đóng gói thành app Android |
| Gradle | Build Android APK |
| GitHub Actions | Hỗ trợ build workflow |
| LocalStorage | Lưu dữ liệu offline/demo |
| GitHub Codespaces | Môi trường chỉnh sửa và build project |

---

## Project Structure / Cấu trúc thư mục

```text
NinhHoaInvestAI/
├── .github/workflows/      # GitHub Actions workflow
├── app/                    # Android app source
├── screenshots/            # Demo screenshots for README
├── README.md               # Project documentation
├── build.gradle            # Gradle build config
└── settings.gradle         # Gradle settings
```

---

## APK Demo

Gợi ý tạo GitHub Release cho APK demo:

```text
Tag: v33.0.0
Title: Ninh Hòa Invest AI V33 — Android APK Demo
```

Release notes đề xuất:

```text
Android APK demo for Ninh Hòa Invest AI V33 — a real estate intelligence portfolio app focused on Ninh Hòa, Khánh Hòa.

Includes:
- News Timeline Intelligence
- News Impact Analysis
- Land Check workflow
- Region Profile
- Investment Notebook
- Mobile-first Vietnamese UI
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

Nếu build bằng GitHub Actions, kiểm tra workflow trong:

```text
.github/workflows/
```

---

## Current Limitations / Giới hạn hiện tại

Phiên bản portfolio hiện tại có giới hạn:

- Dữ liệu demo/mô phỏng.
- Chưa tích hợp API tin tức thật.
- Chưa có backend/cloud database.
- Chưa có đăng nhập tài khoản.
- Chưa thay thế được tra cứu pháp lý chính thức.
- Chưa có bản đồ quy hoạch chính thức.

---

## Roadmap / Hướng phát triển

### Public Portfolio Edition

- [x] README có ảnh demo.
- [x] GitHub About + Topics.
- [x] CV snippet.
- [x] Legal disclaimer rõ ràng.
- [ ] GitHub Release APK.
- [ ] Demo video ngắn.

### Future Commercial Direction

- [ ] Tích hợp nguồn tin chính thống.
- [ ] Thêm quản lý lô đất nâng cao.
- [ ] Đồng bộ cloud.
- [ ] Bản đồ/checklist vị trí.
- [ ] AI tóm tắt tin tức thật.
- [ ] Hệ thống cảnh báo theo khu vực.
- [ ] Gói Free/Pro cho người dùng quan tâm BĐS địa phương.

---

## Portfolio Value

This project demonstrates:

- Product thinking for a real local real estate use case.
- Mobile-first Vietnamese UX for non-technical users.
- Local-first app logic using WebView and LocalStorage.
- Real estate workflow design: news tracking, land check, investment notes.
- Android APK build workflow with Gradle and GitHub Actions.
- Clear legal/decision-making boundaries through disclaimers.

---

## CV Description

```text
Built Ninh Hòa Invest AI, an Android real estate intelligence portfolio app focused on Ninh Hòa, Khánh Hòa, featuring local news timeline, investment signal analysis, preliminary land-check workflows, region profiles, investment notebook, LocalStorage persistence, and Android APK build workflow with Gradle.
```

Optional extended version:

```text
Designed a mobile-first Vietnamese real estate intelligence app for non-technical users, with modules for news timeline tracking, investment signal analysis, land-check workflow, region profiles, investment notebook, legal checklist and Android APK build pipeline.
```

---

## GitHub About Suggestion

Description:

```text
Android real estate intelligence portfolio app for Ninh Hòa, Khánh Hòa, featuring news tracking, investment signal analysis, land notes and local-first mobile UX.
```

Topics:

```text
real-estate
android
portfolio
webview
javascript
property-tech
vietnamese-app
localstorage
khanh-hoa
ninh-hoa
investment-analysis
```

---

## Legal Disclaimer / Cảnh báo pháp lý

Ninh Hòa Invest AI chỉ là app hỗ trợ tham khảo và sàng lọc thông tin ban đầu.

Ứng dụng không thay thế:

- Cơ quan nhà nước.
- Văn phòng đăng ký đất đai.
- Luật sư.
- Chuyên gia quy hoạch.
- Đơn vị thẩm định giá.
- Kiểm tra pháp lý trực tiếp.

Người dùng cần xác minh thông tin từ nguồn chính thức trước khi mua bán, đặt cọc hoặc ra quyết định đầu tư.

---

## Author

**Vũ Hoàng**  
AI Solutions Builder / Android App Portfolio

GitHub: [Megatavn](https://github.com/Megatavn)

---

## License

This project is released under the MIT License.
