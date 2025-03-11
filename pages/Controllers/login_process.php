<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


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
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['user_name'];


            echo "Đăng nhập thành công! Đang chuyển hướng...";
            header("Refresh: 2; URL=http://localhost/project-web2/home"); // Chuyển hướng sau 2 giây
            exit();
        } else {
            echo "Sai mật khẩu!";
            header("Refresh: 2; URL=http://localhost/project-web2/login?error=wrong_password");

        }
    } else {
        echo "Không tìm thấy người dùng!";
        header("Refresh: 2; URL=http://localhost/project-web2/login?error=user_not_found");

    }
} else {
    echo "Yêu cầu không hợp lệ!";
    header("Refresh: 2; URL=http://localhost/project-web2/login?error=invalid_request");

}
?>