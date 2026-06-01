# Quick Update Repo

Dùng các lệnh này để cập nhật README mới vào repo `NinhHoaInvestAI`.

```bash
cd /workspaces/NinhHoaInvestAI

unzip -o ninhhoa-investai-vietnamese-first-readme.zip

cp ninhhoa-investai-vietnamese-first-readme/README.md ./README.md

rm -rf ninhhoa-investai-vietnamese-first-readme
rm -f ninhhoa-investai-vietnamese-first-readme.zip

git add README.md
git commit -m "docs: apply Vietnamese-first professional README"
git push origin main
```

Sau khi push xong, refresh GitHub.

## Checklist sau khi cập nhật

- README có badge ở đầu.
- README có tóm tắt tiếng Việt và tiếng Anh.
- Tech Stack render thành bảng.
- Screenshots vẫn hiển thị đúng.
- CV Description nằm gần cuối README.
- Legal Disclaimer rõ ràng.
