<?php
session_start();
include '../app/config/data_connect.php'; // Kết nối database

header("Content-Type: application/json");

// Kiểm tra đăng nhập
if (!isset($_SESSION['user_id']) || $_SESSION['user_id'] === null) {
    echo json_encode([
        "success" => false,
        "message" => "User chưa đăng nhập",
        "debug_user_id" => $_SESSION['user_id'] ?? "Không có user_id"
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? '';
$product_id = intval($data['product_id'] ?? 0);
$quantity = intval($data['quantity'] ?? 1); // Lấy số lượng từ yêu cầu AJAX, mặc định là 1

if ($action == "add" && $product_id > 0) {
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    $sql_check = "SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("ii", $user_id, $product_id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên
        $sql_update = "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("iii", $quantity, $user_id, $product_id);
        $stmt_update->execute();
    } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ
        $sql_insert = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("iii", $user_id, $product_id, $quantity);
        $stmt_insert->execute();
    }

    // Truy vấn lại tổng số lượng sản phẩm trong giỏ hàng của user
    $cart_query = "SELECT SUM(quantity) as total_items FROM cart WHERE user_id = ?";
    $stmt_cart = $conn->prepare($cart_query);
    $stmt_cart->bind_param("i", $user_id);
    $stmt_cart->execute();
    $cart_result = $stmt_cart->get_result();
    $cart_row = $cart_result->fetch_assoc();
    $cart_count = $cart_row['total_items'] ?? 0; // Tổng số sản phẩm trong giỏ

    echo json_encode([
        "success" => true,
        "message" => "Sản phẩm đã được thêm vào giỏ hàng",
        "cart_count" => $cart_count
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Có lỗi xảy ra"]);
}
?>
