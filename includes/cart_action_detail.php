<?php
session_name("user");
session_start();

header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Kiểm tra đăng nhập
if (
    !isset($_SESSION['user']) || 
    !isset($_SESSION['user']['username']) || 
    !isset($_SESSION['user']['role'])
) {
    echo json_encode(["success" => false, "message" => "User not logged in."]);
    exit;
}



include "../app/config/data_connect.php"; // Kết nối database

$username = $_SESSION['user']['username'];
$role = $_SESSION['user']['role'];

$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? '';
$product_id = intval($data['product_id'] ?? 0);
$quantity = intval($data['quantity'] ?? 1); // Lấy số lượng từ yêu cầu AJAX, mặc định là 1

// Kiểm tra user có tồn tại không
$sql_check_user = "SELECT user_name FROM users WHERE user_name = ?";
$stmt_check_user = $conn->prepare($sql_check_user);
$stmt_check_user->bind_param("s", $username);
$stmt_check_user->execute();
$result_user = $stmt_check_user->get_result();

if ($result_user->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User does not exist."]);
    exit;
}

if ($action == "add" && $product_id > 0) {
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    $sql_check = "SELECT quantity FROM cart WHERE user_name = ? AND product_id = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("si", $username, $product_id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên
        $sql_update = "UPDATE cart SET quantity = quantity + ? WHERE user_name = ? AND product_id = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("isi", $quantity, $username, $product_id);
        $stmt_update->execute();
    } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ
        $sql_insert = "INSERT INTO cart (user_name, product_id, quantity) VALUES (?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("sii", $username, $product_id, $quantity);
        $stmt_insert->execute();
    }

    // Truy vấn lại tổng số lượng sản phẩm trong giỏ hàng của user
    $cart_query = "SELECT SUM(quantity) as total_items FROM cart WHERE user_name = ?";
    $stmt_cart = $conn->prepare($cart_query);
    $stmt_cart->bind_param("s", $username);
    $stmt_cart->execute();
    $cart_result = $stmt_cart->get_result();
    $cart_row = $cart_result->fetch_assoc();
    $cart_count = $cart_row['total_items'] ?? 0; // Tổng số sản phẩm trong giỏ

    echo json_encode([
        "success" => true,
        "message" => "Product has been added to the cart.",
        "cart_count" => $cart_count
    ]);
} else {
    echo json_encode(["success" => false, "message" => "An error occurred."]);
}
?>
