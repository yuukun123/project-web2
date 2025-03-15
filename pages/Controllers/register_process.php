<?php
session_start();
include '../../app/config/data_connect.php'; // Kết nối database

header('Content-Type: application/json'); // Đặt header để trả về JSON

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $street = trim($_POST['street']);
    $city = trim($_POST['city']);
    $district = trim($_POST['district']);
    $ward = trim($_POST['ward']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $default_role = "customer"; // Gán giá trị mặc định cho role

    // Kiểm tra trống
    if (empty($username) || empty($phone) || empty($email) || empty($street) || empty($city) || empty($district) || empty($ward) || empty($password) || empty($confirm_password)) {
        $errors[] = "Vui lòng điền đầy đủ thông tin.";
    }

    // Kiểm tra email hợp lệ
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: example@gmail.com).";
    }

    // Kiểm tra số điện thoại hợp lệ (10-11 chữ số)
    $phone_pattern = '/^(03[2-9]|05[2,6,8,9]|07[0-9]|08[1-9]|09[0-9])\d{7}$/';

    if (!preg_match($phone_pattern, $phone)) {
        $errors[] = "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại di động Việt Nam hợp lệ.";
    }
    
    // Kiểm tra độ dài mật khẩu
    $password_pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';

    if (!preg_match($password_pattern, $password)) {
        $errors[] = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    }
    

    // Kiểm tra mật khẩu có khớp không
    if ($password !== $confirm_password) {
        $errors[] = "Mật khẩu không khớp.";
    }
    // kiểm tra name đã tồn tại chưa
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE user_name = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $errors[] = "Tài khoản đã đăng ký.";
    } else {
        $stmt->close();
    }

    // Kiểm tra email đã tồn tại chưa
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $errors[] = "Email đã tồn tại.";
    }
    $stmt->close();

    // Kiểm tra số điện thoại đã tồn tại chưa
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE phone = ?");
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $errors[] = "Số điện thoại đã được đăng ký.";
    }
    $stmt->close();

    // Nếu không có lỗi, lưu vào database
    if (empty($errors)) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT); // Mã hóa mật khẩu
        $full_address = "$street, $ward, $district, $city"; // Gộp lại thành một chuỗi

        $stmt = $conn->prepare("INSERT INTO users (user_name, phone, email, street, ward, district, city, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $username, $phone, $email, $street, $ward, $district, $city, $default_role, $hashed_password);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => "Đăng ký thành công! Vui lòng đăng nhập."]);
        } else {
            $errors[] = "Lỗi khi đăng ký. Vui lòng thử lại.";
            echo json_encode(['success' => false, 'errors' => $errors]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
}

$conn->close();
?>
