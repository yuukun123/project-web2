<?php
session_start();
include '../config/db.php'; // Kết nối đến database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Nhận dữ liệu từ form
    $id = trim($_POST['id']);
    $name = trim($_POST['name']);
    $price = trim($_POST['price']);
    $status = trim($_POST['status']);
    $category = trim($_POST['category']);
    $size = trim($_POST['size']);
    $description = trim($_POST['description']);
    
    // Kiểm tra dữ liệu có rỗng không
    if (empty($id) || empty($name) || empty($price) || empty($status) || empty($category) || empty($size)) {
        $_SESSION['error'] = "Please fill in all required fields.";
        header("Location: add-product.php");
        exit();
    }
    
    // Kiểm tra giá hợp lệ
    if (!is_numeric($price) || $price < 0) {
        $_SESSION['error'] = "Invalid price.";
        header("Location: add-product.php");
        exit();
    }
    
    // Xử lý upload ảnh
    $imagePath = "";
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $targetDir = "uploads/";
        $imagePath = $targetDir . basename($_FILES['image']['name']);
        
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
            $_SESSION['error'] = "Failed to upload image.";
            header("Location: add-product.php");
            exit();
        }
    }
    
    // Thêm sản phẩm vào database
    $stmt = $conn->prepare("INSERT INTO products (id, name, price, status, category, size, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdsssss", $id, $name, $price, $status, $category, $size, $description, $imagePath);
    
    if ($stmt->execute()) {
        $_SESSION['success'] = "Product added successfully.";
        header("Location: list-product.php");
        exit();
    } else {
        $_SESSION['error'] = "Failed to add product.";
        header("Location: add-product.php");
        exit();
    }
}
?>
