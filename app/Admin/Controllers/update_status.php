<?php
header('Content-Type: application/json');
include_once __DIR__ . '/../../config/config.php';
include __DIR__ . '/../../config/data_connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['order_id'], $_POST['status'])) {
    $order_id = intval($_POST['order_id']);
    $new_status = $_POST['status'];

    // Lấy trạng thái hiện tại
    $stmt_check = $conn->prepare("SELECT status FROM orders WHERE order_id = ?");
    $stmt_check->bind_param("i", $order_id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();
    $order = $result->fetch_assoc();

    if (!$order) {
        echo json_encode(['success' => false, 'message' => '❌ Order does not exist']);
        exit;
    }

    $current_status = $order['status'];
    $valid_transitions = [
        'Pending' => ['Processing'],
        'Processing' => ['Completed', 'Cancelled'],
        'Completed' => [],
        'Cancelled' => []
    ];

    if (!isset($valid_transitions[$current_status]) || !in_array($new_status, $valid_transitions[$current_status])) {
        echo json_encode(['success' => false, 'message' => "⚠️ Invalid transition from $current_status to $new_status"]);
        exit;
    }

    // Chuẩn bị SQL cập nhật
    $sql_update = ($new_status === "Completed")
        ? "UPDATE orders SET status = ?, delivery_time = NOW() WHERE order_id = ?"
        : "UPDATE orders SET status = ? WHERE order_id = ?";

    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("si", $new_status, $order_id);

    if ($stmt_update->execute()) {
        echo json_encode(['success' => true, 'message' => '✅ Order updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => '❌ Update failed: ' . $stmt_update->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => '❌ Invalid request']);
}
exit;
?>