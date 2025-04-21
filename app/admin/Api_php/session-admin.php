<?php 
session_name("admin");
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');
include_once __DIR__ . '/../../config/data_connect.php';

$response = [
    'loggedIn' => false,
    'username' => null,
    'role' => null,
    'status' => null,
    'message' => 'You are not logged in.'
];

if (isset($_SESSION['admin']) && is_array($_SESSION['admin'])) {
    $username = $_SESSION['admin']['username'] ?? null;

    if ($username) {
        // Truy vấn lại status từ database
        $stmt = $conn->prepare("SELECT status FROM users WHERE user_name = ?");
        if ($stmt) {
            $stmt->bind_param("s", $username);
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $userData = $result->fetch_assoc();
                $stmt->close();

                // Trả về trạng thái hiện tại
                $response = [
                    'loggedIn' => true,
                    'username' => $username,
                    'role' => $_SESSION['admin']['role'] ?? null,
                    'status' => $userData['status'] ?? 'unknown',
                    'message' => 'Session valid.'
                ];

            } else {
                error_log("Admin status query execution failed: " . $stmt->error);
                $response['message'] = "Error checking account status.";
            }
        } else {
            error_log("Admin status query preparation failed: " . $conn->error);
            $response['message'] = "Error preparing query.";
        }
    } else {
        $response['message'] = "Invalid session data.";
    }
}

echo json_encode($response);
?>
