<?php include '../Api_php/check-session-admin.php';?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/statiscal-product.css">

    <script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://cdn.jsdelivr.net/npm/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link rel="icon" href="../../../public/assets/Img/Sweets1.png" type="image/x-icon" class="icon-page" />
    <title>Statistical</title>
</head>

<body>
    <div? class="grid-full">
        <div class="left-screen">
            <?php include ("../includes/header.php"); ?>

            <div class="Home">
                <div class="text-big">Statistical Product</div>
                <!-- include file dưới này -->
                <?php
                 include("../Views/statistical/product.php")
                ?>
                
            </div>
        </div>
        
        <?php include ("../includes/nav.php"); ?>
    </div>  
    
    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/statiscal-product.js"></script>
</body>

</html>