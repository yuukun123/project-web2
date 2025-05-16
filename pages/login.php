<div class="wrapper">
    <!--login account-->
    <div class="form-box login">
        <h2>Login</h2>
        <form id="loginForm" method="POST" action="pages/Controllers/login_process.php">
            <div class="input-box">
                <span class="icon">
                    <ion-icon name="person-outline"></ion-icon>
                </span>
                <input id="loginUserName" name="username" type="text" required>
                <label>User name</label>
            </div>
            <div class="input-box">
                <span class="icon">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                </span>
                <input id="loginPassword" name="password" type="password" required>
                <label>Password</label>
            </div>

            <!-- <div class="remember-forgot">
                <label><input type="checkbox">remember me</label>
                <a href="#">Forgot Password</a>
            </div> -->
            <button type="submit" class="btn">Login</button>
            <div class="login-register">
                <p>Don't have an account ? <a href="register" class="register-link">Register</a></p>
            </div>
        </form>
    </div>
</div>