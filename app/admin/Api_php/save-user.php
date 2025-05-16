<?php
require_once '../../config/data_connect.php'; // Kết nối database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password
    $role = $_POST['role'];
    $street = $_POST['street'];
    $city = $_POST['city_name'];
    $district = $_POST['district_name'];
    $ward = $_POST['ward_name'];
    $current_time = date('Y-m-d H:i:s');

    // Kiểm tra user đã tồn tại chưa (theo username)
    $check = $conn->prepare("SELECT user_name FROM users WHERE user_name = ?");
    if (!$check) {
        echo "Prepare failed: " . $conn->error;
        exit;
    }
    $check->bind_param("s", $username);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        // User tồn tại, kiểm tra email có bị trùng với user khác không
        $email_check = $conn->prepare("SELECT user_name FROM users WHERE email = ? AND user_name <> ?");
        if (!$email_check) {
            echo "Prepare failed: " . $conn->error;
            exit;
        }
        $email_check->bind_param("ss", $email, $username);
        $email_check->execute();
        $email_check->store_result();

        if ($email_check->num_rows > 0) {
            echo "<p style='color:red;'>Email đã tồn tại cho user khác!</p>";
            $email_check->close();
            $check->close();
            $conn->close();
            exit;
        }
        $email_check->close();

        // Thực hiện UPDATE nếu email không trùng
        $stmt = $conn->prepare("UPDATE users SET first_name=?, last_name=?, email=?, phone=?, password=?, role=?, street=?, city=?, district=?, ward=?, updated_at=? WHERE user_name=?");
        if (!$stmt) {
            echo "Prepare failed: " . $conn->error;
            exit;
        }
        $stmt->bind_param("ssssssssssss", $first_name, $last_name, $email, $phone, $password, $role, $street, $city, $district, $ward, $current_time, $username);

        if ($stmt->execute()) {
            echo "User updated successfully!";
        } else {
            echo "Failed to update user: " . $stmt->error;
        }
        $stmt->close();
    } else {
        // User mới, kiểm tra email đã tồn tại chưa
        $email_check = $conn->prepare("SELECT user_name FROM users WHERE email = ?");
        if (!$email_check) {
            echo "Prepare failed: " . $conn->error;
            exit;
        }
        $email_check->bind_param("s", $email);
        $email_check->execute();
        $email_check->store_result();

        if ($email_check->num_rows > 0) {
            echo "<p style='color:red;'>Email đã tồn tại!</p>";
            $email_check->close();
            $check->close();
            $conn->close();
            exit;
        }
        $email_check->close();

        // Thực hiện INSERT nếu email không trùng
        $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, user_name, email, phone, password, role, street, city, district, ward, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            echo "Prepare failed: " . $conn->error;
            exit;
        }
        $stmt->bind_param("sssssssssssss", $first_name, $last_name, $username, $email, $phone, $password, $role, $street, $city, $district, $ward, $current_time, $current_time);

        if ($stmt->execute()) {
            echo "New user added successfully!";
        } else {
            echo "Failed to add user: " . $stmt->error;
        }
        $stmt->close();
    }

    $check->close();
} else {
    echo "Invalid request!";
}

$conn->close();
?>
