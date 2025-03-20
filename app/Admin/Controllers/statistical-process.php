<?php
    include '../../config/data_connect.php';
    header("Content-Type: application/json");
    
    $sql = "SELECT *, od.quantity*od.price as totalprice FROM order_detail as od
            JOIN orders as o on o.order_id = od.order_id
            JOIN product as p on od.product_id = p.product_id
            JOIN users as u on o.user_id = u.user_id
            ";
            
    $result = $conn->query($sql);

    // Khởi tạo mảng chứa dữ liệu
    $order_data = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $order_data[] = $row;
        }
    } else {
        echo "Không có dữ liệu.";
    }
    
?>