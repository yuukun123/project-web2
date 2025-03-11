<?php
session_start();
include('../../app/config/data_connect.php'); // Kết nối database

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $address = trim($_POST['address']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    // $agree = isset($_POST['agree']);
    $default_role = "user"; // Gán giá trị mặc định cho role

    // Kiểm tra trống
    if (empty($username) || empty($phone) || empty($email) || empty($address) || empty($password) || empty($confirm_password)) {
        $errors[] = "Vui lòng điền đầy đủ thông tin.";
    }

    // Kiểm tra email hợp lệ
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email không hợp lệ.";
    }

    // Kiểm tra mật khẩu có khớp không
    if ($password !== $confirm_password) {
        $errors[] = "Mật khẩu không khớp.";
    }

    // // Kiểm tra đã chấp nhận điều khoản chưa
    // if (!$agree) {
    //     $errors[] = "Bạn phải đồng ý với điều khoản & điều kiện.";
    // }

    // Kiểm tra email đã tồn tại chưa
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $errors[] = "Email đã tồn tại.";
    }
    $stmt->close();

    // Nếu không có lỗi, lưu vào database
    if (empty($errors)) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT); // Mã hóa mật khẩu

        $stmt = $conn->prepare("INSERT INTO users (user_name, phone, email, address, role, password) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $username, $phone, $email, $address, $default_role, $hashed_password);

        if ($stmt->execute()) {
            $_SESSION['success'] = "Đăng ký thành công! Vui lòng đăng nhập.";
            header("Location: http://localhost/project-web2/login");
            exit();
        } else {
            $errors[] = "Lỗi khi đăng ký. Vui lòng thử lại.";
        }

        $stmt->close();
    }

    // Nếu có lỗi, lưu vào session để hiển thị lại
    $_SESSION['errors'] = $errors;
    header("Location: http://localhost/project-web2/register");
    exit();
}

$conn->close();
?>
