<?php
include '../../config/data_connect.php';
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Lấy dữ liệu từ fetch() (JSON)
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['searchValue']) || empty($data['searchValue'])) {
    echo json_encode(["error" => "Thiếu dữ liệu search"]);
    exit;
}

$dataSearch = $data['searchValue'];

// Truy vấn an toàn với prepared statement
$stmt = $conn->prepare("
    SELECT u.user_name, COUNT(od.order_id) as total_order, SUM(od.quantity) as total_spending, u.user_id
    FROM users as u
    JOIN orders as o ON o.user_id = u.user_id
    JOIN order_detail as od ON o.order_id = od.order_id
    WHERE u.user_id = ? OR u.user_name LIKE ?
    GROUP BY u.user_name
    ORDER BY total_spending DESC
");
$searchParam = "%{$dataSearch}%"; // Chuẩn bị chuỗi LIKE
$stmt->bind_param("ss", $dataSearch, $searchParam); // Gán giá trị
$stmt->execute();
$result = $stmt->get_result();

$search_data = [];
while ($row = $result->fetch_assoc()) {
    $search_data[] = $row;
}

// Trả về JSON
echo json_encode($search_data);
?>
