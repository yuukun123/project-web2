<?php
include '../../config/data_connect.php';

$user_id = $_POST['id'];
$action = $_POST['action']; // 'lock' or 'unlock'

$status = ($action === 'lock') ? 'locked' : 'active';

$stmt = $conn->prepare("UPDATE users SET status = ? WHERE user_id = ?");
$stmt->bind_param("si", $status, $user_id);

if ($stmt->execute()) {
    echo "User " . ($action === 'lock' ? "locked" : "unlocked") . " successfully.";
} else {
    echo "Error updating user status.";
}

$stmt->close();
$conn->close();
?>
