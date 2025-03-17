<?php
session_name("user");
session_start();
header('Content-Type: application/json');

// Kiểm tra nếu session đã tồn tại và chứa thông tin user
if (isset($_SESSION['user']) && is_array($_SESSION['user'])) {
    $response = [
        'loggedIn' => true,
        'user_id' => $_SESSION['user']['user_id'] ?? null,
        'username' => $_SESSION['user']['username'] ?? null,
        'role' => $_SESSION['user']['role'] ?? null
    ];
} else {
    $response = [
        'loggedIn' => false,
        'user_id' => null,
        'username' => null,
        'role' => null
    ];
}

// Trả về dữ liệu JSON
echo json_encode($response);
?>
