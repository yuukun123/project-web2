<?php
session_name("user");
session_start();
header('Content-Type: application/json');

// Kết nối database
include('../app/config/data_connect.php');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// Giả sử bạn lưu order_id cuối cùng trong session sau khi đặt hàng
if (!isset($_SESSION['last_order_id'])) {
    echo json_encode([]);
    exit();
}

$order_id = $_SESSION['last_order_id'];

// Truy vấn danh sách sản phẩm của order cuối
$sql = "SELECT p.product_name, od.quantity, od.price
        FROM order_detail od
        JOIN product p ON od.product_id = p.product_id
        WHERE od.order_id = ?";
        
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$result = $stmt->get_result();

$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = [
        'product_name' => $row['product_name'],
        'quantity' => $row['quantity'],
        'price' => $row['price']
    ];
}

echo json_encode($items);

$stmt->close();
$conn->close();
?>
