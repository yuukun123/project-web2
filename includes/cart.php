<?php
echo '<div class="shopping-cart">
    <button class="close">
        <ion-icon name="close-outline"></ion-icon>
    </button>

    <div class="cart-items">
        <img src="../Img/Mousse/Corn_Mousse.jpg" height="74" width="60" class="cart-img" alt="">
        <span class="infor">
            <button class="close-mini">
                <ion-icon name="close-outline"></ion-icon>
            </button>

            <p class="head-text">Mousse Corn-16cm</p>
            <p class="bottom-text">SL
                <button class="click">
                    <ion-icon name="caret-back-outline"></ion-icon>
                </button>
                1
                <button class="click">
                    <ion-icon name="caret-forward-outline"></ion-icon>
                </button>
                <span class="price">
                    520,000 VND
                </span>
            </p>
        </span>
    </div>

    <div class="cart-items">
        <img src="../Img/Mousse/Melon_Mousse.jpg" height="74" width="60" class="cart-img" alt="">
        <span class="infor">
            <button class="close-mini">
                <ion-icon name="close-outline"></ion-icon>
            </button>

            <p class="head-text">Mousse Melon-16cm</p>

            <p class="bottom-text">SL
                <button class="click">
                    <ion-icon name="caret-back-outline"></ion-icon>
                </button>
                1
                <button class="click">
                    <ion-icon name="caret-forward-outline"></ion-icon>
                </button>
                <span class="price">
                    550,000 VND
                </span>
            </p>
        </span>
    </div>

    <div class="provisional-charge">
        <p>Provisional invoice :</p>
        <p>1,000,000 VND</p>
    </div>

    <!-- <div class="Pay">
            <button class="pay">
                <a href="../Pay/index.html" target="_blank" >Pay</a>
            </button>
        </div> -->

    <div class="Pay">
        <a href="./user-pay.html" target="_blank" class="pay-link">
            <button class="pay">Pay</button>
        </a>
    </div>
</div>';
?>