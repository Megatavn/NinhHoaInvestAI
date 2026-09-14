package com.vuhoang.ninhhoainvestai;

import android.app.Activity;
import android.os.Bundle;
import android.graphics.Color;
import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;


import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final int REQ_FILE_CHOOSER = 601;
    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;

    public class AndroidBridge {
        @JavascriptInterface
        public void openExternal(String url) {
            try {
                String safeUrl = normalizeOpenUrl(url);
                if (!isSafeExternalUrl(safeUrl)) throw new IllegalArgumentException("Chỉ mở liên kết HTTPS hợp lệ");
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(safeUrl));
                startActivity(intent);
            } catch (Exception e) {
                Toast.makeText(MainActivity.this, "Không mở được liên kết", Toast.LENGTH_SHORT).show();
            }
        }

        @JavascriptInterface
        public void toast(String message) {
            Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void scanCertificateText() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    // V25.2: tắt OCR native để build ổn định.
                    // Ảnh vẫn được chọn/xem trước qua input trong WebView; người dùng nhập hoặc dán nội dung sổ để app bóc thông tin.
                    sendOcrResult("__ERROR__OCR native tạm tắt để bản APK build ổn định. Hãy chọn ảnh xem trước và nhập/dán thông tin sổ vào ô chữ.");
                }
            });
        }

        @JavascriptInterface
        public void fetchUrl(final String requestId, final String url) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    String payload;
                    try {
                        payload = httpGet(url);
                    } catch (Exception e) {
                        payload = "__ERROR__" + e.getMessage();
                    }
                    final String script = "window.__nativeFetchDone && window.__nativeFetchDone(" + quote(requestId) + "," + quote(payload) + ")";
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            webView.evaluateJavascript(script, null);
                        }
                    });
                }
            }).start();
        }

        /** Safe fetch used by the client-only Intelligence module. */
        @JavascriptInterface
        public void fetchUrlSafe(final String requestId, final String url) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    String payload;
                    try {
                        payload = safeHttpGet(url);
                    } catch (Exception e) {
                        payload = "__ERROR__" + e.getMessage();
                    }
                    final String script = "window.__intelFetchDone && window.__intelFetchDone(" + quote(requestId) + "," + quote(payload) + ")";
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            if (webView != null) webView.evaluateJavascript(script, null);
                        }
                    });
                }
            }).start();
        }
    }

    private void sendOcrResult(final String text) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (webView != null) {
                    webView.evaluateJavascript("window.__certificateOcrDone && window.__certificateOcrDone(" + quote(text) + ")", null);
                }
            }
        });
    }

    private String normalizeOpenUrl(String url) {
        if (url == null || url.trim().isEmpty()) return "https://news.google.com/search?q=Ninh%20Hoa%20Khanh%20Hoa&hl=vi&gl=VN&ceid=VN:vi";
        String u = url.trim();
        if (u.contains("news.google.com/rss/search")) {
            return u.replace("/rss/search", "/search");
        }
        if (u.contains("congbao.chinhphu.vn/rss")) {
            return "https://congbao.chinhphu.vn/";
        }
        if ((u.contains("/rss/") || u.endsWith(".rss")) && !u.contains("news.google.com")) {
            try {
                Uri uri = Uri.parse(u);
                if (uri.getScheme() != null && uri.getHost() != null) {
                    return uri.getScheme() + "://" + uri.getHost() + "/";
                }
            } catch (Exception ignored) {}
        }
        return u;
    }

    private boolean isSafeExternalUrl(String urlText) {
        try {
            URI uri = new URI(urlText);
            if (!"https".equalsIgnoreCase(uri.getScheme())) return false;
            if (uri.getHost() == null || uri.getHost().trim().isEmpty()) return false;
            if (uri.getUserInfo() != null) return false;
            String host = uri.getHost().toLowerCase(Locale.US);
            if (host.contains("..") || "localhost".equals(host) || host.endsWith(".local")) return false;
            if (host.matches("\\d{1,3}(?:\\.\\d{1,3}){3}") || host.startsWith("[")) return false;
            return uri.getPort() == -1 || uri.getPort() == 443;
        } catch (Exception ignored) {
            return false;
        }
    }

    private String httpGet(String urlText) throws Exception {
        URL url = new URL(urlText);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setInstanceFollowRedirects(true);
        conn.setConnectTimeout(12000);
        conn.setReadTimeout(15000);
        conn.setRequestMethod("GET");
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android) NinhHoaInvestAI/27");
        conn.setRequestProperty("Accept", "application/json, text/plain, application/rss+xml, application/xml, text/xml, text/html, */*");
        conn.setRequestProperty("Accept-Language", "vi-VN,vi;q=0.9,en;q=0.7");
        int code = conn.getResponseCode();
        InputStream is = code >= 400 ? conn.getErrorStream() : conn.getInputStream();
        if (is == null) throw new Exception("HTTP " + code);
        BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        char[] buf = new char[4096];
        int n;
        while ((n = reader.read(buf)) != -1) sb.append(buf, 0, n);
        reader.close();
        conn.disconnect();
        if (code >= 400) throw new Exception("HTTP " + code);
        return sb.toString();
    }

    private boolean isSafeFetchUrl(String urlText) {
        try {
            if (!isSafeExternalUrl(urlText)) return false;
            URL url = new URL(urlText);
            String host = url.getHost().toLowerCase(Locale.US);
            String[] allowed = new String[]{
                    "news.google.com",
                    "batdongsan.com.vn",
                    "bds68.com.vn",
                    "nhatot.com",
                    "chotot.com",
                    "bqlkktkcn.khanhhoa.gov.vn",
                    "vanphong.khanhhoa.gov.vn",
                    "khanhhoa.gov.vn",
                    "www.khanhhoa.gov.vn",
                    "baochinhphu.vn",
                    "taynhatrang.khanhhoa.gov.vn",
                    "congbaokhanhhoa.gov.vn",
                    "vanban.chinhphu.vn",
                    "vbpl.vn"
            };
            for (String domain : allowed) {
                if (host.equals(domain) || host.endsWith("." + domain)) return true;
            }
        } catch (Exception ignored) {
            // The caller receives a safe, user-visible source error.
        }
        return false;
    }

    private String safeHttpGet(String urlText) throws Exception {
        return safeHttpGet(urlText, 0);
    }

    private String safeHttpGet(String urlText, int redirectCount) throws Exception {
        if (!isSafeFetchUrl(urlText)) throw new Exception("Nguồn không nằm trong allowlist HTTPS");
        HttpURLConnection conn = null;
        InputStream is = null;
        try {
            URL url = new URL(urlText);
            conn = (HttpURLConnection) url.openConnection();
            conn.setInstanceFollowRedirects(false);
            conn.setConnectTimeout(12000);
            conn.setReadTimeout(15000);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("User-Agent", "NinhHoaInvestAI/34.1 Intelligence");
            conn.setRequestProperty("Accept", "application/rss+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.1");
            conn.setRequestProperty("Accept-Language", "vi-VN,vi;q=0.9,en;q=0.7");
            int code = conn.getResponseCode();
            if (code >= 300 && code < 400) {
                if (redirectCount >= 2) throw new Exception("Nguồn chuyển hướng quá số lần cho phép");
                String location = conn.getHeaderField("Location");
                if (location == null || !isSafeFetchUrl(location)) throw new Exception("Nguồn chuyển hướng ra ngoài allowlist");
                return safeHttpGet(location, redirectCount + 1);
            }
            is = code >= 400 ? conn.getErrorStream() : conn.getInputStream();
            if (is == null) throw new Exception("HTTP " + code);
            String length = conn.getHeaderField("Content-Length");
            if (length != null) {
                try {
                    if (Long.parseLong(length) > 1024L * 1024L) throw new Exception("Nội dung nguồn vượt giới hạn 1 MB");
                } catch (NumberFormatException ignored) {
                    // Stream limit below still applies.
                }
            }
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int n;
            int total = 0;
            while ((n = is.read(buf)) != -1) {
                total += n;
                if (total > 1024 * 1024) throw new Exception("Nội dung nguồn vượt giới hạn 1 MB");
                out.write(buf, 0, n);
            }
            if (code >= 400) throw new Exception("HTTP " + code);
            return new String(out.toByteArray(), StandardCharsets.UTF_8);
        } finally {
            if (is != null) try { is.close(); } catch (Exception ignored) {}
            if (conn != null) conn.disconnect();
        }
    }

    private String quote(String s) {
        if (s == null) return "null";
        StringBuilder out = new StringBuilder("\"");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '\\': out.append("\\\\"); break;
                case '"': out.append("\\\""); break;
                case '\n': out.append("\\n"); break;
                case '\r': out.append("\\r"); break;
                case '\t': out.append("\\t"); break;
                default:
                    if (c < 32) out.append(String.format("\\u%04x", (int)c));
                    else out.append(c);
            }
        }
        out.append("\"");
        return out.toString();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.parseColor("#061B2C"));
        getWindow().setNavigationBarColor(Color.parseColor("#061B2C"));

        webView = new WebView(this);
        webView.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setGeolocationEnabled(false);
        settings.setDatabaseEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setUserAgentString(settings.getUserAgentString() + " NinhHoaInvestAI/27-NoAPI");
        webView.addJavascriptInterface(new AndroidBridge(), "Android");
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                if (MainActivity.this.filePathCallback != null) {
                    MainActivity.this.filePathCallback.onReceiveValue(null);
                }
                MainActivity.this.filePathCallback = filePathCallback;
                try {
                    Intent intent = fileChooserParams.createIntent();
                    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivityForResult(intent, REQ_FILE_CHOOSER);
                    return true;
                } catch (Exception e) {
                    MainActivity.this.filePathCallback = null;
                    Toast.makeText(MainActivity.this, "Không mở được bộ chọn tệp", Toast.LENGTH_SHORT).show();
                    return false;
                }
            }
        });
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (!request.isForMainFrame()) return false;
                if (url.startsWith("file:///android_asset/") || url.startsWith("about:")) return false;
                try {
                    String safeUrl = normalizeOpenUrl(url);
                    if (!isSafeExternalUrl(safeUrl)) return true;
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(safeUrl));
                    startActivity(intent);
                    return true;
                } catch (Exception e) {
                    return false;
                }
            }
        });
        webView.loadUrl("file:///android_asset/app.html");
        setContentView(webView);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQ_FILE_CHOOSER) {
            if (filePathCallback != null) {
                Uri[] results = null;
                if (resultCode == RESULT_OK && data != null) {
                    if (data.getClipData() != null) {
                        int count = data.getClipData().getItemCount();
                        results = new Uri[count];
                        for (int i = 0; i < count; i++) results[i] = data.getClipData().getItemAt(i).getUri();
                    } else if (data.getData() != null) {
                        results = new Uri[]{data.getData()};
                    }
                }
                filePathCallback.onReceiveValue(results);
                filePathCallback = null;
            }
            return;
        }
    }

    @Override
    public void onBackPressed() {
        webView.evaluateJavascript("window.__appBack && window.__appBack()", null);
    }
}
