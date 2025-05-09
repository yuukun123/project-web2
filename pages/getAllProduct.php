<?php
// Kết nối DB
if (!isset($conn)) {
    include('../app/config/data_connect.php');
}

// Lấy từ khóa tìm kiếm từ query string
$term = isset($_GET['term']) ? $_GET['term'] : '';
$term = '%' . $term . '%';

// Truy vấn MySQL với COLLATE để bỏ dấu (nếu MySQL hỗ trợ)
$sql = "SELECT product_id, product_name, price, image, category_id
        FROM product
        WHERE product_name COLLATE utf8mb4_general_ci LIKE ?
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
exit;
?>
