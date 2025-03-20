<?php
include __DIR__ . '/../../config/data_connect.php'; // Kết nối database

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['order_id'], $_POST['status'])) {
    $order_id = intval($_POST['order_id']);
    $new_status = $_POST['status'];

    // Lấy trạng thái hiện tại của đơn hàng
    $sql_check = "SELECT status FROM orders WHERE order_id = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("i", $order_id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();
    $row = $result->fetch_assoc();

    if (!$row) {
        die("Đơn hàng không tồn tại.");
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
        die("Không thể cập nhật trạng thái đơn hàng từ '$current_status' sang '$new_status'.");
    }

    // Cập nhật trạng thái nếu hợp lệ
    $sql_update = "UPDATE orders SET status = ? WHERE order_id = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("si", $new_status, $order_id);

    if ($stmt_update->execute()) {
        header("Location: ../Views/receipt.php"); // chuyen huong sau khi update thanh cog
        exit();
    } else {
        die("Lỗi cập nhật đơn hàng: " . $stmt_update->error);
    }
}
?>