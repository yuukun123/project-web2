/*Home data*/
function myFunction() {
    const input = document.getElementById('search');
    // Add your search functionality here
}

document.addEventListener('DOMContentLoaded', function() {
    

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
    const url = `pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`;
    console.log('Fetching:', url); // Kiểm tra URL

    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    
    // Các biến và sự kiện khác của trang...

    const searchInputs = document.querySelectorAll(".search-input");
    const searchButtons = document.querySelectorAll(".searchBtn");

    // Hàm tìm kiếm sản phẩm (giữ nguyên nếu cần)
    function searchItems(searchTerm) {
        let allProducts = document.querySelectorAll("#product-container .movie-item");
        if (searchTerm.trim() === "") {
            allProducts.forEach(product => product.style.display = "block");
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

    let isSelectingHint = false;
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
                    // Sử dụng dataset để lưu product_id
                    hintItem.dataset.productId = item.product_id;
                    hintItem.innerHTML = `
                        <img src="${item.image}" alt="${item.product_name}" style="width:30px; height:30px; margin-right:10px;">
                        ${item.product_name}
                    `;

                    // Dùng mousedown để tránh mất focus trước khi xử lý
                    hintItem.addEventListener("mousedown", function (event) {
                        event.preventDefault(); // Ngăn trình duyệt hiểu là nhấp ra ngoài input
                        isSelectingHint = true;
                    });

                    hintItem.addEventListener("click", function () {
                        isSelectingHint = false; // Reset biến
                        console.log(item.product_id);
                        window.location.href = `home?pages=product&id=${item.product_id}`;
                    });                    

                    hintContainer.appendChild(hintItem);
                });

                hintContainer.style.display = "block";
            })
            .catch(error => console.error("Lỗi khi lấy gợi ý:", error));
    }

    let inputTimeout = null; // Biến lưu bộ đếm thời gian
    // Gán sự kiện cho từng ô tìm kiếm
    searchInputs.forEach(input => {
        input.addEventListener("input", function () {
        
            if (event.data === " ") return;

            clearTimeout(inputTimeout); // Xóa bộ đếm thời gian trước đó
            const searchField = this;
            
            inputTimeout = setTimeout(() => {
                showHints(searchField); // Gọi hàm hiển thị hint sau khi người dùng ngừng nhập
            }, 500); // Chờ 500ms sau khi ngừng nhập mới gọi API
            
            if (this.value.trim() === "") {
                console.log("Ô tìm kiếm trống - Đang tải lại danh sách sản phẩm gốc...");
                // Nếu có hàm loadAllProducts(), gọi ở đây
                loadAllProducts();
            }
        });

        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                searchItems(this.value);
            }
        });

        input.addEventListener("blur", function () {
            setTimeout(() => {
                if (!isSelectingHint) {
                    this.closest(".search-container").querySelector(".hint-container").style.display = "none";
                }
                isSelectingHint = false;
            }, 200); // Đợi 200ms để kiểm tra xem người dùng có click vào hint không
        });

    });

    // Xử lý click ngoài vùng input/hint-container
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".search-container") && !event.target.closest(".hint-item")) {
            document.querySelectorAll(".hint-container").forEach(hint => {
                hint.innerHTML = "";
                hint.style.display = "none";
            });
        }
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
    
    

});