<?php
session_start();
include "../app/config/data_connect.php"; // Kết nối CSDL

header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? '';

if (!isset($_SESSION['user_id']) || $_SESSION['user_id'] === null) {
    echo json_encode([
        "success" => false,
        "message" => "User chưa đăng nhập",
        "debug_user_id" => $_SESSION['user_id'] ?? "Không có user_id"
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["cart_count"])) {
    // ✅ Lấy số lượng giỏ hàng
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

// ✅ Xử lý các hành động khác (Thêm, Cập nhật, Xóa)
switch ($action) {
    case "updateQuantity":
        updateQuantity($conn, $user_id, $data);
        break;

    case "removeItem":
        removeItem($conn, $user_id, $data);
        break;

    case "add":
        addToCart($conn, $user_id, $data);
        break;

    default:
        echo json_encode(["success" => false, "message" => "Hành động không hợp lệ"]);
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

    echo json_encode(["success" => true]);
}

/* 🔄 Cập nhật số lượng */
function updateQuantity($conn, $user_id, $data) {
    $product_id = $data['product_id'] ?? 0;
    $change = $data['change'] ?? 0;

    if (!$product_id || $change == 0) {
        echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ"]);
        exit;
    }

    $sql = "UPDATE cart SET quantity = GREATEST(quantity + ?, 1) WHERE user_id = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $change, $user_id, $product_id);
    $stmt->execute();

    echo json_encode(["success" => true]);
}

/* ❌ Xóa sản phẩm */
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

    echo json_encode(["success" => true]);
}
?>
