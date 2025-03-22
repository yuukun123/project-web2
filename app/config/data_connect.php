<?php
$host = 'db'; // hostname chính là tên service db
$user = 'user';
$password = '123';
$dbname = 'webdata';

$conn = new mysqli($host, $user, $password, $dbname);
mysqli_set_charset($conn, 'utf8');

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}   
?>