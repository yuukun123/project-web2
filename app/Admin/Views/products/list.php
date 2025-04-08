<?php
include '../../config/data_connect.php'; // Đảm bảo đường dẫn đúng với tệp kết nối CSDL

// Truy vấn dữ liệu sản phẩm
$sql = "SELECT product_id, product_name, image, status, price, category_id 
        FROM product";
$result = $conn->query($sql);

if (!$result) {
    die("Lỗi truy vấn: " . $conn->error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['product_id'];
    $name = $_POST['product_name'];
    $status = $_POST['status'];
    $price = $_POST['price'];
    $category = $_POST['category_id'];

    // Xử lý upload hình ảnh nếu có
    if (!empty($_FILES['product_image']['name'])) {
        $target_dir = "uploads/";
        $image_name = basename($_FILES["product_image"]["name"]);
        $target_file = $target_dir . time() . "_" . $image_name;
        move_uploaded_file($_FILES["product_image"]["tmp_name"], $target_file);

        $stmt = $conn->prepare("UPDATE products SET product_name=?, image=?, status=?, price=?, category=? WHERE product_id=?");
        $stmt->bind_param("sssssi", $name, $target_file, $status, $price, $category, $id);
    } else {
        $stmt = $conn->prepare("UPDATE products SET product_name=?, status=?, price=?, category=? WHERE product_id=?");
        $stmt->bind_param("ssssi", $name, $status, $price, $category, $id);
    }

    if ($stmt->execute()) {
        header("Location: list-product.php?success=updated");
    } else {
        echo "Lỗi: " . $stmt->error;
    }
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM product WHERE product_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();
    echo json_encode($product);
} else {
    echo json_encode(['error' => 'ID not provided']);
}
?>


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
        <div class="product-items"><span class="in-stock"> <?php echo $row['status']; ?> </span></div>
        <div class="product-items"> <?php echo number_format($row['price']); ?> VND</div>
        <div class="product-items"> <?php echo $row['category_id']; ?> </div>
        <div class="product-items">
            <button class="edit-button" onclick="editProduct(<?= $row['product_id'] ?>)">Edit</button>
            <button class="delete-button" onclick="deleteProduct(<?php echo $row['product_id']; ?>)">Delete</button>
        </div>
    <?php } ?>
</div>


<!-- Edit Notification -->
<div class="notification edit-notification" id="editNotification">
    <h2>Edit Product</h2>
    <form id="editProductForm" enctype="multipart/form-data" method="post">
        <label for="product_name">Product Name</label>
        <input type="text" id="product_name" name="product_name">
        
        <label for="product_image">Product Image</label>
        <input type="file" id="product_image" name="product_image">
        <img id="current_product_image" src="" width="100" height="75" alt="Current Image" style="display:none;">

        <label for="product_status">Status</label>
        <select id="product_status" name="product_status">
            <option value="available" selected>Available</option>
            <option value="out-of-stock">Out of Stock</option>
        </select>

        <label for="product_price">Price</label>
        <input type="number" id="product_price" name="product_price">

        <label for="product_category">Category</label>
        <input type="text" id="product_category" name="product_category">

        <button type="submit" onclick="hideNotification('editNotification')">Save</button>
        <button type="button" onclick="hideNotification('editNotification')">Cancel</button>
    </form>
</div>
