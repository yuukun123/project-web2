<?php
include "../app/config/data_connect.php"; // đường dẫn có thể phải chỉnh tùy vị trí

$order_id = (int) $_GET['order_id'];

$sql_order = "SELECT o.order_id, 
                    DATE_FORMAT(o.order_date, '%Y-%m-%d %H:%i') AS order_date, 
                    o.delivery_date,
                    o.delivery_time,
                    o.total_cost, 
                    o.status, 
                    o.payment_method,
                    o.notes,
                    u.user_name,
                    o.recipient_name,
                    o.recipient_phone,
                    CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) AS full_address
            FROM orders o
            JOIN users u ON o.user_name = u.user_name
            WHERE o.order_id = ?";

$stmt = $conn->prepare($sql_order);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$order = $stmt->get_result()->fetch_assoc();

$sql_details = "SELECT od.quantity, od.price, p.product_name, c.category_name, p.image, od.note
                FROM order_detail od
                JOIN product p ON od.product_id = p.product_id
                JOIN category c ON p.category_id = c.category_id
                WHERE od.order_id = ?";
$stmt = $conn->prepare($sql_details);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$details = $stmt->get_result();

// màu cho status
$statusColor = match($order['status']) {
    'Completed' => 'rgb(26, 255, 0)',    // xanh lá
    'Cancelled' => 'red',                // đỏ
    'Processing' => 'deepskyblue',       // xanh biển
    'Pending' => 'orange',               // vàng
    default => 'black'
};
?>

<div class="more-infor">
    <span class="icon-close">
        <ion-icon name="close-outline"></ion-icon>
    </span>

    <div class="big-text more"><p>My Order</p></div>

    <div class="scroll-see">
        <div class="customer-infor">
            <p><strong>Name:</strong> <?= htmlspecialchars($order['recipient_name']) ?></p>
            <p><strong>Address:</strong> <?= htmlspecialchars($order['full_address']) ?></p>
            <p><strong>Phone:</strong> <?= htmlspecialchars($order['recipient_phone']) ?></p>
            <p><strong>Order date :</strong> <?= htmlspecialchars($order['order_date']) ?></p>
            <p><strong>Delivery date:</strong> <?= htmlspecialchars($order['delivery_date']) ?></p>
            <p><strong>Deliveried time:</strong> <?= htmlspecialchars($order['delivery_time']) ?></p>
            <p><strong>Payment method:</strong> <?= htmlspecialchars($order['payment_method']) ?></p>
            <p><strong>Greeting Message:</strong> <?= htmlspecialchars($order['notes']) ?></p>
            <p><strong>Status:</strong>
                <span style="color: <?= $statusColor ?>;">
                    <?= htmlspecialchars($order['status']) ?>
                </span>
            </p>
        </div>

        <?php while($row = $details->fetch_assoc()): ?>
        <div class="img-infor">
            <img src="<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['product_name']) ?>">
            <div class="name-type">
                <div class="name">
                    <div class="pd_name">
                        <p><?= htmlspecialchars($row['product_name']) ?></p>
                    </div>
                    <div class="pd_quantity" >
                        <p>Quantity: <?= $row['quantity'] ?></p>
                        <p><?= number_format($row['price'], 0, '.', ',') ?> VND</p>
                    </div>

                </div>
                <div class="type">
                    <div>Category: <?= htmlspecialchars($row['category_name']) ?></div>
                </div>
            </div>
        </div>
        <div class="Note for this product" style="margin-bottom: 20px; ">
            <p style="word-wrap: break-word; white-space: normal; font-weight: bold; padding: 0 5px;">Note for <span style="color: #f76fb3d4;"><?= htmlspecialchars($row['product_name']) ?></span> : <spanm style="font-weight: 100;"><?= htmlspecialchars($row['note'])?></spanm></p>
        </div>
        <?php endwhile;?>
    </div>

    <div class="total-price">
        <p style="color: red;"><strong>Total Price:</strong> <?= number_format($order['total_cost'], 0, '.', ',') ?> VND</p>
    </div>
</div>
