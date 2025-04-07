<?php

include __DIR__ . '/../app/config/config.php';

// Mặc định hiển thị Login & Register
$authButtons = '
    <button id="login-btn" class="btnLogin-popup" onclick="window.location.href=\'login\'">Login</button>
    <button id="register-btn" class="btnLogout-popup" onclick="window.location.href=\'register\'">Register</button>
';

// Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout
if (isset($_SESSION['user']) && is_array($_SESSION['user'])) {
    $username = htmlspecialchars($_SESSION['user']['username'] ?? 'Guest');
    $authButtons = '
        <div class="user-menu">
            <button id="user-btn" class="btnLogin-popup">' . $username . '</button>
            <form action="pages/Controllers/logout.php" method="POST" style="display: inline;">
                <button type="submit" class="btnLogout-popup">Logout</button>
            </form>
        </div>
    ';                                                      
}

echo '
<div class="header">
    <button class="logo" style="border: none; background: none; cursor:pointer">
        <img src="' . BASE_URL . 'Img/Sweets1.png" alt="">
    </button>
    <nav class="navigation">
        <a href="home">HOME</a>
        <a href="about">ABOUT</a>
        <a href="receipt">RECEIPT</a>

        <button class="sp-cart" id="cart-btn">
            <ion-icon name="cart-outline"></ion-icon>
        </button>
        <span class="cart-count"></span>

        <div class="search-container">
            <div class="input-wrapper">
                <input type="text" class="search-input" onkeyup="myFunction()" placeholder="Search for names..">
                <span class="search-icon">
                    <button class="searchBtn" type="button">
                        <ion-icon name="search-outline"></ion-icon>
                    </button>
                </span>
            </div>
            <div class="hint-container"></div>
        </div>

        <a href="advance" class="searchAdvance">ADVANCED SEARCH</a>
        <div class="auth-container">
            ' . $authButtons . '
        </div>
    </nav>

    <div class="hamburger" id="hamburger" onclick="toggleMenu()">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
</div>

<div class="mobile-menu" id="mobileMenu">
    <div class="hamburger" id="hamburger" onclick="toggleMenu()">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>

    <div class="mobile-menu-off">
        <a href="home">HOME</a>
        <a href="about">ABOUT</a>
        <a href="receipt">RECEIPT</a>
        <a href="advance" class="searchAdvancemobile">ADVANCED SEARCH</a>
        <button class="sp-cart" id="cart-btn">
            <ion-icon name="cart-outline"></ion-icon>
        </button>
        <span class="cart-count cart-count-mobile"></span>

        
        <div class="btn-log">
            ' . $authButtons . '
        </div>
    </div>
</div>


<div class="notificate" id="notificate">
    <p id="message"></p>
</div>

';
?>