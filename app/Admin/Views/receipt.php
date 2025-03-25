<?php
include __DIR__ . '/../../config/data_connect.php'; // Kết nối database

// Lấy dữ liệu bộ lọc và tìm kiếm
$statusFilter = isset($_GET['status']) ? $_GET['status'] : '';
$fromDate = isset($_GET['from_date']) ? $_GET['from_date'] : '';
$toDate = isset($_GET['to_date']) ? $_GET['to_date'] : '';
$locationFilter = isset($_GET['location']) ? $_GET['location'] : '';
$search = isset($_GET['search']) ? trim($_GET['search']) : '';

// Số đơn hàng hiển thị mỗi trang
$ordersPerPage = 5;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page < 1) $page = 1;
$offset = ($page - 1) * $ordersPerPage;

// Lấy tổng số đơn hàng sau khi tìm kiếm để tính số trang
$totalQuery = "SELECT COUNT(*) AS total FROM orders WHERE 1=1";

if (!empty($statusFilter)) {
    $totalQuery .= " AND status = '" . $conn->real_escape_string($statusFilter) . "'";
}
if (!empty($fromDate) && !empty($toDate)) {
    $totalQuery .= " AND order_date BETWEEN '" . $conn->real_escape_string($fromDate) . "' AND '" . $conn->real_escape_string($toDate) . "'";
}
if (!empty($locationFilter)) {
    $totalQuery .= " AND (shipping_ward LIKE '%" . $conn->real_escape_string($locationFilter) . "%' 
                        OR shipping_district LIKE '%" . $conn->real_escape_string($locationFilter) . "%' 
                        OR shipping_city LIKE '%" . $conn->real_escape_string($locationFilter) . "%')";
}
if (!empty($search)) {
    $totalQuery .= " AND (order_id LIKE '%" . $conn->real_escape_string($search) . "%' 
                        OR user_name LIKE '%" . $conn->real_escape_string($search) . "%')";
}

$totalResult = $conn->query($totalQuery);
$totalRow = $totalResult->fetch_assoc();
$totalOrders = $totalRow['total'];
$totalPages = ceil($totalOrders / $ordersPerPage);

// Truy vấn danh sách đơn hàng có tìm kiếm và phân trang
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
if (!empty($locationFilter)) {
    $sql .= " AND (o.shipping_ward LIKE '%" . $conn->real_escape_string($locationFilter) . "%' 
                    OR o.shipping_district LIKE '%" . $conn->real_escape_string($locationFilter) . "%' 
                    OR o.shipping_city LIKE '%" . $conn->real_escape_string($locationFilter) . "%')";
}
if (!empty($search)) {
    $sql .= " AND (o.order_id LIKE '%" . $conn->real_escape_string($search) . "%' 
                    OR u.user_name LIKE '%" . $conn->real_escape_string($search) . "%')";
}

// Thêm phân trang
$sql .= " ORDER BY o.order_date DESC LIMIT $ordersPerPage OFFSET $offset";

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
                <input type="text" name="location" placeholder="Enter City, District, .." value="<?= htmlspecialchars($locationFilter) ?>">

        </div>
        
        <div class="status-filter">
            <label for="status">Status:</label>
            <select name="status">
                <option value="">All Status</option>
                <option value="Pending" <?= $statusFilter == 'Pending' ? 'selected' : '' ?>>Pending</option>
                <option value="Processing" <?= $statusFilter == 'Processing' ? 'selected' : '' ?>>Processing</option>
                <option value="Completed" <?= $statusFilter == 'Completed' ? 'selected' : '' ?>>Completed</option>
                <option value="Cancelled" <?= $statusFilter == 'Cancelled' ? 'selected' : '' ?>>Cancelled</option>
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
                    </select>
                    <button type="submit">Update</button>
                </form>
            </td>
        </tr>
        <?php endwhile; ?>
    </tbody>
</table>


<!-- Phan trang  -->
<div class="pagination">
    <?php if ($page > 1): ?>
        <a href="?search=<?= urlencode($search); ?>&status=<?= urlencode($statusFilter); ?>&location=<?= urlencode($locationFilter); ?>&from_date=<?= urlencode($fromDate); ?>&to_date=<?= urlencode($toDate); ?>&page=<?= $page - 1; ?>" class="btn">Previous</a>
    <?php endif; ?>

    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <a href="?search=<?= urlencode($search); ?>&status=<?= urlencode($statusFilter); ?>&location=<?= urlencode($locationFilter); ?>&from_date=<?= urlencode($fromDate); ?>&to_date=<?= urlencode($toDate); ?>&page=<?= $i; ?>" class="btn <?= ($i == $page) ? 'active' : '' ?>">
            <?= $i ?>
        </a>
    <?php endfor; ?>

    <?php if ($page < $totalPages): ?>
        <a href="?search=<?= urlencode($search); ?>&status=<?= urlencode($statusFilter); ?>&location=<?= urlencode($locationFilter); ?>&from_date=<?= urlencode($fromDate); ?>&to_date=<?= urlencode($toDate); ?>&page=<?= $page + 1; ?>" class="btn">Next</a>
    <?php endif; ?>
</div>