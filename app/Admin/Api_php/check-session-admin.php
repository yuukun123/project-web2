<?php 
session_name("admin");
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>