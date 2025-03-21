<?php
include '../../config/data_connect.php';
header("Content-Type: application/json; charset=UTF-8");

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT * FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $user['address'] = trim($user['street'] . ', ' . $user['ward'] . ', ' . $user['district'] . ', ' . $user['city'], ', ');

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
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} else {
    echo json_encode(['error' => 'Missing or invalid user ID']);
}
