<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Lấy thông tin category từ request
    $category = isset($_POST['category']) ? trim($_POST['category']) : '';

    // Xác định thư mục theo category
    $categoryFolders = [
        "Mousse" => "mousse",
        "Drink" => "drink",
        "Croissant" => "croissant"
    ];

    $folder = isset($categoryFolders[$category]) ? $categoryFolders[$category] : "other";
    $uploadDir = "../../../public/assets/img/$folder/";

    // Tạo thư mục nếu chưa tồn tại
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (isset($_FILES["file"]) && $_FILES["file"]["error"] === 0) {
        $fileName = basename($_FILES["file"]["name"]);
        $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedTypes = ["jpg", "jpeg", "png", "gif"];

        // Kiểm tra định dạng file hợp lệ
        if (!in_array($fileType, $allowedTypes)) {
            echo json_encode([
                "success" => false,
                "error" => "Only JPG, JPEG, PNG, and GIF files are allowed."
            ]);
            exit();
        }

        // Tạo tên file duy nhất
        $uniqueName = uniqid() . "_" . $fileName;
        $targetPath = $uploadDir . $uniqueName;

        // Di chuyển file
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetPath)) {
            // Trả về đường dẫn để lưu vào DB & frontend
            echo json_encode([
                "success" => true,
                "filePath" => "/assets/img/$folder/" . $uniqueName
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "error" => "Failed to move uploaded file."
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "error" => "No file uploaded or upload error."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "error" => "Invalid request method."
    ]);
}
?>
