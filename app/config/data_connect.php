<?php
$host     = "localhost";
$username = "root";
$password = "";
$database = "webdata";

$conn = mysqli_connect($host, $username, $password, $database);
mysqli_set_charset($conn, 'utf8');

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}   
?>