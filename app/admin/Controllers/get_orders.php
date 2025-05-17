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

$city = isset($_GET['city']) ? trim($_GET['city']) : '';
$district = isset($_GET['district']) ? trim($_GET['district']) : '';
$ward = isset($_GET['ward']) ? trim($_GET['ward']) : '';

// Xây dựng điều kiện WHERE
$whereClauses = ["1=1"];
$params = [];
$types = '';

if (!empty($statusFilter)) {
    $whereClauses[] = "o.status = ?";
    $params[] = $statusFilter;
    $types .= 's';
}

if (!empty($fromDate) && !empty($toDate)) {
    $whereClauses[] = "o.order_date BETWEEN ? AND ?";
    $params[] = $fromDate;
    $params[] = $toDate;
    $types .= 'ss';
}

if (!empty($locationFilter)) {
    $like = "%$locationFilter%";
    $whereClauses[] = "(o.shipping_ward LIKE ? OR o.shipping_district LIKE ? OR o.shipping_city LIKE ?)";
    array_push($params, $like, $like, $like);
    $types .= 'sss';
}

if (!empty($search)) {
    $like = "%$search%";
    $whereClauses[] = "(o.order_id LIKE ? OR u.user_name LIKE ?)";
    array_push($params, $like, $like);
    $types .= 'ss';
}

if (!empty($city)) {
    $whereClauses[] = "CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) LIKE ?";
    $params[] = "%$city%";
    $types .= 's';
}
if (!empty($district)) {
    $whereClauses[] = "CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) LIKE ?";
    $params[] = "%$district%";
    $types .= 's';
}
if (!empty($ward)) {
    $whereClauses[] = "CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) LIKE ?";
    $params[] = "%$ward%";
    $types .= 's';
}

$where = "WHERE " . implode(" AND ", $whereClauses);

// ================== TRUY VẤN COUNT ==================
$countSql = "SELECT COUNT(*) as total FROM orders o 
             LEFT JOIN users u ON o.user_name = u.user_name 
             $where";
$stmt = $conn->prepare($countSql);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();
$totalRows = $result->fetch_assoc()['total'];
$totalPages = ceil($totalRows / $limit);
$stmt->close();

// ================== TRUY VẤN DỮ LIỆU ==================
$dataSql = "SELECT o.order_id, u.user_name, o.order_date, o.delivery_date, o.delivery_time,
                   o.total_cost, o.status, o.payment_method,
                   CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) AS full_address
            FROM orders o
            LEFT JOIN users u ON o.user_name = u.user_name
            $where
            ORDER BY o.order_date DESC
            LIMIT ? OFFSET ?";

$params[] = $limit;
$params[] = $offset;
$types .= 'ii';

$stmt = $conn->prepare($dataSql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$dataResult = $stmt->get_result();

$orders = [];
while ($row = $dataResult->fetch_assoc()) {
    $orders[] = $row;
}
$stmt->close();

// Trả kết quả JSON
echo json_encode([
    'orders' => $orders,
    'total_pages' => $totalPages,
    'current_page' => $page
]);
