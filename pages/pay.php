<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/user-pay.css">

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> 
    
    <!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script> -->

    <link rel="icon" href="../Img/Sweets1.png" type="image/x-icon" class="icon-page" />
    <title>The Sweets</title>
</head>

<body>

    <!--header-->
    <div class="header">
        <button class="logo" style="border: none; background: none; cursor:pointer ">
            <img src="../Img/Sweets1.png" alt="">
        </button>
        <nav class="navigation">
            <a href="#">HOME</a>
            <a href="#">SEARCH</a>
            <a href="#">RECEIPT</a>
            <button class="sp-cart" id="cart-btn">
                <ion-icon name="cart-outline"></ion-icon>
            </button>
            <span class="cart-count">2</span>
            
            <div class="search-container">
                <div class="input-wrapper">
                    <input type="find" id="search" onkeyup="myFunction() " placeholder="Search for names..">
                    <span class="search-icon">
                        <button class="searchBtn">
                            <ion-icon name="search-outline"></ion-icon>
                        </button>
                    </span>
                </div>
                <div id="hintContainer" class="hint-container"></div>
            </div>

            <button id="login-btn" class="btnLogin-popup">Login</button>
            <button id="logout-btn" class="btnLogout-popup">Logout</button>
        </nav>

        <div class="hamburger"  id="hamburger" onclick="toggleMenu()">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
    </div>

    <div class="mobile-menu" id="mobileMenu">
        <div class="hamburger"  id="hamburger" onclick="toggleMenu()">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        
        <div class="mobile-menu-off">
            <a href="./user-index.html">HOME</a>
            <a href="./user-searchpro.html">SEARCH</a>
            <a href="./user-receipt.html">RECEIPT</a>
            <button class="sp-cart" id="cart-btn">
                <ion-icon name="cart-outline"></ion-icon>
                <span class="cart-count">2</span>
            </button>

        <div class="btn-log">
            <button id="login-btn" class="btnLogin-popup">Login</button>
            <button id="login-btn" class="btnLogout-popup">Logout</button>
        </div>

        </div>
    </div>

    <div class="blur-overlay"></div>

    <!-- Thông Tin Chung -buy-customers -->
    <div class="Home_main">
        <div class="Pay_big">
            <!-- Thông tin người mua hàng -->
            <div class="pay-infor">
                <div class="input-information">
                    <h1>Customer Information</h1>
                    <form action="">
                        <div class="name">
                            <label for="full_name">Full name <span style="color: red;">(*)</span></label>
                            <input type="text" id="full_name" name="full_name" value="">
                        </div>
                        <div class="phone">
                            <label for="phone">Phone <span style="color: red;">(*)</span></label>
                            <input type="number" id="phone" name="phone" value="">
                        </div>
                        <div class="address">
                            <label for="address">Address <span style="color: red;">(*)</span></label>
                            <input type="text" id="address" name="address" value="">
                        </div>
                        <div class="delivery-date">
                            <label for="delivery_date">Delivery Date <span style="color: red;">(*)</span></label>
                            <input type="date" id="delivery_date" name="delivery_date" value="">
                        </div>


                        <div class="choose">   
                            <div class="fill">
                                <input type="radio" name="auto-fill" id="autoFill" value="Auto fill" checked>
                                <label for="autoFill">
                                    Use Saved Information
                                </label>
                            </div>

                            <div class="clear">
                                <input type="radio" name="auto-fill" id="clearFill" value="Clear fill">
                                <label for="clearFill">
                                    Send To Others
                                </label>
                            </div>

                        </div>
                        
                    </form>
                </div>
            </div>

            <div class="payment">
                <!-- Phương Thức Thanh Toán -->
                <h1>Final Payment</h1>
                <form action="">
                    <div class="payment-method">
                        <label>
                            <input type="radio" name="payment_method" value="cash" checked> 
                            <img width="60" height="69" src="../Img/Pay_final/cash.png" alt="Cash">
                            COD
                        </label>
                    </div>
                    <div class="payment-method">
                        <label>
                            <input type="radio" name="payment_method" value="momo"> 
                            <img width="60" height="69" src="../Img/Pay_final/momo_icon.png" alt="Momo">
                            Momo
                        </label>
                    </div>
                    <div class="payment-method">
                        <label>
                            <input type="radio" id="credit-card-radio" name="payment_method" value="credit-card"> 
                            <img width="60" height="69" src="../Img/Pay_final/visamaster_logo.png" alt="Visa">
                            Credit Card (Visa, Master, American Express, JCB)
                        </label>
                        <div class="card-input" id="card-input">
                            <div class="card-number">
                                <input type="text" placeholder="card number" />
                            </div>
                            <div class="card-details">
                                <input type="date" placeholder="MM/YY" class="expiry-date" />
                                <input type="text" placeholder="CVC/CVV" class="cvc" />
                            </div>
                        </div>
                    </div>
                    <div class="payment-method">
                        <label>
                            <input type="radio" name="payment_method" value="VNPay">
                            <img width="60" height="69" src="../Img/Pay_final/vnpay_newlogo.png" alt="VNPay"> 
                            VNPay
                        </label>
                    </div>
                </form>
            </div>
            
            <!-- Thông Tin Đơn Hàng -->
            <div class="my-order">
                <div class="Text-head">
                    <h1>Your Orders</h1>
                </div>
                <div class="product">
                    <div class="item">
                        <img width="55" height="69" src="../Img/Mousse/Corn_Mousse.jpg" alt="Corn Mousse">
                        <div class="details">
                            <div>Corn Mousse - 16cm</div>
                            <div class="btn-quantity">Quantity: 
                                <button class="click">
                                    <ion-icon name="caret-back-outline"></ion-icon>
                                </button>
                                <p style="background: #ffdd00; border-radius: 100%; padding: 0px 10px;">1</p>
                                <button class="click">
                                    <ion-icon name="caret-forward-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                        <div class="price">520.000 VND</div>
                    </div>

                    <div class="note">
                        <label for="note">Greeting Message</label>
                        <textarea id="note" name="note" value="" rows="2" cols="90" style="overflow:auto;"></textarea>
                    </div>

                    <div class="item">
                        <img width="55" height="69" src="../Img/Mousse/Melon_Mousse.jpg" alt="Melon Mousse">
                        <div class="details">
                            <div>Melon Mousse - 16cm</div>
                            <div class="btn-quantity">Quantity: 
                                <button class="click">
                                    <ion-icon name="caret-back-outline"></ion-icon>
                                </button>
                                <p style="background: #ffdd00; border-radius: 100%; padding: 0px 10px;">1</p>
                                <button class="click">
                                    <ion-icon name="caret-forward-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                        <div class="price">550.000 VND</div>
                    </div>
                </div>

                <div class="note">
                    <label for="note">Greeting Message</label>
                    <textarea id="note" name="note" value="" rows="2" cols="90" style="overflow:auto;"></textarea>
                </div>

                <div class="subtotal">
                    <div class="total">
                        <div class="provisional">
                            <div>Provisional</div>
                            <div class="price">1.070.000 VND</div>
                        </div>
                        <!--
                        <div class="ship">
                            <div>Delivery</div>
                            <div>Free Shipping</div>
                        </div>
                        -->
                        <div class="total-sum">
                            <div>Total</div>
                            <div class="price">1.070.000 VND</div>
                        </div>
                    </div>
                </div>
                <div class="notification">
                    <p>Notification: Please review your order before proceeding to payment.</p>
                </div>
                <div class="pay">
                    <button class="pay-button" >Pay</button>
                </div>
            </div>
        </div>
    </div>
   <!-- Overlay -->
   <div class="overlay" id="overlay"></div>

   <!-- Confirmation Section -->
   <div class="confirmation" id="confirmation">
        <div class="icon-wrapper">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
        </div>
        <h1>SUCCESS</h1>
        <!-- <h2>Mr./Ms. Bui Minh Ngoc</h2> -->
        <p class="order-id"><span style="font-weight: bold;">Your Order ID </span><strong class="order-id-number">#ND002</strong></p>
        <div class="receipt-rev">
            <div class="name-food">Corn Mousse</div> 
            <div class="number">1</div>
        </div>
        <div class="receipt-rev">
            <div class="name-food">Melon Mousse</div> 
            <div class="number">1</div>
        </div>
        <p class="total">Total <span> 1.000.000 VND</span></p>
        <p style="font-size: 14px;">Thank you for choosing our service!</p>
        <p style="font-size: 14px;">Your order is on its way with love. </p>
        <a href="./user-receipt.html" class="back-home">Click here to view the invoice</a>
        <p>Wishing you the sweetest day!</p>
    </div>
    <!-- Other content of your page -->
</body>



<!-- footer -->
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
                <img src="../Img/Sweets1.png" alt="">
            </div>
            <ul class="Footer_connect_icon ">
                <li>
                    <a href="# ">
                        <ion-icon name="logo-youtube"></ion-icon>
                    </a>
                </li>
                <li>
                    <a href="# ">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                </li>
                <li>
                    <a href="# ">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                </li>
            </ul>
        </div>
        
    </div>

    <div class="footer-bottom-line"></div>

    <div class="copy-right">
        <p>© copyright 2024 by The MEM Group | Công ty TNHH The Sweets | Design by The MEM Group</p>
        <button id="backToTop" onclick="scrollToTop()">
            <ion-icon name="arrow-up-outline"></ion-icon>
        </button>
    </div>
    
</div>


<script src="../js/user-pay.js"></script>
<!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js "></script>
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js "></script> -->
</body>

</html>