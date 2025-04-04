<?php
include __DIR__ . '/../app/config/data_connect.php'; // Kết nối database


// Lấy danh sách danh mục từ bảng CATEGORY
$categoryQuery = "SELECT category_id, category_name FROM CATEGORY";
$categoryResult = $conn->query($categoryQuery);
$categories = [];
if ($categoryResult && $categoryResult->num_rows > 0) {
    while ($catRow = $categoryResult->fetch_assoc()) {
        $categories[] = $catRow;
    }
}

// Số đơn hàng hiển thị mỗi trang

$ordersPerPage = 8;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page < 1) $page = 1;
$offset = ($page - 1) * $ordersPerPage;

// Kiểm tra nếu form đã được gửi
$searchName = isset($_GET['searchName']) ? strtolower(trim($_GET['searchName'])) : '';
$searchCategory = isset($_GET['searchCategory']) ? (int)$_GET['searchCategory'] : 0;
$minPrice = (isset($_GET['minPrice']) && is_numeric($_GET['minPrice']) && $_GET['minPrice'] >= 0)
    ? (int)$_GET['minPrice'] : null;

$maxPrice = (isset($_GET['maxPrice']) && is_numeric($_GET['maxPrice']) && $_GET['maxPrice'] >= 0)
    ? (int)$_GET['maxPrice'] : null;

// Đếm tổng số sản phẩm phù hợp điều kiện tìm kiếm
$countSql = "SELECT COUNT(*) AS total FROM product WHERE 1=1";

if ($searchName !== '') {
    $countSql .= " AND LOWER(product_name) LIKE '%$searchName%'";
}
if ($searchCategory > 0) {
    $countSql .= " AND category_id = $searchCategory";
}
if ($minPrice !== null) {
    $countSql .= " AND price >= $minPrice";
}
if ($maxPrice !== null) {
    $countSql .= " AND price <= $maxPrice";
}

$countResult = $conn->query($countSql);
$totalRows = $countResult->fetch_assoc()['total'];
$totalPages = ceil($totalRows / $ordersPerPage);



// Tạo câu lệnh SQL
$sql = "SELECT * FROM PRODUCT WHERE 1=1";

if (!empty($searchName)) {
    $sql .= " AND LOWER(product_name) LIKE '%" . $conn->real_escape_string($searchName) . "%'";
}
if ($searchCategory > 0) {
    $sql .= " AND category_id = $searchCategory";
}
if (!is_null($minPrice)) {
    $sql .= " AND price >= $minPrice";
}
if (!is_null($maxPrice)) {
    $sql .= " AND price <= $maxPrice";
}

// ✅ Thêm LIMIT và OFFSET để phân trang
$sql .= " LIMIT $ordersPerPage OFFSET $offset";

// Thực hiện truy vấn
$result = $conn->query($sql);
if (!$result) {
    die("Lỗi SQL: " . $conn->error . "\nQuery: " . $sql);
}

?>

    <div class="bsearchpro">
        <form class="search-container-pro" method="GET" action="">
            <div class="flex">
                <input type="text" name="searchName" placeholder="Search name" 
                    value="<?php echo isset($_GET['searchName']) ? htmlspecialchars($_GET['searchName']) : ''; ?>">
                
                <select name="searchCategory" class="category-select">
                    <option value="0">Category</option>
                    <?php foreach ($categories as $category): ?>
                        <option value="<?php echo $category['category_id']; ?>" 
                            <?php echo ($searchCategory == $category['category_id']) ? 'selected' : ''; ?>>
                            <?php echo htmlspecialchars($category['category_name']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="search-price flex">
                <input type="number" name="minPrice" placeholder="Minimum price" min="0" 
                    value="<?php echo isset($_GET['minPrice']) && $_GET['minPrice'] !== '' ? htmlspecialchars($_GET['minPrice']) : ''; ?>">
                <input type="number" name="maxPrice" placeholder="Maximum price" min="0"
                    value="<?php echo isset($_GET['maxPrice']) && $_GET['maxPrice'] !== '' ? htmlspecialchars($_GET['maxPrice']) : ''; ?>">
            </div>
            <div class="btn-submit">
            <button type="submit" class="btn-searchpro">Search</button>
            </div>
        </form>
    </div>
    <div class="pg-12">
    <div class="tab_content">
        <?php if ($result->num_rows > 0): ?>
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="movie-item">
                    <a href="home?pages=product&id=<?php echo isset($row['product_id']) ? $row['product_id'] : '#'; ?>">
                        <img class="poster-img" height="300" width="300" src="<?php echo isset($row['image']) ? $row['image'] : 'default.jpg'; ?>" 
                             alt="<?php echo isset($row['product_name']) ? htmlspecialchars($row['product_name']) : 'Sản phẩm'; ?>">
                    </a>    
                    <p class="title"> <?php echo isset($row['product_name']) ? htmlspecialchars($row['product_name']) : 'Không có tên'; ?> </p>
                    <button class="butn add-to-cart title"
                            data-id="<?php echo $row['product_id']; ?>"
                            onclick="addToCartBtn(<?php echo $row['product_id']; ?>, '<?php echo htmlspecialchars($row['product_name']); ?>', <?php echo $row['price']; ?>)">
                        <p class="text-color">
                            Giá: <?php echo isset($row['price']) ? number_format($row['price'], 0, ',', '.') : '0'; ?> VND
                        </p>
                    </button>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No matching products found.</p>
        <?php endif; ?>
    </div>

    
    </div>


    

<!-- Hiển thị phân trang -->
<div class="pagination">
    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <a href="?page=<?= $i ?>&searchName=<?= urlencode($searchName) ?>&searchCategory=<?= $searchCategory ?>&minPrice=<?= $minPrice ?>&maxPrice=<?= $maxPrice ?>"
           class="btn <?= ($i == $page) ? 'active' : '' ?>">
            <?= $i ?>
        </a>
    <?php endfor; ?>
</div>
