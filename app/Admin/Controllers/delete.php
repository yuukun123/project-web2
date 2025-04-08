<?php
include '../../config/data_connect.php';

if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];

    $stmt = $conn->prepare("DELETE FROM product WHERE product_id = ?");
    $stmt->bind_param("i", $product_id);

    if ($stmt->execute()) {
        // Xóa thành công → quay về danh sách
        echo "<script>alert('Delete successful!'); window.history.back();</script>";
        exit();
    } else {
        echo "Lỗi khi xóa sản phẩm.";
    }

    $stmt->close();
}
?>
