<?php
include __DIR__ . "/../app/config/data_connect.php"; // Kết nối database với đường dẫn tuyệt đối

header("Content-Type: text/html; charset=UTF-8");
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Kiểm tra đăng nhập
if (
    !isset($_SESSION['user']) || 
    !isset($_SESSION['user']['user_id']) || 
    !isset($_SESSION['user']['username']) || 
    !isset($_SESSION['user']['role']) || 
    !is_numeric($_SESSION['user']['user_id'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Vui lòng đăng nhập trước khi thao tác."
    ]);
    exit;
}

$user_id = (int) $_SESSION['user']['user_id'];
$username = $_SESSION['user']['username'];
$role = $_SESSION['user']['role'];

$user_query = mysqli_query($conn, "SELECT * FROM users WHERE user_id = '$user_id'");
$user = mysqli_fetch_assoc($user_query);

// Lấy thông tin cart (chỉnh sửa cho đúng cột size_id trong product)
$cart_query = mysqli_query($conn, "SELECT c.*, p.product_name, p.price, p.image, s.size_name FROM cart c JOIN product p ON c.product_id = p.product_id JOIN size s ON p.size_id = s.size_id WHERE c.user_id = '$user_id'");
if (!$cart_query) {
    die("Lỗi truy vấn: " . mysqli_error($conn));
}
$total_cost = 0;

?>

<div class="Pay_big">
    <div class="pay-infor">
        <div class="input-information">
            <h1>Customer Information</h1>
            <form action="order_process.php" method="post">
                <div class="name">
                    <label for="full_name">Full name <span style="color: red;">(*)</span></label>
                    <input type="text" id="full_name" name="full_name" value="<?= $user['user_name'] ?>">
                </div>
                <div class="phone">
                    <label for="phone">Phone <span style="color: red;">(*)</span></label>
                    <input type="number" id="phone" name="phone" value="<?= $user['phone'] ?>">
                </div>
                <div class="address">
                    <label for="address">Address <span style="color: red;">(*)</span></label>
                    <input type="text" id="registerStreet" name="address" value="<?= htmlspecialchars($user['street']) ?>">
                </div>
                <div class="address">
                    <label for="email">City <span style="color: red;">(*)</span></label>
                    <select id="registerCity" name="city" required>
                        <option value="">Select City</option>
                    </select>
                    <!-- <label>City</label> -->
                </div>

                <div class="address">
                    <label for="registerStreet">District <span style="color: red;">(*)</span></label>
                    <select id="registerDistrict" name="district" required>
                        <option value="">Select District</option>
                    </select>
                    <!-- <label>District</label> -->
                </div>

                <div class="address">
                    <label for="registerWard">Ward <span style="color: red;">(*)</span></label>
                    <select id="registerWard" name="ward" required>
                        <option value="">Select Ward</option>
                    </select>
                    <!-- <label>Ward</label> -->
                </div>

                <div class="delivery-date">
                    <label for="delivery_date">Delivery Date <span style="color: red;">(*)</span></label>
                    <input type="date" id="delivery_date" name="delivery_date" required>
                </div>
                <div class="note">
                    <label for="note">Greeting Message</label>
                    <textarea id="note" name="note" rows="2" cols="90" style="overflow:auto;"></textarea>
                </div>

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

                <h1>Final Payment</h1>
                <div class="payment-method">
                    <label><input type="radio" name="payment_method" value="cash" checked> COD</label>
                    <label><input type="radio" name="payment_method" value="momo"> Momo</label>
                    <label><input type="radio" name="payment_method" value="credit-card" id="credit-card-option"> Credit Card</label>
                    <label><input type="radio" name="payment_method" value="vnpay"> VNPay</label>
                </div>

                <div id="credit-card-fields" class="credit-details active">
                    <label for="card_number">Card Number <span style="color: red;">(*)</span></label>
                    <input type="text" name="card_number" id="card_number" placeholder="Enter your card number">

                    <label for="card_holder">Card Holder Name <span style="color: red;">(*)</span></label>
                    <input type="text" name="card_holder" id="card_holder" placeholder="Enter card holder name">

                    <label for="expiry_date">Expiry Date <span style="color: red;">(*)</span></label>
                    <input type="month" name="expiry_date" id="expiry_date">

                    <label for="cvv">CVC/CVV <span style="color: red;">(*)</span></label>
                    <input type="text" name="cvv" id="cvv" placeholder="Enter CVC/CVV code">
                </div>

                <div class="my-order">
                    <div class="Text-head">
                        <h1>Your Orders</h1>
                    </div>
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

                            <?php if (!empty($row['note'])): ?>
                                <label for="note">Greeting Message</label>
                                <div class="product-note"><strong>Note:</strong> <?= htmlspecialchars($row['note']) ?></div>
                            <?php endif; ?>

                            <div class="price"><?= number_format($subtotal, 0, '.', '.') ?> VND</div>
                        </div>
                    </div>
                    <?php } ?>

                    <div class="note">
                        <label for="note">Greeting Message</label>
                        <textarea id="note" name="note" rows="2" cols="90" style="overflow:auto;"></textarea>
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

<script>
    const userAddressInfo = {
        city: "<?= $user['city'] ?>",
        district: "<?= $user['district'] ?>",
        ward: "<?= $user['ward'] ?>",
        street: "<?= $user['street'] ?>"
    };
</script>