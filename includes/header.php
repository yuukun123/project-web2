<?php

include __DIR__ . '/../app/config/config.php';


echo '
<div class="header">
    <button class="logo" style="border: none; background: none; cursor:pointer">
        <img src="' . BASE_URL . 'Img/Sweets1.png" alt="">
    </button>
    <nav class="navigation">
        <a href="index.php">HOME</a>
        <a href="?pages=about">ABOUT</a>
        <a href="?pages=receipt">RECEIPT</a>
        <button class="sp-cart" id="cart-btn">
            <ion-icon name="cart-outline"></ion-icon>
        </button>
        <span class="cart-count"></span>

        <div class="search-container">
            <div class="input-wrapper">
                <input type="text" id="search" onkeyup="myFunction()" placeholder="Search for names..">
                <span class="search-icon">
                    <button class="searchBtn" type="button">
                        <ion-icon name="search-outline"></ion-icon>
                    </button>
                </span>
            </div>
            <div id="hintContainer" class="hint-container"></div>
        </div>

        <a href="./Home/searchpro.html" class="searchAdvance">ADVANCED SEARCH</a>
        <button id="login-btn" class="btnLogin-popup" onclick="window.location.href=\'?pages=login\'" >Login</button>
        <button id="logout-btn" class="btnLogout-popup" onclick="window.location.href=\'?pages=register\'" >Register</button>
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
        <a href="../index.html">HOME</a>
        <a href="../Home/searchpro.html">SEARCH</a>
        <a href="../Home/receipt.html">RECEIPT</a>
        <a href="#">
            <ion-icon name="cart-outline"></ion-icon>
        </a>

        <div class="btn-log">
            <button id="login-btn" class="btnLogin-popup">Login</button>
            <button id="login-btn" class="btnLogout-popup">Register</button>
        </div>
    </div>
</div>';


// Nhúng cart
include 'includes/cart.php';

?>