<?php
session_name("admin");
session_start();

include '../../config/data_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_name = $_POST['user_name'] ?? null;
    $action = $_POST['action'] ?? '';
    $currentUser = $_SESSION['username'] ?? '';

    if (!$user_name || !in_array($action, ['lock', 'unlock'])) {
        echo "Invalid request data.";
        exit();
    }

    // Không cho tự khóa chính mình
    if ($user_name === $currentUser && $action === 'lock') {
        echo "You cannot lock your own account.";
        exit();
    }

    $status = ($action === 'lock') ? 'locked' : 'active';

    $stmt = $conn->prepare("UPDATE users SET status = ?, updated_at = NOW() WHERE user_name = ?");
    $stmt->bind_param("ss", $status, $user_name);

    if ($stmt->execute()) {
        echo "User " . ($action === 'lock' ? "locked" : "unlocked") . " successfully.";
    } else {
        echo "Error updating user status.";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
