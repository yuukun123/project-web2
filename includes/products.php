<!-- products.php -->
<?php
echo 
    '<div class="pg-12 ">
            <!--Text Intro-->
            <div class="flex-full">
                <div class="film-title">
                    <div class="vertical-line"></div>
                </div>

                <input type="radio" name="filter" id="filter-all" class="filter-input" checked>
                <input type="radio" name="filter" id="filter-mousse" class="filter-input">
                <input type="radio" name="filter" id="filter-croissant" class="filter-input">
                <input type="radio" name="filter" id="filter-drink" class="filter-input">

                <nav class="nav-container">
                    <ul class="nav-links">
                        <li><label for="filter-all" class="active">ALL</label></li>
                        <li>/</li>
                        <li><label for="filter-mousse">Mousse</label></li>
                        <li>/</li>
                        <li><label for="filter-croissant">Croissant</label></li>
                        <li>/</li>
                        <li><label for="filter-drink">Drink</label></li>
                    </ul>
                </nav>
            </div>

            <div class="tab_content" id="All"></div>

            <div class="tab_content" id="Mousse"></div>

            <div class="tab_content" id="Croissant"></div>

            <div class="tab_content" id="Drink"></div>

            <div class="container">
                <div class="pagination">
                    <button class="page-link active"></button>
                </div>
            </div>
    </div>';
?>