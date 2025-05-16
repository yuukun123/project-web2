<?php
include __DIR__ . "/../app/config/data_connect.php"; // Kết nối database với đường dẫn tuyệt đối

// header("Content-Type: text/html; charset=UTF-8");
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Kiểm tra đăng nhập
if (
    !isset($_SESSION['user']) || 
    !isset($_SESSION['user']['username']) || 
    !isset($_SESSION['user']['role'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Please log in before performing this action."
    ]);
    exit;
}


$username = $_SESSION['user']['username'];
$role = $_SESSION['user']['role'];

$user_query = mysqli_query($conn, "SELECT * FROM users WHERE user_name = '$username'");
$user = mysqli_fetch_assoc($user_query);

// Lấy thông tin cart (chỉnh sửa cho đúng cột size_id trong product)
$cart_query = mysqli_query($conn, "SELECT c.*, p.product_name, p.price, p.image, s.size_name FROM cart c JOIN product p ON c.product_id = p.product_id JOIN size s ON p.size_id = s.size_id WHERE c.user_name = '$username'");
if (!$cart_query) {
    die("Lỗi truy vấn: " . mysqli_error($conn));
}
$total_cost = 0;

?>

<div class="Pay_big">
    <div class="pay-infor">
        <div class="input-information">
            <h1>Customer Information</h1>

            <div class="choose">   
                <div class="fill">
                    <input type="radio" name="auto-fill" id="autoFill" value="Auto fill" checked>
                    <label for="autoFill">Use Saved Information</label>
                </div>

                <div class="clear">
                    <input type="radio" id="sendOther" name="auto-fill"  value="Clear fill">
                    <label for="sendOther">Send To Others</label>
                </div>
            </div>

            <form id="payment-form" >
                <div class="name">
                    <label for="full_name">Full name <span style="color: red;">(*)</span></label>
                    <input type="text" id="full_name" name="full_name" value="<?= htmlspecialchars($user['first_name'] . ' ' . $user['last_name']) ?>">

                </div>
                <div class="phone">
                    <label for="phone">Phone <span style="color: red;">(*)</span></label>
                    <input type="number" id="phone" name="phone" value="<?= $user['phone'] ?>">
                </div>

                <input type="hidden" name="shipping_city_name" id="shipping_city_name">
                <input type="hidden" name="shipping_district_name" id="shipping_district_name">
                <input type="hidden" name="shipping_ward_name" id="shipping_ward_name">

                
                <div class="address">
                    <label for="address">Address <span style="color: red;">(*)</span></label>
                    <input type="text" id="registerStreet" name="shipping_street" value="<?= htmlspecialchars($user['street']) ?>">
                </div>
                <div class="address">
                    <label for="email">City <span style="color: red;">(*)</span></label>
                    <select id="registerCity" name="shipping_city" required>
                        <option value="">Select City</option>
                    </select>
                    <!-- <label>City</label> -->
                </div>

                <div class="address">
                    <label for="registerStreet">District <span style="color: red;">(*)</span></label>
                    <select id="registerDistrict" name="shipping_district" required>
                        <option value="">Select District</option>
                    </select>
                    <!-- <label>District</label> -->
                </div>

                <div class="address">
                    <label for="registerWard">Ward <span style="color: red;">(*)</span></label>
                    <select id="registerWard" name="shipping_ward" required>
                        <option value="">Select Ward</option>
                    </select>
                    <!-- <label>Ward</label> -->
                </div>

                <div class="delivery-date">
                    <label for="delivery_date">Delivery Date <span style="color: red;">(*)</span></label>
                    <input type="date" id="delivery_date" name="delivery_date" required>
                </div>


                <div class="delivery-time">
                    <label for="delivery_time">Delivery Time <span style="color: red;">(*)</span></label>
                    <!-- <select id="delivery_time" name="delivery_time" required>
                        <option value="">Select Time</option>
                        <option value="8:00 - 10:00">8:00 - 10:00</option>
                        <option value="10:00 - 12:00">10:00 - 12:00</option>
                        <option value="13:00 - 15:00">13:00 - 15:00</option>
                        <option value="15:00 - 17:00">15:00 - 17:00</option>
                        <option value="17:00 - 19:00">17:00 - 20:00</option>
                    </select> -->
                    <input type="time" id="delivery_time" name="delivery_time" min="08:00" max="20:00" required>
                </div>

                <div class="note">
                    <label for="note">Greeting Message</label>
                    <textarea id="note" name="note" rows="2" cols="90" style="overflow:auto;"></textarea>
                </div>

                <h1>Payment Method</h1>
                <div class="payment-method">
                    <label><input type="radio" name="payment_method" value="COD" checked> COD</label>
                </div>


                <!-- <div id="Momo-fields" class="credit-details active">
                    <p>Card Number: 1234567890</p>
                    <p>Name: Vo Anh Hao</p>
                    <p style="color: red">Staff will call you to confirm your order after payment.</p>
                </div>

                <div id="VNPay-fields" class="credit-details">
                    <p>Card Number: 1234567890</p>
                    <p>Name: Vo Anh Hao</p>
                    <p style="color: red">Staff will call you to confirm your order after payment.</p>
                </div> -->

                <div class="my-order">
                    <div class="Text-head">
                        <h1>Your Orders</h1>
                    </div>

                    <div class="product-list">
                        <?php while ($row = mysqli_fetch_assoc($cart_query)) { 
                            $subtotal = $row['quantity'] * $row['price'];
                            $total_cost += $subtotal;
                        ?>
                        <div class="product">
                            <div class="item">
                                <img width="55" height="69" src="<?= $row['image'] ?>" alt="<?= $row['product_name'] ?>">
                                <div class="details">
                                    <div><?= $row['product_name'] ?> - <?= $row['size_name'] ?></div>
                                    <div class="btn-quantity">Quantity: <?= $row['quantity'] ?></div>
                                </div>
                                <div class="price"><?= number_format($subtotal, 0, '.', '.') ?> VND</div>
                            </div>

                            <div class="note">
                                <label for="note_<?= $row['cart_id'] ?>">Note for this product</label>
                                <input type="text" name="product_note[<?= $row['cart_id'] ?>]" id="note_<?= $row['cart_id'] ?>" value="<?= htmlspecialchars($row['note'] ?? '') ?>" placeholder="Enter message for this product">
                            </div>
                        </div>
                        <?php } ?>
                    </div>


                    <div class="subtotal">
                        <div class="total">
                            <div class="provisional">
                                <div>Provisional</div>
                                <div class="price"><?= number_format($total_cost, 0, '.', '.') ?> VND</div>
                            </div>
                            <div class="total-sum">
                                <div>Total</div>
                                <div class="price"><?= number_format($total_cost, 0, '.', '.') ?> VND</div>
                            </div>
                        </div>
                    </div>

                    <div class="notification">
                        <p>Notification: Please review your order before proceeding to payment.</p>
                    </div>

                    <div class="pay">
                        <button type="submit" class="pay-button">Pay</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</div>

