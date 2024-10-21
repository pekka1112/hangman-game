<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json; charset=utf-8');
// kết nối CSDL và thông tin các class
require_once "../dbConfig.php";

// kiểm tra phương thức yêu cầu có phải là POST không
if($_SERVER["REQUEST_METHOD"] === "POST") {
    // kiểm tra tham số có được truyền không
    if(isset($_POST["word"]) && isset($_POST["hint"])) {
        // var
        $word = $_POST["word"];
        $hint = $_POST["hint"];
        // sql
        $sql = "INSERT INTO wordset (word, hint) VALUES (?, ?)";
        if (isset($connect)) {
            $stmt = $connect->prepare($sql);
        }
        // bind param
        $stmt->bind_param("ss", $word, $hint);
        if($stmt->execute()) {  // nếu có thể truy vấn, tiến hành insert
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
} else {    // thông báo lỗi nếu phương thức yêu cầu không phải POST
    http_response_code(405);
    echo json_encode(array("message" => "Phương thức không được hỗ trợ."));
}
?>