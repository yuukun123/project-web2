<?php
session_start();
header('Content-Type: application/json');

// Debug: Kiểm tra xem session đã được khởi tạo chưa
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = null; // Đặt null nếu chưa đăng nhập
}

// Trả về JSON đúng chuẩn
echo json_encode([
    'loggedIn' => isset($_SESSION['user_id']) && $_SESSION['user_id'] !== null,
    'user_id' => $_SESSION['user_id'] // Hiển thị user_id để debug
]);
?>
