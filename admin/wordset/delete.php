<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header('Content-Type: application/json; charset=utf-8');

    // Xử lý yêu cầu OPTIONS
    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        http_response_code(200);
        exit;
    }
    // kết nối CSDL và thông tin các class
    require_once "../dbConfig.php";

    // kiểm tra phương thức yêu cầu có phải là DELETE không
    if($_SERVER["REQUEST_METHOD"] === "DELETE") {
        // kiểm tra tham số có được truyền không
        if(isset($_GET["word"])) {
            // var
            $word = $_GET["word"];
            // sql
            $sql = "DELETE FROM wordset WHERE word = ?";
            if (isset($connect)) {
                $stmt = $connect->prepare($sql);
            }
            // bind param
            $stmt->bind_param("s", $word);
            if($stmt->execute()) {  // nếu có thể truy vấn, tiến hành delete
                http_response_code(200);
                echo json_encode(array("message" => "Truy vấn thành công."));
            } else {    // thông báo lỗi nếu không thể thực hiện truy vấn
                http_response_code(500);
                echo json_encode(array("message" => "Lỗi trong quá trình thực hiện truy vấn."));
            }
        } else {    // thông báo lỗi nếu có tham số không được truyền
            http_response_code(400);
            echo json_encode(array("message" => "Thiếu tham số."));
        }
    } else {    // thông báo lỗi nếu phương thức yêu cầu không phải DELETE
        http_response_code(405);
        echo json_encode(array("message" => "Phương thức không được hỗ trợ."));
    }
?>