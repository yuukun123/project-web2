<?php
session_name("admin");
// Kiểm tra trạng thái session trước khi start để tránh lỗi nếu session đã được khởi tạo
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include '../../config/data_connect.php'; // Kết nối database
header("Content-Type: application/json"); // Đặt header JSON ở đầu

// Kiểm tra kết nối database
if (!isset($conn) || $conn->connect_error) {
    http_response_code(500); // Lỗi server
    echo json_encode(["error" => "Lỗi kết nối database: " . ($conn->connect_error ?? "Không rõ lỗi")]);
    exit;
}

// Đặt charset cho kết nối (QUAN TRỌNG)
if (!$conn->set_charset("utf8mb4")) {
    // Ghi log lỗi hoặc xử lý nếu không set được charset
    // error_log("Lỗi đặt charset utf8mb4: " . $conn->error);
    // Không nhất thiết phải exit ở đây, nhưng cần lưu ý
}

// Nhận dữ liệu từ frontend
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu đầu vào
if (!isset($data['fromDate']) || !isset($data['toDate'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Thiếu dữ liệu ngày lọc (fromDate hoặc toDate)"]);
    exit;
}

$fromDate = $data['fromDate'];
$toDateInput = $data['toDate'];

// Tạo một đối tượng DateTime từ $toDateInput để cộng thêm 1 ngày
// Điều này đảm bảo chúng ta bao gồm tất cả các bản ghi trong ngày $toDateInput
// cho đến cuối ngày đó (23:59:59), bằng cách đặt giới hạn trên là đầu ngày hôm sau.
try {
    $toDateObject = new DateTime($toDateInput);
    $toDateObject->modify('+1 day'); // Cộng thêm 1 ngày
    $toDateForQuery = $toDateObject->format('Y-m-d'); // Định dạng lại thành YYYY-MM-DD
} catch (Exception $e) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Định dạng ngày không hợp lệ: " . $e->getMessage()]);
    exit;
}

// --- Truy vấn sản phẩm bán chạy nhất ---
$sql_bestseller = "
    SELECT 
        p.product_id, 
        p.product_name, 
        SUM(od.quantity) AS total_quantity
    FROM order_detail AS od 
    JOIN orders AS o ON o.order_id = od.order_id 
    JOIN product AS p ON od.product_id = p.product_id 
    WHERE o.delivery_date >= ? AND o.delivery_date < ?  -- Sử dụng >= fromDate và < toDateForQuery
    AND o.status = 'Completed'
    GROUP BY p.product_id, p.product_name
    ORDER BY total_quantity DESC 
    LIMIT 10
";

$stmt_best = $conn->prepare($sql_bestseller);
if ($stmt_best === false) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi chuẩn bị câu lệnh SQL (bestseller): " . $conn->error]);
    exit;
}

$stmt_best->bind_param("ss", $fromDate, $toDateForQuery);
if ($stmt_best->execute() === false) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi thực thi câu lệnh SQL (bestseller): " . $stmt_best->error]);
    exit;
}
$result_bestseller = $stmt_best->get_result();
if ($result_bestseller === false) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi lấy kết quả SQL (bestseller): " . $stmt_best->error]);
    exit;
}
$order_data_bestseller = $result_bestseller->fetch_all(MYSQLI_ASSOC);
$stmt_best->close();


// --- Truy vấn sản phẩm ít phổ biến nhất ---
$sql_unpopular = "
    SELECT 
        p.product_id, 
        p.product_name, 
        SUM(od.quantity) AS total_quantity
    FROM order_detail AS od 
    JOIN orders AS o ON o.order_id = od.order_id 
    JOIN product AS p ON od.product_id = p.product_id 
    WHERE o.delivery_date >= ? AND o.delivery_date < ? -- Sử dụng >= fromDate và < toDateForQuery
    AND o.status = 'Completed'
    GROUP BY p.product_id, p.product_name
    ORDER BY total_quantity ASC 
    LIMIT 10
";

$stmt_unpop = $conn->prepare($sql_unpopular);
if ($stmt_unpop === false) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi chuẩn bị câu lệnh SQL (unpopular): " . $conn->error]);
    exit;
}

$stmt_unpop->bind_param("ss", $fromDate, $toDateForQuery);
if ($stmt_unpop->execute() === false) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi thực thi câu lệnh SQL (unpopular): " . $stmt_unpop->error]);
    exit;
}
$result_unpopular = $stmt_unpop->get_result();
if ($result_unpopular === false) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi lấy kết quả SQL (unpopular): " . $stmt_unpop->error]);
    exit;
}
$order_data_unpopular = $result_unpopular->fetch_all(MYSQLI_ASSOC);
$stmt_unpop->close();

// Trả về JSON
echo json_encode([
    "bestseller_filter" => $order_data_bestseller,
    "unpopular_filter" => $order_data_unpopular
]);

// Đóng kết nối database
$conn->close();
?>
