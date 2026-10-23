# Quy trình sản xuất

1. **Brief:** chọn câu hỏi, đối tượng, góc kể và lời hứa của tập. Chốt với người dùng trước khi sản xuất hàng loạt tài nguyên.
2. **Nghiên cứu:** tìm nguồn gốc đáng tin cậy; ghi URL, ngày truy cập, bằng chứng cho từng luận điểm và điều chưa chắc. Chưa có nguồn thì giữ trạng thái chưa kiểm chứng.
3. **Kịch bản:** viết tiếng Anh, đọc thử, kiểm tra tên riêng và phát âm. Ghi phần hình ảnh bằng tiếng Việt nếu thuận tiện.
4. **Chia cảnh:** mỗi cảnh có lời đọc, thời lượng dự kiến, hình minh họa và nguồn/quyền sử dụng. Hình AI hoặc tái dựng phải được phân biệt với tư liệu thật.
5. **Âm thanh:** người dùng cung cấp bản đọc/âm thanh và thông tin quyền sử dụng; ưu tiên WAV nếu có. Chốt thời lượng theo audio thực tế.
6. **Dựng:** đồng bộ cảnh theo lời đọc, thêm phụ đề và thumbnail. Kiểm tra công cụ dựng hiện có trước khi cam kết render. Tài nguyên lớn lưu ngoài Git kèm manifest; không tự chọn nơi upload công khai.
7. **Kiểm tra:** mở xem bản render, kiểm tra chữ, phát âm, cắt cảnh, mức âm thanh, nguồn/quyền sử dụng; ghi rõ đã kiểm tra những gì.
8. **Duyệt và xuất bản:** giao bản xem trước cùng tiêu đề/mô tả và ghi nguồn. Người dùng quyết định xuất bản; chưa có tích hợp upload trong dự án.
9. **Đo kết quả:** lưu số liệu vào analytics/video-performance.csv và cập nhật bàn giao.

## Hồ sơ một tập
episodes/NNN-topic-slug/ gồm brief.md, research.md, script.en.md, storyboard.csv, assets.csv và publish.md khi từng tài liệu được tạo.
Không tạo file để giả định công việc đã xong. Mọi tài nguyên dùng trong tập phải có trạng thái và nguồn truy vết.

## Trạng thái
idea → research → script → visuals → awaiting-audio → edit → review → ready → published.
Chỉ chuyển trạng thái khi có kết quả thực tế tương ứng.
