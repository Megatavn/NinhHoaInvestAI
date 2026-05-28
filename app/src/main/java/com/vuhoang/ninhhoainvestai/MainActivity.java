package com.vuhoang.ninhhoainvestai;

import android.Manifest;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.graphics.Color;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.view.ViewGroup;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class MainActivity extends Activity {
    private WebView webView;

    public class AndroidBridge {
        @JavascriptInterface
        public void openExternal(String url) {
            try {
                String safeUrl = normalizeOpenUrl(url);
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

    private String httpGet(String urlText) throws Exception {
        URL url = new URL(urlText);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setInstanceFollowRedirects(true);
        conn.setConnectTimeout(12000);
        conn.setReadTimeout(15000);
        conn.setRequestMethod("GET");
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android) NinhHoaInvestAI/14.0");
        conn.setRequestProperty("Accept", "application/rss+xml, application/xml, text/xml, text/html, */*");
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
        settings.setGeolocationEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setUserAgentString(settings.getUserAgentString() + " NinhHoaInvestAI/14.0-NoAPI");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, 12);
            }
        }

        webView.addJavascriptInterface(new AndroidBridge(), "Android");
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }
        });
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (!request.isForMainFrame()) return false;
                if (url.startsWith("file:///android_asset/") || url.startsWith("about:")) return false;
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(normalizeOpenUrl(url)));
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
    public void onBackPressed() {
        webView.evaluateJavascript("window.__appBack && window.__appBack()", null);
    }
}
