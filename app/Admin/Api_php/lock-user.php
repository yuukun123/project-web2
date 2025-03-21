<?php
include '../../config/data_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['id'] ?? null;
    $action = $_POST['action'] ?? '';

    if (!$user_id || !in_array($action, ['lock', 'unlock'])) {
        echo "Invalid request data.";
        exit();
    }

    $status = ($action === 'lock') ? 'locked' : 'active';

    $stmt = $conn->prepare("UPDATE users SET status = ?, updated_at = NOW() WHERE user_id = ?");
    $stmt->bind_param("si", $status, $user_id);

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
