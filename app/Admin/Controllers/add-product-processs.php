<?php
// require_once "../Api_php/check-session-admin.php";

include '../config/db.php'; // Kết nối database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $price = trim($_POST['price']);
    $status = trim($_POST['status']);
    $category = trim($_POST['category']);
    $size = trim($_POST['size']);
    $description = trim($_POST['description']);

    if (empty($name) || empty($price) || empty($status) || empty($category) || empty($size)) {
        $_SESSION['error'] = "Please fill in all required fields.";
        header("Location: ../Views/add-product.php");
        exit();
    }

    if (!is_numeric($price) || $price < 0) {
        $_SESSION['error'] = "Invalid price.";
        header("Location: ../Views/add-product.php");
        exit();
    }

    $imagePath = "";
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $targetDir = "../../public/assets/img/";
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        $imagePath = $targetDir . basename($_FILES['image']['name']);

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
            $_SESSION['error'] = "Failed to upload image.";
            header("Location: ../Views/add-product.php");
            exit();
        }
    }

    $stmt = $conn->prepare("INSERT INTO products (name, price, status, category, size, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsssss", $name, $price, $status, $category, $size, $description, $imagePath);

    if ($stmt->execute()) {
        $_SESSION['success'] = "Product added successfully.";
        header("Location: ../Views/list-product.php");
        exit();
    } else {
        $_SESSION['error'] = "Failed to add product.";
        header("Location: ../Views/add-product.php");
        exit();
    }
}
?>
