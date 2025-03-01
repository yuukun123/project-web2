<?php
// Khởi động phiên
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="public/assets/css/style.css">

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <link rel="icon" href="public/assets/Img/Sweets1.png" type="image/x-icon" class="icon-page" />
    <title>The Sweets</title>
</head>

<body>

    <?php include 'includes/header.php'; ?>

    <!-- main screen -->
    <div class="Home_main">
        <?php include 'includes/banner.php'; ?>
        <?php include 'includes/products.php'; ?>
    </div>

    <?php include 'includes/footer.php'; ?>

    <button id="backToTop" onclick="scrollToTop()">
        <ion-icon name="arrow-up-outline"></ion-icon>
    </button>

    <script src="public/assets/js/script.js"></script>
</body>

</html>