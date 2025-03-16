<div class="right-screen">
    <div class="Function-use">
        <button class="logo" style="border: none; background: none; cursor:pointer">
            <img src="../../../public/assets/Img/Sweets1.png" alt="">
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
            <div class="subject-list" id="gradeFood" style="display:none;">
                <div class="subject-item">
                    <span class="text-in">
                        <ion-icon name="clipboard-outline"></ion-icon>
                        <a class="colorForLink" href="./list-product.php">List product</a>
                    </span>
                </div>
                <div class="subject-item">
                    <span class="text-in">
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <a class="colorForLink" href="./add-product.php">Add product</a>
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
                        <a class="colorForLink" href="./manager-user.php">List User</a>
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
                        <a class="colorForLink" href="./receipt.php">Status order</a>
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
                        <a class="colorForLink" href="./statiscal-product.php">Product statistical</a>
                    </span>
                </div>
                <div class="subject-item">
                    <span class="text-in">
                        <ion-icon name="stats-chart-outline"></ion-icon>
                        <a class="colorForLink" href="./statiscal-users.php">User Statistical</a>
                    </span>
                </div>
            </div>

        </div>

    </div>
</div>