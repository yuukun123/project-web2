<?php
session_start();
include('../../app/database/data_connect.php');

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Xóa token trong database
    $sql = "UPDATE users SET remember_token = NULL WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
}

// Xóa session và cookie
session_destroy();
setcookie("login_token", "", time() - 3600, "/"); // Xóa cookie

header("Location: ../pages/login.php");
exit();