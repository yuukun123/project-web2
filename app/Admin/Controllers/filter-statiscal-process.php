<?php
session_name("admin");
session_start();
include '../../config/data_connect.php';
header("Content-Type: application/json");

// Nhận dữ liệu từ frontend
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu đầu vào
if (!isset($data['fromDate']) || !isset($data['toDate'])) {
    echo json_encode(["error" => "Thiếu dữ liệu ngày lọc"]);
    exit;
}

$fromDate = $data['fromDate'];
$toDate = $data['toDate'];

// Tránh SQL Injection
$stmt_best = $conn->prepare("
    SELECT o.delivery_date, p.product_name, od.quantity, o.order_id, p.product_id
    FROM order_detail AS od 
    JOIN orders AS o ON o.order_id = od.order_id 
    JOIN product AS p ON od.product_id = p.product_id 
    WHERE o.delivery_date BETWEEN ? AND ? 
    ORDER BY od.quantity DESC 
    LIMIT 10
");
$stmt_best->bind_param("ss", $fromDate, $toDate);
$stmt_best->execute();
$result_bestseller = $stmt_best->get_result();

$stmt_unpop = $conn->prepare("
    SELECT o.delivery_date, p.product_name, od.quantity, o.order_id, p.product_id
    FROM order_detail AS od 
    JOIN orders AS o ON o.order_id = od.order_id 
    JOIN product AS p ON od.product_id = p.product_id 
    WHERE o.delivery_date BETWEEN ? AND ? 
    ORDER BY od.quantity ASC 
    LIMIT 10
");
$stmt_unpop->bind_param("ss", $fromDate, $toDate);
$stmt_unpop->execute();
$result_unpopular = $stmt_unpop->get_result();

// Lấy dữ liệu
$order_data_bestseller = $result_bestseller->fetch_all(MYSQLI_ASSOC);
$order_data_unpopular = $result_unpopular->fetch_all(MYSQLI_ASSOC);

// Trả về JSON
echo json_encode([
    "bestseller_filter" => $order_data_bestseller,
    "unpopular_filter" => $order_data_unpopular
]);

// Đóng kết nối
$stmt_best->close();
$stmt_unpop->close();
$conn->close();
?>
