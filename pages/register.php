<?php
// Mặc định nếu $showRegister chưa được set
if (!isset($showRegister)) {
    $showRegister = false;
}
?>
<!--header-->


<!-- main screen -->
<div class="Home_main">
    <!--wrapper-->
    <div class="wrapper">
        <!--register account-->
        <div class="form-box register" style="display: <?= $showRegister ? 'block' : 'none' ?>;">
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
                    <p>Already have an account ? <a href="?pages=login" class="login-link">Login</a></p>
                </div>
            </form>
        </div>

    </div>
</div>

<!-- footer -->


<button id="backToTop" onclick="scrollToTop()">
    <ion-icon name="arrow-up-outline"></ion-icon>
</button>