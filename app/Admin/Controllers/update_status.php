<?php
include_once __DIR__ . '/../../config/config.php'; // Kết nối database
include __DIR__ . '/../../config/data_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['order_id'], $_POST['status'])) {
    $order_id = intval($_POST['order_id']);
    $new_status = $_POST['status'];

    // Lấy trạng thái hiện tại từ database
    $sql_check = "SELECT status FROM orders WHERE order_id = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("i", $order_id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();
    $row = $result->fetch_assoc();

    if (!$row) {
        echo "<script>alert('Lỗi: Đơn hàng không tồn tại!'); window.history.back();</script>";
        exit;
    }

    $current_status = $row['status'];

    // Quy tắc cập nhật trạng thái
    $valid_transitions = [
        'Pending' => ['Processing'],
        'Processing' => ['Completed', 'Cancelled'],
        'Completed' => [],
        'Cancelled' => []
    ];

    if (!isset($valid_transitions[$current_status]) || !in_array($new_status, $valid_transitions[$current_status])) {
        echo "<script>alert('Không thể cập nhật trạng thái từ $current_status sang $new_status!'); window.history.back();</script>";
        exit;
    }


    // Cập nhật trạng thái nếu hợp lệ 
    //Cập nhật trạng thái, nếu là Completed thì cập nhật thêm delivery time ở thời điểm sau khi update
    if ($new_status == "Completed") {
        $sql_update = "UPDATE orders SET status = ?, delivery_time = NOW() WHERE order_id = ?";
    } else{
        $sql_update = "UPDATE orders SET status = ? WHERE order_id = ?";
    }
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("si", $new_status, $order_id);

    if ($stmt_update->execute()) {
        echo "<script>alert('Cập nhật thành công!'); window.history.back();</script>";
    } else {
        echo "<script>alert('Lỗi cập nhật đơn hàng: " . $stmt_update->error . "'); window.history.back();</script>";
    }
    exit;
}
?>