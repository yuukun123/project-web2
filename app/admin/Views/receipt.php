<?php
include __DIR__ . '/../../config/data_connect.php'; // Kết nối database

// Lấy dữ liệu bộ lọc
$statusFilter = isset($_GET['status']) ? trim($_GET['status']) : '';
$fromDate = isset($_GET['from_date']) ? trim($_GET['from_date']) : '';
$toDate = isset($_GET['to_date']) ? trim($_GET['to_date']) : '';
// $search = isset($_GET['search']) ? trim($_GET['search']) : ''; // XÓA HOẶC COMMENT DÒNG NÀY

// --- BỘ LỌC ĐỊA CHỈ ---
$locationFilter = isset($_GET['location']) ? trim($_GET['location']) : '';
$cityNameForFilter = isset($_GET['city_name']) ? trim($_GET['city_name']) : '';
$districtNameForFilter = isset($_GET['district_name']) ? trim($_GET['district_name']) : '';
$wardNameForFilter = isset($_GET['ward_name']) ? trim($_GET['ward_name']) : '';

// Số đơn hàng hiển thị mỗi trang
$ordersPerPage = 5;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page < 1) $page = 1;
$offset = ($page - 1) * $ordersPerPage;

// Lấy tổng số đơn hàng sau khi tìm kiếm để tính số trang
$totalQuery = "SELECT COUNT(o.order_id) AS total
               FROM orders o
               LEFT JOIN users u ON o.user_name = u.user_name
               WHERE 1=1";

if (!empty($statusFilter)) {
    $totalQuery .= " AND o.status = '" . $conn->real_escape_string($statusFilter) . "'";
}
if (!empty($fromDate) && !empty($toDate)) {
    $totalQuery .= " AND o.order_date BETWEEN '" . $conn->real_escape_string($fromDate) . "' AND '" . $conn->real_escape_string($toDate) . "'";
}

if (!empty($locationFilter)) {
    $escapedLocation = $conn->real_escape_string($locationFilter);
    $totalQuery .= " AND (o.shipping_ward LIKE '%" . $escapedLocation . "%'
                     OR o.shipping_district LIKE '%" . $escapedLocation . "%'
                     OR o.shipping_city LIKE '%" . $escapedLocation . "%')";
} else {
    if (!empty($wardNameForFilter)) {
        $totalQuery .= " AND o.shipping_ward LIKE '%" . $conn->real_escape_string($wardNameForFilter) . "%'";
    }
    if (!empty($districtNameForFilter)) {
        $totalQuery .= " AND o.shipping_district LIKE '%" . $conn->real_escape_string($districtNameForFilter) . "%'";
    }
    if (!empty($cityNameForFilter)) {
        $totalQuery .= " AND o.shipping_city LIKE '%" . $conn->real_escape_string($cityNameForFilter) . "%'";
    }
}

// --- XÓA HOẶC COMMENT LẠI KHỐI LỆNH IF SAU ---
/*
if (!empty($search)) {
    $escapedSearch = $conn->real_escape_string($search);
    $totalQuery .= " AND u.user_name LIKE '%" . $escapedSearch . "%'";
}
*/
// --- KẾT THÚC PHẦN XÓA/COMMENT ---

$totalResult = $conn->query($totalQuery);
$totalRow = $totalResult ? $totalResult->fetch_assoc() : ['total' => 0];
$totalOrders = $totalRow['total'];
$totalPages = $totalOrders > 0 ? ceil($totalOrders / $ordersPerPage) : 0;

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
    $escapedLocation = $conn->real_escape_string($locationFilter);
    $sql .= " AND (o.shipping_ward LIKE '%" . $escapedLocation . "%'
              OR o.shipping_district LIKE '%" . $escapedLocation . "%'
              OR o.shipping_city LIKE '%" . $escapedLocation . "%')";
} else {
    if (!empty($wardNameForFilter)) {
        $sql .= " AND o.shipping_ward LIKE '%" . $conn->real_escape_string($wardNameForFilter) . "%'";
    }
    if (!empty($districtNameForFilter)) {
        $sql .= " AND o.shipping_district LIKE '%" . $conn->real_escape_string($districtNameForFilter) . "%'";
    }
    if (!empty($cityNameForFilter)) {
        $sql .= " AND o.shipping_city LIKE '%" . $conn->real_escape_string($cityNameForFilter) . "%'";
    }
}

// --- XÓA HOẶC COMMENT LẠI KHỐI LỆNH IF SAU ---
/*
if (!empty($search)) {
    $escapedSearch = $conn->real_escape_string($search);
    $sql .= " AND u.user_name LIKE '%" . $escapedSearch . "%'";
}
*/
// --- KẾT THÚC PHẦN XÓA/COMMENT ---

