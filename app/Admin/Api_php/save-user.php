<?php
require_once '../../config/data_connect.php'; // Kết nối database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? $_POST['id'] : null;
    $username = $_POST['username'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $role = $_POST['role'];
    $street = $_POST['street'];
    $city = $_POST['city'];
    $district = $_POST['district'];
    $ward = $_POST['ward'];
    $current_time = date('Y-m-d H:i:s');

    if ($id) {
        // UPDATE
        $stmt = $conn->prepare("UPDATE users SET phone=?, role=?, street=?, city=?, district=?, ward=?, updated_at=? WHERE id=?");
        $stmt->bind_param("sssssssi", $phone, $role, $street, $city, $district, $ward, $current_time, $id);
        if ($stmt->execute()) {
            echo "User updated successfully!";
        } else {
            echo "Failed to update user: " . $stmt->error;
        }
        $stmt->close();
    } else {
        // INSERT
        $stmt = $conn->prepare("INSERT INTO users (username, email, phone, password, role, street, city, district, ward, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssss", $username, $email, $phone, $password, $role, $street, $city, $district, $ward, $current_time, $current_time);
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
