<?php
include '../../config/data_connect.php'; // Kết nối database

session_name("admin"); // Đảm bảo sử dụng session riêng cho admin
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST['admin_username'];
    $password = $_POST['admin_password'];

    // Debug log - chỉ dùng khi dev
    // error_log("Username nhập vào: " . $username);
    // error_log("Password nhập vào: " . $password);

    // Truy vấn kiểm tra tài khoản
    $sql = "SELECT * FROM users WHERE user_name = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // error_log("Thông tin từ DB: " . print_r($row, true));

        if ($row['status'] === 'locked') {
            echo json_encode([
                "status" => "error",
                "message" => "Your account is locked. Please contact support.",
            ]);
            exit;
        }

        $allowed_roles = ['admin', 'staff', 'manager'];
        if (!in_array(strtolower($row['role']), $allowed_roles)) {
            echo json_encode([
                "status" => "error",
                "message" => "This account does not have permission to access the admin page."
            ]);
            exit;
        }

        $hashed_password = $row['password'];

        if (password_needs_rehash($hashed_password, PASSWORD_DEFAULT)) {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $update_sql = "UPDATE users SET password = ? WHERE user_name = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("ss", $hashed_password, $username);
            $update_stmt->execute();
            $update_stmt->close();
        }

        if (password_verify($password, $hashed_password)) {
            $_SESSION['admin'] = [
                'username' => $row['user_name'],
                'role'     => $row['role'],
                'status'   => $row['status'] // ✅ thêm status
            ];

            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "redirect" => "home",
                "user" => $_SESSION['admin']
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Wrong password",
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Account does not exist",
        ]);
    }

    $stmt->close();
    $conn->close();
}
?>
