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
- Chủ đề tập đầu đã chốt: Why So Many American Homes Are Built From Wood; kịch bản v01 đã được người dùng duyệt ngày 23/10/2026.
- Đã nhận WAV tập 001 do người dùng cung cấp, dài 515,55 giây; không tự suy đoán dịch vụ/giọng dùng để tạo file.
- Chưa xác nhận tên kênh/logo và việc dùng kênh The Signal Daily cho hướng này.
- Đã có bản dựng đầy đủ tập 001 v02: timeline 515,55 giây / 68 cảnh, Times New Roman, minh họa gốc và phụ đề riêng; chưa nhạc nền. Bản MP4 cuối đã kiểm tra đầu ra và trang duyệt; dùng nguồn hosting riêng tư để triển khai.

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
- Audio tập 001 và backup có audio chỉ giữ trong nguồn hosting riêng tư. Tư liệu QA nằm trong work/ bị ignore.
- Xem [EDITOR.md](EDITOR.md) để chạy, kiểm tra và xuất MP4. Cấu hình triển khai riêng tư được giữ trong kho nguồn hosting riêng; không công khai URL hoặc mã định danh hosting trong repo này.

## Việc tiếp theo
Bản đầy đủ v02 đã dựng theo WAV thật và Times New Roman; nhận nhận xét của người dùng trên trang duyệt sau khi triển khai. Chưa tự đăng YouTube.
Cập nhật file này mỗi khi thay đổi trạng thái.


## Triển khai và kiểm tra phòng dựng
- Đã triển khai thành công bản dùng thử owner-private bằng Sites. URL và cấu hình hosting chỉ bàn giao riêng, không ghi vào repo Public.
- Mã sản phẩm lưu tại repo này; cập nhật GitHub không tự triển khai Sites. Khi cập nhật cần lấy đúng identity và source từ cấu hình hosting riêng, giữ quyền truy cập hiện tại và xác minh deploy thành công.
- Môi trường phiên này không có helper Sites trên filesystem; đã dùng Git với credential qua stdin ẩn, không lưu credential, đóng gói static output và triển khai bằng native tools.
- Đã cài phụ thuộc, có package-lock.json; browser QA qua với Playwright đã khóa. MP4 mẫu v2 H.264/AAC 1920×1080, dài 2 giây; xuất vào tên đã tồn tại bị từ chối. Chưa thử dự án dài hàng phút hoặc media gần giới hạn 100 MiB.

## Tập 001 — nhà khung gỗ Mỹ
- Người dùng đã chốt chủ đề ngày 23/10/2026. Hồ sơ: episodes/001-wooden-houses/.
- Đã chuẩn bị brief, research.md với 9 nguồn, script.en.md v01 gồm 8 phần / 1060 từ, narration.txt thuần lời, summary.vi.md và storyboard sơ bộ.
- Người dùng đã duyệt kịch bản v01 ngày 23/10/2026. Lời đọc giữ nguyên 1.060 từ; đã nhận WAV 515,55 giây và dựng mẫu đồ họa 41,7 giây. Mẫu đã duyệt, yêu cầu Times New Roman; đã mở rộng toàn tập v02, 68 cảnh.
- Luận điểm mở: nhà mặt gạch có thể dùng khung gỗ; số 94% chỉ là single-family completions năm 2024 theo NAHB phân tích Census, không phải toàn bộ nhà ở hoặc số mới nhất 2026.
- Không nói gỗ luôn rẻ/khỏe hơn, không bảo đảm chống cháy/bão; phân biệt framing/cladding/insulation, lịch sử có tranh luận và các đánh đổi.
- Audio thật dài 8 phút 35,55 giây. Giữ nguyên bản gốc; mẫu dùng dẫn xuất riêng được xử lý âm lượng.

## Mẫu mở đầu tập 001 — đã duyệt
- Đã dựng 8 cảnh / 41,7 giây theo mốc lời đọc đầu file; số liệu kết thúc khoảng 41,26 giây, dừng trước câu tiếp theo. Căn mốc bằng PocketSphinx cục bộ trên phần đầu, không tuyên bố đã kiểm toàn bộ lời đọc 8 phút.
- Đồ họa gốc bằng canvas: ngoại thất/lộ khung, tách lớp tường, câu hỏi và lưới 100 ô với 94 ô tô màu, scope 2024 single-family completions luôn rõ.
- Mẫu chỉ minh họa đồ họa, chưa dùng ảnh tư liệu thật. Đã xác định một nguồn ảnh Commons có license, nhưng tải bị policy mạng chặn; không thay ảnh AI rồi gọi là tư liệu thật. Chưa nhạc nền.
- MP4 mẫu H.264/AAC 1920×1080 / 30fps / 41,7 giây. Bản âm thanh dẫn xuất đo khoảng -18,64 LUFS / -1,85 dBTP. Hash bản gốc và bản lưu riêng khớp nhau; không sửa WAV gốc.
- Source audio và bản sao lưu có audio chỉ giữ trong nguồn hosting riêng tư; không đưa lên repo Public. Cấu hình hosting/đường dẫn truy cập cũng giữ riêng như trước.
- Đã thêm lựa chọn preset diagram vào editor, giữ tương thích dự án cũ; mẫu mở thành dự án riêng. Xem episodes/001-wooden-houses/intro-review.md và tools/build-wooden-houses-intro.py.

