<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=utf-8");
    // kết nối file dữ liệu
    require_once "../fileConfig.php";
    // kiểm tra phương thức yêu cầu có phải là POST không
    if($_SERVER["REQUEST_METHOD"] === "POST") {
        if(isset($_POST["word"]) && isset($_POST["hint"])) {
            if (isset($filePath)) { // kiểm tra có biến filePath không
                if($filePath !== false) {   // kiểm tra filePath có hợp lệ
                    $inputWord = $_POST["word"];
                    $inputHint = $_POST["hint"];
                    $fileContent = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                    // duyệt file
                    foreach($fileContent as $line) {
                        // tách dữ liệu
                        list($word, $hint) = explode("\t", $line);
                        // kiểm tra từ đã tồn tại hay chưa
                        if($word === $inputWord) {
                            http_response_code(500);
                            echo json_encode(["error" => "Từ đã tồn tại trong hệ thống"]);
                            exit;
                        }
                    }
                    $inputLine = "\n" . $inputWord . "\t" . $inputHint;
                    file_put_contents($filePath, $inputLine, FILE_APPEND);
                    http_response_code(200);
                    echo json_encode(["message" => "Thêm từ mới thành công"]);
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