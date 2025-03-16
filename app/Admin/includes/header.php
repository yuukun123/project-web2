<?php
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
        $title = "Home";
}
?>

<div class="header">
    <div class="text-heading">
        <h1><?php echo $title; ?></h1>
    </div>
    <nav class="navigation">
        <button id="login-btn" class="btnLogin-popup">Login</button>
        <div class="Function-cl">
            <div class="logout">
                <button id="logout-btn" class="btnLogout-popup">Logout</button>
            </div>
        </div>
    </nav>

    <div class="hamburger"  id="hamburger" onclick="toggleMenu()">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
</div>

<!--Mobile-->
<div class="mobile-menu" id="mobileMenu">

    <div class="menu-container">
        <!--Manage-product-->
        <button class="grade-button" onclick="toggleGrade('gradeFood', 'chevronFood')">
            <span class="text-head">
                <ion-icon name="fast-food-outline"></ion-icon>
                Product
            </span>
            <span class="chevron down" id="chevronFood"></span>
        </button>
        <div class="subject-list active" id="gradeFood" >
            <div class="subject-item active">
                <span class="text-in">
                    <ion-icon name="clipboard-outline"></ion-icon>
                    <a href="./list-product.html">List product</a>
                </span>
            </div>
            <div class="subject-item">
                <span class="text-in">
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <a href="./add-product.html">Add product</a>
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
        <div class="subject-list" id="gradeUserList" style="display:none;">
            <div class="subject-item">
                <span class="text-in">
                    <ion-icon name="person-outline"></ion-icon>
                    <a href="./manager-user.html">List User</a>
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
        <div class="subject-list " id="gradeReceipt" style="display:none;">
            <div class="subject-item">
                <span>
                    <ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon>
                    <a href="./receipt.html">Status order</a>
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
        <div class="subject-list" id="gradeStatistical" style="display:none;">
            <div class="subject-item">
                <span class="text-in">
                    <ion-icon name="stats-chart-outline"></ion-icon>
                    <a href="./statiscal-product.html">Product statistical</a>
                </span>
            </div>
            <div class="subject-item">
                <span class="text-in">
                    <ion-icon name="stats-chart-outline"></ion-icon>
                    <a href="./statiscal-users.html">User Statistical</a>
                </span>
            </div>
        </div>

    </div>


</div>