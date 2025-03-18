<?php
session_name("admin");
session_start();

include '../../config/data_connect.php';
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $product_name = trim($_POST['name']);
    $price = trim($_POST['price']);
    $category_name = trim($_POST['category']);
    $size_id = trim($_POST['size']);
    $status = trim($_POST['status']);
    $description = trim($_POST['description']);

    $response = ["status" => "error", "message" => ""];

    if (empty($product_name) || empty($price) || empty($category_name) || empty($size_id) || empty($status)) {
        $response["message"] = "Please fill in all required fields.";
        echo json_encode($response);
        exit();
    }

    if (!is_numeric($price) || $price <= 0) {
        $response["message"] = "Invalid price.";
        echo json_encode($response);
        exit();
    }

    // Lấy category_id từ category_name
    $stmt = $conn->prepare("SELECT category_id FROM category WHERE category_name = ?");
    $stmt->bind_param("s", $category_name);
    $stmt->execute();
    $stmt->bind_result($category_id);
    $stmt->fetch();
    $stmt->close();

    if (!$category_id) {
        $response["message"] = "Invalid category selection.";
        echo json_encode($response);
        exit();
    }

    // Kiểm tra size
    $stmt = $conn->prepare("SELECT size_id FROM size WHERE size_id = ?");
    $stmt->bind_param("i", $size_id);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows === 0) {
        $response["message"] = "Invalid size selection.";
        echo json_encode($response);
        exit();
    }
    $stmt->close();

    $imagePath = "";

    // ✅ Trường hợp upload file từ form
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        $fileType = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));

        if (!in_array($fileType, $allowedTypes)) {
            $response["message"] = "Only JPG, JPEG, PNG, and GIF files are allowed.";
            echo json_encode($response);
            exit();
        }

        // Chuyển category name thành thư mục (viết hoa chữ đầu + không dấu cách)
        $folderName = ucfirst(strtolower(preg_replace('/\s+/', '', $category_name)));
        $targetDir = "../../public/assets/Img/$folderName/";

        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $originalFileName = basename($_FILES['image']['name']); // giữ tên gốc
        $targetFilePath = $targetDir . $originalFileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            // Đường dẫn lưu vào DB: public/assets/Img/CategoryName/Filename.png
            $imagePath = "public/assets/Img/$folderName/" . $originalFileName;
        } else {
            $response["message"] = "Image upload failed.";
            echo json_encode($response);
            exit();
        }
    } 
    // ✅ Trường hợp nhận link ảnh từ input text
    elseif (isset($_POST['image']) && !empty(trim($_POST['image']))) {
        $imagePath = trim($_POST['image']);

        // Thêm public/ nếu chưa có
        if (strpos($imagePath, 'public/') !== 0) {
            $imagePath = 'public' . (substr($imagePath, 0, 1) === '/' ? '' : '/') . $imagePath;
        }

        // Thay img thành Img và viết hoa chữ đầu danh mục
        $imagePath = preg_replace_callback('/public\/assets\/img\/([^\/]+)\//', function ($matches) {
            return 'public/assets/Img/' . ucfirst(strtolower($matches[1])) . '/';
        }, $imagePath);

        // Bỏ phần hash nếu có (ví dụ: /mousse/67d8e37fc0884_filename.png => /mousse/filename.png)
        $imagePath = preg_replace('/\/[a-z0-9]{6,}_(.+)$/i', '/$1', $imagePath);
    }

    // ✅ Thêm vào cơ sở dữ liệu
    $stmt = $conn->prepare("INSERT INTO product (product_name, price, category_id, size_id, status, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sdiisss", $product_name, $price, $category_id, $size_id, $status, $description, $imagePath);

    if ($stmt->execute()) {
        $response["status"] = "success";
        $response["success"] = true;
        $response["message"] = "Product added successfully.";
    } else {
        $response["message"] = "Database error: " . $stmt->error;
    }

    echo json_encode($response);
    exit();
}
?>
