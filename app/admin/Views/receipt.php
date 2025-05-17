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
        LEFT JOIN users u ON o.user_name = u.user_name
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
        <input type="hidden" name="city_name" id="city_name">
        <input type="hidden" name="district_name" id="district_name">
        <input type="hidden" name="ward_name" id="ward_name">
        <div class="filter-address">
            
            <label for="address">City:</label>
            <select id="registerCity" name="registerCity"  required>
                <option value="">Select City</option>
            </select>

            <label for="address">District:</label>
            <select id="registerDistrict" name="registerDistrict"  required>
                <option value="">Select District</option>
            </select>

            <label for="address">Ward:</label>
            <select id="registerWard" name="registerWard" required>
                <option value="">Select Ward</option>
            </select>

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
            <th>Delivery Date</th>
            <th>Delivered Hours</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Delivery Address</th>
            <th>Total</th>
            <th>Detail</th>
        </tr>
    </thead>
    <tbody id="order-table-body">
        <!-- Nội dung sẽ được load bằng JavaScript -->
    </tbody>
</table>

<!-- Chi tiết đơn hàng -->
<div class="overlay" id="overlay"></div>
<div class="ShowDetail edit-ShowDetailOrder" id="DetailOrders" style="display: none;">
    <h2>Detail Order</h2>
    <div class="id_order">
        <p>ID Order: <strong id="detail_order_id">#ND002</strong></p>
    </div>
    <div class="scroll-see">
        <form>
            <div class="form-horizontal">
                <div class="form-group">
                    <label for="customer_name">Customer Name:</label>
                    <input type="text" id="customer_name" readonly>
                </div>
                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" readonly>
                </div>
                <div class="form-group">
                    <label for="order_date">Order Date:</label>
                    <input type="text" id="order_date" readonly>
                </div>
                <div class="form-group">
                    <label for="delivery_address">Delivery Address:</label>
                    <input type="text" id="delivery_address" readonly>
                </div>
                <div class="form-group">
                    <label for="order_note">Note:</label>
                    <input type="text" id="order_note" readonly>
                </div>
                <div class="form-group">
                    <label for="product_id">Product ID:</label>
                    <input type="text" id="product_id" readonly>
                </div>
                <div class="form-group">
                    <label for="product_info">Product Info:</label>
                    <div id="product_info" class="product-info-box" readonly></div>
                </div>
                <div class="form-group">
                    <label for="order_status">Order Status:</label>
                    <select id="order_status"></select>
                </div>
            </div>
            <div class="form-buttons">
                <button type="button" class="save-btn" onclick="updateOrderStatusFromDetail()">Save</button>
                <button type="button" class="close-btn" onclick="hideDetailOrders('DetailOrders')">Close</button>
            </div>
        </form>
    </div>
</div>

<!-- phân trang -->
<div class="pagination">
    <?php if ($page > 1): ?>
        <a href="?search=<?= urlencode($search); ?>&status=<?= urlencode($statusFilter); ?>&location=<?= urlencode($locationFilter); ?>&from_date=<?= urlencode($fromDate); ?>&to_date=<?= urlencode($toDate); ?>&page=<?= $page - 1; ?>" class="btn"><</a>
    <?php endif; ?>

    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <a href="?search=<?= urlencode($search); ?>&status=<?= urlencode($statusFilter); ?>&location=<?= urlencode($locationFilter); ?>&from_date=<?= urlencode($fromDate); ?>&to_date=<?= urlencode($toDate); ?>&page=<?= $i; ?>" class="btn <?= ($i == $page) ? 'active' : '' ?>">
            <?= $i ?>
        </a>
    <?php endfor; ?>

    <?php if ($page < $totalPages): ?>
        <a href="?search=<?= urlencode($search); ?>&status=<?= urlencode($statusFilter); ?>&location=<?= urlencode($locationFilter); ?>&from_date=<?= urlencode($fromDate); ?>&to_date=<?= urlencode($toDate); ?>&page=<?= $page + 1; ?>" class="btn">></a>
    <?php endif; ?>
</div>