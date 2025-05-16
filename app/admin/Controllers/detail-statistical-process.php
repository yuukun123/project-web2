<?php
include '../../config/data_connect.php';
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_GET['product_id'])) {
    echo json_encode(["error" => "Missing product_id."]);
    exit();
}

$product_id = $_GET['product_id'];
$fromDate = $_GET['fromDate'] ?? null;
$toDate = $_GET['toDate'] ?? null;

// Truy vấn cơ bản
$query = "
    SELECT o.order_id, o.total_cost, o.payment_method, 
           c.user_name, c.phone, c.street, c.ward, c.district, c.city,
           p.product_name, od.quantity, o.status, od.price, 
           o.shipping_street, o.shipping_ward, o.shipping_district, o.shipping_city, 
           o.notes, od.note, o.delivery_date
    FROM orders AS o
    JOIN users AS c ON o.user_name = c.user_name
    JOIN order_detail AS od ON o.order_id = od.order_id
    JOIN product AS p ON od.product_id = p.product_id
    WHERE o.order_id IN (
        SELECT DISTINCT od2.order_id 
        FROM order_detail AS od2
        WHERE od2.product_id = ?
    ) AND o.status = 'Completed'
";

// Thêm điều kiện lọc theo ngày nếu có
$params = [$product_id];
$types = "i"; // i = integer cho product_id

if ($fromDate && $toDate) {
    $query .= " AND DATE(o.delivery_date) BETWEEN ? AND ?";
    $params[] = $fromDate;
    $params[] = $toDate;
    $types .= "ss"; // 2 strings for date
}

$query .= " ORDER BY o.order_id DESC";

$stmt = $conn->prepare($query);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($orders);
