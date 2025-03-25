<?php
include '../../config/data_connect.php';
header('Content-Type: application/json');
error_reporting(E_ALL);
 ini_set('display_errors', 1);
if (!isset($_GET['product_id'])) {
    echo json_encode(["error" => "Thiếu product_id"]);
    exit();
}

$product_id = $_GET['product_id'];

// Lấy danh sách hóa đơn chứa sản phẩm
$query = "
    SELECT o.order_id, o.total_cost, o.payment_method, 
           c.user_id, c.user_name, c.phone, c.street, c.ward, c.district, c.city,
           p.product_name, od.quantity, o.status, od.price, o.shipping_street, o.shipping_ward, o.shipping_district, o.shipping_city,o.notes,od.note
    FROM orders AS o
    JOIN users AS c ON o.user_id = c.user_id
    JOIN order_detail AS od ON o.order_id = od.order_id
    JOIN product AS p ON od.product_id = p.product_id
    WHERE p.product_id = ? 
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $product_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

$stmt->close();
$conn->close();
header("Content-Type: application/json");
echo json_encode($orders);
?>
