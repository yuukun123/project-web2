<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);


// Kết nối database nếu chưa có
if (!isset($conn)) {
    include_once "../app/config/data_connect.php";
}

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

if (empty($products)) {
    echo '<div class="empty-cart">
            <ion-icon name="close-circle-outline"></ion-icon>    
            Không có sản phẩm trong giỏ hàng.
        </div>';
}


// Xuất dữ liệu giỏ hàng (có thể debug dữ liệu bằng console)
echo "<script>console.log('Dữ liệu giỏ hàng: ', " . json_encode($products) . ");</script>";


// Hiển thị danh sách sản phẩm trong giỏ hàng
foreach ($products as $row) {
    $total_price += $row["price"] * $row["quantity"];
    echo '

        <div class="cart-items">
            <img src="' . $row["image"] . '" height="74" width="60" class="cart-img" alt="">
            <span class="infor">
                <button class="close-mini" onclick="removeFromCart(' . $row["product_id"] . ')">
                    <span class="head-text">' . $row["product_name"] . '</span>
                    <ion-icon name="close-outline"></ion-icon>
                </button>
                
                <p class="bottom-text">SL
                    <button class="click" onclick="updateQuantity(' . $row["product_id"] . ', -1)">
                        <ion-icon name="caret-back-outline"></ion-icon>
                    </button>
                    <input type="number" class="quantity-input" id="quantity_' . $row["product_id"] . '" 
                        value="' . $row["quantity"] . '" 
                        min="1" 
                        onchange="updateQuantityDirectly(' . $row["product_id"] . ', this.value)">
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
    <div class="provisional-charge">
        <p>Provisional invoice :</p>
        <p>' . number_format($total_price, 0, ",", ".") . ' VND</p>
    </div>

    ';
?>