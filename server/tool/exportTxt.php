<?php
    header('Access-Control-Allow-Origin: *');

    // lấy đường dẫn file dữ liệu
    $filePath = "../data.txt";
    if(file_exists($filePath)) {
        // đặt header trả về để tải xuống file
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="data.txt"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($filePath));
        // xóa cache và đọc file
        ob_clean();
        flush();
        readfile($filePath);
        exit;
    } else {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        exit;
    }
?>