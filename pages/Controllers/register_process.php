<?php
session_name("user");
session_start();
include '../../app/config/data_connect.php'; // Kết nối database

header('Content-Type: application/json'); // Trả về JSON

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $lastname = trim($_POST['lastname']);
    $firstname = trim($_POST['firstname']);
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
    if (empty($username) || empty($lastname) || empty($firstname) || empty($phone) || empty($email) || empty($street) || empty($city) || empty($district) || empty($ward) || empty($password) || empty($confirm_password)) {
        $errors[] = "Please fill in all the information.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email.";
    }

    $phone_pattern = '/^(03[2-9]|05[2,6,8,9]|07[0-9]|08[1-9]|09[0-9])\d{7}$/';
    if (!preg_match($phone_pattern, $phone)) {
        $errors[] = "Invalid phone number.";
    }

    $password_pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
    if (!preg_match($password_pattern, $password)) {
        $errors[] = "Password must be at least 8 characters long, including uppercase letters, lowercase letters, numbers, and special characters.";
    }

    if ($password !== $confirm_password) {
        $errors[] = "The passwords do not match.";
    }

    // Kiểm tra tài khoản đã tồn tại chưa
    $stmt = $conn->prepare("SELECT user_name FROM users WHERE user_name = ? OR email = ? OR phone = ?");
    $stmt->bind_param("sss", $username, $email, $phone);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $errors[] = "Username, email, or phone number has already been used.";
    }
    $stmt->close();

    // Nếu không có lỗi, thêm vào database
    if (empty($errors)) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO users (user_name, last_name, first_name, phone, email, street, ward, district, city, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssss" , $username, $lastname, $firstname, $phone, $email, $street, $ward, $district, $city, $default_role, $hashed_password);        

        if ($stmt->execute()) {
            $stmt->close();

            // KHÔNG lưu session user ở đây nữa
            echo json_encode([
                'success' => true,
                'message' => "Registration successful! Please log in."
            ]);
        } else {
            $errors[] = "Registration error. Please try again.";
            echo json_encode(['success' => false, 'errors' => $errors]);
        }
    } else {
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
}
else {
    echo json_encode(['success' => false, 'errors' => ['Invalid submission method.']]);
    exit();
}


$conn->close();
?>
