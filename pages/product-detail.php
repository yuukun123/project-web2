<?php
include '../app/config/data_connect.php'; // Kết nối database

// Kiểm tra xem ID có được truyền lên không
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Chuyển ID về kiểu số để tránh lỗi SQL Injection
    
    // Truy vấn sản phẩm theo ID
    $sql = "SELECT * FROM product WHERE product_id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc(); // Lấy dữ liệu sản phẩm
    } else {
        die("Sản phẩm không tồn tại!");
    }
} else {
    die("Không có sản phẩm nào được chọn!");
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title><?php echo $product['name']; ?></title>
</head>
<body>

<h2><?php echo $product['name']; ?></h2>
<p>Giá: <?php echo number_format($product['price']); ?> VNĐ</p>
<p>Mô tả: <?php echo $product['description']; ?></p>

<a href="index.php">Quay lại danh sách</a>

</body>
</html>

