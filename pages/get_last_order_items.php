<?php
session_name("user");
session_start();
header('Content-Type: application/json');

include('../app/config/data_connect.php');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

if (!isset($_SESSION['last_order_id'])) {
    echo json_encode([]);
    exit();
}

$order_id = $_SESSION['last_order_id'];

$sql = "SELECT 
            p.product_name, 
            od.quantity, 
            od.price,
            o.recipient_name,
            CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) AS receive_address
        FROM order_detail od
        JOIN product p ON od.product_id = p.product_id
        JOIN orders o ON od.order_id = o.order_id
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
        'price' => $row['price'],
        'receive_address' => $row['receive_address'],
        'receive_name' => $row['recipient_name']
    ];
}

echo json_encode($items);

$stmt->close();
$conn->close();
?>
