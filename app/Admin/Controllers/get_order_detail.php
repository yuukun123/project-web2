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
               GROUP_CONCAT(CONCAT(p.product_name, ' x', od.quantity) SEPARATOR '; ') AS product_info,
               GROUP_CONCAT(od.product_id) AS product_id
        FROM orders o
        LEFT JOIN users u ON o.user_name = u.user_name
        LEFT JOIN order_detail od ON o.order_id = od.order_id
        LEFT JOIN product p ON od.product_id = p.product_id
        WHERE o.order_id = ?
        GROUP BY o.order_id";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Order not found']);
}
?>
