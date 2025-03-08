<?php
session_start();
ob_start();

include('../../app/config/data_connect.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    $sql = "SELECT * FROM users WHERE user_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if ($password === $user['password']) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['user_name'];

            ob_end_clean();

            echo "Đăng nhập thành công! Đang chuyển hướng...";
            header("Refresh: 2; URL=../../index.php?pages=home"); // Chuyển hướng sau 2 giây
            exit();
        } else {
            echo "Sai mật khẩu!";
            header("Refresh: 2; URL=../../index.php?pages=login&error=wrong_password");
            exit();
        }
    } else {
        echo "Không tìm thấy người dùng!";
        header("Refresh: 2; URL=../../index.php?pages=login&error=user_not_found");
        exit();
    }
} else {
    echo "Yêu cầu không hợp lệ!";
    header("Refresh: 2; URL=../../index.php?pages=login&error=invalid_request");
    exit();
}
?>