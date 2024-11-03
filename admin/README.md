## Tóm tắt cách chạy server trong môi trường phát triển:
Link hướng dẫn chi tiết: https://docs.google.com/document/d/1QUFkCKLF0dMV6eK4-KRH5YWtuKtQtA_U/edit?usp=drive_link&ouid=107676519725266314742&rtpof=true&sd=true
- Cài đặt **xampp** (nếu chưa có).
- Mở project bằng **IntelliJ** chọn **Edit Configurations...**
- Bấm dấu **+** để thêm Configuration mới.
- Chọn **PHP Script**, tiến hành cấu hình như sau:
  - Tại mục **File**, chỉ đường dẫn đến file **fileConfig.php** trong project.
  - Bấm vô dấu **...** trong mục **Interpreter**.
  - Tại mục **PHP executable**, chỉ đường dẫn đến file **php.exe** (trong thư mục cài xampp có thư mục php, trong đó có file php.exe) sau đó nhấn **OK**.
  - Nhấn **OK** để hoàn thành cấu hình.
- Luôn chạy **fileConfig.php** trước khi khởi chạy chương trình.

## Link API:
- Lấy danh sách từ (GET): /admin/action/get.php
- Thêm từ mới (POST): /admin/action/insert.php
- Xóa từ (GET): /admin/action/delete.php
- Thêm file dữ liệu (POST): /admin/tool/importTxt.php
- Xóa toàn bộ dữ liệu (POST): /admin/tool/deleteAll.php