<div class="confirmation" id="confirmation">
    <div class="icon-wrapper">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
    </div>
    <h1>SUCCESS</h1>
    <p class="order-id"><span style="font-weight: bold;">Your Order ID </span><strong class="order-id-number" id="order-id-number">#...</strong></p>
    <div id="receive-address-display" class="receive-address-display"></div>
    <div id="order-items" class="order-items"></div>
    <p class="total" id="total-cost-display">Total <span>0 VND</span></p>
    <p style="font-size: 14px;">Thank you for choosing our service!</p>
    <p style="font-size: 14px;">Your order is on its way with love.</p>
    <!-- <a href="./user-receipt.html" class="back-home">Click here to view the invoice</a> -->
    <a id="view-invoice-link" href="receipt" class="view-invoice-btn">Click here to view the invoice</a>
    <p>Wishing you the sweetest day!</p>
</div>

<div class="blur-overlay" id="confirmation-overlay"></div>


<script>
    const userAddressInfo = {
        full_name: "<?= $user['first_name'].''. $user['last_name']?>",
        phone: "<?= $user['phone']?>",
        city: "<?= $user['city'] ?>",
        district: "<?= $user['district'] ?>",
        ward: "<?= $user['ward'] ?>",
        street: "<?= $user['street'] ?>"
    };

</script>