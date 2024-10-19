<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header('Content-Type: application/json; charset=utf-8');
    // connect database
    require_once "../dbConfig.php";

    // kiểm tra phương thức yêu cầu có phải là GET không
    if($_SERVER["REQUEST_METHOD"] === "GET") {
        $sql = "SELECT word, hint FROM wordset";
        if (isset($connect)) {
            $stmt = $connect->prepare($sql);
        }
        // execute
        if($stmt->execute()) {
            $data = $stmt->get_result();
            $result = array();
            while($row = $data->fetch_assoc()) {
                $wordSet = new WordSet($row["word"], $row["hint"]);
                array_push($result, $wordSet);
            }
            http_response_code(200);
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Lỗi trong quá trình thực hiện truy vấn."));
        }
    }
?>