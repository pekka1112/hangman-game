<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=utf-8");
    // kết nối file dữ liệu
    require_once "../fileConfig.php";

    // kiểm tra phương thức yêu cầu có phải là GET không
    if($_SERVER["REQUEST_METHOD"] === "GET") {
        if (isset($filePath)) { // kiểm tra có biến filePath không
            if($filePath !== false) {   // kiểm tra filePath có hợp lệ không
                $fileContent = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                $data = [];
                // duyệt file
                foreach($fileContent as $line) {
                    // tách dữ liệu
                    list($word, $hint) = explode("\t", $line);
                    // đưa vào mảng dưới dạng object
                    $data[] = [
                        'word' => $word,
                        'hint' => $hint
                    ];
                }
                http_response_code(200);
                echo json_encode($data, JSON_PRETTY_PRINT);
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
        echo json_encode(["error" => "Phương thức không được hỗ trợ"], JSON_PRETTY_PRINT);
    }
?>