<?php 
session_name("admin");
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
// if (isset($_SESSION['admin']) && isset($_SESSION['admin']['username'])) {
//     header("Location: index.php"); // Hoặc trang quản trị chính
//     exit();
// }
?>
