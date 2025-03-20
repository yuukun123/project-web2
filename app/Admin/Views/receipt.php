<?php
include __DIR__ . '/../../config/data_connect.php'; // Kết nối database

// Lấy danh sách đơn hàng có bộ lọc
$statusFilter = isset($_GET['status']) ? $_GET['status'] : '';
$fromDate = isset($_GET['from_date']) ? $_GET['from_date'] : '';
$toDate = isset($_GET['to_date']) ? $_GET['to_date'] : '';
$locationFilter = isset($_GET['location']) ? $_GET['location'] : '';

$sql = "SELECT o.order_id, u.user_name, o.order_date, o.delivery_date, o.delivery_time, 
               o.total_cost, o.status, o.payment_method, 
               CONCAT(o.shipping_street, ', ', o.shipping_ward, ', ', o.shipping_district, ', ', o.shipping_city) AS full_address
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.user_id
        WHERE 1=1";

if (!empty($statusFilter)) {
    $sql .= " AND o.status = '" . $conn->real_escape_string($statusFilter) . "'";
}
if (!empty($fromDate) && !empty($toDate)) {
    $sql .= " AND o.order_date BETWEEN '" . $conn->real_escape_string($fromDate) . "' AND '" . $conn->real_escape_string($toDate) . "'";
}

//lọc theo Phường / Quận / Thành Phố
if (!empty($locationFilter)) {
    $sql .= " AND (o.shipping_ward LIKE '%" . $conn->real_escape_string($locationFilter) . "%' 
                    OR o.shipping_district LIKE '%" . $conn->real_escape_string($locationFilter) . "%' 
                    OR o.shipping_city LIKE '%" . $conn->real_escape_string($locationFilter) . "%')";
}

$result = $conn->query($sql);
?>



    <div class="subtitle_table">
        <form method="GET" action="">
        <div class="filter-date">
                <label for="fromDate">From:</label>
                <input type="date" name="from_date" value="<?= htmlspecialchars($fromDate) ?>">
                <label for="toDate">To:</label>
                <input type="date" name="to_date" value="<?= htmlspecialchars($toDate) ?>">
            </div>

        <div class="filter-address">
            <label for="address">Address:</label>
                <input type="text" name="location" placeholder="Enter City, Wards,.." value="<?= htmlspecialchars($locationFilter) ?>">

        </div>
        
        <div class="status-filter">
            <label for="status">Status:</label>
            <select name="status">
                <option value="">All Status</option>
                <option value="Pending" <?= $statusFilter == 'Pending' ? 'selected' : '' ?>>Pending</option>
                <option value="Processing" <?= $statusFilter == 'Processing' ? 'selected' : '' ?>>Processing</option>
                <option value="Completed" <?= $statusFilter == 'Completed' ? 'selected' : '' ?>>Completed</option>
                <option value="Cancelled" <?= $statusFilter == 'Cancelled' ? 'selected' : '' ?>>Cancelled</option>
                <option value="Paid" <?= $statusFilter == 'Paid' ? 'selected' : '' ?>>Paid</option>
            </select>
        </div>
            <div class="btn_filter">
                <button type="submit">Filter</button>
            </div>
        
        </form>
    </div>


<table>
    <thead>
        <tr>
            <th>Order Id</th>
            <th>Customer</th>
            <th>Order Date</th>
            <th>Delivery Date/th>
            <th>Delivery Hours</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Delivery Address</th>
            <th>Total</th>
            <th>Update</th>
        </tr>
    </thead>
    <tbody>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr class="<?= strtolower($row['status']) ?>">
            <td><?= $row['order_id'] ?></td>
            <td><?= htmlspecialchars($row['user_name']) ?></td>
            <td><?= $row['order_date'] ?></td>
            <td><?= $row['delivery_date'] ?></td>
            <td><?= $row['delivery_time'] ?></td>
            <td><?= $row['status'] ?></td>
            <td><?= $row['payment_method'] ?></td>
            <td><?= $row['full_address'] ?></td>
            <td><?= number_format($row['total_cost'], 0, ',', '.') ?> VND</td>
            <td>
                <form method="POST" action="../Controllers/update_status.php">
                    <input type="hidden" name="order_id" value="<?= $row['order_id'] ?>">
                    <select name="status">
                        <option value="Pending" <?= $row['status'] == 'Pending' ? 'selected' : '' ?>>Pending</option>
                        <option value="Processing" <?= $row['status'] == 'Processing' ? 'selected' : '' ?>>Processing</option>
                        <option value="Completed" <?= $row['status'] == 'Completed' ? 'selected' : '' ?>>Completed</option>
                        <option value="Cancelled" <?= $row['status'] == 'Cancelled' ? 'selected' : '' ?>>Cancelled</option>
                        <option value="Paid" <?= $row['status'] == 'Paid' ? 'selected' : '' ?>>Paid</option>
                    </select>
                    <button type="submit">Update</button>
                </form>
            </td>
        </tr>
        <?php endwhile; ?>
    </tbody>
</table>
