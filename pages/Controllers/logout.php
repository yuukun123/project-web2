<?php
session_start();
include('../../app/config/data_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id'])) {
        echo json_encode(["success" => false, "message" => "Bạn chưa đăng nhập!"]);
        exit();
    }

    $user_id = $_SESSION['user_id'];

    // Kiểm tra xem cột 'remember_token' có tồn tại không trước khi UPDATE
    $check_column = $conn->query("SHOW COLUMNS FROM users LIKE 'remember_token'");
    if ($check_column->num_rows > 0) {
        // Nếu cột tồn tại, gán giá trị cho biến $sql
        $sql = "UPDATE users SET remember_token = NULL WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $stmt->close();
        }
    }

    // Xóa session và cookie
    $_SESSION = [];
    session_unset();
    session_destroy();

    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }
    if (isset($_COOKIE['remember_token'])) {
        setcookie("remember_token", "", time() - 3600, "/");
    }

    // Chuyển hướng về trang chủ
    header("Location: ../../index.php");
    exit();
} else {
    header("Location: ../../index.php");
    exit();
}
?>