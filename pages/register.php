<?php
// Mặc định nếu $showRegister chưa được set
if (!isset($showRegister)) {
    $showRegister = false;
}
?>

<div class="wrapper">
    <!--register account-->
    <div class="form-box register" style="display: <?= $showRegister ? 'block' : 'none' ?>;">
        <h2>Registration</h2>
        <form id="registerForm" action="pages/Controllers/register_process.php" method="POST">

            <div class="input-infor">
                <div class="left-input">
                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="person-outline"></ion-icon>
                        </span>
                        <input id="registerUsername" type="text" name="username" required>
                        <label>User name<span style="color: red;">*</span></label>
                    </div>

                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="mail-outline"></ion-icon>
                        </span>
                        <input id="registerEmail" type="email" name="email" required>
                        <label>Email</label>
                    </div>

                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="call-outline"></ion-icon>
                        </span>
                        <input id="registerPhone" type="number" name="phone" required>
                        <label>Phone number</label>
                    </div>

                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        <input id="registerPassword" type="password" name="password" required>
                        <label>Password</label>
                    </div>

                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        <input id="registerConfirmPassword" type="password" name="confirm_password" required>
                        <label>Confirm Password</label>
                    </div>
                </div>

                <div class="right-input">
                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="location-outline"></ion-icon>
                        </span>
                        <input id="registerAddress" type="text" name="street" required>
                        <label>Street</label>
                    </div>

                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="business-outline"></ion-icon>
                        </span>
                        <select id="registerCity" name="city" required>
                            <option value="">Select City</option>
                        </select>
                        <!-- <label>City</label> -->
                    </div>

                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="map-outline"></ion-icon>
                        </span>
                        <select id="registerDistrict" name="district" required>
                                <option value="">Select District</option>
                            </select>
                        <!-- <label>District</label> -->
                    </div>

                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <select id="registerWard" name="ward" required>
                                <option value="">Select Ward</option>
                            </select>
                        <!-- <label>Ward</label> -->
                    </div>


                </div>

            </div>

            <div class="remember-forgot">
                <label><input type="checkbox" name="agree">i agree to the terms & conditions</label>
            </div>
            <button type="submit" class="btn">Register</button>
            <div class="login-register">
                <p>Already have an account ? <a href="login" class="login-link">Login</a></p>
            </div>
        </form>
    </div>

</div>

