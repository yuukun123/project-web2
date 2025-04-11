<?php
session_name("admin");
session_start();
include('../../config/data_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!isset($_SESSION['admin']) || !isset($_SESSION['admin']['username'])) {
        // Chuyển hướng nếu chưa đăng nhập thay vì echo để tránh headers sent
        header("Location: ../index.php");
        exit();
    }

    $admin = $_SESSION['admin']['username'];

    // Nếu có remember_token thì xóa
    $check_column = $conn->query("SHOW COLUMNS FROM users LIKE 'remember_token'");
    if ($check_column && $check_column->num_rows > 0) {
        $sql = "UPDATE users SET remember_token = NULL WHERE user_name = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("s", $admin);
            $stmt->execute();
            $stmt->close();
        }
    }

    // Tạo session mới cho bảo mật (làm trước khi hủy session)
    session_regenerate_id(true);

    // Hủy session
    $_SESSION = [];
    session_unset();
    session_destroy();

    // Xóa cookie session
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, 
            $params["path"], $params["domain"], 
            $params["secure"], $params["httponly"]
        );
    }

    // Xóa cookie remember_token
    setcookie("remember_token", "", time() - 3600, "/");

    // Chuyển hướng về trang đăng nhập
    header("Location: ../index.php");
    exit();
}

// Nếu truy cập bằng GET thì cũng chuyển về login
header("Location: ../index.php");
exit();
?>
