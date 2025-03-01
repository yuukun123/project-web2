<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> 
    
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <link rel="icon" href="./Img/Sweets1.png" type="image/x-icon" class="icon-page" />
    <title>The Sweets</title>
</head>

<body>
    <!--header-->
    <div class="header">
        <div class="logo">
            <img src="./Img/Sweets1.png" alt="">
        </div>
    </div>

    <div class="blur-overlay"></div>
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

                <!-- <div class="input-box">
                    <span class="icon">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </span>
                    <input id="loginConfirmPassword" type="password" required>
                    <label>Confirm Password</label>
                </div> -->
                
                <div class="remember-forgot">
                    <label><input type="checkbox">remember me</label>
                    <a href="#">Forgot Password</a>
                </div>
                <button type="submit" class="btn">Login</button>
            </form>
        </div>
    </div>

    <script src="./js/script.js"></script>

</body>

</html>