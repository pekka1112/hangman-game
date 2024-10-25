<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=utf-8");
    // kết nối file dữ liệu
    require_once "../fileConfig.php";
    if($_SERVER["REQUEST_METHOD"] === "POST") {
        if (isset($filePath)) { // kiểm tra có biến filePath không
            if($filePath !== false) {   // kiểm tra filePath có hợp lệ
                file_put_contents($filePath, '');
                http_response_code(200);
                echo json_encode(["message" => "Xóa thành công"]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Không kết nối được với file cài đặt"], JSON_PRETTY_PRINT);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Phương thức không được hỗ trợ"], JSON_PRETTY_PRINT);
    }
?>