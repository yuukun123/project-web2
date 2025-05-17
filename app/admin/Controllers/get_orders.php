<?php
header('Content-Type: application/json');
include __DIR__ . '/../../config/data_connect.php';

// Lấy tham số lọc và phân trang
$statusFilter = $_GET['status'] ?? '';
$fromDate = $_GET['from_date'] ?? '';
$toDate = $_GET['to_date'] ?? '';
$locationFilter = $_GET['location'] ?? '';
$search = $_GET['search'] ?? '';
$page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
$offset = ($page - 1) * $limit;

// Câu truy vấn cơ bản
$where = "WHERE 1=1";

if (!empty($statusFilter)) {
    $where .= " AND o.status = '" . $conn->real_escape_string($statusFilter) . "'";
}
if (!empty($fromDate) && !empty($toDate)) {
    $where .= " AND o.order_date BETWEEN '" . $conn->real_escape_string($fromDate) . "' AND '" . $conn->real_escape_string($toDate) . "'";
}
if (!empty($locationFilter)) {
    $loc = $conn->real_escape_string($locationFilter);
    $where .= " AND (o.shipping_ward LIKE '%$loc%' 
                  OR o.shipping_district LIKE '%$loc%' 
                  OR o.shipping_city LIKE '%$loc%')";
}
if (!empty($search)) {
    $key = $conn->real_escape_string($search);
    $where .= " AND (o.order_id LIKE '%$key%' 
                  OR u.user_name LIKE '%$key%')";
}

// Lấy tổng số bản ghi để tính phân trang
$countSql = "SELECT COUNT(*) as total FROM orders o 
             LEFT JOIN users u ON o.user_name = u.user_name 
             $where";
$countResult = $conn->query($countSql);
$totalRows = $countResult->fetch_assoc()['total'];
$totalPages = ceil($totalRows / $limit);

// Truy vấn có phân trang
$dataSql = "SELECT o.order_id, u.user_name, o.order_date, o.delivery_date, o.delivery_time,
                   o.total_cost, o.status, o.payment_method,
                   CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) AS full_address
            FROM orders o
            LEFT JOIN users u ON o.user_name = u.user_name
            $where
            ORDER BY o.order_date DESC
            LIMIT $limit OFFSET $offset";

$dataResult = $conn->query($dataSql);
$orders = [];

while ($row = $dataResult->fetch_assoc()) {
    $orders[] = $row;
}

// Trả kết quả JSON
echo json_encode([
    'orders' => $orders,
    'total_pages' => $totalPages,
    'current_page' => $page
]);
