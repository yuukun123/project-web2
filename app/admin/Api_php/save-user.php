<?php
require_once '../../config/data_connect.php'; // Kết nối database

$first_name = $_POST['first_name'] ?? '';
$last_name = $_POST['last_name'] ?? '';
$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';
$street = $_POST['street'] ?? '';
$city = $_POST['city_name'] ?? '';
$district = $_POST['district_name'] ?? '';
$ward = $_POST['ward_name'] ?? '';
$current_time = date('Y-m-d H:i:s');
$is_update = isset($_POST['is_update']) && $_POST['is_update'] == '1';

if ($is_update) {
    // ======= CẬP NHẬT USER ======= //
    // Kiểm tra user có tồn tại không
    $check = $conn->prepare("SELECT user_name FROM users WHERE user_name = ?");
    $check->bind_param("s", $username);
    $check->execute();
    $check->store_result();

    if ($check->num_rows == 0) {
        echo "User not exist!";
        exit;
    }
    $check->close();

    // Kiểm tra email trùng với user khác
    $email_check = $conn->prepare("SELECT user_name FROM users WHERE email = ? AND user_name <> ?");
    $email_check->bind_param("ss", $email, $username);
    $email_check->execute();
    $email_check->store_result();

    if ($email_check->num_rows > 0) {
        echo "Email is used by other user!";
        exit;
    }
    $email_check->close();

    // Update user
    $stmt = $conn->prepare("UPDATE users SET first_name=?, last_name=?, email=?, phone=?, password=?, role=?, street=?, city=?, district=?, ward=?, updated_at=? WHERE user_name=?");
    $stmt->bind_param("ssssssssssss", $first_name, $last_name, $email, $phone, $password, $role, $street, $city, $district, $ward, $current_time, $username);
    if ($stmt->execute()) {
        echo "update thành công!";
    } else {
        echo "update error: " . $stmt->error;
    }
    $stmt->close();

} else {
    // ======= THÊM MỚI USER ======= //
    // Kiểm tra username tồn tại
    $check = $conn->prepare("SELECT user_name FROM users WHERE user_name = ?");
    $check->bind_param("s", $username);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "Username is exist!";
        exit;
    }
    $check->close();

    // Kiểm tra email tồn tại
    $email_check = $conn->prepare("SELECT user_name FROM users WHERE email = ?");
    $email_check->bind_param("s", $email);
    $email_check->execute();
    $email_check->store_result();

    if ($email_check->num_rows > 0) {
        echo "Email is exist!";
        exit;
    }
    $email_check->close();

    // Thêm user
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, user_name, email, phone, password, role, street, city, district, ward, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssssss", $first_name, $last_name, $username, $email, $phone, $password, $role, $street, $city, $district, $ward, $current_time, $current_time);
    if ($stmt->execute()) {
        echo "Add new user successful!";
    } else {
        echo "Add new user error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>
