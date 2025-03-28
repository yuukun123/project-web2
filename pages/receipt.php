<?php
// session_start();
include "app/config/data_connect.php"; 

$loggedIn = isset($_SESSION['user']) && isset($_SESSION['user']['username']);

if ($loggedIn) {
    $user_name = $_SESSION['user']['username'];

    $sql = "SELECT o.order_id, 
                DATE_FORMAT(o.order_date, '%Y-%m-%d %H:%i') AS order_date, 
                o.total_cost, 
                o.status, 
                (SELECT SUM(od.quantity) FROM order_detail od WHERE od.order_id = o.order_id) AS quantity 
            FROM orders o 
            WHERE o.user_name = ? 
            ORDER BY o.order_date DESC";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $user_name);
    $stmt->execute();
    $result = $stmt->get_result();
} 
?>

<div class="receipt">
    <div class="big-text">
        <h1>Your Receipt</h1>
    </div>

    <div class="text-infor">
        <div class="text-top"><p>Order#</p></div>
        <div class="text-top"><p>Date</p></div>
        <div class="text-top"><p>Quantity</p></div>
        <div class="text-top"><p>Total cost</p></div>
        <div class="text-top"><p>Status</p></div>
        <div class="text-top"><p>Action</p></div>
    </div>

    <?php if ($loggedIn): ?>
        <?php if ($result->num_rows > 0): ?>
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="custumer">
                    <div class="text"><p><?= htmlspecialchars($row['order_id']) ?></p></div>
                    <div class="text"><p><?= htmlspecialchars($row['order_date']) ?></p></div>
                    <div class="text"><p><?= htmlspecialchars($row['quantity']) ?></p></div>
                    <div class="text"><p><?= number_format($row['total_cost'], 0, ',', '.') ?> VND</p></div>
                    <div class="text"><p><?= htmlspecialchars($row['status']) ?></p></div>
                    <div class="text">
                        <button class="choose" data-order-id="<?= $row['order_id'] ?>">
                            View more
                        </button>
                    </div>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No orders found.</p>
        <?php endif; ?>
    <?php else: ?>
        <p style="text-align: center; color: red;  margin-bottom: 20px; margin-top: 30px;">Bạn chưa đăng nhập. Vui lòng đăng nhập để xem hóa đơn.</p>
    <?php endif; ?>
</div>

<!-- Thêm khung chứa chi tiết để load nội dung -->
<div class="more-infor-content"></div>
<div class="blur-overlay"></div>