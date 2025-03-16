<?php
session_start();
include '../../config/data_connect.php'; // Kết nối database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['admin_username'];
    $password = $_POST['admin_password'];

    // Debug: In ra username & password nhập vào
    error_log("Username nhập vào: " . $username);
    error_log("Password nhập vào: " . $password);

    // Truy vấn kiểm tra tài khoản
    $sql = "SELECT * FROM users WHERE user_name = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Debug: In ra thông tin user lấy từ database
        error_log("Username từ DB: " . $row['user_name']);
        error_log("Password từ DB: " . $row['password']);
        error_log("Role từ DB: " . $row['role']);

        $hashed_password = $row['password'];

        // Kiểm tra xem mật khẩu có được băm hay không
        if (password_needs_rehash($hashed_password, PASSWORD_DEFAULT)) {
            error_log("Mật khẩu chưa được băm, cần mã hóa lại.");
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Cập nhật lại mật khẩu đã hash vào database
            $update_sql = "UPDATE users SET password = ? WHERE user_name = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("ss", $hashed_password, $username);
            $update_stmt->execute();
            $update_stmt->close();
        }

        // Kiểm tra mật khẩu nhập vào với mật khẩu hash từ database
        if (password_verify($password, $hashed_password)) {
            $_SESSION['username'] = $row['user_name'];
            $_SESSION['role'] = $row['role']; // Lấy role từ database

            // Trả về dữ liệu JSON
            echo json_encode([
                "status" => "success",
                "username_nhap" => $username, // Tên người dùng vừa nhập
                "password_nhap" => $password, // Mật khẩu vừa nhập (không hash)
                "username_db" => $row['user_name'], // Tên người dùng từ database
                "password_db" => $hashed_password, // Mật khẩu hash từ database
                "role" => $row['role'], // Phân quyền
                "redirect" => "views/home.php", //
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Sai mật khẩu",
                "username_nhap" => $username,
                "password_nhap" => $password
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Tài khoản không tồn tại",
            "username_nhap" => $username,
            "password_nhap" => $password
        ]);
    }

    $stmt->close();
    $conn->close();
}
?>
