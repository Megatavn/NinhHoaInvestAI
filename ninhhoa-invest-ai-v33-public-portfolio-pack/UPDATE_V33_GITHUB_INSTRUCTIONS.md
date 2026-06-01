# Cách cập nhật Ninh Hòa Invest AI V33 lên GitHub bằng Codespace

Upload file ZIP này vào Codespace của repo `NinhHoaInvestAI`, sau đó chạy:

```bash
cd /workspaces/NinhHoaInvestAI
unzip ninhhoa-invest-ai-v33-public-portfolio-pack.zip
cp -r ninhhoa-invest-ai-v33-public-portfolio-pack/screenshots ./
cp ninhhoa-invest-ai-v33-public-portfolio-pack/README.md README.md
git add README.md screenshots
git commit -m "Update V33 public portfolio README and screenshots"
git push origin main
```

Nếu thư mục workspace tên khác, chạy:

```bash
pwd
```

để xem đúng đường dẫn hiện tại.

## Việc nên làm sau khi push

1. Vào GitHub repo.
2. Sửa About theo file `GITHUB_ABOUT_RELEASE.md`.
3. Thêm topics.
4. Tạo Release APK nếu đã có file APK.
5. Pin repo này ở vị trí thứ 2 sau LeadFlow AI.
