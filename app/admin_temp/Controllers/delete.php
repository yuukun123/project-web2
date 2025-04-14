<?php
include '../../config/data_connect.php';

if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];

    // 🔍 Kiểm tra trạng thái hiện tại của sản phẩm
    $checkStatus = $conn->prepare("SELECT status FROM product WHERE product_id = ?");
    $checkStatus->bind_param("i", $product_id);
    $checkStatus->execute();
    $checkStatus->bind_result($status);
    $checkStatus->fetch();
    $checkStatus->close();

    // Nếu đã là Hidden thì không làm gì nữa
    if (strcasecmp($status, 'Hidden') === 0) {
        echo "<script>
            alert('Sản phẩm này đã bị ẩn.');
            window.history.back();
        </script>";
        exit();
    }

    // 🔍 Kiểm tra sản phẩm đã được bán chưa
    $checkSold = $conn->prepare("SELECT COUNT(*) FROM order_detail WHERE product_id = ?");
    $checkSold->bind_param("i", $product_id);
    $checkSold->execute();
    $checkSold->bind_result($soldCount);
    $checkSold->fetch();
    $checkSold->close();

    if ($soldCount > 0) {
        // 🔒 Nếu đã bán → ẩn sản phẩm bằng cách đổi status
        $hide = $conn->prepare("UPDATE product SET status = 'Hidden' WHERE product_id = ?");
        $hide->bind_param("i", $product_id);
        $hide->execute();
        $hide->close();

        echo "<script>
            alert('Sản phẩm đã được bán, sẽ được ẩn khỏi danh sách hiển thị.');
            window.history.back();
        </script>";
        exit();
    } else {
        // ❓ Nếu chưa bán → hỏi xác nhận xoá
        if (isset($_GET['confirm']) && $_GET['confirm'] === 'yes') {
            $stmt = $conn->prepare("DELETE FROM product WHERE product_id = ?");
            $stmt->bind_param("i", $product_id);

            if ($stmt->execute()) {
                echo "<script>
                    alert('Xóa sản phẩm thành công!');
                    window.history.back();
                </script>";
            } else {
                echo "<script>
                    alert('Lỗi khi xóa sản phẩm: " . $stmt->error . "');
                    window.history.back();
                </script>";
            }

            $stmt->close();
        } else {
            // Hiện xác nhận xóa
            echo "<script>
                if (confirm('Sản phẩm chưa được bán. Bạn có chắc muốn xoá?')) {
                    window.location.href = 'delete.php?product_id=$product_id&confirm=yes';
                } else {
                    window.history.back();
                }
            </script>";
            exit();
        }
    }
}
?>
