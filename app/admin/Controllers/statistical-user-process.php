<?php
include '../../config/data_connect.php';
header('Content-Type: application/json');
error_reporting(E_ALL);
 ini_set('display_errors', 1);

 $sql = "SELECT u.user_name, COUNT(DISTINCT o.order_id) AS total_order, SUM(o.total_cost) as total_spending, u.user_name,u.email 
        FROM users as u
        JOIN orders as o on o.user_name = u.user_name
        JOIN order_detail as od on  o.order_id = od.order_id 
        AND o.status = 'Completed'
        GROUP BY u.user_name
        ORDER BY total_spending DESC
        ";

$result = $conn->query($sql);
$user_data = [];
if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $user_data[] = $row;
        }
    } else {
        error_log("Không có dữ liệu user", 0);
    }
    echo json_encode([$user_data]);
?>