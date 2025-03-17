<?php
session_name("user");
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include('../../app/config/data_connect.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Truy vấn người dùng từ database
    $sql = "SELECT user_id, user_name, password, role FROM users WHERE user_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $db_password = $user['password']; // Lấy mật khẩu từ database

        // Kiểm tra nếu mật khẩu chưa hash (giả sử mật khẩu cũ có độ dài < 60 ký tự)
        if (strlen($db_password) < 60) {
            if ($password === $db_password) { // Nếu mật khẩu trùng khớp
                // Hash lại mật khẩu và cập nhật vào database
                $hashed_password = password_hash($password, PASSWORD_BCRYPT);
                $update_stmt = $conn->prepare("UPDATE users SET password = ? WHERE user_id = ?");
                $update_stmt->bind_param("si", $hashed_password, $user['user_id']);
                $update_stmt->execute();
                $update_stmt->close();

                // Lưu thông tin đăng nhập vào session riêng biệt
                $_SESSION['user'] = [
                    'user_id' => $user['user_id'],
                    'username' => $user['user_name'],
                    'role' => $user['role']
                ];

                echo "Đăng nhập thành công! Đang chuyển hướng...";
                header("Refresh: 2; URL=http://localhost/project-web2/home");
                exit();
            } else {
                echo "Sai mật khẩu!";
                header("Refresh: 2; URL=http://localhost/project-web2/login?error=wrong_password");
                exit();
            }
        } 
        // Nếu mật khẩu đã được hash, dùng password_verify
        elseif (password_verify($password, $db_password)) {
            // Lưu thông tin đăng nhập vào session riêng biệt
            $_SESSION['user'] = [
                'user_id' => $user['user_id'],
                'username' => $user['user_name'],
                'role' => $user['role']
            ];
            

            echo "Đăng nhập thành công! Đang chuyển hướng...";
            header("Refresh: 2; URL=http://localhost/project-web2/home");
            exit();
        } else {
            echo "Sai mật khẩu!";
            header("Refresh: 2; URL=http://localhost/project-web2/login?error=wrong_password");
            exit();
        }
    } else {
        echo "Không tìm thấy người dùng!";
        header("Refresh: 2; URL=http://localhost/project-web2/login?error=user_not_found");
        exit();
    }
} else {
    echo "Yêu cầu không hợp lệ!";
    header("Refresh: 2; URL=http://localhost/project-web2/login?error=invalid_request");
    exit();
}
?>
