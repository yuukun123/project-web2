<?php
include '../../config/data_connect.php';
header("Content-Type: application/json");

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM users WHERE user_id = $id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Gộp địa chỉ đầy đủ
        $user['address'] = $user['street'] . ', ' . $user['ward'] . ', ' . $user['district'] . ', ' . $user['city'];

        echo json_encode([
            'user_id'     => $user['user_id'],
            'username'    => $user['user_name'],
            'email'       => $user['email'],
            'phone'       => $user['phone'],
            'password'    => $user['password'],
            'city'        => $user['city'],
            'district'    => $user['district'],
            'ward'        => $user['ward'],
            'street'      => $user['street'],
            'role'        => $user['role'],
            'created_at'  => $user['created_at'],
            'updated_at'  => $user['updated_at'],
            'address'     => $user['address']
        ]);
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} else {
    echo json_encode(['error' => 'Missing user id']);
}
