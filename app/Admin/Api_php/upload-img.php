<?php
$targetDir = "../../../public/assets/img/";  // Đường dẫn thư mục chứa ảnh
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);  // Tạo thư mục nếu chưa có
}

if (!empty($_FILES["file"]["name"])) {
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        echo json_encode(["success" => true, "filePath" => "public/assets/img/" . $fileName]);
    } else {
        echo json_encode(["success" => false, "error" => "Không thể lưu file."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Không có file nào được chọn."]);
}
?>
