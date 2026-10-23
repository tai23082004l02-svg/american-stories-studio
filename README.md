# American Stories Studio

Research, scripts, visuals, and video production for a US-focused YouTube channel.

Dự án sản xuất nội dung riêng, độc lập với Down Arena. Trao đổi và bàn giao bằng tiếng Việt; nội dung xuất bản dùng tiếng Anh tự nhiên cho khán giả Mỹ.

## Bắt đầu
1. Đọc [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) và [bàn giao hiện hành](docs/NEXT_CHAT_HANDOFF.md).
2. Xem [định hướng](docs/CONTENT_STRATEGY.md) và [quy trình sản xuất](docs/PRODUCTION_WORKFLOW.md).
3. Sao chép [mẫu hồ sơ tập](templates/EPISODE_BRIEF.md) vào thư mục episodes/NNN-topic-slug/.
4. Theo dõi kết quả trong [bảng Analytics](analytics/video-performance.csv).

## Phân công
- Trợ lý: nghiên cứu, kịch bản, kế hoạch hình ảnh, thumbnail, dựng và xuất video khi môi trường có công cụ phù hợp; báo rõ phần chưa thực hiện hoặc chưa kiểm chứng.
- Người dùng: giọng đọc và âm thanh; duyệt bản hoàn chỉnh và quyết định xuất bản.
- Chưa kết nối quyền đăng video hoặc điều khiển OBS cho dự án này. Không coi Windsor Analytics là quyền xuất bản.

## Cấu trúc
- docs/: định hướng, quy trình và trạng thái hiện hành.
- templates/: mẫu sản xuất và ghi nguồn.
- episodes/: hồ sơ từng tập; chưa có tập bắt đầu.
- analytics/: số liệu sau khi xuất bản.
- work/ và output/: tài nguyên tạm và bản render local, không đưa vào Git.

Repo Public: chỉ đưa lên tài nguyên có quyền công khai. Không lưu token, mật khẩu, khóa luồng hoặc tài nguyên bên thứ ba chưa được phép phân phối lại. Chưa cấp giấy phép tái sử dụng chung cho mã và nội dung.

## Phòng dựng video v0.1

Mở `editor/` để dựng cảnh từ ảnh, video tư liệu và giọng đọc. Có timeline, điểm cắt, mẫu chữ, chuyển động phóng/thu, phụ đề SRT, undo/redo và sao lưu chứa media.
Xuất WebM trong trình duyệt; MP4 dùng Playwright + FFmpeg cục bộ. [Hướng dẫn](docs/EDITOR.md).
Bản sửa lưu trên trình duyệt, chưa tự đồng bộ GitHub. Công cụ riêng, không thay đổi Credit_Studio.



Bản dùng thử đã triển khai riêng tư qua Sites. Thông tin truy cập được bàn giao trực tiếp, không lưu trong repo công khai.
