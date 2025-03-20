<?php
    include '../../config/data_connect.php';
    header("Content-Type: application/json");
    //truy vấn best-seller
    $sql_bestseller = "SELECT o.delivery_date, p.product_name, od.quantity FROM order_detail as od 
            JOIN orders as o on o.order_id = od.order_id 
            JOIN product as p on od.product_id = p.product_id 
            ORDER BY `od`.`quantity` DESC LIMIT 10
            ";
    $sql_unpopular ="SELECT o.delivery_date, p.product_name, od.quantity FROM order_detail as od 
                    JOIN orders as o on o.order_id = od.order_id 
                    JOIN product as p on od.product_id = p.product_id 
                    ORDER BY `od`.`quantity` DESC LIMIT 10";
    $result = $conn->query($sql_bestseller);
    $result_1 = $conn->query($sql_unpopular);
    // Khởi tạo mảng chứa dữ liệu
    $order_data = [];
    $order_data_1 = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $order_data[] = $row;
        }
    } else {
        echo "Không có dữ liệu.";
    }
    if ($result_1->num_rows > 0) {
        while ($row = $result_1->fetch_assoc()) {
            $order_data_1[] = $row;
        }
    }  
?>