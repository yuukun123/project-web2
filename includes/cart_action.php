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
        "message" => "Please log in before performing this action."
    ]);
    exit;
}

$username = $_SESSION['user']['username'];
$role = $_SESSION['user']['role'];

$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? '';

switch ($action) {
    case "update":
        updateQuantity($conn, $username, $data);
        break;
    case "remove":
        removeItem($conn, $username, $data);
        break;
    case "add":
        addToCart($conn, $username, $data);
        break;
    default:
        if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["cart_count"])) {
            getCartCount($conn, $username);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid action."]);
        }
        break;
}

/* 🛒 Thêm sản phẩm vào giỏ hàng */
function addToCart($conn, $username, $data) {
    $product_id = $data['product_id'] ?? 0;
    if (!$product_id) {
        echo json_encode(["success" => false, "message" => "Missing product_id."]);
        exit;
    }

    $sql_check = "SELECT quantity FROM cart WHERE user_name = ? AND product_id = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("si", $username, $product_id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        $sql_update = "UPDATE cart SET quantity = quantity + 1 WHERE user_name = ? AND product_id = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("si", $username, $product_id);
        $stmt_update->execute();
    } else {
        $sql_insert = "INSERT INTO cart (user_name, product_id, quantity) VALUES (?, ?, 1)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("si", $username, $product_id);
        $stmt_insert->execute();
    }

    echo json_encode(["success" => true, "message" => "The product has been added to the cart."]);
}

/* 🔄 Cập nhật số lượng sản phẩm */
function updateQuantity($conn, $username, $data) {
    $product_id = $data['product_id'] ?? 0;
    $new_quantity = $data['quantity'] ?? 1;

    if (!$product_id || $new_quantity < 1) {
        echo json_encode(["success" => false, "message" => "Invalid data."]);
        exit;
    }

    $sql = "UPDATE cart SET quantity = ? WHERE user_name = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isi", $new_quantity, $username, $product_id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Quantity updated successfully."]);
}

/* ❌ Xóa sản phẩm khỏi giỏ hàng */
function removeItem($conn, $username, $data) {
    $product_id = $data['product_id'] ?? 0;

    if (!$product_id) {
        echo json_encode(["success" => false, "message" => "Invalid data."]);
        exit;
    }

    $sql = "DELETE FROM cart WHERE user_name = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $username, $product_id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "The product has been deleted."]);
}

/* 🛍️ Lấy số lượng sản phẩm trong giỏ hàng */
function getCartCount($conn, $username) {
    $sql = "SELECT SUM(quantity) AS total FROM cart WHERE user_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $totalItems = $row['total'] ?? 0;

    echo json_encode(["count" => $totalItems]);
    exit;
}
