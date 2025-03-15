<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Kết nối database nếu chưa có
if (!isset($conn)) {
    include_once "../app/config/data_connect.php";
}

// Kiểm tra kết nối database
// if (!isset($conn) || $conn === null) {
//     die(json_encode(["success" => false, "message" => "Lỗi: Kết nối database chưa được khởi tạo!"]));
// }

// Kiểm tra đăng nhập
$user_id = $_SESSION['user_id'] ?? 0;
// if (!$user_id) {
//     echo json_encode(["success" => false, "message" => "Vui lòng đăng nhập để xem giỏ hàng."]);
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

// Lưu dữ liệu vào mảng để dùng sau
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Kiểm tra nếu giỏ hàng rỗng
// if (empty($products)) {
//     echo '<p>Giỏ hàng của bạn đang trống.</p>';
//     exit;
// }


echo '<div class="shopping-cart">
    <button class="close">
        <ion-icon name="close-outline"></ion-icon>
    </button>
    <div class="cart-scroll">';


// Hiển thị danh sách sản phẩm trong giỏ hàng
foreach ($products as $row) {
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
        </div>
    ';
}

echo '
    </div>
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
