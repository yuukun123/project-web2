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

        if (strtolower($user['role']) !== 'customer') {
            header("Location: /login?error=role_not_allowed");
            exit();
        }

        $db_password = $user['password'];

        // Nếu mật khẩu chưa hash (giả sử <60 ký tự)
        if (strlen($db_password) < 60) {
            if ($password === $db_password) {
                // Hash lại mật khẩu và lưu
                $hashed_password = password_hash($password, PASSWORD_BCRYPT);
                $update_stmt = $conn->prepare("UPDATE users SET password = ? WHERE user_id = ?");
                $update_stmt->bind_param("si", $hashed_password, $user['user_id']);
                $update_stmt->execute();
                $update_stmt->close();

                $_SESSION['user'] = [
                    'user_id' => $user['user_id'],
                    'username' => $user['user_name'],
                    'role' => $user['role']
                ];

                header("Location: /home");
                exit();
            } else {
                header("Location: /login?error=wrong_password");
                exit();
            }
        } 
        // Mật khẩu đã hash
        elseif (password_verify($password, $db_password)) {
            $_SESSION['user'] = [
                'user_id' => $user['user_id'],
                'username' => $user['user_name'],
                'role' => $user['role']
            ];

            header("Location: /home");
            exit();
        } else {
            header("Location: /login?error=wrong_password");
            exit();
        }
    } else {
        header("Location: /login?error=user_not_found");
        exit();
    }
} else {
    header("Location: /login?error=invalid_request");
    exit();
}
?>
