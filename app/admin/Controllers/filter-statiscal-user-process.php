
<?php
session_name("admin");
session_start(); // Nên kiểm tra session_status() trước khi start nếu có thể gọi file này từ nhiều nơi
include '../../config/data_connect.php'; // Kết nối database
header("Content-Type: application/json");

// Nhận dữ liệu từ frontend
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu đầu vào
if (!isset($data['fromDate']) || !isset($data['toDate'])) {
    echo json_encode(["error" => "Thiếu dữ liệu ngày lọc"]);
    exit;
}

$fromDate = $data['fromDate']; // Ví dụ: "2025-05-19"
$toDateInput = $data['toDate']; // Ví dụ: "2025-05-19" (ngày người dùng chọn làm ngày kết thúc)

// Tạo một đối tượng DateTime từ $toDateInput để cộng thêm 1 ngày
// Điều này đảm bảo chúng ta bao gồm tất cả các bản ghi trong ngày $toDateInput
// cho đến cuối ngày đó (23:59:59).
try {
    $toDateObject = new DateTime($toDateInput);
    $toDateObject->modify('+1 day');
    $toDateForQuery = $toDateObject->format('Y-m-d'); // Sẽ là "2025-05-20" nếu $toDateInput là "2025-05-19"
} catch (Exception $e) {
    echo json_encode(["error" => "Định dạng ngày không hợp lệ: " . $e->getMessage()]);
    exit;
}


// Tránh SQL Injection
// Lưu ý: Đã bỏ một cột u.user_name bị lặp trong SELECT
// Lưu ý: JOIN order_detail as od không được sử dụng trong các phần khác của câu lệnh,
// có thể không cần thiết trừ khi nó dùng để lọc ngầm các đơn hàng không có chi tiết.
$stmt_best = $conn->prepare("
    SELECT u.user_name, COUNT(DISTINCT o.order_id) as total_order, SUM(o.total_cost) as total_spending, u.email
    FROM users as u
    JOIN orders as o ON o.user_name = u.user_name
    JOIN order_detail as od ON o.order_id = od.order_id
    WHERE o.delivery_date >= ? AND o.delivery_date < ?  -- THAY ĐỔI Ở ĐÂY
    AND o.status = 'Completed'
    GROUP BY u.user_name, u.email -- Thêm u.email vào GROUP BY vì nó có trong SELECT và không phải hàm tổng hợp
    ORDER BY total_spending DESC
    LIMIT 5
");

if ($stmt_best === false) {
    // Xử lý lỗi nếu prepare thất bại
    echo json_encode(["error" => "Lỗi chuẩn bị câu lệnh SQL: " . $conn->error]);
    exit;
}

// Bind $fromDate (ngày bắt đầu, bao gồm cả ngày này)
// và $toDateForQuery (ngày kết thúc + 1, không bao gồm ngày này)
$stmt_best->bind_param("ss", $fromDate, $toDateForQuery);
$stmt_best->execute();
$result_user = $stmt_best->get_result();

if ($result_user === false) {
    // Xử lý lỗi nếu get_result thất bại
    echo json_encode(["error" => "Lỗi lấy kết quả SQL: " . $stmt_best->error]);
    exit;
}

$user = $result_user->fetch_all(MYSQLI_ASSOC);
$stmt_best->close();
// $conn->close(); // Cân nhắc đóng kết nối nếu đây là cuối script

// Trả về JSON
echo json_encode($user);
?>
