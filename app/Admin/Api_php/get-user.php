<?php
include '../../config/data_connect.php';
header("Content-Type: application/json; charset=UTF-8");

if (isset($_GET['user_name']) && !empty($_GET['user_name'])) {
    $user_name = trim($_GET['user_name']);
    $stmt = $conn->prepare("SELECT * FROM users WHERE user_name = ?");
    $stmt->bind_param("s", $user_name);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $user['address'] = trim($user['street'] . ', ' . $user['ward'] . ', ' . $user['district'] . ', ' . $user['city'], ', ');

        echo json_encode([
            'username'    => $user['user_name'],
            'first_name'   => $user['first_name'],
            'last_name'    => $user['last_name'],
            'password'    => $user['password'],
            'email'       => $user['email'],
            'phone'       => $user['phone'],
            'city'        => $user['city'],
            'district'    => $user['district'],
            'ward'        => $user['ward'],
            'street'      => $user['street'],
            'role'        => $user['role'],
            'created_at'  => $user['created_at'],
            'updated_at'  => $user['updated_at'],
            'address'     => $user['address']
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} else {
    echo json_encode(['error' => 'Missing or invalid user ID']);
}
