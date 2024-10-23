<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=utf-8");
    // kết nối file dữ liệu
    require_once "../fileConfig.php";
    // kiểm tra phương thức yêu cầu có phải là DELETE không
    if($_SERVER["REQUEST_METHOD"] === "GET") {
        // kiểm tra tham số có được truyền không
        if(isset($_GET["word"])) {
            if (isset($filePath)) { // kiểm tra có biến filePath không
                if($filePath !== false) {   // kiểm tra filePath có hợp lệ
                    $deletedWord = $_GET["word"];
                    $fileContent = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                    // lọc ra những từ không phải từ bị xóa
                    $fileContent = array_filter($fileContent, function ($line) use ($deletedWord) {
                       list($word, $hint) = explode("\t", $line);
                       return $word !== $deletedWord;
                    });
                    // thêm lại vào file
                    file_put_contents($filePath, implode("\n", $fileContent));
                    http_response_code(200);
                    echo json_encode(["message" => "Xóa thành công"], JSON_PRETTY_PRINT);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Không tìm thấy file nguồn"], JSON_PRETTY_PRINT);
                }
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Không kết nối được với file cài đặt"], JSON_PRETTY_PRINT);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Thiếu tham số đầu vào"], JSON_PRETTY_PRINT);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Phương thức không được hỗ trợ"], JSON_PRETTY_PRINT);
    }
?>