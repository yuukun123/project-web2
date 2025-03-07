<?php
// Khởi động phiên
session_start();
if (!isset($_SESSION['user_id'])) {
    echo "Session đã bị xóa hoặc chưa được tạo!";
} else {
    echo "Session tồn tại! ID: " . $_SESSION['user_id'];
}

include('app/config/data_connect.php'); // Kết nối database

if (!isset($_SESSION['user_id']) && isset($_COOKIE['login_token'])) {
    $token = $_COOKIE['login_token'];

    // Kiểm tra token trong database
    $sql = "SELECT * FROM users WHERE remember_token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Tự động đăng nhập
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    }
}

// Kiểm tra xem có ?pages hay chưa
if (!isset($_GET['pages'])) {
// Nếu chưa có, tự động chuyển hướng sang ?pages=home
header('Location: index.php?pages=home');
exit; // Dừng script để tránh chạy tiếp
}

// Bây giờ chắc chắn đã có ?pages
$page = $_GET['pages'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="public/assets/css/style.css">

    <?php
    // Giả sử $page được lấy ở index.php hoặc set ở header trước khi include
    if ($page === 'login') {
        echo '<link rel="stylesheet" href="public/assets/css/login.css">';
    }
    elseif ($page === 'register') {
        echo '<link rel="stylesheet" href="public/assets/css/login.css">';
    } 
    elseif ($page === 'about') {
        echo '<link rel="stylesheet" href="public/assets/css/about.css">';
    }
    elseif ($page === 'receipt') {
        echo '<link rel="stylesheet" href="public/assets/css/receipt.css">';
    }
    elseif ($page === 'advance') {
        echo '<link rel="stylesheet" href="public/assets/css/searchpro.css">';
    }
    else {
        echo '<link rel="stylesheet" href="public/assets/css/index.css">';
    }
    ?>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <link rel="icon" href="public/assets/Img/Sweets1.png" type="image/x-icon" class="icon-page" />
    <title>The Sweets</title>
</head>

<body>
    <?php include 'includes/header.php'; ?>

    <!-- main screen -->
    <div class="Home_main">
        <?php
        switch ($page) {
            case 'home':
            default:
                include 'includes/banner.php';
                include 'includes/products.php';
                break;
            case 'about':
                include 'includes/banner.php';
                require __DIR__ . '/pages/about.php';
                break;
            case 'receipt':
                require __DIR__ . '/pages/receipt.php';
                break;
            case 'login':
                $showRegister = false;
                require __DIR__ . '/pages/login.php';
                break;
            case 'register':
                $showRegister = true;
                require __DIR__ . '/pages/register.php';
                break;
            case 'advance':
                require __DIR__ . '/pages/searchpro.php';
                break;
        }
        ?>
    </div>

    <?php include 'includes/footer.php'; ?>

    <?php 
        if ($page === 'home') : 
            echo '<script src="public/assets/js/index.js"></script>';
        endif;  // End of if statement
        if ($page === 'login' || $page ==='register') : 
            echo '<script src="public/assets/js/login.js"></script>';
        endif;  // End of if statement
        if ($page === 'about') : 
            echo '<script src="public/assets/js/about.js"></script>';
        endif;  // End of if statement
        if ($page ==='receipt') : 
            echo '<script src="public/assets/js/receipt.js"></script>';
        endif;  // End of if statement
        if ($page ==='advance') :
            echo '<script src="public/assets/js/searchpro.js"></script>';
        endif;  // End of if statement
    ?>
    <script src="public/assets/js/script.js"></script>

</body>

</html>