<?php
include __DIR__ . '/../../../config/data_connect.php';
// lấy thông tin sản phẩm:
$editingProduct = null;
if (isset($_GET['edit_id'])) {
    $edit_id = $_GET['edit_id'];
    $stmt = $conn->prepare("SELECT * FROM product WHERE product_id = ?");
    $stmt->bind_param("i", $edit_id);
    $stmt->execute();
    $editingProduct = $stmt->get_result()->fetch_assoc();
}

// 🔹 Phân trang: cần đặt TRƯỚC khi truy vấn
$productsPerPage = 6;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page < 1) $page = 1;
$offset = ($page - 1) * $productsPerPage;

// 🔹 Lấy tổng số sản phẩm (không bao gồm Hidden)
$totalQuery = "SELECT COUNT(*) as total FROM product WHERE status != 'Hidden'";
$totalResult = $conn->query($totalQuery);
$totalRow = $totalResult->fetch_assoc();
$totalProducts = $totalRow['total'];
$totalPages = ceil($totalProducts / $productsPerPage);

// 🔹 Truy vấn sản phẩm có phân trang (bỏ Hidden)
$sql = "SELECT product_id, product_name, image, status, price, category_id 
        FROM product 
        LIMIT $productsPerPage OFFSET $offset";

$result = $conn->query($sql);

if (!$result) {
    die("Lỗi truy vấn: " . $conn->error);
}

// 🔹 Xử lý cập nhật sản phẩm (nếu có POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['product_id'];
    $name = $_POST['product_name'];
    $status = $_POST['product_status'];
    $price = $_POST['product_price'];
    $category = $_POST['product_category'];
    $ingredients = $_POST['product_ingredients'];
    $expiration = $_POST['product_expiration'];
    $storage = $_POST['product_storage'];

    $catStmt = $conn->prepare("SELECT category_name FROM category WHERE category_id = ?");
    $catStmt->bind_param("i", $category);
    $catStmt->execute();
    $catResult = $catStmt->get_result();
    $catRow = $catResult->fetch_assoc();
    $categoryName = $catRow['category_name'] ?? 'default';

    if (!empty($_FILES['product_image']['name'])) {
        $folderName = str_replace(' ', '', $categoryName);
        $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/project-web2/public/assets/Img/" . $folderName . "/";
        $relative_path = "public/assets/Img/" . $folderName . "/";
        $image_name = basename($_FILES["product_image"]["name"]);
        $new_filename = time() . "_" . $image_name;
        $target_file = $target_dir . $new_filename;
        $db_image_path = $relative_path . $new_filename;

        if (move_uploaded_file($_FILES["product_image"]["tmp_name"], $target_file)) {
            $stmt = $conn->prepare("UPDATE product SET product_name=?, status=?, price=?, category_id=?, image=?, ingredients=?, expiration_date=?, storage_instructions=? WHERE product_id=?");
            $stmt->bind_param("sssissssi", $name, $status, $price, $category, $db_image_path, $ingredients, $expiration, $storage, $id);
        } else {
            $errorMsg = "❌ Upload hình ảnh thất bại!";
        }
    } else {
        $stmt = $conn->prepare("UPDATE product SET product_name=?, status=?, price=?, category_id=?, ingredients=?, expiration_date=?, storage_instructions=? WHERE product_id=?");
        $stmt->bind_param("sssisssi", $name, $status, $price, $category, $ingredients, $expiration, $storage, $id);
    }

    if (isset($stmt) && $stmt->execute()) {
        echo "<script>
            alert('Update Successfull!');
            window.location.href = 'list-product.php';
        </script>";
    }
}

