<?php
include '../../config/data_connect.php';
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_GET['user_name'])) {
    echo json_encode(["error" => "user_name is required"]);
    exit();
}

$user_name = $_GET['user_name'];
$fromDate = $_GET['fromDate'] ?? null;
$toDate = $_GET['toDate'] ?? null;

// Tạo truy vấn SQL cơ bản
$query = "
    SELECT o.order_id, o.total_cost, o.payment_method,
           c.user_name, c.phone, c.street, c.ward, c.district, c.city,
           p.product_name, od.quantity, o.status, od.price,
           o.shipping_street, o.shipping_ward, o.shipping_district, o.shipping_city,
           o.notes, od.note
    FROM orders AS o
    JOIN users AS c ON o.user_name = c.user_name
    JOIN order_detail AS od ON o.order_id = od.order_id
    JOIN product AS p ON od.product_id = p.product_id
    WHERE c.user_name = ?
    AND o.status = 'Completed'
";

// Nếu có lọc theo ngày thì thêm điều kiện
$params = [$user_name];
$types = "s"; // string cho user_name

if ($fromDate && $toDate) {
    $query .= " AND DATE(o.delivery_date) BETWEEN ? AND ?";
    $params[] = $fromDate;
    $params[] = $toDate;
    $types .= "ss"; // thêm 2 string
}

$stmt = $conn->prepare($query);

// Dùng call_user_func_array để bind_param với mảng linh hoạt
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
?>
