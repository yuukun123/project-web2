<?php
session_name("user");
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include('../../app/config/data_connect.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Truy vấn người dùng từ database (lấy thêm status)
    $sql = "SELECT user_name, password, role, status FROM users WHERE user_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Kiểm tra nếu tài khoản bị khóa
        if (strtolower($user['status']) === 'locked') {
            header("Location: ../../login?error=account_locked");
            exit();
        }

        if (strtolower($user['role']) !== 'customer') {
            header("Location: ../../login?error=role_not_allowed");
            exit();
        }

        $db_password = $user['password'];

        // Nếu mật khẩu chưa hash (giả sử <60 ký tự)
        if (strlen($db_password) < 60) {
            if ($password === $db_password) {
                // Hash lại mật khẩu và lưu
                $hashed_password = password_hash($password, PASSWORD_BCRYPT);
                $update_stmt = $conn->prepare("UPDATE users SET password = ? WHERE user_name = ?");
                $update_stmt->bind_param("ss", $hashed_password, $user['user_name']);
                $update_stmt->execute();
                $update_stmt->close();

                $_SESSION['user'] = [
                    'username' => $user['user_name'],
                    'role' => $user['role'],
                    'status' => $user['status']
                ];

                header("Location: ../../home");
                exit();
            } else {
                header("Location: ../../login?error=wrong_password");
                exit();
            }
        } 
        // Mật khẩu đã hash
        elseif (password_verify($password, $db_password)) {
            $_SESSION['user'] = [
                'username' => $user['user_name'],
                'role' => $user['role'],
                'status' => $user['status']
            ];

            header("Location: ../../home");
            exit();
        } else {
            header("Location: ../../login?error=wrong_password");
            exit();
        }
    } else {
        header("Location: ../../login?error=user_not_found");
        exit();
    }
} else {
    header("Location: ../../login?error=method_not_allowed");
    exit();
}
?>
