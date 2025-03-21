<?php
session_name("user");
session_start();
include '../../app/config/data_connect.php'; // Kết nối database

header('Content-Type: application/json'); // Trả về JSON

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $street = trim($_POST['street']);

    $city = trim($_POST['city_name']);
    $district = trim($_POST['district_name']);
    $ward = trim($_POST['ward_name']);

    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $default_role = "customer"; // Vai trò mặc định

    // Kiểm tra thông tin đầu vào
    if (empty($username) || empty($phone) || empty($email) || empty($street) || empty($city) || empty($district) || empty($ward) || empty($password) || empty($confirm_password)) {
        $errors[] = "Vui lòng điền đầy đủ thông tin.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email không hợp lệ.";
    }

    $phone_pattern = '/^(03[2-9]|05[2,6,8,9]|07[0-9]|08[1-9]|09[0-9])\d{7}$/';
    if (!preg_match($phone_pattern, $phone)) {
        $errors[] = "Số điện thoại không hợp lệ.";
    }

    $password_pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
    if (!preg_match($password_pattern, $password)) {
        $errors[] = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    }

    if ($password !== $confirm_password) {
        $errors[] = "Mật khẩu không khớp.";
    }

    // Kiểm tra tài khoản đã tồn tại chưa
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE user_name = ? OR email = ? OR phone = ?");
    $stmt->bind_param("sss", $username, $email, $phone);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $errors[] = "Tên tài khoản, email hoặc số điện thoại đã được sử dụng.";
    }
    $stmt->close();

    // Nếu không có lỗi, thêm vào database
    if (empty($errors)) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO users (user_name, phone, email, street, ward, district, city, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $username, $phone, $email, $street, $ward, $district, $city, $default_role, $hashed_password);        

        if ($stmt->execute()) {
            $stmt->close();

            // KHÔNG lưu session user ở đây nữa
            echo json_encode([
                'success' => true,
                'message' => "Đăng ký thành công! Vui lòng đăng nhập."
            ]);
        } else {
            $errors[] = "Lỗi khi đăng ký. Vui lòng thử lại.";
            echo json_encode(['success' => false, 'errors' => $errors]);
        }
    } else {
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
}
else {
    echo json_encode(['success' => false, 'errors' => ['Phương thức gửi không hợp lệ.']]);
    exit();
}


$conn->close();
?>
