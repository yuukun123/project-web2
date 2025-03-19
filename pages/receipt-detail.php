<?php
include "../app/config/data_connect.php"; // đường dẫn có thể phải chỉnh tùy vị trí

$order_id = (int) $_GET['order_id'];

$sql_order = "SELECT o.order_id, 
                    DATE_FORMAT(o.order_date, '%Y-%m-%d %H:%i') AS order_date, 
                    o.total_cost, o.status, u.user_name, u.phone, 
                    CONCAT(u.street, ', ', u.ward, ', ', u.district, ', ', u.city) AS full_address
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            WHERE o.order_id = ?";
$stmt = $conn->prepare($sql_order);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$order = $stmt->get_result()->fetch_assoc();

$sql_details = "SELECT od.quantity, od.price, p.product_name, c.category_name, p.image
                FROM order_detail od
                JOIN product p ON od.product_id = p.product_id
                JOIN category c ON p.category_id = c.category_id
                WHERE od.order_id = ?";
$stmt = $conn->prepare($sql_details);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$details = $stmt->get_result();
?>

<div class="more-infor">
    <span class="icon-close">
        <ion-icon name="close-outline"></ion-icon>
    </span>

    <div class="big-text more"><p>My Order</p></div>

    <div class="scroll-see">
        <div class="customer-infor">
            <p><strong>Name:</strong> <?= htmlspecialchars($order['user_name']) ?></p>
            <p><strong>Address:</strong> <?= htmlspecialchars($order['full_address']) ?></p>
            <p><strong>Phone:</strong> <?= htmlspecialchars($order['phone']) ?></p>
            <p><strong>Time:</strong> <?= htmlspecialchars($order['order_date']) ?></p>
            <p><strong>Status:</strong>
                <span style="color: <?= ($order['status'] === 'Paid') ? 'rgb(26, 255, 0)' : 'orange' ?>;">
                    <?= htmlspecialchars($order['status']) ?>
                </span>
            </p>
        </div>

        <?php while($row = $details->fetch_assoc()): ?>
        <div class="img-infor">
            <img src="<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['product_name']) ?>">
            <div class="name-type">
                <div class="name">
                    <p><?= htmlspecialchars($row['product_name']) ?></p>
                    <p>Quantity: <?= $row['quantity'] ?></p>
                    <p><?= number_format($row['price'], 0, '.', ',') ?> VND</p>
                </div>
                <div class="type">
                    <div>Category: <?= htmlspecialchars($row['category_name']) ?></div>
                </div>
            </div>
        </div>
        <?php endwhile; ?>
    </div>

    <div class="total-price">
        <p><strong>Total Price:</strong> <?= number_format($order['total_cost'], 0, '.', ',') ?> VND</p>
    </div>
</div>
