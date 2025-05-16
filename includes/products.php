<?php
// Kết nối CSDL
if (!isset($conn)) {
    require_once __DIR__ . '/../app/config/data_connect.php';
}

// Lấy từ khóa tìm kiếm (nếu có)
$term = isset($_GET['term']) ? trim($_GET['term']) : '';
$term_sql = '';
$params = [];
$types = '';

// Nếu có từ khóa, thêm điều kiện LIKE
if ($term !== '') {
    $term_sql = " AND product_name LIKE ? ";
    $params[] = "%" . $term . "%";
    $types .= 's';
}

// Lấy category (mặc định all)
$category = isset($_GET['category']) ? trim($_GET['category']) : 'all';

// Map tên category sang id
$category_map_reverse = [
    'mousse' => 1,
    'croissant' => 2,
    'drink' => 3,
];

// Điều kiện lọc category
$category_sql = '';
if ($category !== 'all' && isset($category_map_reverse[$category])) {
    $category_sql = " AND category_id = ? ";
    $params[] = $category_map_reverse[$category];
    $types .= 'i';
}

// Thiết lập phân trang
$itemsPerPage = 8;
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$offset = ($page - 1) * $itemsPerPage;

// Đếm tổng sản phẩm
$countSql = "SELECT COUNT(*) AS total FROM product WHERE status IN ('Available', 'Out of Stock', 'Discontinued') $term_sql $category_sql";
$stmtCount = $conn->prepare($countSql);
if ($types !== '') {
    $stmtCount->bind_param($types, ...$params);
}
$stmtCount->execute();
$countResult = $stmtCount->get_result();
$totalProducts = $countResult->fetch_assoc()['total'] ?? 0;
$totalPages = ceil($totalProducts / $itemsPerPage);

// Lấy sản phẩm
$sql = "SELECT product_id, product_name, price, image, category_id, status
        FROM product
        WHERE status IN ('Available', 'Out of Stock', 'Discontinued') $term_sql $category_sql
        LIMIT ? OFFSET ?";
$stmt = $conn->prepare($sql);

if ($types !== '') {
    // Gộp tham số phân trang vào mảng
    $paramsWithPaging = [...$params, $itemsPerPage, $offset];
    $typesWithPaging = $types . 'ii';
    $stmt->bind_param($typesWithPaging, ...$paramsWithPaging);
} else {
    $stmt->bind_param('ii', $itemsPerPage, $offset);
}

$stmt->execute();
$result = $stmt->get_result();

// Map category id sang tên
$category_map = [
    1 => "mousse",
    2 => "croissant",
    3 => "drink"
];

$productsAll = [];
while ($row = $result->fetch_assoc()) {
    $row['category'] = $category_map[$row['category_id']] ?? 'other';
    $productsAll[] = $row;
}

// Hàm in class active cho filter
function isActiveCategory($current, $expected) {
    return $current === $expected ? 'active' : '';
}
?>

<div class="search-container" id="search-container">
    <div class="input-wrapper" id="input-wrapper">
        <form method="GET" action="">
            <input 
                type="text" 
                class="search-input" 
                name="term" 
                value="<?= htmlspecialchars($term) ?>" 
                placeholder="Search for names.."
            >
            <span class="search-icon" id="search-icon">
                <button class="searchBtn" type="submit">
                    <ion-icon name="search-outline"></ion-icon>
                </button>
            </span>
            <input type="hidden" name="category" value="<?= htmlspecialchars($category) ?>">
        </form>
    </div>
    <div id="hintContainer" class="hint-container"></div>
    <a href="advance" class="searchAdvancemobile">ADVANCED SEARCH</a>
</div>

<div class="pg-12">
    <div class="flex-full">
        <div class="film-title">
            <div class="vertical-line"></div>
        </div>

                <!-- Input Filter (ẩn) -->
        <!-- <input type="radio" name="filter" id="filter-all" class="filter-input" checked>
        <input type="radio" name="filter" id="filter-mousse" class="filter-input">
        <input type="radio" name="filter" id="filter-croissant" class="filter-input">
        <input type="radio" name="filter" id="filter-drink" class="filter-input"> -->
        
        <!-- Filter category -->
        <div class="category-filters" style="display: none;">
            <a href="?page=1&term=<?= urlencode($term) ?>&category=all" class="<?= isActiveCategory($category, 'all') ?>">All</a>
            <a href="?page=1&term=<?= urlencode($term) ?>&category=mousse" class="<?= isActiveCategory($category, 'mousse') ?>">Mousse</a>
            <a href="?page=1&term=<?= urlencode($term) ?>&category=croissant" class="<?= isActiveCategory($category, 'croissant') ?>">Croissant</a>
            <a href="?page=1&term=<?= urlencode($term) ?>&category=drink" class="<?= isActiveCategory($category, 'drink') ?>">Drink</a>
        </div>

        <!-- Navigation (bạn có thể dùng hoặc bỏ nếu không dùng) -->
        <nav class="nav-container">
            <ul class="nav-links">
                <li><label class="nav-item <?= isActiveCategory($category, 'all') ?>">ALL</label></li>
                <li>/</li>
                <li><label class="nav-item <?= isActiveCategory($category, 'mousse') ?>">Mousse</label></li>
                <li>/</li>
                <li><label class="nav-item <?= isActiveCategory($category, 'croissant') ?>">Croissant</label></li>
                <li>/</li>
                <li><label class="nav-item <?= isActiveCategory($category, 'drink') ?>">Drink</label></li>
            </ul>
        </nav>
    </div>

    <div class="tab_content" id="product-container">
        <?php if (!empty($productsAll)): ?>
            <?php foreach ($productsAll as $item): ?>
                <div class="movie-item" data-category="<?= htmlspecialchars($item['category']) ?>">
                    <a href="home?pages=product&id=<?= $item['product_id'] ?>" target="_blank">
                        <img class="poster-img" height="300" width="300" src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['product_name']) ?>">
                    </a>
                    <p class="title"><?= htmlspecialchars($item['product_name']) ?></p>

                    <?php if ($item['status'] === 'Available'): ?>
                        <button class="add-to-cart butn title" data-id="<?= htmlspecialchars($item['product_id']) ?>">
                            <p class="text-color">Price: <?= number_format($item['price']) ?> VND</p>
                        </button>
                    <?php else: ?>
                        <button class="butn title disabled-btn" disabled>
                            <p class="text-color"><?= htmlspecialchars($item['status']) ?></p>
                        </button>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>No products available.</p>
        <?php endif; ?>
    </div>

    <!-- Phân trang -->
    <div class="container">
        <div class="pagination">
            <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                <a href="?page=<?= $i ?>&term=<?= urlencode($term) ?>&category=<?= urlencode($category) ?>" 
                   class="page-link <?= ($i === $page) ? 'active' : '' ?>">
                    <?= $i ?>
                </a>
            <?php endfor; ?>
        </div>
    </div>
</div>

<p id="no-result-message" style="display:none; text-align:center; color:#999;">No products found!</p>