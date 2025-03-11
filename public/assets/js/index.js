/*Home data*/
document.addEventListener('DOMContentLoaded', function() {

    function isLoggedIn() {
        return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
    }

    function viewCart(){
        const cartBtn = document.querySelectorAll('.sp-cart')
        if (cartBtn.length > 0) {
            cartBtn.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    
                    if (!isLoggedIn()) {
                        alert('Please log in to buy!');
                        window.location.href = '?pages=login';
                    } else {
                        // Code to view cart goes here (if user is logged in)
                        console.log('Viewing cart...'); // Placeholder for cart viewing logic
                    }
                });
            });
        }
    }

    function myFunction() {
        document.querySelectorAll(".search-input").forEach(input => {
            let searchValue = input.value.toLowerCase();
            let products = document.querySelectorAll(".movie-item");
    
            products.forEach(product => {
                let productName = product.querySelector(".title").innerText.toLowerCase();
                product.style.display = productName.includes(searchValue) ? "block" : "none";
            });
        });
    }
    

    // render và lọc sản phẩm
    let itemsPerPage = 8; // Số sản phẩm mỗi trang
    let currentPage = 1;
    let selectedCategory = "all"; // Mặc định là All

    function updateProducts() {
        // Lấy tất cả sản phẩm trong container
        let allProducts = document.querySelectorAll("#product-container .movie-item");
        if (allProducts.length === 0) return; // Nếu không có sản phẩm, dừng

        // Ẩn tất cả sản phẩm
        allProducts.forEach(product => product.style.display = "none");

        // Lọc sản phẩm theo danh mục
        let filteredProducts = selectedCategory === "all"
            ? allProducts
            : document.querySelectorAll(`#product-container .movie-item[data-category="${selectedCategory}"]`);

        if (filteredProducts.length === 0) {
            console.warn("Không tìm thấy sản phẩm nào thuộc danh mục: " + selectedCategory);
            return;
        }

        let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = 1; // Nếu vượt quá số trang, quay về trang đầu

        // Hiển thị sản phẩm của trang hiện tại
        filteredProducts.forEach((product, index) => {
            product.style.display = (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) 
                ? "block" 
                : "none";
        });

        // Cập nhật giao diện phân trang
        let paginationContainer = document.querySelector(".pagination");
        paginationContainer.innerHTML = ""; // Xóa phân trang cũ

        if (totalPages > 1) { // Tạo nút phân trang nếu có hơn 1 trang
            for (let i = 1; i <= totalPages; i++) {
                let button = document.createElement("button");
                button.className = "page-link";
                button.innerText = i;
                button.dataset.page = i;
                if (i === currentPage) button.classList.add("active");
                paginationContainer.appendChild(button);
            }
        }
    }

    // Xử lý gọi sản phẩm từ server
    function loadAllProducts() {
        let allProducts = document.querySelectorAll("#product-container .movie-item");
    
        if (allProducts.length === 0) {
            console.warn("Không có sản phẩm nào trong DOM.");
            return;
        }
    
        // Hiển thị lại tất cả sản phẩm
        allProducts.forEach(product => product.style.display = "block");
    
        // Cập nhật phân trang nếu cần
        updateProducts();
    }

    // Xử lý sự kiện lọc sản phẩm khi thay đổi radio input
    document.querySelectorAll(".filter-input").forEach(input => {
        input.addEventListener("change", function () {
            selectedCategory = this.id.replace("filter-", "").toLowerCase();
            currentPage = 1; // Reset về trang đầu tiên khi đổi danh mục
            updateProducts();
        });
    });

    // Xử lý sự kiện khi bấm vào nút phân trang
    document.querySelector(".pagination").addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            currentPage = parseInt(event.target.dataset.page);
            updateProducts();
        }
    });

    // Cập nhật class active cho navigation (dành cho nhãn)
    document.querySelectorAll(".nav-item").forEach(label => {
        label.addEventListener("click", function () {
            document.querySelectorAll(".nav-item").forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    updateProducts(); // Chạy lần đầu khi trang tải

    // test fetch sản phẩm 
    const searchTerm = 'm';
    const url = `http://localhost/project-web2/pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`;
    console.log('Fetching:', url); // Kiểm tra URL

    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    

    // Lấy danh sách tất cả ô tìm kiếm và container gợi ý
    const searchInputs = document.querySelectorAll(".search-input");
    const searchButtons = document.querySelectorAll(".searchBtn");

    // Hàm tìm kiếm sản phẩm
    function searchItems(searchTerm) {
        let allProducts = document.querySelectorAll("#product-container .movie-item");

        if (searchTerm.trim() === "") {
            allProducts.forEach(product => product.style.display = "block"); // Hiển thị lại toàn bộ sản phẩm
            return;
        }

        let found = false;
        allProducts.forEach(product => {
            let productName = product.querySelector(".title").innerText.toLowerCase();
            if (productName.includes(searchTerm.toLowerCase())) {
                product.style.display = "block";
                found = true;
            } else {
                product.style.display = "none";
            }
        });

        if (!found) {
            document.getElementById("product-container").innerHTML = "<p>Không tìm thấy sản phẩm nào!</p>";
        }
    }

    // Hàm hiển thị gợi ý tìm kiếm
    function showHints(inputField) {
        const searchTerm = inputField.value.trim();
        const hintContainer = inputField.closest(".search-container").querySelector(".hint-container");

        if (!searchTerm) {
            hintContainer.innerHTML = "";
            hintContainer.style.display = "none";
            return;
        }

        fetch(`http://localhost/project-web2/pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(products => {
                hintContainer.innerHTML = "";
                if (!products || products.length === 0) {
                    hintContainer.style.display = "none";
                    return;
                }

                products.forEach(item => {
                    const hintItem = document.createElement("div");
                    hintItem.className = "hint-item";
                    hintItem.innerHTML = `
                        <img src="${item.image}" alt="${item.product_name}" style="width:30px; height:30px; margin-right:10px;">
                        ${item.product_name}
                    `;

                    hintItem.addEventListener("click", function () {
                        inputField.value = item.product_name;
                        hintContainer.innerHTML = "";
                        hintContainer.style.display = "none";
                        searchItems(item.product_name);
                    });

                    hintContainer.appendChild(hintItem);
                });

                hintContainer.style.display = "block";
            })
            .catch(error => console.error("Lỗi khi lấy gợi ý:", error));
    }

    // Gán sự kiện cho từng ô tìm kiếm
    searchInputs.forEach(input => {
        input.addEventListener("input", function () {
            showHints(this);
            if (this.value.trim() === "") {
                console.log("Ô tìm kiếm trống - Đang tải lại danh sách sản phẩm gốc...");
                loadAllProducts();
            }
        });

        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                searchItems(this.value);
            }
        });
    });

    // Gán sự kiện click cho nút tìm kiếm
    searchButtons.forEach(button => {
        button.addEventListener("click", function () {
            let searchInput = button.closest(".input-wrapper").querySelector(".search-input");
            if (searchInput) {
                searchItems(searchInput.value);
            }
        });
    });
    
    document.addEventListener("click", function (event) {
        searchInputs.forEach(input => {
            const hintContainer = input.closest(".search-container").querySelector(".hint-container");
            
            // Kiểm tra nếu click ngoài ô input và ngoài hint-container thì ẩn
            if (!input.contains(event.target) && !hintContainer.contains(event.target)) {
                hintContainer.innerHTML = "";
                hintContainer.style.display = "none";
            }
        });
    });
    



    // function searchItems() {
    //     const searchTerm = document.getElementById('search').value.toLowerCase(); // Get the search query
    //     const allContainer = document.getElementById('All');
    //     const mousseContainer = document.getElementById('Mousse');
    //     const croissantContainer = document.getElementById('Croissant');
    //     const drinkContainer = document.getElementById('Drink');
    
    //     // Clear previous results
    //     allContainer.innerHTML = '';
    //     mousseContainer.innerHTML = '';
    //     croissantContainer.innerHTML = '';
    //     drinkContainer.innerHTML = '';
    
    //     // Filter and display items based on the search term
    //     for (const category in menuItems) {
    //         menuItems[category].forEach(item => {
    //             if (item.name.toLowerCase().includes(searchTerm)) {
    //                 const itemCard = createItemCard(item);
    
    //                 // Add to the respective category container
    //                 if (category === 'Mousse') {
    //                     mousseContainer.appendChild(itemCard);
    //                 } else if (category === 'Croissant') {
    //                     croissantContainer.appendChild(itemCard);
    //                 } else if (category === 'Drink') {
    //                     drinkContainer.appendChild(itemCard);
    //                 }
    
    //                 // Also add matching items to the 'All' container
    //                 allContainer.appendChild(itemCard.cloneNode(true));
    //             }

    //             function getCurrentUser() {
    //                 const currentUser = localStorage.getItem('UserStr');
    //                 return currentUser ? JSON.parse(currentUser) : null;
    
    //             }
    
    //             function isLoggedIn() {
    //                 return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
    //             }
    
    //             const cartBtn = document.querySelectorAll('.sp-cart');

    //             if (cartBtn) {
    //                 cartBtn.forEach(button => {
    //                     button.addEventListener('click', function (event) {
    //                         if (!isLoggedIn()) {
    //                             alert('Please log in to buy!');
    //                             window.location.href = './Home/login.html';
    //                         } else {
    //                             console.log(`Viewing cart for product: ${button.dataset.id}`);
    //                             // Add your cart logic here.
    //                         }
    //                         event.stopPropagation(); // Ngăn chặn các sự kiện click khác nếu cần
    //                     });
    //                 });
    //             }
    //         });
    //     }
    //     // Clear hints after searching
    //     const hintContainer = document.getElementById('hintContainer');
    //     hintContainer.innerHTML = '';  // Clear hints
    //     hintContainer.style.display = 'none';  // Hide hints
    // }

    // // Add event listeners
    // function showHints(isMobile = false) {
    //     const searchInput = isMobile ? document.getElementById('searchPhone') : document.getElementById('search');
    //     const hintContainer = isMobile ? document.getElementById('hintContainerPhone') : document.getElementById('hintContainer');
    //     const searchTerm = searchInput.value.toLowerCase();
    
    //     hintContainer.innerHTML = ''; // Clear hints
    
    //     if (searchTerm) {
    //         Object.values(menuItems).flat().forEach(item => {
    //             if (item.name.toLowerCase().includes(searchTerm)) {
    //                 const hintItem = document.createElement('div');
    //                 hintItem.className = 'hint-item';
    
    //                 const hintImage = document.createElement('img');
    //                 hintImage.src = item.image;
    //                 hintImage.alt = item.name;
    //                 hintImage.style.width = '30px';
    //                 hintImage.style.height = '30px';
    //                 hintImage.style.marginRight = '10px';
    
    //                 hintItem.appendChild(hintImage);
    //                 hintItem.appendChild(document.createTextNode(item.name));
    
    //                 hintItem.onclick = function () {
    //                     searchInput.value = item.name;
    //                     hintContainer.innerHTML = '';
    //                     hintContainer.style.display = 'none';
    //                     searchItems(isMobile);
    //                 };
    
    //                 hintContainer.appendChild(hintItem);
    //             }
    //         });
    //         hintContainer.style.display = hintContainer.innerHTML ? 'block' : 'none';
    //     } else {
    //         hintContainer.style.display = 'none';
    //     }
    // }
    
    // // Search items based on input
    // function searchItems(isMobile = false) {
    //     const searchInput = isMobile ? document.getElementById('searchPhone') : document.getElementById('search');
    //     const searchTerm = searchInput.value.toLowerCase();
    
    //     const allContainer = document.getElementById('All');
    //     const mousseContainer = document.getElementById('Mousse');
    //     const croissantContainer = document.getElementById('Croissant');
    //     const drinkContainer = document.getElementById('Drink');
    
    //     allContainer.innerHTML = '';
    //     mousseContainer.innerHTML = '';
    //     croissantContainer.innerHTML = '';
    //     drinkContainer.innerHTML = '';
    
    //     for (const category in menuItems) {
    //         menuItems[category].forEach(item => {
    //             if (item.name.toLowerCase().includes(searchTerm)) {
    //                 const itemCard = createItemCard(item);
    //                 if (category === 'Mousse') mousseContainer.appendChild(itemCard);
    //                 if (category === 'Croissant') croissantContainer.appendChild(itemCard);
    //                 if (category === 'Drink') drinkContainer.appendChild(itemCard);
    //                 allContainer.appendChild(itemCard.cloneNode(true));

                    
    //                 function getCurrentUser() {
    //                     const currentUser = localStorage.getItem('UserStr');
    //                     return currentUser ? JSON.parse(currentUser) : null;
        
    //                 }
        
    //                 function isLoggedIn() {
    //                     return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
    //                 }
        
    //                 const cartBtn = document.querySelectorAll('.sp-cart');

    //                 cartBtn.forEach(button => {
    //                     if (!button.dataset.eventBound) { // Kiểm tra nếu sự kiện chưa được gán
    //                         button.addEventListener('click', function (event) {
    //                             if (!isLoggedIn()) {
    //                                 alert('Please log in to buy!');
    //                                 window.location.href = './Home/login.html';
    //                             } else {
    //                                 console.log(`Viewing cart for product: ${button.dataset.id}`);
    //                                 // Add your cart logic here.
    //                             }
    //                             event.stopPropagation(); // Ngăn chặn các sự kiện click khác nếu cần
    //                         });
                    
    //                         button.dataset.eventBound = 'true'; // Đánh dấu rằng sự kiện đã được gán
    //                     }
    //                 });
                    
                    
                    
    //             }

    //         });
    //     }
    
    //     const hintContainer = isMobile ? document.getElementById('hintContainerPhone') : document.getElementById('hintContainer');
    //     hintContainer.innerHTML = '';
    //     hintContainer.style.display = 'none';
    // }
    
    // // Add event listeners
    // document.querySelectorAll('.searchBtn').forEach(button => {
    //     button.addEventListener('click', function () {
    //         const isMobile = this.closest('.search-container-phone') !== null;
    //         searchItems(isMobile);
    //     });
    // });
    
    // document.querySelectorAll('#search, #searchPhone').forEach(input => {
    //     input.addEventListener('input', function () {
    //         const isMobile = this.id === 'searchPhone';
    //         showHints(isMobile);
    //     });
    // });
    
});


