<?php
include '../../config/data_connect.php'; // Kết nối database

session_name("admin"); // Đảm bảo sử dụng session riêng cho admin
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_SESSION)) {
        session_start();
    }

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


        $allowed_roles = ['admin', 'staff', 'manager'];
        if (!in_array(strtolower($row['role']), $allowed_roles)){
            echo json_encode([
                "status" => "error",
                "message" => "This account does not have permission to access the admin page."
            ]);
            exit;
        }

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
            // **🔹 Cập nhật phần lưu session**
            $_SESSION['admin'] = [
                'username' => $row['user_name'],
                'role'     => $row['role']
            ];

            // Trả về dữ liệu JSON
            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "redirect" => "pages/home.php",
                "user" => $_SESSION['admin'] // Trả về session đã lưu
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
