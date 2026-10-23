# Bản mẫu đồ họa — đã duyệt; v02 dùng Times New Roman

Đã nhận audio của người dùng và giữ nguyên bản gốc. WAV dài **515,55 giây**, mono 24 kHz / PCM 16-bit.
Đây là mẫu 41,7 giây theo audio thật, chưa phải bản đầy đủ. Người dùng đã duyệt mẫu ngày 23/10/2026 và yêu cầu Times New Roman.

## Timeline mẫu
| Bắt đầu | Kết thúc | Hình |
| --- | --- | --- |
| 0,00 | 4,18 | Ngoại thất minh họa, câu hỏi brick/wood |
| 4,18 | 10,46 | Bỏ dần lớp mặt ngoài để lộ khung |
| 10,46 | 16,71 | Sơ đồ lớp tường, cladding và structure |
| 16,71 | 18,98 | Chuyển câu hỏi |
| 18,98 | 22,99 | Dãy nhà, bề mặt so với khung |
| 22,99 | 27,56 | Khung nhà minh họa |
| 27,56 | 34,52 | Nguồn NAHB / Census, scope 2024 |
| 34,52 | 41,70 | 94% + lưới 100 ô, giữ đúng phạm vi thống kê |

Mốc căn bằng PocketSphinx trên phần lời đầu; đối chiếu transcript tự nhận dạng và transcript đã duyệt. Không tuyên bố mọi từ đã được kiểm nghe thủ công hoặc đã căn toàn bộ file.

## Hình và âm thanh
- Đồ họa gốc, màu trắng ngà/xanh đen/cam, chữ Times New Roman. Ghi rõ simplified illustration; không phải ảnh tư liệu hoặc bản vẽ thi công.
- Chưa có ảnh tư liệu trong mẫu: nguồn ảnh được tìm thấy nhưng chưa tải thành công qua policy mạng. Tìm thấy nguồn không đồng nghĩa đã đưa vào video.
- Không thêm nhạc nền. Audio mẫu là dẫn xuất riêng, loudness đo khoảng -18,64 LUFS và true peak -1,85 dBTP; bản WAV gốc không thay đổi.
- MP4 H.264/AAC, 1920×1080, 30fps, 41,7 giây. Có bản dự án chỉnh được và phụ đề VTT riêng trên nguồn bàn giao riêng tư.
- Audio và bản backup có audio không được commit công khai; code/tài liệu của preset được lưu ở repo này.

## Đã duyệt
Bố cục, màu, nhịp chuyển cảnh và cách dùng đồ họa. Font chốt Times New Roman.
Bản v02 đã render lại bằng Times New Roman thật, kiểm tra font qua Chromium CDP (family Times New Roman, PostScript TimesNewRomanPS-BoldMT). Giữ lời đọc, thời lượng và mốc cảnh; giữ bản v01 cũ.
Bước tiếp theo là mở rộng toàn tập và bổ sung tư liệu có quyền sử dụng.

## Kiểm tra
Kiểm tra schema, tương thích dự án cũ, tính tất định khi tua, lưới 94/100; mở cả 8 cảnh trong Chromium và xem contact sheet. MP4 đã kiểm bằng FFprobe. Chưa kiểm nghe thủ công toàn bộ audio hoặc thử playback trên mọi thiết bị.

## Dựng lại
Công cụ tools/build-wooden-houses-intro.py nhận WAV, thư mục đầu ra mới và audio-manifest.json riêng chứa source_sha256; từ chối nếu không đúng recording hoặc đầu ra đã có. Không công khai manifest, audio hay backup có audio.
