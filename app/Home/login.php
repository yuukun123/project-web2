<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/assets/css/login.css">

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <link rel="icon" href="../../public/assets/Img/Sweets1.png" type="image/x-icon" class="icon-page" />
    <title>The Sweets</title>

</head>

<body>

    <!--header-->

    <?php include '../../includes/header.php'; ?>

    <!-- main screen -->
    <div class="Home_main">
        <!--wrapper-->
        <div class="wrapper">
            <!--login account-->
            <div class="form-box login">
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="person-outline"></ion-icon>
                        </span>
                        <input id="loginUserName" type="text" required>
                        <label>User name</label>
                    </div>
                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        <input id="loginPassword" type="password" required>
                        <label>Password</label>
                    </div>

                    <div class="remember-forgot">
                        <label><input type="checkbox">remember me</label>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button type="submit" class="btn">Login</button>
                    <div class="login-register">
                        <p>Don't have an account ? <a href="#" class="register-link">Register</a></p>
                    </div>
                </form>
            </div>

            <!--register account-->
            <div class="form-box register">
                <h2>Registration</h2>
                <form id="registerForm">

                    <div class="input-infor">

                        <div class="left-input">
                            <div class="input-box">
                                <span class="icon">
                                    <ion-icon name="person-outline"></ion-icon>
                                </span>
                                <input id="registerUsername" type="text" required>
                                <label>User name<span style="color: red;">*</span></label>
                            </div>

                            <div class="input-box">
                                <span class="icon">
                                    <ion-icon name="mail-outline"></ion-icon>
                                </span>
                                <input id="registerEmail" type="email" required>
                                <label>Email</label>
                            </div>

                            <div class="input-box">
                                <span class="icon">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                </span>
                                <input id="registerPassword" type="password" required>
                                <label>Password</label>
                            </div>
                        </div>

                        <div class="right-input">
                            <div class="input-box">
                                <span class="icon">
                                    <ion-icon name="call-outline"></ion-icon>
                                </span>
                                <input id="registerPhone" type="number" required>
                                <label>Phone number</label>
                            </div>

                            <div class="input-box">
                                <span class="icon">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                </span>
                                <input id="registerAddress" type="text" required>
                                <label>Address</label>
                            </div>

                            <div class="input-box">
                                <span class="icon">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                </span>
                                <input id="registerConfirmPassword" type="password" required>
                                <label>Confirm Password</label>
                            </div>
                        </div>

                    </div>

                    <div class="remember-forgot">
                        <label><input type="checkbox">i agree to the terms & conditions</label>
                    </div>
                    <button type="submit" class="btn">Register</button>
                    <div class="login-register">
                        <p>Already have an account ? <a href="#" class="login-link">Login</a></p>
                    </div>
                </form>
            </div>

        </div>
    </div>

    <!-- footer -->
    <?php include '../../includes/footer.php'; ?>

    <button id="backToTop" onclick="scrollToTop()">
        <ion-icon name="arrow-up-outline"></ion-icon>
    </button>

    <script src="../../public/assets/js/login.js"></script>
</body>

</html>