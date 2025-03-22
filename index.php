<?php
// Khởi động phiên

session_name("user");
session_start(); // Đảm bảo session được khởi động

include_once 'app/config/data_connect.php'; // Kết nối database

// Nếu người dùng đã đăng nhập, kiểm tra trạng thái tài khoản
if (isset($_SESSION['user']) && is_array($_SESSION['user'])) {
    $user_id = $_SESSION['user']['user_id'] ?? null;
    if ($user_id) {
        $stmt = $conn->prepare("SELECT status FROM users WHERE user_id = ?");
        if ($stmt) {
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $userData = $result->fetch_assoc();
            $stmt->close();
            // Nếu tài khoản bị khóa, thực hiện logout và chuyển hướng
            if ($userData && $userData['status'] === 'locked') {
                // Xóa session và cookie
                $_SESSION = [];
                session_unset();
                session_destroy();
                setcookie(session_name(), '', time() - 3600, '/');
                setcookie("remember_token", "", time() - 3600, "/");
                // Chuyển hướng về trang đăng nhập kèm thông báo lỗi (bạn có thể tùy chỉnh URL)
                header("Location: /project-web2/login?error=account_locked");
                exit();
            }
        }
    }
}

// Nếu chưa đăng nhập, hoặc sau khi kiểm tra thì lấy thông tin session (dành cho hiển thị thông tin)
if (isset($_SESSION['user']) && is_array($_SESSION['user'])) {
    $user_id = $_SESSION['user']['user_id'] ?? 'Chưa đăng nhập';
    $username = $_SESSION['user']['username'] ?? 'Chưa đăng nhập';
    $role = $_SESSION['user']['role'] ?? 'Chưa đăng nhập';
} else {
    $user_id = "Không có dữ liệu";
    $username = "Không có dữ liệu";
    $role = "Không có dữ liệu";
}

// Kiểm tra xem có ?pages hay chưa
if (!isset($_GET['pages'])) {
    // Nếu chưa có, tự động chuyển hướng sang ?pages=home
    header('Location: /home');
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
    } elseif ($page === 'register') {
        echo '<link rel="stylesheet" href="public/assets/css/login.css">';
    } elseif ($page === 'about') {
        echo '<link rel="stylesheet" href="public/assets/css/about.css">';
    } elseif ($page === 'receipt') {
        echo '<link rel="stylesheet" href="public/assets/css/receipt.css">';
    } elseif ($page === 'advance') {
        echo '<link rel="stylesheet" href="public/assets/css/searchpro.css">';
    } elseif ($page === 'home') {
        echo '<link rel="stylesheet" href="public/assets/css/index.css">';
    } elseif ($page === 'product') {
        echo '<link rel="stylesheet" href="public/assets/css/product_detail.css">';
    }elseif ($page ==='pay') {
        echo '<link rel="stylesheet" href="public/assets/css/pay.css">';
    }
    ?>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
    <link rel="icon" href="<?php echo 'public/assets/Img/Sweets1.png'; ?>" type="image/x-icon" />

    <title>The Sweets</title>
</head>

<body class="<?php echo isset($_SESSION['username']) ? 'logged-in' : ''; ?>">
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
            case 'product':
                require __DIR__ . '/pages/product-detail.php';
                break;
            case 'pay':
                require __DIR__ . '/pages/pay.php';
                break;
            // case 'cart_action':
            //     require __DIR__ . '/includes/cart_action.php';
            //     break;
        }
        ?>
        
    </div>

    <div class="shopping-cart">
        <button class="close">
            &times;
        </button>
        <div class="cart-scroll">
            <?php include 'includes/cart.php'; ?>
        </div>
        
        <div class="Pay_button">
            <a href="pay" target="_blank" class="pay-link">
                <button class="pay-btn-link">Pay</button>
            </a>
        </div>
    </div>
    <div class="blur-overlay"></div>


    <?php include 'includes/footer.php'; ?>
    <?php
    if ($page === 'home') :
        echo '<script src="public/assets/js/index.js"></script>';
    endif;  // End of if statement
    if ($page === 'login' || $page === 'register') :
        echo '<script src="public/assets/js/login.js"></script>';
    endif;  // End of if statement
    if ($page === 'about') :
        echo '<script src="public/assets/js/about.js"></script>';
    endif;  // End of if statement
    if ($page === 'receipt') :
        echo '<script src="public/assets/js/receipt.js"></script>';
    endif;  // End of if statement
    if ($page === 'advance') :
        echo '<script src="public/assets/js/searchpro.js"></script>';
    endif;  // End of if statement
    if ($page === 'product') :
        echo '<script src="public/assets/js/product.js"></script>';
    endif;  // End of if statement
    if ($page === 'pay') :
        echo '<script src="public/assets/js/pay.js"></script>';
    endif;
    ?>
    <script src="public/assets/js/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</body>

</html>