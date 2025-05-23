<?php
include __DIR__ . '/../app/config/data_connect.php'; // Kết nối database

// Kiểm tra xem ID có được truyền lên không
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Chuyển ID về kiểu số để tránh lỗi SQL Injection

    // Truy vấn sản phẩm theo ID (bao gồm cột status)
    $sql = "SELECT *, status FROM product as P
            JOIN size as S ON P.size_id = S.size_id
            WHERE product_id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc(); // Lấy dữ liệu sản phẩm
    } else {
        die("Product does not exist!");
    }
} else {
    die("No product selected!");
}

// Truy vấn sản phẩm ngẫu nhiên
$sql = "SELECT * FROM product ORDER BY RAND() LIMIT 4";
$result = $conn->query($sql);
$product_rand = [];
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $product_rand[] = $row; 
    }
}else{
    die("Product does not exist");
}
?>

<?php require_once __DIR__ . '/../includes/header.php'; ?>

<?php
if (!empty($product)) {
    echo '
    <div class="Cake-infor">
        <div class="image-cake">
            <img src="' . htmlspecialchars($product['image']) . '" alt="' . htmlspecialchars($product['product_name']) . '">
        </div>
        <div class="content">
            <h1>' . $product['product_name'] . '</h1>
            <div class="describe">
                <p>' . $product['ingredients'] . '</p>
            </div>

            <div class="date-use">Expired: <span class="date-span">Best before ' .$product['expiration_date']. '</span> </div>
            <div class="date-use">Preserves: <span class="date-span" style="color: #8098cc;">' .$product['storage_instructions']. '</span></div>
            <div class="buy-cake">

                <div class="size-cake">
                    <p class="title-size">Size:</p>
                    <p class="size">' . $product['size_name'] . '</p>
                    
                </div>
                <div class="border"></div>
                <div class="size-descibe">
                    <p class="price-10 mg-l">' . number_format($product['price'], 0, ',', '.') . ' VNĐ</p>
                </div>
                <div class="border"></div>
                <div class="quantity-cake">
                    <p class="title-quantity">Quantity: </p>
                    <div class="quantity-button">
                        <button class="minus-btn">
                            <p>-</p>
                        </button>
                        <input type="text" name="" id="" value="1">
                        <button class="plus-btn">
                            <p>+</p>
                        </button>
                    </div>
                </div>
            </div>
            <div class="add-shopping-cart">';
                
                // Kiểm tra trạng thái sản phẩm để hiển thị nút Add to cart hoặc nút vô hiệu
                if (isset($product['status']) && ($product['status'] === 'Out of Stock' || $product['status'] === 'Discontinued')) {
                    echo '<button class="sp-cart add-to-cart-detail disabled" data-id="' . htmlspecialchars($product['product_id']) . '" disabled>';
                    echo '<p>' . htmlspecialchars($product['status']) . '</p>';
                    echo '</button>';
                } else {
                    echo '<button class="add-to-cart-detail" data-id="' . htmlspecialchars($product['product_id']) . '">';
                    echo '<p>Add to cart</p>';
                    echo '</button>';
                }
                
    echo '  </div>
        </div>
    </div>
    ';
    
    echo '
    <div class="showing-product">
        <div class="div-title-product">
            <div class="border"></div>
            <p class="title-product">Other products</p>
        </div>
    ';
    
    echo '<div class="list-product">';
    foreach ($product_rand as $items) {
        echo '<div class="product-1">';
        echo ' <a href="home?pages=product&id=' . $items['product_id'] . '">
                    <img width="300px" height="300px" class="poster-img" src="' . htmlspecialchars($items['image']) . '" alt="' . htmlspecialchars($items['product_name']) . '">
                  </a>';
        echo '<p class="name-product">' . $items['product_name'] . '</p>';
        
        // Kiểm tra trạng thái sản phẩm
        if (isset($items['status']) && ($items['status'] === 'Out of Stock' || $items['status'] === 'Discontinued')) {
            echo '<p class="price-product sp-cart disabled" data-id="' . htmlspecialchars($items['product_id']) . '" style="cursor: not-allowed;">'
                    . htmlspecialchars($items['status']) .
                 '</p>';
        } else {
            echo '<p class="price-product sp-cart add-to-cart" data-id="' . htmlspecialchars($items['product_id']) . '">
                    Price: ' . number_format($items['price'], 0, ',', '.') . ' VNĐ
                  </p>';
        }
        
        echo '</div>';  
    }
    
    echo '</div>';
    echo '</div>';

//    echo '<div class="shopping-cart">
//         <button class="close">
//             &times;
//         </button>
//         <div class="cart-scroll">
//             '. include 'includes/cart.php'; '
//         </div>
        
//         <div class="Pay_button">
//             <a href="pay" class="pay-link">
//                 <button class="pay-btn-link">Pay</button>
//             </a>
//         </div>
//     </div>
//     <div class="blur-overlay"></div>';
}
?>
