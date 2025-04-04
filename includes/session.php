<?php
session_name("user");
session_start();
header('Content-Type: application/json');

include('../app/config/data_connect.php');

if (isset($_SESSION['user']) && is_array($_SESSION['user'])) {
    $user_name = $_SESSION['user']['username'] ?? null;
    if ($user_name) {
        // Kiểm tra trạng thái của tài khoản từ cơ sở dữ liệu
        $stmt = $conn->prepare("SELECT status FROM users WHERE user_name = ?");
        $stmt->bind_param("s", $user_name);
        $stmt->execute();
        $result = $stmt->get_result();
        $userData = $result->fetch_assoc();
        $stmt->close();

        // Nếu tài khoản bị khóa thì tự động logout và trả về thông báo
        if ($userData && $userData['status'] === 'locked') {
            // Xóa session
            $_SESSION = [];
            session_unset();
            session_destroy();

            // Xóa cookie liên quan đến phiên đăng nhập
            setcookie(session_name(), '', time() - 3600, '/');
            setcookie("remember_token", "", time() - 3600, "/");

            $response = [
                'loggedIn' => false,
                'username' => null,
                'role' => null,
                'status' => null,
                'message' => 'Your account has been locked.'
            ];
            echo json_encode($response);
            exit();
        }
    }
    
    // Nếu không bị khóa, trả về thông tin session hiện tại
    // Nếu không bị khóa, trả về thông tin session hiện tại
    $response = [
        'loggedIn' => true,
        'username' => $_SESSION['user']['username'] ?? null,
        'role'     => $_SESSION['user']['role'] ?? null,
        'status'   => $_SESSION['user']['status'] ?? null, // Sử dụng giá trị từ DB
        'message'  => null
    ];

} else {
    $response = [
        'loggedIn' => false,
        'username' => null,
        'role' => null
        ,'status' => null,
       'message' => 'You are not logged in.'
    ];
}

// Trả về dữ liệu JSON
echo json_encode($response);
?>