if (isset($_GET['product_id'])) {
    $id = $_GET['product_id'];
    $stmt = $conn->prepare("SELECT * FROM product WHERE product_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();
    echo json_encode($product);
    exit;
}
?>


<script>
document.addEventListener("DOMContentLoaded", function () {
    const inputFile = document.getElementById("product_image");
    const previewWrapper = document.getElementById("preview-wrapper");

    inputFile?.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Xóa ảnh preview cũ nếu có
                previewWrapper.innerHTML = '';

                // Tạo label
                const label = document.createElement("label");
                label.textContent = "Preview";
                label.style.display = "block";
                label.style.fontWeight = "bold";

                // Tạo ảnh preview
                const previewImg = document.createElement("img");
                previewImg.src = e.target.result;
                previewImg.style.maxWidth = "100px";
                previewImg.style.height = "75px";
                previewImg.style.border = "1px solid #ccc";
                previewImg.style.borderRadius = "4px";
                previewImg.alt = "Preview";

                // Thêm vào wrapper
                previewWrapper.appendChild(label);
                previewWrapper.appendChild(previewImg);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
});
</script>




<link rel="stylesheet" href="../Admin/assets/css/list-product.css">

<div class="product-grid">
    <div class="product-head">ID</div>
    <div class="product-head">NAME</div>
    <div class="product-head">IMAGE</div>
    <div class="product-head">STATUS</div>
    <div class="product-head">PRICE</div>
    <div class="product-head">CATEGORY</div>
    <div class="product-head">FUNCTION</div>

    
    <?php while ($row = $result->fetch_assoc()) { ?>
        <div class="product-items"> <?php echo $row['product_id']; ?> </div>
        <div class="product-items"> <?php echo $row['product_name']; ?> </div>
        <div class="product-items">
            <?php 
                $base_url = "/project-web2/"; // Thay đổi nếu cần
                $image_path = $base_url . htmlspecialchars($row['image']);
            ?>
            <img src="<?php echo $image_path; ?>" width="90" height="90" alt="">
        </div>
        <div class="product-items">
            <span class="<?= 'status-label ' . strtolower(str_replace(' ', '-', $row['status'])) ?>">
                <?php 
                    switch (strtolower(trim($row['status']))) {
                        case 'available':
                            echo "Available";
                            break;
                        case 'out of stock':
                            echo "Out of Stock";
                            break;
                        case 'discontinued':
                            echo "Discontinued";
                            break;
                        case 'hidden':
                            echo "Hidden";
                            break;
                        default:
                            echo htmlspecialchars($row['status']);
                    }
                ?>
            </span>
        </div>


        <div class="product-items"> <?php echo number_format($row['price']); ?> VND</div>
        <div class="product-items"> <?php echo $row['category_id']; ?> </div>
        <div class="product-items">
        <a href="list-product.php?edit_id=<?= $row['product_id'] ?>#editModal" class="edit-btn">
            <i class="fas fa-edit"></i>
        </a>

            <form method="GET" action="../Controllers/delete.php" onsubmit="return confirm('Bạn có chắc muốn xóa sản phẩm này không?');" style="display:inline;">
                <input type="hidden" name="product_id" value="<?= $row['product_id']; ?>">
                <button type="submit" class="delete-button"><i class="fas fa-trash-alt"></i></button>
            </form>
        </div>
    <?php } ?>
</div>



<!-- Edit Notification -->
<?php if ($editingProduct): ?>
    <div id="overlay" class="overlay"></div>
<div id="editModal">
    <div class="notification edit-notification">
        <h2>Edit Product</h2>
        <form enctype="multipart/form-data" method="post">
            <input type="hidden" name="product_id" value="<?= $editingProduct['product_id'] ?>">

            <label for="product_name">Product Name:</label>
            
            <input type="text" id="product_name" name="product_name" value="<?= htmlspecialchars($editingProduct['product_name']) ?>">
            <label for="product_image">Change Picture:</label>
            <div style="display: flex; gap: 20px; align-items: flex-start;" id="image-preview-container">
                <div>
                    <label style="display: block; font-weight: bold;">Now:</label>
                    <?php if (!empty($editingProduct['image'])): ?>
                        <img src="/project-web2/<?= htmlspecialchars($editingProduct['image']) ?>" width="100" height="75" alt="Hình hiện tại" style="border: 1px solid #ccc; border-radius: 4px;">
                    <?php else: ?>
                        <span>Không có hình</span>
                    <?php endif; ?>
                </div>
                <div id="preview-wrapper">
                    <!-- JS sẽ render preview ở đây -->
                </div>
            </div>

            <input type="file" id="product_image" name="product_image">


            <label for="product_status">Status</label>
            <select id="product_status" name="product_status">
                <?php 
                $statuses = ['Available', 'Out of Stock', 'Discontinued', 'Hidden'];
                foreach ($statuses as $status): ?>
                    <option value="<?= $status ?>" <?= $editingProduct['status'] === $status ? 'selected' : '' ?>>
                        <?= $status ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <label for="product_price">Price:</label>
            <input type="number" id="product_price" name="product_price" value="<?= $editingProduct['price'] ?>">

            <label for="product_category">Category</label>
            <select id="product_category" name="product_category">
                <?php
                $catResult = $conn->query("SELECT * FROM category");
                while ($cat = $catResult->fetch_assoc()): ?>
                    <option value="<?= $cat['category_id'] ?>" 
                        <?= $cat['category_id'] == $editingProduct['category_id'] ? 'selected' : '' ?>>
                        <?= htmlspecialchars($cat['category_name']) ?>
                    </option>
                <?php endwhile; ?>
            </select>
                        <label for="product_ingredients">Ingredients:</label>
            <input type="text" id="product_ingredients" name="product_ingredients" value="<?= htmlspecialchars($editingProduct['ingredients']) ?>">

            <label for="product_expiration">Expiration Date:</label>
            <input type="date" id="product_expiration" name="product_expiration" value="<?= htmlspecialchars($editingProduct['expiration_date']) ?>">

            <label for="product_storage">Storage Instruction:</label>
            <input type="text" id="product_storage" name="product_storage" value="<?= htmlspecialchars($editingProduct['storage_instructions']) ?>">

            <button type="submit">Save</button>
            <a href="list-product.php" class="cancel-button">Cancel</a>
        </form>
    </div>
</div>
<?php endif; ?>


<!-- Phân trang -->
<div class="pagination">
    <?php if ($page > 1): ?>
        <a href="?page=<?= $page - 1; ?>" class="btn"><</a>
    <?php endif; ?>

    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <a href="?page=<?= $i; ?>" class="btn <?= ($i == $page) ? 'active' : '' ?>">
            <?= $i ?>
        </a>
    <?php endfor; ?>

    <?php if ($page < $totalPages): ?>
        <a href="?page=<?= $page + 1; ?>" class="btn">></a>
    <?php endif; ?>
</div>
