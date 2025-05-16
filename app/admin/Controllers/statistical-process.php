<?php
    session_name("admin");
    session_start();
    // include '../Api_php/check-session-admin.php';
    include '../../config/data_connect.php';
    header("Content-Type: application/json");
    
    //truy vấn best-seller
    $sql_bestseller = "SELECT 
                        p.product_id, 
                        p.product_name, 
                        SUM(od.quantity) AS total_quantity
                    FROM order_detail AS od
                    JOIN orders AS o ON od.order_id = o.order_id
                    JOIN product AS p ON od.product_id = p.product_id
                    WHERE o.status = 'Completed'
                    GROUP BY p.product_id, p.product_name
                    ORDER BY total_quantity DESC
                    LIMIT 10

            ";
    $sql_unpopular ="SELECT 
                    p.product_id, 
                    p.product_name, 
                    SUM(od.quantity) AS total_quantity
                FROM order_detail AS od
                JOIN orders AS o ON od.order_id = o.order_id
                JOIN product AS p ON od.product_id = p.product_id
                WHERE o.status = 'Completed'
                GROUP BY p.product_id, p.product_name
                ORDER BY total_quantity ASC
                LIMIT 10
";

    
    $result = $conn->query($sql_bestseller);
    $result_1 = $conn->query($sql_unpopular);
   
    // Khởi tạo mảng chứa dữ liệu
    $order_data = [];
    $order_data_1 = [];
    
    //lấy dữ liệu
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $order_data[] = $row;
        }
    } else {
        error_log("Không có dữ liệu bestseller", 0);
    }
    
    if ($result_1->num_rows > 0) {
        while ($row = $result_1->fetch_assoc()) {
            $order_data_1[] = $row;
        }
    } else {
        error_log("Không có dữ liệu unpopular", 0);
    }

        // Trả về JSON cho JavaScript
        echo json_encode([
            "bestseller" => $order_data,
            "unpopular" => $order_data_1
        ]);

?>