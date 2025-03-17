<?php
session_name("admin"); // Đảm bảo sử dụng đúng session của admin
session_start();
include('../../config/data_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Kiểm tra nếu admin chưa đăng nhập
    if (!isset($_SESSION['admin']) || !isset($_SESSION['admin']['user_id'])) {
        echo json_encode(["success" => false, "message" => "Bạn chưa đăng nhập!"]);
        exit();
    }

    $admin_id = $_SESSION['admin']['user_id'];

    // Kiểm tra nếu có cột 'remember_token' trước khi UPDATE
    $check_column = $conn->query("SHOW COLUMNS FROM users LIKE 'remember_token'");
    if ($check_column && $check_column->num_rows > 0) {
        $sql = "UPDATE users SET remember_token = NULL WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("i", $admin_id);
            $stmt->execute();
            $stmt->close();
        }
    }

    // Xóa toàn bộ dữ liệu session
    $_SESSION = [];
    session_unset();
    session_destroy();

    // Xóa cookie liên quan đến phiên đăng nhập
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, 
            $params["path"], $params["domain"], 
            $params["secure"], $params["httponly"]
        );
    }

    // Xóa cookie 'remember_token' nếu có
    setcookie("remember_token", "", time() - 3600, "/");

    // Đảm bảo session mới được tạo khi user đăng nhập lại
    session_regenerate_id(true);

    // Chuyển hướng về trang đăng nhập
    header("Location: ../index.php");
    exit();
}

// Nếu truy cập bằng GET, tự động quay về trang chủ
header("Location: ../index.php");
exit();
?>
