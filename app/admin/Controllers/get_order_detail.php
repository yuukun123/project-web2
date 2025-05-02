<?php
header('Content-Type: application/json');

include_once __DIR__ . '/../../config/config.php';
include __DIR__ . '/../../config/data_connect.php';

if (!isset($_GET['order_id'])) {
    echo json_encode(['error' => 'Missing order_id']);
    exit;
}

$order_id = intval($_GET['order_id']);
$sql = "SELECT o.order_id, u.user_name AS customer_name, u.phone,
               o.order_date, o.status, o.notes,
               CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) AS delivery_address,
               p.product_name, od.product_id, od.quantity, od.note
        FROM orders o
        LEFT JOIN users u ON o.user_name = u.user_name
        LEFT JOIN order_detail od ON o.order_id = od.order_id
        LEFT JOIN product p ON od.product_id = p.product_id
        WHERE o.order_id = ?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$result = $stmt->get_result();

$rows = $result->fetch_all(MYSQLI_ASSOC);

if (!$rows) {
    echo json_encode(['error' => 'Order not found']);
    exit;
}

// Lấy thông tin chung từ dòng đầu
$order = $rows[0];

$productLines = [];
$productIDs = [];

foreach ($rows as $row) {
    $line = "<strong>" . htmlspecialchars($row['product_name']) . "</strong> x" . $row['quantity'];
    if (!empty($row['note'])) {
        $line .= " (Note: " . $row['note'] . ")";
    }
    $productLines[] = $line;
    $productIDs[] = $row['product_id'];
}

$response = [
    'order_id' => $order['order_id'],
    'customer_name' => $order['customer_name'],
    'phone' => $order['phone'],
    'order_date' => $order['order_date'],
    'status' => $order['status'],
    'notes' => $order['notes'],
    'delivery_address' => $order['delivery_address'],
    'product_info' => implode("<br>", $productLines),

    'product_id' => implode(', ', $productIDs) // 👈 
];

echo json_encode($response);

?>
