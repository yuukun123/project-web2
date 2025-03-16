<div class="pg-12 ">
    <!-- Searching Pro -->
    <div class="bsearchpro">
        <div class="search-container-pro">
            <span class="search-price-title">name:
                <input type="text" id="searchName" placeholder="Search for names..">
            </span>
            <!-- <input type="text" id="searchCategory" placeholder="Search for category.."> -->

            <!-- <label for="category">Search for category: </label> -->
            <select name="category" id="searchCategory">
                <option value="Mousse">Category</option>
                <option value="Mousse">Mousse</option>
                <option value="Croissant">Croissant</option>
                <option value="Drink">Drink</option>
            </select>

        </div>
        <div class="search-price">
            <span class="search-price-title">Price from:
                <input type="number" id="minPrice" min="0" placeholder="0đ">
                To:
                <input type="number" id="maxPrice" max="500000" placeholder="500.000đ">
            </span>
        </div>
        <button type="button" class="btn-searchpro" onclick="search()">Search</button>

        <div class="tab_content_pro" id="productList">
            <!-- Kết quả tìm kiếm sẽ hiển thị ở đây -->
        </div>

    </div>

    <!-- <input type="radio" name="filter" id="filter-all" class="filter-input" checked> -->
    <!-- m coi khúc trên thoi bỏ qua khúc này  -->
    <div class="tab_content" id="All"></div>

    <div class="container">
        <div class="pagination">
            <button class="page-link active"></button>
        </div>
    </div>

</div>
