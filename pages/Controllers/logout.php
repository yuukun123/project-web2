<?php
session_name("user");
session_start();
include('../../app/config/data_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!isset($_SESSION['user']) || !isset($_SESSION['user']['username'])) {
        echo json_encode(["success" => false, "message" => "Bạn chưa đăng nhập!"]);
        exit();
    }

    $user_name = $_SESSION['user']['username'];

    // Kiểm tra nếu có cột 'remember_token' trong bảng users trước khi UPDATE
    $check_column = $conn->query("SHOW COLUMNS FROM users LIKE 'remember_token'");
    if ($check_column && $check_column->num_rows > 0) {
        $sql = "UPDATE users SET remember_token = NULL WHERE username = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("s", $user_name);
            $stmt->execute();
            $stmt->close();
        }
    }

    // Xóa session
    $_SESSION = [];
    session_unset();
    session_destroy();

    // Xóa cookie liên quan đến phiên đăng nhập
    setcookie(session_name(), '', time() - 3600, '/');
    setcookie("remember_token", "", time() - 3600, "/");

    // Chuyển hướng về trang chủ
    header("Location: ../../home");
    exit();
}

// Nếu truy cập bằng GET, tự động quay về trang chủ
header("Location: ../../home");
exit();
?>
