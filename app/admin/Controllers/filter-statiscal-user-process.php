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
    SELECT u.user_name, COUNT(DISTINCT o.order_id) as total_order, SUM(o.total_cost) as total_spending, u.user_name,u.email
    FROM users as u
    JOIN orders as o ON o.user_name = u.user_name
    JOIN order_detail as od ON o.order_id = od.order_id
    WHERE o.delivery_date BETWEEN ? AND ? 
    AND o.status = 'Completed'
    GROUP BY u.user_name
    ORDER BY total_spending DESC
    
");
$stmt_best->bind_param("ss", $fromDate, $toDate);
$stmt_best->execute();
$result_user = $stmt_best->get_result();
$user = $result_user->fetch_all(MYSQLI_ASSOC);
// Trả về JSON
echo json_encode($user);
?>