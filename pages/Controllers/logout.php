<?php
session_start();
include('../../app/database/data_connect.php');

// Kiểm tra nếu request là POST (tránh truy cập trực tiếp)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Xóa token trong database nếu user đã đăng nhập
    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
        $sql = "UPDATE users SET remember_token = NULL WHERE id = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) { // Kiểm tra nếu prepare thành công
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $stmt->close();
        }
    }

    // Xóa toàn bộ session
    $_SESSION = [];
    session_unset();
    session_destroy();

    // Xóa cookie session để đảm bảo logout hoàn toàn
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }

    // Xóa cookie đăng nhập nếu có
    setcookie("remember_token", "", time() - 3600, "/");

    // Chuyển hướng về trang chủ
    header("Location: ../../index.php");
    exit();
} else {
    // Nếu truy cập trực tiếp bằng GET, quay về trang chủ
    header("Location: ../../index.php");
    exit();
}