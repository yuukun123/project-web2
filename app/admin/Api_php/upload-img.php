<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $category = isset($_POST['category']) ? trim($_POST['category']) : '';

    $categoryFolders = [
        "Mousse" => "Mousse",
        "Drink" => "Drink",
        "Croissant" => "Croissant"
    ];

    $folder = isset($categoryFolders[$category]) ? $categoryFolders[$category] : "other";
    $uploadDir = __DIR__ . "/../../../public/assets/Img/$folder/";

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
        echo json_encode([
            "success" => false,
            "error" => "Failed to create directory."
        ]);
        exit();
    }

    if (isset($_FILES["file"]) && $_FILES["file"]["error"] === 0) {
        $fileName = basename($_FILES["file"]["name"]);
        $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedTypes = ["jpg", "jpeg", "png", "gif"];
        $fileSize = $_FILES["file"]["size"];
        $maxSize = 5 * 1024 * 1024; // 5MB

        // Kiểm tra định dạng
        if (!in_array($fileType, $allowedTypes)) {
            echo json_encode([
                "success" => false,
                "error" => "Only JPG, JPEG, PNG, and GIF files are allowed."
            ]);
            exit();
        }

        // Kiểm tra kích thước file
        if ($fileSize > $maxSize) {
            echo json_encode([
                "success" => false,
                "error" => "File size exceeds the maximum limit of 5MB."
            ]);
            exit();
        }

        // Tạo tên file duy nhất
        do {
            $uniqueName = uniqid() . "_" . $fileName;
            $targetPath = $uploadDir . $uniqueName;
        } while (file_exists($targetPath));

        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetPath)) {
            echo json_encode([
                "success" => true,
                "filePath" => "/assets/Img/$folder/" . $uniqueName
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
