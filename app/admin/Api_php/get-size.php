<?php
include("../../config/data_connect.php");

$sql = "SELECT size_id, size_name FROM size"; // Đảm bảo đúng tên cột
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$sizes = [];
while ($row = $result->fetch_assoc()) {
    $sizes[] = [
        "size_id" => $row["size_id"],
        "size_name" => $row["size_name"]
    ];
}

echo json_encode($sizes);
?>
