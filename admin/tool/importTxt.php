<?php
    // kết nối file dữ liệu
    require_once "../fileConfig.php";
    if(isset($filePath)) {
        if($filePath === false) {
            header("Location: ../index.html?uploadStatus=sourceError");
            exit;
        }
    } else {
        header("Location: ../index.html?uploadStatus=sourceError");
        exit;
    }
    $fileContent = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    // xử lý file
    if(isset($_FILES["fileInput"])) {
        $uploadFile = $_FILES["fileInput"];
        if($uploadFile["error"] === 0) {    // kiểm tra file có được upload thành công không
            $uploadFilePath = $uploadFile["tmp_name"];
            // đọc nội dung file
            $uploadFileContent = file($uploadFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            // duyệt file
            $count = 0;
            foreach($uploadFileContent as $line) {
                list($inputWord, $inputHint) = explode("\t", $line);
                if(!isExistWord($inputWord, $fileContent)) {
                    $inputLine = "\n" . $inputWord . "\t" . $inputHint;
                    file_put_contents($filePath, $inputLine, FILE_APPEND);
                    $count++;
                }
            }
            header("Location: ../index.html?uploadStatus=success_" . $count);
            exit;
        } else {
            header("Location: ../index.html?uploadStatus=fileError");
            exit;
        }
    } else {
        header("Location: ../index.html?uploadStatus=fileError");
        exit;
    }

    /**
     * isExistWord  kiểm tra 1 từ đã tồn tại trong nguồn hay chưa
     * @param $inputWord    từ kiểm tra
     * @param $fileContent  nội dung file nguồn
     * @return bool
     */
    function isExistWord($inputWord, $fileContent)
    {
        foreach($fileContent as $line) {
            list($word, $hint) = explode("\t", $line);
            // kiểm tra từ đã tồn tại hay chưa
            if($word === $inputWord) {
                return true;
            }
        }
        return false;
    }
?>
