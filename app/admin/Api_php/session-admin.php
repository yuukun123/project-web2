<?php 
session_name("admin");
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');
include_once __DIR__ . '/../../config/data_connect.php';

// Kiểm tra xem có tồn tại thông tin phiên admin không
if (isset($_SESSION['admin']) && is_array($_SESSION['admin'])) {
    // Nếu có, kiểm tra quyền truy cập, đảm bảo role là 'admin'
    if ($_SESSION['admin']['role'] !== 'admin') {
        $response = [
            'loggedIn' => false,
            'username' => null,
            'role' => null,
            'status' => null,
            'message' => 'You do not have permission to access the admin page.'
        ];
        echo json_encode($response);
        exit();
    }

    // Kiểm tra trạng thái của tài khoản (locked hay active)
    $status = $_SESSION['admin']['status'] ?? 'active'; // Mặc định là active nếu không có trạng thái
    if ($status === 'locked') {
        $response = [
            'loggedIn' => false,
            'username' => $_SESSION['admin']['username'] ?? null,
            'role' => $_SESSION['admin']['role'] ?? null,
            'status' => 'locked',
            'message' => 'Your account is locked.'
        ];
    } else {
        // Nếu role và status hợp lệ, trả về thông tin phiên admin
        $response = [
            'loggedIn' => true,
            'username' => $_SESSION['admin']['username'] ?? null,
            'role' => $_SESSION['admin']['role'] ?? null,
            'status' => 'active' // Hoặc có thể trả về trạng thái khác nếu cần
        ];
    }
} else {
    // Nếu không có session admin, trả về trạng thái chưa đăng nhập
    $response = [
        'loggedIn' => false,
        'username' => null,
        'role' => null,
        'status' => null,
        'message' => 'You are not logged in.'
    ];
}

echo json_encode($response);
?>
