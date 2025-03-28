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
            'message' => 'Bạn không có quyền truy cập trang admin.'
        ];
        echo json_encode($response);
        exit();
    }
    
    // Nếu role hợp lệ, trả về thông tin phiên admin
    $response = [
        'loggedIn' => true,
        'username' => $_SESSION['admin']['username'] ?? null,
        'role' => $_SESSION['admin']['role'] ?? null
    ];
} else {
    // Nếu không có session admin, trả về trạng thái chưa đăng nhập
    $response = [
        'loggedIn' => false,
        'username' => null,
        'role' => null
    ];
}

echo json_encode($response);
?>
