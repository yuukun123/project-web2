<?php
// session_start();
// include "../app/config/data_connect.php"; 

global $conn; // Khai báo biến global nếu cần

if (!isset($conn) && isset($GLOBALS['conn'])) {
    $conn = $GLOBALS['conn']; // Lấy từ biến global
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// include "cart_action.php";
// echo "<script>console.log('User ID từ PHP: " . ($_SESSION['user_id'] ?? 'Chưa có') . "');</script>";

if (!isset($conn)) {
    die("Lỗi: Kết nối database chưa được khởi tạo! Vui lòng kiểm tra lại index.php.");
}

$user_id = $_SESSION['user_id'] ?? 0;

// if (!$user_id) {
//     echo "<p>Vui lòng đăng nhập để xem giỏ hàng.</p>";
//     exit;
// }

// Lấy danh sách sản phẩm trong giỏ hàng
$sql = "SELECT cart.product_id, product.product_name, product.price, product.image, cart.quantity
        FROM cart
        INNER JOIN product ON cart.product_id = product.product_id
        WHERE cart.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$total_price = 0;

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Xuất JSON ra script để hiển thị trong console
echo "<script>console.log('Dữ liệu giỏ hàng: ', " . json_encode($products) . ");</script>";

echo '<div class="shopping-cart">
    <button class="close">
        <ion-icon name="close-outline"></ion-icon>
    </button>';

// Hiển thị danh sách sản phẩm
while ($row = $result->fetch_assoc()) {
    $total_price += $row["price"] * $row["quantity"];
    echo '
    <div class="cart-items">
        <img src="' . $row["image"] . '" height="74" width="60" class="cart-img" alt="">
        <span class="infor">
            <button class="close-mini" onclick="removeFromCart(' . $row["product_id"] . ')">
                <ion-icon name="close-outline"></ion-icon>
            </button>
            <p class="head-text">' . $row["product_name"] . '</p>
            <p class="bottom-text">SL
                <button class="click" onclick="updateQuantity(' . $row["product_id"] . ', -1)">
                    <ion-icon name="caret-back-outline"></ion-icon>
                </button>
                ' . $row["quantity"] . '
                <button class="click" onclick="updateQuantity(' . $row["product_id"] . ', 1)">
                    <ion-icon name="caret-forward-outline"></ion-icon>
                </button>
                <span class="price">
                    ' . number_format($row["price"], 0, ",", ".") . ' VND
                </span>
            </p>
        </span>
    </div>';
}

echo '
    <div class="provisional-charge">
        <p>Provisional invoice :</p>
        <p>' . number_format($total_price, 0, ",", ".") . ' VND</p>
    </div>
    <div class="Pay">
        <a href="./user-pay.html" target="_blank" class="pay-link">
            <button class="pay">Pay</button>
        </a>
    </div>
</div>
<div class="blur-overlay"></div>';
?>