## Cập nhật font và duyệt hình — 23/10/2026
- Người dùng đã duyệt mẫu 41,7 giây và yêu cầu Times New Roman. Quyết định này thay lựa chọn sans-serif trước đó; không hỏi duyệt lại phong cách.
- Đã đổi chữ trong graphics.js, renderer.js (gồm phụ đề), CSS editor và trang review sang Times New Roman.
- Bản MP4 v02 Times New Roman giữ nguyên 41,7 giây, 8 cảnh và audio/timing. Bản v01 cũ và WAV gốc được giữ.
- Runtime render đã chuẩn bị Times New Roman thật; Chromium CDP xác nhận family Times New Roman / PostScript TimesNewRomanPS-BoldMT. Đã xem 8 frame sau đổi font.
- tools/render.mjs kiểm tra font thực tế và từ chối xuất khi thiếu; đã thử nhánh thiếu font bị chặn và nhánh có font xuất được. Máy mới phải chuẩn bị font/cấu hình FONTCONFIG_FILE hợp lệ trước khi render.
- Font chỉ cài tại runtime, không đưa TTF vào repo hoặc nhúng website. Người dùng Windows dùng font local; nếu thiết bị không có font thì giao diện dùng serif dự phòng, MP4 vẫn chặn fallback.
- Đã mở rộng toàn tập theo WAV 515,55 giây và phong cách đã duyệt. Bản full hiện cũng dùng minh họa gốc, không đổi nhãn thành ảnh tư liệu thật.


## Toàn tập 001 v02 — 23/10/2026
- Người dùng yêu cầu triển khai toàn tập sau khi duyệt mẫu và font. Timeline 515,55 giây / 68 cảnh; giữ mẫu cũ và WAV gốc.
- Đã căn 60 đoạn / 1.082 token phát âm bằng PocketSphinx trên cả recording; không tuyên bố đã kiểm nghe thủ công mọi từ. Phụ đề VTT/SRT có 139 cue riêng, không đốt vào MP4.
- Thêm 22 preset minh họa và trường nhãn phần/chân đồ họa cho nhóm preset mới. Tiêu đề/dòng bổ sung vẫn chỉnh bằng các trường sẵn có.
- Bản audio dẫn xuất đo −18,54 LUFS / −1,87 dBTP trước mux AAC. Không nhạc nền, không ảnh tư liệu thật.
- Full v02 đã xuất H.264/AAC 1920×1080 / 30fps; container 515,566667 giây (làm tròn khung hình), 20.152.535 byte. Decode toàn bộ không lỗi. AAC đo −18,55 LUFS / −1,83 dBTP. Đã kiểm 68 frame, font thật, bố cục, browser QA và trang review: phát/tua, 6 tệp tải, mobile không tràn, mở query thành dự án riêng.
- Máy chủ Python cơ bản không hỗ trợ HTTP Range nên kiểm thử tua ban đầu thất bại. Đã xác định nguyên nhân và thêm tools/serve.mjs bind loopback, hỗ trợ byte ranges; phép kiểm tra phát/tua đã qua.
- Bộ đóng gói chỉ đưa review đang được link và các mẫu đã phát hành vào static output; bản full v01 đầu tiên giữ trong nguồn riêng tư, không nhân đôi vào deployment. WAV gốc không nằm trong static output.
- Xem episodes/001-wooden-houses/full-review.md; công cụ dựng lại: tools/align-narration.py và tools/build-wooden-houses-full.py. Không đưa recording, manifest/timing, backup có audio, URL/identity hosting riêng tư lên Public.

## Kết quả bàn giao cuối
- Bản full v02 và trang review đã triển khai thành công bằng native Sites ngày 23/10/2026, giữ owner-private. Video, dự án và phụ đề được tải từ trang duyệt hiện hành; không đưa URL/identity hosting vào repo Public.
- Mã và tài liệu đã cập nhật main. Chờ nhận xét sau khi người dùng xem toàn tập, rồi mới chuẩn bị bước đăng YouTube nếu được yêu cầu. Không dựng lại mẫu hoặc đổi font.
