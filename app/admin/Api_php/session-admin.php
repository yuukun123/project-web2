<?php 
session_name("admin");
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');
include_once __DIR__ . '/../../config/data_connect.php';

// Không có session
if (!isset($_SESSION['admin']) || !is_array($_SESSION['admin'])) {
    echo json_encode([
        'loggedIn' => false,
        'username' => null,
        'role' => null,
        'status' => null,
        'message' => 'You are not logged in.'
    ]);
    exit;
}

// Kiểm tra quyền
if ($_SESSION['admin']['role'] !== 'admin') {
    echo json_encode([
        'loggedIn' => false,
        'username' => $_SESSION['admin']['username'] ?? null,
        'role' => $_SESSION['admin']['role'] ?? null,
        'status' => null,
        'message' => 'You do not have permission to access the admin page.'
    ]);
    exit;
}

// Kiểm tra trạng thái locked
$status = $_SESSION['admin']['status'] ?? 'active';
if ($status === 'locked') {
    echo json_encode([
        'loggedIn' => false,
        'username' => $_SESSION['admin']['username'] ?? null,
        'role' => $_SESSION['admin']['role'] ?? null,
        'status' => 'locked',
        'message' => 'Your account is locked.'
    ]);
    exit;
}

// Nếu hợp lệ, trả về thông tin
echo json_encode([
    'loggedIn' => true,
    'username' => $_SESSION['admin']['username'] ?? null,
    'role' => $_SESSION['admin']['role'] ?? null,
    'status' => 'active'
]);
?>
