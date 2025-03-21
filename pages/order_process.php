<?php
session_name("user");
session_start();
include "../app/config/data_connect.php"; // Kết nối database

header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Kiểm tra đăng nhập
if (
    !isset($_SESSION['user']) || 
    !isset($_SESSION['user']['user_id']) || 
    !isset($_SESSION['user']['username']) || 
    !isset($_SESSION['user']['role']) || 
    !is_numeric($_SESSION['user']['user_id'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Vui lòng đăng nhập trước khi thao tác."
    ]);
    exit;
}

$user_id = (int) $_SESSION['user']['user_id'];
$username = $_SESSION['user']['username'];
$role = $_SESSION['user']['role'];
$order_date = date('Y-m-d H:i:s');

// Lấy dữ liệu từ form
$shipping_city = mysqli_real_escape_string($conn, $_POST['shipping_city_name'] ?? '');
$shipping_district = mysqli_real_escape_string($conn, $_POST['shipping_district_name'] ?? '');
$shipping_ward = mysqli_real_escape_string($conn, $_POST['shipping_ward_name'] ?? '');
$shipping_street = mysqli_real_escape_string($conn, $_POST['shipping_street'] ?? '');
$delivery_date = mysqli_real_escape_string($conn, $_POST['delivery_date'] ?? '');
$note = mysqli_real_escape_string($conn, $_POST['note'] ?? '');

// Kiểm tra hợp lệ phương thức thanh toán
$valid_methods = ['COD', 'Momo', 'Credit Card', 'VNPay'];
$payment_method = strtoupper($_POST['payment_method'] ?? 'COD');
if (!in_array($payment_method, $valid_methods)) {
    $payment_method = 'COD';
}


// Tính tổng tiền đơn hàng
$cart_query = mysqli_query($conn, "
    SELECT c.*, p.price 
    FROM cart c 
    JOIN product p ON c.product_id = p.product_id 
    WHERE c.user_id = '$user_id'
") or die(json_encode(["success" => false, "message" => "Lỗi truy vấn giỏ hàng!"]));


$total_cost = 0;
$cart_items = [];
while ($row = mysqli_fetch_assoc($cart_query)) {
    $subtotal = $row['quantity'] * $row['price'];
    $total_cost += $subtotal;
    $cart_items[] = $row;
}

// Nếu giỏ hàng rỗng
if (empty($cart_items)) {
    echo json_encode([
        "success" => false,
        "message" => "Giỏ hàng của bạn đang trống!"
    ]);
    exit;
}

// Tạo đơn hàng
$stmt = $conn->prepare("INSERT INTO orders (user_id, order_date, delivery_date, total_cost, payment_method, notes, shipping_city, shipping_district, shipping_ward, shipping_street) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("issdssssss", $user_id, $order_date, $delivery_date, $total_cost, $payment_method, $note, $shipping_city, $shipping_district, $shipping_ward, $shipping_street);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Lỗi khi tạo đơn hàng: " . $stmt->error]);
    exit;
}
$order_id = $stmt->insert_id;
$stmt->close();


$order_id = mysqli_insert_id($conn);
$_SESSION['last_order_id'] = $order_id; // Lưu ID đơn hàng vào session để dùng cho get_last_order_items.php

// Thêm chi tiết đơn hàng
foreach ($cart_items as $item) {
    $product_id = $item['product_id'];
    $quantity = $item['quantity'];
    $price = $item['price'];
    $product_note = isset($item['note']) ? mysqli_real_escape_string($conn, $item['note']) : '';

    mysqli_query($conn, "
        INSERT INTO order_detail (order_id, product_id, quantity, price, note) 
        VALUES ('$order_id', '$product_id', '$quantity', '$price', '$product_note')
    ");
}

// Xóa giỏ hàng sau khi đặt hàng thành công
$stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->close();

// Trả kết quả về JSON
echo json_encode([
    "success" => true,
    "message" => "Đặt hàng thành công!",
    "order_id" => $order_id
]);
exit;
?>
