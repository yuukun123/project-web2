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

$user_id = (int) $_SESSION['user']['user_id']; // Ép kiểu để đảm bảo an toàn
$username = $_SESSION['user']['username'];
$role = $_SESSION['user']['role'];

$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? '';

switch ($action) {
    case "update":
        updateQuantity($conn, $user_id, $data);
        break;
    case "remove":
        removeItem($conn, $user_id, $data);
        break;
    case "add":
        addToCart($conn, $user_id, $data);
        break;
    default:
        if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["cart_count"])) {
            getCartCount($conn, $user_id);
        } else {
            echo json_encode(["success" => false, "message" => "Hành động không hợp lệ"]);
        }
        break;
}

/* 🛒 Thêm sản phẩm vào giỏ hàng */
function addToCart($conn, $user_id, $data) {
    $product_id = $data['product_id'] ?? 0;
    if (!$product_id) {
        echo json_encode(["success" => false, "message" => "Thiếu product_id"]);
        exit;
    }

    $sql_check = "SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("ii", $user_id, $product_id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        $sql_update = "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("ii", $user_id, $product_id);
        $stmt_update->execute();
    } else {
        $sql_insert = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("ii", $user_id, $product_id);
        $stmt_insert->execute();
    }

    echo json_encode(["success" => true, "message" => "Sản phẩm đã được thêm vào giỏ hàng"]);
}

/* 🔄 Cập nhật số lượng sản phẩm */
function updateQuantity($conn, $user_id, $data) {
    $product_id = $data['product_id'] ?? 0;
    $new_quantity = $data['quantity'] ?? 1;

    if (!$product_id || $new_quantity < 1) {
        echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ"]);
        exit;
    }

    $sql = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $new_quantity, $user_id, $product_id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Cập nhật số lượng thành công"]);
}

/* ❌ Xóa sản phẩm khỏi giỏ hàng */
function removeItem($conn, $user_id, $data) {
    $product_id = $data['product_id'] ?? 0;

    if (!$product_id) {
        echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ"]);
        exit;
    }

    $sql = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Sản phẩm đã được xóa"]);
}

/* 🛍️ Lấy số lượng sản phẩm trong giỏ hàng */
function getCartCount($conn, $user_id) {
    $sql = "SELECT SUM(quantity) AS total FROM cart WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $totalItems = $row['total'] ?? 0;

    echo json_encode(["count" => $totalItems]);
    exit;
}
