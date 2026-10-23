# American Stories — Phòng dựng v0.1

Công cụ riêng trong repo này, tham khảo tổ chức timeline và quy trình của Credit_Studio. Không sửa hoặc sao chép các dự án/media của Credit_Studio; định dạng sao lưu hai công cụ khác nhau.

## Dùng công cụ
Mở `editor/` trên máy chủ HTTP hoặc GitHub Pages. Chạy cục bộ từ thư mục repo: `python3 -m http.server 8000 --bind 127.0.0.1`, rồi mở http://127.0.0.1:8000/editor/.

1. Tạo và đặt tên dự án; nhập ảnh PNG/JPEG/WebP, video MP4/WebM hoặc audio được trình duyệt hỗ trợ.
2. Chọn cảnh rồi bấm **Dùng** cạnh tư liệu. Với audio, thao tác chọn tệp làm giọng đọc.
3. Chỉnh thời lượng và điểm cắt đầu; cảnh video không được vượt thời lượng tệp. Nhân đôi, sắp xếp, xóa và hoàn tác khi cần.
4. Chọn mẫu tiêu đề/tư liệu/chú thích; chỉnh chữ, vị trí, màu, khung ảnh và phóng/thu chậm. Ghi nguồn và quyền sử dụng cho từng cảnh.
5. Nhập SRT để có phụ đề. Phát thử, tua và lưu PNG nếu cần duyệt bố cục.
6. **Sao lưu** tải `.stories.json`, có cả media. Khôi phục luôn tạo dự án riêng để giữ bản trước.

## Lưu và giới hạn
- Dự án/media được lưu IndexedDB trên đúng trình duyệt và origin đang dùng; chưa đồng bộ GitHub hoặc máy khác. Chuyển địa chỉ hosting sẽ không tự chuyển bản sửa. Sao lưu tệp trước khi chuyển.
- Giới hạn bản đầu: 100 MiB mỗi media, 500 cảnh, 60 phút; dung lượng thực tế còn tùy bộ nhớ trình duyệt. Media nhúng base64 làm bản sao lưu lớn hơn file gốc. Chưa tối ưu cho dự án nhiều GB.
- Một tư liệu nền mỗi cảnh, một khối tiêu đề và một dòng bổ sung; chưa có nhiều track video, thư viện đạo cụ, kéo thả lớp, keyframe tự do, waveform hoặc tự căn lời đọc.
- Video tư liệu luôn tắt tiếng. Bản đầu chỉ có một track giọng đọc; chưa trộn nhạc nền/âm thanh tư liệu. Nhập tệp không có nghĩa đã kiểm tra giấy phép.
- Không tự tìm ảnh hoặc kết nối YouTube/OBS trong công cụ này.

## Xuất WebM trong trình duyệt
Xuất theo thời gian thực bằng MediaRecorder; giữ tab phía trước, tránh để máy ngủ. Nút Xuất đổi thành Hủy khi đang chạy. Phụ đề được đốt vào hình. WebM có thể chưa có metadata duration/seek hoàn chỉnh; xuất MP4 theo cách dưới nếu cần bản nộp cuối. Chất lượng phụ thuộc hiệu năng máy và codec trình duyệt; dùng Chrome/Edge desktop.

## Xuất MP4 cục bộ
Cần Node.js, FFmpeg có H.264/AAC và Playwright/Chromium:

```sh
npm install
npx playwright install chromium
python3 -m http.server 8000 --bind 127.0.0.1
```

Giữ máy chủ chạy, mở terminal khác ở thư mục repo:

```sh
node tools/render.mjs /path/to/project.stories.json /path/to/new-export.mp4
```

Windows thay đường dẫn cho phù hợp và dùng `py` thay `python3` nếu cần. Có thể thêm đối số URL nếu dùng cổng khác. Biến `STORIES_CHROMIUM` chọn đường dẫn Chromium đã cài. Render dùng cùng canvas với preview, tua từng frame video và trộn giọng đọc bằng FFmpeg. Công cụ từ chối ghi đè bản xuất đã có. Tài nguyên nằm trong backup nên không cần chép media riêng. Thời gian render không phải thời gian thực.

## Kiểm tra
`npm test` kiểm tra timeline, validation và phụ đề. Browser QA dùng `node tests/browser.cjs` với server tại cổng 8000; cần Playwright, Chromium và FFmpeg. Các bài kiểm tra tạo media giả lập phục vụ test, không phải nội dung sản xuất.

## Phát hành
Có thể dùng GitHub Pages nguồn main / và mở `/editor/`. Việc push mã không chứng minh Pages đã được bật hoặc deploy thành công. Không đặt token/credentials hoặc bản dựng riêng trong thư mục được publish.

## Mẫu đồ họa tập 001
Bảng Chỉnh cảnh có lựa chọn Đồ họa minh họa: nhà ngoại thất/lộ khung, bóc lớp tường, câu hỏi, dãy nhà, khung nhà, nguồn và dữ liệu 94% năm 2024. Đây là preset riêng cho tập 001, không phải trình tạo biểu đồ tùy ý. Đồ họa được vẽ theo thời gian và dùng chung trong preview/MP4; dự án cũ không có trường diagram vẫn mở được.

Bản dựng có giọng đọc được bàn giao trên trang duyệt riêng tư; không nằm trong repo Public. Nút Mở bản dựng trên trang đó tạo dự án riêng trong trình duyệt, giữ bản cũ. Có thể tải bản sao lưu để mở bằng nút Mở bản sao lưu. File audio/backup có audio không được tự đưa lên GitHub công khai.

## Font đã chốt: Times New Roman
Toàn bộ chữ trong canvas (gồm số liệu/phụ đề), giao diện editor và trang duyệt dùng Times New Roman. Trình duyệt lấy font cài trên máy và có serif dự phòng để giao diện vẫn mở được. Công cụ render MP4 kiểm tra font thực tế qua Chromium CDP và từ chối render khi thiếu Times New Roman, tránh xuất nhầm font thay thế.

Máy render cần cài Times New Roman hợp lệ; Linux có thể dùng FONTCONFIG_FILE trỏ cấu hình chứa font. Không commit hoặc nhúng file font có bản quyền vào website/repo. Bản MP4 mẫu v02 đã render bằng Times New Roman thật và kiểm tra 8 cảnh.
