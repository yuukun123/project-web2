<?php
include __DIR__ . '/../app/config/data_connect.php'; // Kết nối database

// Kiểm tra xem ID có được truyền lên không
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Chuyển ID về kiểu số để tránh lỗi SQL Injection

    // Truy vấn sản phẩm theo ID
    $sql = "SELECT * FROM product as P
            JOIN size as S ON P.size_id = S.size_id
            WHERE product_id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc(); // Lấy dữ liệu sản phẩm
    } else {
        die("Sản phẩm không tồn tại!");
    }
} else {
    die("Không có sản phẩm nào được chọn!");
}
//truy vấn sản phẩm ngẫu nhiên
$sql = "SELECT * FROM product ORDER BY RAND() LIMIT 4";
$result = $conn->query($sql);
$product_rand = [];
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $product_rand[] = $row; 
    }
}else{
    die("sản phẩm không tồn tại");
}
?>

<!-- header -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
    <link rel="icon" href="<?php echo '../public/assets/Img/Sweets1.png'; ?>" type="image/x-icon" />
    <link rel="stylesheet" href="<?php echo'../public/assets/css/style.css"'; ?> />
    <link rel="stylesheet" href="<?php echo'../public/assets/css/product_detail.css"'; ?> />
    <title><?php echo $product['name']; ?></title>
    <script src="../public/assets/js/product.js"></script>
</head>
<body>
<?php require_once __DIR__ . '/../includes/header.php'; ?>

<?php
    if(!empty($product)){
        echo'
        <div class="Cake-infor">
            <div class="image-cake">
                <img src=" '. htmlspecialchars($product['image']) . '" alt="' . htmlspecialchars($product['product_name']) . '">
            </div>
            <div class="content">
                <h1> ' .$product['product_name']. ' </h1>
                <div class="describe">
                    <p>'.$product['description'].'</p>
                </div>
                <div class="buy-cake">
                <div class="size-cake">
                    <p class="title-size">Size:</p>
                    <button class="size">'.$product['size_name'].'</button>
                </div>
                <div class="border"></div>
                <div class="size-descibe">
                    <!-- <p class="mg-l pd-t-15">Length 10cm</p> -->
                    <p class="price-10 mg-l">'.number_format($product['price'], 0, ',', '.').' VNĐ</p>
                </div>
                <div class="border"></div>
                <div class="quantity-cake">
                    <p class="title-quantity">Quantity: </p>
                    <div class="quantity-button">
                        <button class="minus-btn" >
                            <p>-</p>
                        </button>
                        <input type="text" name="" id="" value="1">
                        <button class="plus-btn" >
                            <p>+</p>
                        </button>
                    </div>
                </div>
            </div>
            <div class="add-shopping-cart ">
                <button class="sp-cart"  id="add-cart-btn">
                    <p>Add to cart</p>
                </button>
            </div>
            </div>
        </div>
';
    echo'
    <div class="showing-product">
        <div class="div-title-product">
            <div class="border"></div>
        <p class="title-product">Other products</p>
        </div>
        ';
        echo'<div class="list-product">';
        foreach($product_rand as $items){
            echo'<div class="product-1">';
            echo' <a href="home?pages=product&id='.$items['product_id'].'"> <img width="300px" height="300px" class="poster-img" src="'.htmlspecialchars($items['image']).'" alt="'.htmlspecialchars($items['product_name']).'">    </a>';
            echo'<p class="name-product">'.$items['product_name'].'</p>';
            echo'<p class="price-product sp-cart">Price: '. number_format($items['price'], 0, ',', '.') .' VNĐ</p>';
            echo'</div>';  
        }
        echo'</div>';
        echo'</div>';
    }
?>

</body>





