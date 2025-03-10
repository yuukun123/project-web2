<?php
// Kiểm tra kết nối database đã tồn tại, nếu không thì include file kết nối
if (!isset($conn)) {
    require_once __DIR__ . '/../app/config/data_connect.php';
}

// Truy vấn sản phẩm từ database
$sql = "SELECT product_id, product_name, price, image, category_id FROM PRODUCT WHERE status = 'Available'";
$result = $conn->query($sql);
if (!$result) {
    die("Query error: " . $conn->error);
}

// Xây dựng mảng chứa tất cả sản phẩm
$productsAll = [];

// Bản đồ chuyển đổi category_id thành tên (dưới dạng chữ thường)
$category_map = [
    1 => "mousse",
    2 => "croissant",
    3 => "drink"
];

while ($row = $result->fetch_assoc()) {
    // Gán thuộc tính category cho mỗi sản phẩm
    $row['category'] = isset($category_map[$row["category_id"]]) ? $category_map[$row["category_id"]] : "other";
    $productsAll[] = $row;
}
?>

<?php
// Xuất HTML sử dụng echo
echo '<div class="pg-12">';
echo '<div class="flex-full">';
echo '<div class="film-title">';
echo '<div class="vertical-line"></div>';
echo '</div>';

// Input Filter (ẩn đi, chỉ dùng để xử lý sự kiện change)
echo '<input type="radio" name="filter" id="filter-all" class="filter-input" checked>';
echo '<input type="radio" name="filter" id="filter-mousse" class="filter-input">';
echo '<input type="radio" name="filter" id="filter-croissant" class="filter-input">';
echo '<input type="radio" name="filter" id="filter-drink" class="filter-input">';

// Navigation
echo '<nav class="nav-container">';
echo '<ul class="nav-links">';
echo '<li><label for="filter-all" class="nav-item active">ALL</label></li>';
echo '<li>/</li>';
echo '<li><label for="filter-mousse" class="nav-item">Mousse</label></li>';
echo '<li>/</li>';
echo '<li><label for="filter-croissant" class="nav-item">Croissant</label></li>';
echo '<li>/</li>';
echo '<li><label for="filter-drink" class="nav-item">Drink</label></li>';
echo '</ul>';
echo '</nav>';
echo '</div>'; // Kết thúc flex-full

// Container chứa toàn bộ sản phẩm
echo '<div class="tab_content" id="product-container">';
if (!empty($productsAll)) {
    foreach ($productsAll as $item) {
        echo '<div class="movie-item" data-category="' . htmlspecialchars($item['category']) . '">';
        echo '<a href="../../pages/product-detail.php?id='. $item['product_id'] .' " target="_blank">';
        echo '<img class="poster-img" height="300" width="300" src="' . htmlspecialchars($item['image']) . '" alt="' . htmlspecialchars($item['product_name']) . '">';
        echo '</a>';
        echo '<p class="title">' . htmlspecialchars($item['product_name']) . '</p>';
        echo '<button class="sp-cart butn title" data-id="' . htmlspecialchars($item['product_id']) . '">';
        echo '<p class="text-color">Price: ' . number_format($item['price']) . ' VND</p>';
        echo '</button>';
        echo '</div>';
    }
} else {
    echo '<p>No products available.</p>';
}
echo '</div>'; // Kết thúc product-container

// Phân trang
echo '<div class="container">';
echo '<div class="pagination"></div>';
echo '</div>';
echo '</div>'; // Kết thúc pg-12
?>