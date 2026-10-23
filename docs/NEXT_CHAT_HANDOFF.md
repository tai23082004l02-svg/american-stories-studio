# Trạng thái hiện hành — 23/10/2026

## Đã chốt
- Repo: tai23082004l02-svg/american-stories-studio, Public, nhánh main.
- Mục tiêu: nội dung tiếng Anh cho khán giả Mỹ; phát triển giờ xem và người đăng ký, hướng tới kiếm tiền.
- Người dùng lo âm thanh; trợ lý phụ trách nghiên cứu, kịch bản, hình ảnh và hỗ trợ dựng.
- Trao đổi bằng tiếng Việt. Tên repo là tên làm việc, chưa phải tên thương hiệu kênh.
- Phong cách hình ảnh đã chốt: phim tài liệu giải thích hiện đại, tư liệu thật kết hợp đồ họa chuyển động đơn giản và minh họa 2D. Chi tiết: [VISUAL_STYLE.md](VISUAL_STYLE.md).
- Đã thiết lập tài liệu, mẫu hồ sơ tập, mẫu ghi nguồn và bảng theo dõi Analytics.
- Dự án này độc lập với Down Arena; không sửa cấu hình game/OBS khi chỉ làm nội dung tại đây.

## Đề xuất đang chờ chốt
- Video giải thích có cốt truyện về công nghệ, phát minh, sản phẩm và đời sống Mỹ.
- Thử 3 video dài 6–9 phút; chỉ mở rộng sau khi có số liệu.
- Chưa chọn chủ đề tập đầu; các ví dụ trong chiến lược chỉ là ý tưởng, chưa nghiên cứu.
- Chưa chọn giọng thật hay giọng tổng hợp; chưa nhận audio.
- Chưa xác nhận tên kênh/logo và việc dùng kênh The Signal Daily cho hướng này.
- Chưa có video, hình ảnh, nhạc hoặc bản render được sản xuất trong repo.

## Khả năng và giới hạn
- GitHub dùng lưu tài liệu, mã và tài nguyên nhỏ được phép công khai.
- Quyền GitHub không đồng nghĩa quyền YouTube. Chưa xây cầu nối điều khiển Studio/OBS.
- Windsor.ai YT đã từng đọc được kênh The Signal Daily, nhưng dữ liệu buổi live 22/10 chưa trả về qua connector; không coi dữ liệu thiếu là 0.
- Công cụ dựng, nguồn tư liệu, quyền sử dụng và chất lượng render phải kiểm tra thực tế trước khi hứa giao video hoàn chỉnh.
- Không hứa số lượt xem, RPM hoặc được duyệt kiếm tiền.

## Phòng dựng riêng — v0.1
- Người dùng đã chọn xây công cụ riêng trong repo này, tham khảo Credit_Studio; không sửa repo Credit_Studio.
- `editor/`: giao diện tiếng Việt; nhập ảnh/video/audio nhúng, timeline cảnh, trim video, giọng đọc, chữ/vị trí/màu, cover/contain, zoom, phụ đề SRT, nguồn/quyền sử dụng, undo/redo, nhiều dự án IndexedDB, backup .stories.json và restore thành bản riêng.
- `tools/render.mjs`: xuất MP4 bằng cùng renderer + Chromium + FFmpeg; không ghi đè bản cũ. WebM xuất trong trình duyệt theo thời gian thực.
- Đã kiểm tra với media QA được tạo bằng FFmpeg: nhập ảnh/video/WAV, trim đúng và từ chối quá độ dài, phụ đề, reorder, undo/redo, autosave/reload, backup/restore giữ bản trước, desktop/mobile và WebM có audio. MP4 mẫu 2 giây đúng H.264/AAC 1920×1080. Không coi đây là render tập nội dung đầu tiên.
- Giới hạn: một media nền/cảnh + khối chữ, một track giọng đọc; footage luôn mute; chưa nhiều lớp/track, keyframe tự do, waveform, auto-align hoặc tìm tư liệu tự động. Tối đa 100 MiB/tệp, 500 cảnh, 60 phút; base64 có thể tốn bộ nhớ. Chưa nhập backup Credit_Studio.
- Không có media sản xuất hoặc audio người dùng được upload trong lần này. Tư liệu QA nằm trong work/ bị ignore.
- Xem [EDITOR.md](EDITOR.md) để chạy, kiểm tra và xuất MP4. Cấu hình triển khai riêng tư được giữ trong kho nguồn hosting riêng; không công khai URL hoặc mã định danh hosting trong repo này.

## Việc tiếp theo
Chốt chủ đề tập đầu và cách làm giọng đọc. Chuẩn bị bản mẫu phong cách 30–45 giây trước khi dựng toàn tập; chưa tạo mẫu hoặc render. Sau đó lập brief, kiểm chứng nguồn, viết kịch bản tiếng Anh, chia cảnh và chuẩn bị hình ảnh; nhận âm thanh trước khi chốt dựng.
Cập nhật file này mỗi khi thay đổi trạng thái.


## Triển khai và kiểm tra phòng dựng
- Đã triển khai thành công bản dùng thử owner-private bằng Sites. URL và cấu hình hosting chỉ bàn giao riêng, không ghi vào repo Public.
- Mã sản phẩm lưu tại repo này; cập nhật GitHub không tự triển khai Sites. Khi cập nhật cần lấy đúng identity và source từ cấu hình hosting riêng, giữ quyền truy cập hiện tại và xác minh deploy thành công.
- Môi trường phiên này không có helper Sites trên filesystem; đã dùng Git với credential qua stdin ẩn, không lưu credential, đóng gói static output và triển khai bằng native tools.
- Đã cài phụ thuộc, có package-lock.json; browser QA qua với Playwright đã khóa. MP4 mẫu v2 H.264/AAC 1920×1080, dài 2 giây; xuất vào tên đã tồn tại bị từ chối. Chưa thử dự án dài hàng phút hoặc media gần giới hạn 100 MiB.
