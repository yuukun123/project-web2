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
    !isset($_SESSION['user']['username']) || 
    !isset($_SESSION['user']['role'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Vui lòng đăng nhập trước khi thao tác."
    ]);
    exit;
}

$username = $_SESSION['user']['username'];
$role = $_SESSION['user']['role'];
$order_date = date('Y-m-d H:i:s');

// Lấy dữ liệu từ form
$fullname = mysqli_real_escape_string($conn, $_POST['full_name'] ?? '');
$phone = mysqli_real_escape_string($conn, $_POST['phone'] ?? '');
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
    WHERE c.user_name = '$username'
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
$stmt = $conn->prepare("INSERT INTO orders (user_name, recipient_name, recipient_phone, order_date, delivery_date, total_cost, payment_method, notes, shipping_city, shipping_district, shipping_ward, shipping_street) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssdssssss", $username, $fullname, $phone, $order_date, $delivery_date, $total_cost, $payment_method, $note, $shipping_city, $shipping_district, $shipping_ward, $shipping_street);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Lỗi khi tạo đơn hàng: " . $stmt->error]);
    exit;
}

// Lấy order_id tự động tăng từ cơ sở dữ liệu
$order_id = $stmt->insert_id;  // Chú ý: Đây sẽ lấy giá trị `order_id` mới nhất được chèn
$stmt->close();

$_SESSION['last_order_id'] = $order_id; // Lưu ID đơn hàng vào session để dùng cho get_last_order_items.php

// Tiến hành thêm chi tiết đơn hàng như trước
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
$stmt = $conn->prepare("DELETE FROM cart WHERE user_name = ?");
$stmt->bind_param("s", $username);
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
