* Cách chạy server trong môi trường phát triển:
1. Cài PHP nếu chưa có. (Nếu đã cài xampp thì có thể sử dụng file php.exe trong thư mục php của xampp)
2. Mở IntelliJ chọn Edit Configurations...
3. Bấm dấu + để thêm Configuration mới.
4. Chọn PHP Script, tiến hành cấu hình như sau:
    4.1 Tại mục File, chọn file fileConfig.php trong project.
    4.2 Bấm vô dấu ... trong mục Interpreter.
    4.3 Tại mục PHP executable, chỉ đường dẫn đến file php.exe đã cài, sau đó nhấn OK.
    4.4 Nhấn OK để hoàn thành cấu hình.
5. Chạy dbConfig.php trước khi khởi chạy chương trình.

* Link API:
Lấy danh sách từ (GET): /admin/action/get.php
Thêm từ mới (POST): /admin/action/insert.php
Xóa từ (GET): /admin/action/delete.php
Thêm file dữ liệu (POST): /admin/tool/importTxt.php
Xóa toàn bộ dữ liệu (POST): /admin/tool/deleteAll.php