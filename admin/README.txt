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

* Lưu ý: Hệ thống có thể bị lỗi với 1 số extension của trình duyệt do đó phải đảm bảo chức năng quản lý được chạy trong môi trường không có extension của trình duyệt.