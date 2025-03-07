<?php
session_start();
header('Content-Type: application/json'); // Đảm bảo phản hồi là JSON

include('../../app/config/data_connect.php'); // Kết nối database

// Hiển thị lỗi (chỉ dùng trong môi trường phát triển)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Kiểm tra phương thức request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit();
}

// Nhận dữ liệu từ form
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$remember = isset($_POST['remember']); // Kiểm tra "Ghi nhớ đăng nhập"

// Kiểm tra input rỗng
if (empty($username) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit();
}

// Truy vấn kiểm tra tài khoản
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Kiểm tra mật khẩu
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];

        // Nếu người dùng chọn "Ghi nhớ đăng nhập"
        if ($remember) {
            $token = bin2hex(random_bytes(32)); // Tạo token ngẫu nhiên
            setcookie("login_token", $token, time() + (86400 * 30), "/"); // Lưu cookie 30 ngày

            // Cập nhật token vào database
            $update_sql = "UPDATE users SET remember_token = ? WHERE id = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("si", $token, $user['id']);
            $update_stmt->execute();
        }

        // Trả về JSON thành công
        echo json_encode(["status" => "success", "message" => "Đăng nhập thành công"]);
        exit();
    } else {
        echo json_encode(["status" => "error", "message" => "Mật khẩu không đúng!"]);
        exit();
    }
} else {
    echo json_encode(["status" => "error", "message" => "Tài khoản không tồn tại!"]);
    exit();
}
?>