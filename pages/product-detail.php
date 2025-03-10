<?php
include '../app/config/data_connect.php'; // Kết nối database
include __DIR__ . '../app/config/config.php';
// Kiểm tra xem ID có được truyền lên không
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Chuyển ID về kiểu số để tránh lỗi SQL Injection

    // Truy vấn sản phẩm theo ID
    $sql = "SELECT * FROM product WHERE product_id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc(); // Lấy dữ liệu sản phẩm
    } else {
        die("Sản phẩm không tồn tại!");
    }
} else {
    die("Không có sản phẩm nào được chọn!");
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title><?php echo $product['name']; ?></title>
    
</head>
<?php include '../includes/header.php'; ?>
    
    <!-- Main screen -->
    <div class="Home_main">
        <div class="Cake-infor">
            <div class="image-cake">
                echo '<img src="' . htmlspecialchars($item['image']) . '" alt="' . htmlspecialchars($item['product_name']) . '">'
            </div>
            <div class="content">
                <h1>Avocado Mousse</h1>
                <div class="describe">
                    <p>
                    For those who love the pure creamy taste of avocado, Avocado Mousse is your "soulmate." 
                    Give it a try and let its flavor whisper to your heart.
                    </p>
                </div>
                <div class="buy-cake">
                    <div class="size-cake">
                        <p class="title-size">Size:</p>
                        <button class="size">16cm</button>
                    </div>
                    <div class="border"></div>
                    <div class="size-descibe">
                        <p class="price-10 mg-l">510.000 VNĐ</p>
                    </div>
                    <div class="border"></div>
                    <div class="quantity-cake">
                        <p class="title-quantity">Quantity: </p>
                        <div class="quantity-button">
                            <button class="minus-btn">-</button>
                            <input type="text" value="1">
                            <button class="plus-btn">+</button>
                        </div>
                    </div>
                </div>
                <div class="add-shopping-cart ">
                    <button class="sp-cart" id="add-cart-btn">
                        <p>Add to cart</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <?php include '../includes/footer.php'; ?>
</html>