$sql .= " ORDER BY o.order_date DESC LIMIT $ordersPerPage OFFSET $offset";

$result = $conn->query($sql);
?>

<div class="subtitle_table">
    <form id="filter-form" method="GET" action="">
        <div class="filter-date">
            <label for="fromDate">From:</label>
            <input type="date" name="from_date" id="fromDate" value="<?= htmlspecialchars($fromDate) ?>">
            <label for="toDate">To:</label>
            <input type="date" name="to_date" id="toDate" value="<?= htmlspecialchars($toDate) ?>">
        </div>

        <div class="filter-address">
            <input type="hidden" name="city_name_selected" id="city_name_selected" value="<?= htmlspecialchars($cityNameForFilter) ?>">
            <input type="hidden" name="district_name_selected" id="district_name_selected" value="<?= htmlspecialchars($districtNameForFilter) ?>">
            <input type="hidden" name="ward_name_selected" id="ward_name_selected" value="<?= htmlspecialchars($wardNameForFilter) ?>">

            <label for="registerCity">City:</label>
            <select id="registerCity" name="registerCity"> <option value="">Select City</option>
            </select>

            <label for="registerDistrict">District:</label>
            <select id="registerDistrict" name="registerDistrict">
                <option value="">Select District</option>
            </select>

            <label for="registerWard">Ward:</label>
            <select id="registerWard" name="registerWard">
                <option value="">Select Ward</option>
            </select>
        </div>

        <div class="status-filter">
            <label for="status">Status:</label>
            <select name="status" id="orderStatus">
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
        <?php if ($result && $result->num_rows > 0): ?>
            <?php while($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?= htmlspecialchars($row['order_id']) ?></td>
                    <td><?= htmlspecialchars($row['user_name']) ?></td>
                    <td><?= htmlspecialchars($row['order_date']) ?></td>
                    <td><?= htmlspecialchars($row['delivery_date'] ?? '') ?></td>
                    <td><?= htmlspecialchars($row['delivery_time'] ?? '') ?></td>
                    <td><?= htmlspecialchars($row['status']) ?></td>
                    <td><?= htmlspecialchars($row['payment_method']) ?></td>
                    <td><?= htmlspecialchars($row['full_address']) ?></td>
                    <td><?= number_format($row['total_cost']) ?> VND</td>
                    <td>
                        <button class="btn-update icon-detail" onclick="showOrderDetail('<?= htmlspecialchars($row['order_id']) ?>')" title="Edit">
                            <ion-icon name="create-outline"></ion-icon>
                        </button>
                    </td>
                </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr><td colspan="10">No orders found matching your criteria.</td></tr>
        <?php endif; ?>
    </tbody>
</table>

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
                    <label for="order_status_detail">Order Status:</label> <select id="order_status_detail"></select>
                </div>
            </div>
            <div class="form-buttons">
                <button type="button" class="save-btn" onclick="updateOrderStatusFromDetail()">Save</button>
                <button type="button" class="close-btn" onclick="hideDetailOrders('DetailOrders')">Close</button>
            </div>
        </form>
    </div>
</div>

<div class="pagination">
    <?php
    $paginationParams = [
        // 'search' => $search, // XÓA HOẶC COMMENT DÒNG NÀY
        'status' => $statusFilter,
        'from_date' => $fromDate,
        'to_date' => $toDate,
        'location' => $locationFilter,
        'city_name' => $cityNameForFilter,
        'district_name' => $districtNameForFilter,
        'ward_name' => $wardNameForFilter
    ];
    $queryString = http_build_query(array_filter($paginationParams));
    ?>

    <?php if ($page > 1): ?>
        <a href="?<?= $queryString ?>&page=<?= $page - 1; ?>" class="btn">&lt;</a>
    <?php endif; ?>

    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <a href="?<?= $queryString ?>&page=<?= $i; ?>" class="btn <?= ($i == $page) ? 'active' : '' ?>">
            <?= $i ?>
        </a>
    <?php endfor; ?>

    <?php if ($page < $totalPages && $totalPages > 0): ?>
        <a href="?<?= $queryString ?>&page=<?= $page + 1; ?>" class="btn">&gt;</a>
    <?php endif; ?>
</div>

<script>
const initialCityName = "<?= addslashes($cityNameForFilter) ?>";
const initialDistrictName = "<?= addslashes($districtNameForFilter) ?>";
const initialWardName = "<?= addslashes($wardNameForFilter) ?>";
</script>