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
                <div class="note">
                <label for="note">Greeting Message</label>
                    <textarea id="note" name="note" value="" rows="2" cols="90" style="overflow:auto;"></textarea>
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
                    <img width="60" height="69" src="public/assets/Img/Pay_final/cash.png" alt="Cash">
                    COD
                </label>
            </div>
            <div class="payment-method">
                <label>
                    <input type="radio" name="payment_method" value="momo"> 
                    <img width="60" height="69" src="public/assets/Img/Pay_final/momo_icon.png" alt="Momo">
                    Momo
                </label>
            </div>
            <div class="payment-method">
                <label>
                    <input type="radio" id="credit-card-radio" name="payment_method" value="credit-card"> 
                    <img width="60" height="69" src="public/assets/Img/Pay_final/visamaster_logo.png" alt="Visa">
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
                    <img width="60" height="69" src="public/assets/Img/Pay_final/vnpay_newlogo.png" alt="VNPay"> 
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

            <div class="note">
                <label for="note">Greeting Message</label>
                <textarea id="note" name="note" value="" rows="2" cols="90" style="overflow:auto;"></textarea>
            </div>

        </div>



        <div class="subtotal">
            <div class="total">
                <div class="provisional">
                    <div>Provisional</div>
                    <div class="price">1.070.000 VND</div>
                </div>
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
    <a href="receipt" class="back-home">Click here to view the invoice</a>
    <p>Wishing you the sweetest day!</p>
</div>