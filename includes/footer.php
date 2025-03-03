<!-- footer.php -->
<?php

// include __DIR__ . '/../app/config/config.php';

echo '
<div class="footer">
    <div class="Footer_footer_contain">
        <div class="footer_section ">
            <h3 class="Footer_footer_title ">INTRODUCE</h3>
            <ul>
                <li><button class="Foot_footer_list ">Về Chúng Tôi</button></li>
                <li><button class="Foot_footer_list ">Thoả Thuận Sử Dụng</button></li>
                <li><button class="Foot_footer_list ">Quy Chế Hoạt Động</button></li>
                <li><button class="Foot_footer_list ">Chính Sách Bảo Mật</button></li>
            </ul>
        </div>
        <div class="footer_section ">
            <h3 class="Footer_footer_title ">CORNER FOOD</h3>
            <ul>
                <li><button class="Foot_footer_list ">Mouse</button></li>
                <li><button class="Foot_footer_list ">Croissant</button></li>
                <li><button class="Foot_footer_list ">Drink</button></li>
            </ul>
        </div>
        <div class="footer_section ">
            <h3 class="Footer_footer_title ">SUPPORT</h3>
            <ul>
                <li><button class="Foot_footer_list ">Góp Ý</button></li>
                <li><button class="Foot_footer_list ">Tuyển Dụng</button></li>
                <li><button class="Foot_footer_list ">FAQ</button></li>
            </ul>
        </div>
        <div class="footer_section">
            <div class="footer_logo">
                <img src="' . BASE_URL . 'img/Sweets1.png" alt="">
            </div>
            <ul class="Footer_connect_icon ">
                <li><a href="#"><ion-icon name="logo-youtube"></ion-icon></a></li>
                <li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
                <li><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom-line"></div>
    <div class="copy-right">
        <p>© copyright 2024 by The MEM Group | Công ty TNHH The Sweets | Design by The MESince </p>
    </div>
</div>

<button id="backToTop" onclick="scrollToTop()">
    <ion-icon name="arrow-up-outline"></ion-icon>
</button>';
?>