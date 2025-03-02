<!--header-->

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
                    <p>Don't have an account ? <a href="?pages=register" class="register-link">Register</a></p>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- footer -->


<button id="backToTop" onclick="scrollToTop()">
    <ion-icon name="arrow-up-outline"></ion-icon>
</button>