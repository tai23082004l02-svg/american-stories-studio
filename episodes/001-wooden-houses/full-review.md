# Bản dựng đầy đủ v02 — tập 001

Người dùng đã duyệt kịch bản, audio và mẫu đồ họa 41,7 giây, yêu cầu Times New Roman, sau đó cho phép triển khai toàn tập ngày 23/10/2026.

## Phạm vi
- Timeline 515,55 giây / 68 cảnh; 1920×1080, 30fps. Xuất MP4 H.264/AAC bằng cùng renderer với phòng dựng.
- Times New Roman thật được kiểm tra qua Chromium CDP trước khi render. Không đóng gói TTF trong website hoặc repo.
- Giữ 8 cảnh mở đầu đã duyệt; mở rộng bằng 22 preset minh họa gốc cho lịch sử, quy trình, tường, cách nhiệt, kết cấu, nước/lửa và phần kết.
- Hình là đồ họa giải thích, không phải ảnh tư liệu thật hoặc bản vẽ thi công. Chưa thêm nhạc nền. Đây là bản dựng đầy đủ để xem xét, chưa được người dùng duyệt toàn tập hoặc đăng YouTube.
- Phụ đề tiếng Anh riêng: 139 cue VTT/SRT, có thể bật/tắt. MP4 không đốt sẵn phụ đề; dự án có thể nhập SRT khi cần đốt chữ.

## Nhịp chính theo audio
| Mốc | Phần |
| --- | --- |
| 0:00 | Bề mặt gạch và khung gỗ; scope thống kê 2024 |
| 1:00 | Heavy timber, vật liệu tiêu chuẩn, balloon/platform framing |
| 2:06 | Vật liệu, con người, công cụ và điều kiện chi phí |
| 3:07 | Cấu tạo tường, veneer, cầu nhiệt và cách nhiệt liên tục |
| 4:09 | Advanced framing và thiết kế cho từng công trình |
| 5:09 | Đường truyền lực và các liên kết |
| 6:11 | Nước, sinh vật phân hủy gỗ và phơi nhiễm cháy |
| 7:18 | Ghép các nguyên nhân; khác biệt vùng miền và chi phí cả dự án |
| 8:08 | Quay lại lớp mặt ngoài và lời kết |

## Audio và căn mốc
WAV gốc giữ nguyên, hash đối chiếu với manifest riêng. Bản âm thanh dẫn xuất được normalize riêng; đo khoảng **−18,54 LUFS / −1,87 dBTP** trước khi mux AAC. Không suy đoán dịch vụ hoặc giọng dùng để tạo file.

Căn mốc bằng PocketSphinx forced alignment theo transcript đã duyệt trên toàn bộ recording. 1.082 token phát âm (từ ghép tách ra) tương ứng 1.060 từ khi đếm khoảng trắng. Có 60 đoạn lời, đến câu cuối khoảng 514,91 giây. Đây là căn mốc có transcript, không phải chứng nhận mọi từ đã được kiểm nghe thủ công. Phụ đề và mốc có thể cần tinh chỉnh khi người dùng nghe lại.

## Kiểm tra và bàn giao
- Kiểm schema, tính tất định khi tua, tương thích dự án cũ và dữ liệu 94/100.
- Xem frame đại diện của cả 68 cảnh trong Chromium; kiểm giới hạn bố cục tiêu đề/dòng bổ sung, không có JS error.
- Kiểm nhập media, trim/validation, narration, SRT, reorder, undo/redo, lưu/mở lại, backup/restore giữ bản cũ, WebM có audio và giao diện mobile.
- Bản full v02: H.264/AAC 1920×1080 / 30fps, container 515,566667 giây do làm tròn khung hình, 20.152.535 byte; decode toàn bộ không lỗi. Audio AAC đo −18,55 LUFS / −1,83 dBTP.
- Trang duyệt đã kiểm metadata, phát/tua tới từng phần, 6 tệp tải, mobile không tràn và mở/khôi phục bản dựng thành dự án mới. Máy chủ xem thử dùng HTTP byte ranges; Python SimpleHTTPServer không đủ để kiểm tính năng tua tới phần chưa tải.
- Bản mẫu v01/v02 và các bản xuất trước được giữ. Bản full mở từ trang duyệt thành dự án riêng trong trình duyệt.
- Audio, manifest, timing thực tế và backup nhúng audio chỉ lưu trong nguồn riêng tư; repo Public chỉ chứa code, nghiên cứu và tài liệu. URL/identity hosting không ghi vào repo Public.

## Dựng lại
Cần chuẩn bị font hợp lệ, FFmpeg, Chromium/Playwright và PocketSphinx 5.0.4. Dùng `tools/align-narration.py` với đúng recording + narration.txt, rồi `tools/build-wooden-houses-full.py` với manifest riêng và thư mục đầu ra mới. Builder kiểm hash và chuỗi token, không nhận một recording khác như thể timing vẫn đúng. Không ghi đè các đầu ra đã tồn tại.

## Bản sửa nhãn v02
Bản full v01 đầu tiên đã xuất H.264/AAC 1920×1080 / 30fps, 515,566667 giây, khoảng 20,10 MB và giải mã toàn bộ không lỗi. Âm thanh AAC đo −18,55 LUFS / −1,83 dBTP. Khi xem frame xuất, nhãn cửa sổ/mái trong sơ đồ cháy cần rõ hơn; v02 đặt nhãn ngoài hình với đường dẫn. Lời đọc, timing 68 cảnh, audio và phụ đề giữ nguyên. Bản v01 giữ lại, không ghi đè.
