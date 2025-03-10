<?php
// Kết nối DB
if (!isset($conn)) {
    include('../app/config/data_connect.php');
}

// Lấy từ khóa tìm kiếm từ query string (VD: ?term=apple)
$term = isset($_GET['term']) ? $_GET['term'] : '';
$term = '%' . $term . '%';

// Truy vấn MySQL
$sql = "SELECT product_id, product_name, price, image, category_id
        FROM PRODUCT
        WHERE product_name LIKE ?
          AND status = 'Available'";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $term);
$stmt->execute();
$result = $stmt->get_result();

// Đưa kết quả vào mảng
$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Trả về JSON
header('Content-Type: application/json');
echo json_encode($products);
?>