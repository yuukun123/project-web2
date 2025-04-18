<?php
require_once '../../config/data_connect.php'; // Kết nối database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $role = $_POST['role'];
    $street = $_POST['street'];
    $city = $_POST['city'];
    $district = $_POST['district'];
    $ward = $_POST['ward'];
    $current_time = date('Y-m-d H:i:s');

    
    // KIỂM TRA user đã tồn tại chưa
    $check = $conn->prepare("SELECT user_name FROM users WHERE user_name = ?");
    $check->bind_param("s", $username);
    $check->execute();
    $check->store_result(); // cần thiết để dùng num_rows

    if ($check->num_rows > 0) {
        // UPDATE nếu tồn tại
        $stmt = $conn->prepare("UPDATE users SET first_name=?, last_name=?, email=?, phone=?, password=?, role=?, street=?, city=?, district=?, ward=?, updated_at=? WHERE user_name=?");
        $stmt->bind_param("sssssssssssss", $first_name, $last_name, $username, $email, $phone, $password, $role, $street, $city, $district, $ward, $current_time, $current_time);

    
        if ($stmt->execute()) {
            echo "User updated successfully!";
        } else {
            echo "Failed to update user: " . $stmt->error;
        }
    }else {
        // INSERT
        $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, user_name, email, phone, password, role, street, city, district, ward, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssssss", $first_name, $last_name, $username, $email, $phone, $password, $role, $street, $city, $district, $ward, $current_time, $current_time);

        if ($stmt->execute()) {
            echo "New user added successfully!";
        } else {
            echo "Failed to add user: " . $stmt->error;
        }
        $stmt->close();
    }
} else {
    echo "Invalid request!";
}
$conn->close();
