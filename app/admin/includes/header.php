<?php
// ob_start();
$page = basename($_SERVER['PHP_SELF']);

switch ($page) {
    case "list-product.php":
        $title = "Product List";
        break;
    case "add-product.php":
        $title = "Add Product";
        break;
    case "manager-user.php":
        $title = "User Manager";
        break;
    case "statiscal-user.php":
        $title = "Statiscal User";
        break;
    case "statiscal-product.php":
        $title = "Statiscal Product";
        break;
    case "receipt.php":
        $title = "Receipt";
        break;
    default:
        $title = "Statiscal";
}


$authButtons = '<button id="login-btn" class="btnLogin-popup">Login</button>';

if (isset($_SESSION['admin']) && isset($_SESSION['admin']['username'])) {
    $username = htmlspecialchars($_SESSION['admin']['username']); // Chống XSS
    $authButtons = '
        <div class="navigation">
            <button id="user-btn" class="btnLogin-popup">' . $username . '</button>
            <form action="Login_Processing/logout_processing.php" method="POST" style="display: inline;">
                <div class="Function-cl">
                    <div class="logout">
                        <button type="submit" id="logout-btn" class="btnLogout-popup">Logout</button>
                    </div>
                </div>
            </form>
        </div>
    ';
}
// ob_end_flush();
?>
<div class="header">
    <div class="text-heading">
        <h1><?php echo $title; ?></h1>
    </div>
    <?php echo $authButtons; ?>
    <div class="hamburger"  id="hamburger" onclick="toggleMenu()">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
</div>

<!--Mobile-->
<!--Mobile-->
<div class="mobile-menu" id="mobileMenu">
    <button class="logo" style="border: none; background: none; cursor:pointer">
        <img src="../../public/assets/Img/Sweets1.png" alt="">
    </button>
    <div class="menu-container">
        <!--Manage-product-->
        <button class="grade-button" onclick="toggleGrade('gradeFood', 'chevronFood')">
            <span class="text-head">
                <ion-icon name="fast-food-outline"></ion-icon>
                Product
            </span>
            <span class="chevron up" id="chevronFood"></span>
        </button>
        <div class="subject-list <?php echo ($page == 'list-product.php' || $page == 'add-product.php') ? 'active' : ''; ?>" id="gradeFood" style="display:none;">
            <div class="subject-item <?php echo ($page == 'list-product.php') ? 'active' : ''; ?>">
                <span class="text-in">
                    <ion-icon name="clipboard-outline"></ion-icon>
                    <a href="list-product">List product</a>
                </span>
            </div>
            <div class="subject-item <?php echo ($page == 'add-product.php') ? 'active' : ''; ?>">
                <span class="text-in">
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <a href="add-product">Add product</a>
                </span>
            </div>
        </div>

        <!--Manage-user-->
        <button class="grade-button" onclick="toggleGrade('gradeUserList', 'chevronUserList')">
            <span class="text-head">
                <ion-icon name="person-circle-outline"></ion-icon>
                Manage User
            </span>
            <span class="chevron up" id="chevronUserList"></span>
        </button>
        <div class="subject-list <?php echo ($page == 'manager-user.php') ? 'active' : ''; ?>" id="gradeUserList" style="display:none;">
            <div class="subject-item <?php echo ($page == 'manager-user.php') ? 'active' : ''; ?>">
                <span class="text-in">
                    <ion-icon name="person-outline"></ion-icon>
                    <a href="manager-user">List User</a>
                </span>
            </div>
        </div>

        <!--Receipt-->
        <button class="grade-button" onclick="toggleGrade('gradeReceipt', 'chevronReceipt')">
            <span class="text-head">
                <ion-icon name="receipt-outline"></ion-icon>
                Receipt
            </span>
            <span class="chevron up" id="chevronReceipt"></span>
        </button>
        <div class="subject-list <?php echo ($page == 'receipt.php') ? 'active' : ''; ?>" id="gradeReceipt" style="display:none;">
            <div class="subject-item <?php echo ($page == 'receipt.php') ? 'active' : ''; ?>">
                <span>
                    <ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon>
                    <a href="receipt">Status order</a>
                </span>
            </div>
        </div>

        <!--Statistical-->
        <button class="grade-button" onclick="toggleGrade('gradeStatistical', 'chevronStatistical')">
            <span class="text-head">
                <ion-icon name="stats-chart-outline"></ion-icon>
                Statistical
            </span>
            <span class="chevron up" id="chevronStatistical"></span>
        </button>
        <div class="subject-list <?php echo ($page == 'statiscal-product.php' || $page == 'statiscal-user.php') ? 'active' : ''; ?>" id="gradeStatistical" style="display:none;">
            <div class="subject-item <?php echo ($page == 'statiscal-product.php') ? 'active' : ''; ?>">
                <span class="text-in">
                    <ion-icon name="stats-chart-outline"></ion-icon>
                    <a href="statiscal-product">Product statistical</a>
                </span>
            </div>
            <div class="subject-item <?php echo ($page == 'statiscal-user.php') ? 'active' : ''; ?>">
                <span class="text-in">
                    <ion-icon name="stats-chart-outline"></ion-icon>
                    <a href="statiscal-users">User Statistical</a>
                </span>
            </div>
        </div>
    </div>
</div>