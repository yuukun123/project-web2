<?php
include '../../config/data_connect.php';

if (isset($_POST['id']) && isset($_POST['lock'])) {
    $id = $_POST['id'];
    $lock = $_POST['lock']; // 1 = lock, 0 = unlock

    $stmt = $conn->prepare("UPDATE users SET is_locked = ? WHERE user_id = ?");
    $stmt->bind_param("ii", $lock, $id);
    if ($stmt->execute()) {
        echo $lock ? "User locked successfully." : "User unlocked successfully.";
    } else {
        echo "Failed to update user status.";
    }
} else {
    echo "Invalid request.";
}
?>
