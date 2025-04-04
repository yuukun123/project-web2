<?php
session_name("admin");
session_start();

include '../../config/data_connect.php';
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $product_name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $price = isset($_POST['price']) ? trim($_POST['price']) : '';
    $category_name = isset($_POST['category']) ? trim($_POST['category']) : '';
    $size_id = isset($_POST['size']) ? trim($_POST['size']) : '';
    $status = isset($_POST['status']) ? trim($_POST['status']) : '';
    $ingredient = isset($_POST['ingredient']) ? trim($_POST['ingredient']) : '';
    $expiration_date = isset($_POST['expiration_date']) ? trim($_POST['expiration_date']) : '';
    $storage = isset($_POST['storage']) ? trim($_POST['storage']) : '';
    
    $response = ["status" => "error", "message" => ""];
    

    // Kiểm tra các trường bắt buộc
    $missingFields = [];

    if (empty($product_name)) $missingFields[] = "Product name";
    if (empty($price)) $missingFields[] = "Price";
    if (empty($category_name)) $missingFields[] = "Category";
    if (empty($size_id)) $missingFields[] = "Size";
    if (empty($status)) $missingFields[] = "Status";
    if (empty($ingredient)) $missingFields[] = "Ingredient";
    if (empty($expiration_date)) $missingFields[] = "Expiration date";
    if (empty($storage)) $missingFields[] = "Storage instructions";
    
    if (!empty($missingFields)) {
        $response["message"] = "Please fill in the following required fields: " . implode(", ", $missingFields);
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
    $stmt = $conn->prepare("INSERT INTO product (product_name, price, category_id, size_id, status, ingredients, expiration_date, storage_instructions, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sdiisssss", $product_name, $price, $category_id, $size_id, $status, $ingredient, $expiration_date, $storage, $imagePath);

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
