NINH HÒA INVEST AI - ANDROID STUDIO REAL BUILD
Tác giả trong app: Vũ Hoàng

Vì môi trường ChatGPT hiện không có Android SDK/Gradle đầy đủ nên những APK tạo thủ công có thể không cài được trên máy thật.
Project này là project Android Studio chuẩn để build ra APK cài được.

CÁCH BUILD APK:
1. Giải nén file ZIP này.
2. Mở Android Studio.
3. Chọn Open -> chọn thư mục NinhHoaInvestAI_AndroidStudio_REAL_BUILD.
4. Đợi Gradle Sync hoàn tất. Máy cần có internet để Android Studio tải Android Gradle Plugin nếu chưa có.
5. Chọn Build -> Build Bundle(s) / APK(s) -> Build APK(s).
6. File APK nằm tại:
   app/build/outputs/apk/debug/app-debug.apk
7. Chép app-debug.apk sang điện thoại và cài.

NẾU MUỐN APK RELEASE:
1. Android Studio -> Build -> Generate Signed Bundle / APK.
2. Chọn APK.
3. Tạo keystore mới.
4. Build release APK.

THÔNG SỐ PROJECT:
- applicationId: com.vuhoang.ninhhoainvestai
- minSdk: 23
- targetSdk: 35
- compileSdk: 35
- Công nghệ: Native Android Java + WebView asset.
- Dữ liệu live: nằm trong app.html, có chức năng mở nguồn và refresh.

LƯU Ý:
Nếu Android Studio báo thiếu SDK 35, chọn Install missing SDK trong hộp thoại của Android Studio.
