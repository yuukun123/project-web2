<!-- banner.php -->
<?php

echo '
<div class="bg-screen">
    <div class="carousel_wrapper">
        <div class="slide-item banner-img">
            <img class="slide-banner-img" alt="" width="1300" height="430" src="' . BASE_URL . 'img/banner1.jpg">
        </div>
        <div class="slide-item banner-img">
            <img class="slide-banner-img" alt="" width="1300" height="430" src="' . BASE_URL . 'img/banner2.jpg">
        </div>
    </div>

    <button class="custom-prev">
        <svg xmlns="./http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
    </button>
    <button class="custom-next">
        <svg xmlns="./http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
    </button>
</div>';
?>