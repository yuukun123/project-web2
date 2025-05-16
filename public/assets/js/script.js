function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Toggle active class for both hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {

    e.preventDefault();
    window.location.href = 'home'; 
});

function myFunction() {
    const input = document.getElementById('search');
    // Add your search functionality here
}

// Hàm kiểm tra trạng thái đăng nhập và hiển thị lời chào
function displayWelcomeMessage() {
    // Nếu đã hiển thị lời chào trước đó, không làm gì cả
    if (localStorage.getItem("welcomeShown") === "true") {
        return;
    }

    fetch('includes/session.php', {
        method: 'GET',
        credentials: 'include'  // đảm bảo gửi cookie phiên
    })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn && data.username) {
            const notificate = document.getElementById("notificate");
            const message = document.getElementById("message");

            // Hiển thị lời chào cá nhân hóa dựa trên dữ liệu từ session.php
            message.innerHTML = `Welcome back, ${data.username}!<br>Have a good day!`;
            notificate.classList.add("show");

            // Sau 2 giây, ẩn thông báo với hiệu ứng chuyển động
            setTimeout(() => {
                notificate.classList.remove("show");
                notificate.classList.add("hide");

                // Sau khi animation hoàn tất, ẩn hoàn toàn phần thông báo
                setTimeout(() => {
                    notificate.style.display = "none";
                }, 1000); // thời gian này cần khớp với CSS transition duration
            }, 2000);

            // Đánh dấu đã hiển thị lời chào để lần sau không hiển thị lại
            localStorage.setItem("welcomeShown", "true");
        }
    })
    .catch(error => console.error("Error fetching session data:", error));
}



document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(window.location);
    if (url.searchParams.has('term')) {
      url.searchParams.delete('term');
      window.history.replaceState(null, '', url.toString());
    }

    const blurOverlay = document.querySelector(".blur-overlay");
    const btnCart = document.querySelectorAll(".add-to-cart"); // Nút thêm sản phẩm
    const shoppingCart = document.querySelector(".shopping-cart"); // Cửa sổ giỏ hàng
    const cartBtn = document.getElementById("cart-btn"); // Nút mở giỏ hàng
    const cartBtns = document.querySelectorAll(".sp-cart");
    const closeBtns = document.querySelectorAll(".close");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const cartCounts = document.querySelectorAll(".cart-count");    
    const payButton = document.querySelector(".pay-btn-link");
    const payLink = document.querySelector(".pay-link");

    // Kiểm tra trạng thái đăng nhập từ session
    function checkLoginStatus(callback) {
        fetch("includes/session.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log("Session Data:", data);
            if (data.loggedIn) {
                document.body.classList.add("logged-in");
            } else {
                document.body.classList.remove("logged-in");
            }
            updateUI();
            if (callback) callback(data.loggedIn);
        })
        .catch(error => console.error("Lỗi kiểm tra session:", error));
    }

    // Cập nhật giao diện đăng nhập
    function updateUI() {
        const isLoggedIn = document.body.classList.contains("logged-in");
        if (loginBtn) loginBtn.style.display = isLoggedIn ? "none" : "inline-block";
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
    }

    // Khi nhấn nút mở giỏ hàng
    // if (cartBtn) {
    //     cartBtn.addEventListener("click", () => {
    //         checkLoginStatus((isLoggedIn) => {
    //             if (isLoggedIn) {
    //                 fetchCart(); // Load giỏ hàng từ database
    //                 shoppingCart.classList.add("active");
    //                 if (blurOverlay) blurOverlay.classList.add("active");
    //             } else {
    //                 alert("Bạn cần đăng nhập để xem giỏ hàng!");
    //                 window.location.href = "login";
    //             }
    //         });
    //     });
    // }

    if (cartBtns.length > 0) {
        cartBtns.forEach(cartBtn => {
            cartBtn.addEventListener("click", () => {
                checkLoginStatus((isLoggedIn) => {
                    if (isLoggedIn) {
                        fetchCart(); // Load giỏ hàng từ database
                        shoppingCart.classList.add("active");
                        if (blurOverlay) blurOverlay.classList.add("active");
                    } else {
                        alert("You need to log in to view the cart!");
                        window.location.href = "login";
                    }
                });
            });
        });
    }

    displayWelcomeMessage();

    checkLoginStatus((isLoggedIn)=>{
        if (!isLoggedIn) {
            console.log("Không đăng nhập, xóa flag welcomeShown");
            localStorage.removeItem("welcomeShown");
            console.log("welcomeShown flag removed:", localStorage.getItem("welcomeShown"));
        }
    });
    
    

    // Khi nhấn nút đóng giỏ hàng
    closeBtns.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            shoppingCart.classList.remove("active");
            if (blurOverlay) blurOverlay.classList.remove("active");
            console.log("Đóng giỏ hàng");
        });
    });
    // document.addEventListener("click", function (event) {
    //     if (event.target.classList.contains("close")) {
    //         shoppingCart.classList.remove("active");
    //         if (blurOverlay) blurOverlay.classList.remove("active");
    //         console.log("Đóng giỏ hàng");
    //     }
    // });
    

    // Thêm sản phẩm vào giỏ hàng (trên trang sản phẩm)
    btnCart.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            checkLoginStatus((isLoggedIn) => {
                if (!isLoggedIn) {
                    alert("You need to log in to add products to the cart!");
                    window.location.href = "login";
                } else {
                    let productId = this.getAttribute("data-id");
                    if (!productId) {
                        alert("Error: Product ID not found!");
                        return;
                    }
                    addToCart(productId);
                }
            });
        });
    });

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(productId) {
        console.log("Đang gửi request thêm sản phẩm:", productId);
        fetch("includes/cart_action.php", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "add", product_id: parseInt(productId) })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response từ server:", data);
            if (data.success) {
                alert("Product has been added to the cart!");
                fetchCart();
                updateCartCount();
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => console.error("Lỗi khi thêm vào giỏ hàng:", error));
    }

    // Hàm xóa sản phẩm khỏi giỏ hàng
    function removeFromCart(productId) {
        fetch("includes/cart_action.php", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "remove", product_id: productId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCart();
                updateCartCount();
            } else {
                alert("Error deleting product: " + data.message);
            }
        })
        .catch(error => console.error("Lỗi khi xóa sản phẩm:", error));
    }

    // 🔽 Giảm số lượng hoặc tăng số lượng khi nhấn nút
    function updateQuantity(productId, change) {
        let inputField = document.getElementById(`quantity_${productId}`);
        let newQuantity = parseInt(inputField.value) + change;
    
        if (newQuantity < 1) newQuantity = 1;
    
        inputField.value = newQuantity;
        sendUpdateRequest(productId, newQuantity);
        updateTotalPrice(); // Cập nhật tổng tiền ngay lập tức
    }
    

    // ✏ Nhập trực tiếp số lượng sản phẩm
    function updateQuantityDirectly(productId, value) {
        let newQuantity = parseInt(value);
    
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
        }
    
        document.getElementById(`quantity_${productId}`).value = newQuantity;
        sendUpdateRequest(productId, newQuantity);
        updateTotalPrice(); // Cập nhật tổng tiền ngay lập tức
    }
    

    // 📡 Gửi AJAX cập nhật số lượng
    function sendUpdateRequest(productId, quantity) {
        fetch("includes/cart_action.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                action: "update",
                product_id: productId,
                quantity: quantity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCart(); // Cập nhật lại danh sách giỏ hàng
                updateCartCount(); // Cập nhật số lượng sản phẩm trên icon giỏ hàng
                updateTotalPrice(); // Cập nhật tổng tiền ngay lập tức
            } else {
                alert("An error occurred while updating the cart!");
            }
        })
        .catch(error => console.error("Lỗi:", error));
    }
    
    function updateTotalPrice() {
        let totalPrice = 0;
        document.querySelectorAll(".cart-item").forEach(item => {
            let price = parseFloat(item.querySelector(".item-price").textContent.replace("₫", "").replace(",", "").trim());
            let quantity = parseInt(item.querySelector(".quantity-input").value);
            totalPrice += price * quantity;
        });
    
        // Cập nhật vào giao diện
        const totalElement = document.querySelector(".cart-total .total-amount");
        if (totalElement) {
            totalElement.textContent = totalPrice.toLocaleString() + " ₫";
        }
    }
    

    // Hàm lấy danh sách giỏ hàng
    function fetchCart() {
        fetch("includes/cart.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.text())
        .then(data => {
            console.log("Dữ liệu giỏ hàng nhận được:", data);
            const cartContent = document.querySelector(".cart-scroll"); // Chỉ cập nhật nội dung sản phẩm
            if (cartContent) {
                if (data.includes("empty-cart")) { // Kiểm tra nếu có nội dung rỗng từ PHP
                    cartContent.innerHTML = `
                        <div class="emptyCart">
                            <div class="close-icon"> <ion-icon name="alert-circle-outline"></ion-icon> </div>
                            <p class="empty-cart">Your cart is empty.</p>
                        </div>
                    `;
                }
                else {
                    // Cập nhật danh sách sản phẩm mà không ảnh hưởng nút đóng
                    cartContent.innerHTML = data;
                }
            } else {
                console.error("Không tìm thấy phần tử .cart-content trên trang!");
            }
    
            // Hiển thị giỏ hàng và lớp mờ nếu chưa hiển thị
            shoppingCart.classList.add("active");
            if (blurOverlay) blurOverlay.classList.add("active");
        })
        .catch(error => console.error("Lỗi khi fetch giỏ hàng:", error));
    }
    

    // Hàm cập nhật số lượng sản phẩm trên icon giỏ hàng
    function updateCartCount() {
        fetch("includes/cart_action.php?cart_count=1", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log("Số lượng giỏ hàng:", data.count);
    
            // Cập nhật số lượng giỏ hàng trên tất cả các phần tử hiển thị
            document.querySelectorAll(".cart-count").forEach(cartCount => {
                cartCount.textContent = data.count || 0;
            });
    
            // Nếu giỏ hàng có sản phẩm, cho phép thanh toán
            if (data.count > 0) {
                payButton.removeAttribute("disabled");
                payButton.classList.remove("disabled");
                payLink.classList.remove("disabled-link"); // Đảm bảo có thể nhấn
            } else {
                payButton.setAttribute("disabled", "true");
                payButton.classList.add("disabled");
                payLink.classList.add("disabled-link"); // Ngăn điều hướng
            }
        })
        .catch(error => console.error("Lỗi khi lấy số lượng giỏ hàng:", error));
    }
    
    // Ngăn điều hướng nếu giỏ hàng rỗng
    payLink.addEventListener("click", function(event) {
        if (payButton.hasAttribute("disabled")) {
            event.preventDefault(); // Ngăn chặn chuyển trang
            alert("Your cart is empty. Please add products before proceeding to checkout!");
        }
    });
    

    // Khi trang tải xong, kiểm tra trạng thái đăng nhập và cập nhật số lượng giỏ hàng
    checkLoginStatus();
    updateCartCount();
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;
    window.updateQuantityDirectly = updateQuantityDirectly;
    

    // search product

        // render và lọc sản phẩm
    let itemsPerPage = 8; // Số sản phẩm mỗi trang
    let currentPage = 1;
    let selectedCategory = "all"; // Mặc định là All

    // function updateProducts() {
    //     // Lấy tất cả sản phẩm trong container
    //     let allProducts = document.querySelectorAll("#product-container .movie-item");
    //     if (allProducts.length === 0) return; // Nếu không có sản phẩm, dừng

    //     // Ẩn tất cả sản phẩm
    //     allProducts.forEach(product => product.style.display = "none");

    //     // Lọc sản phẩm theo danh mục
    //     let filteredProducts = selectedCategory === "all"
    //         ? allProducts
    //         : document.querySelectorAll(`#product-container .movie-item[data-category="${selectedCategory}"]`);

    //     if (filteredProducts.length === 0) {
    //         console.warn("Không tìm thấy sản phẩm nào thuộc danh mục: " + selectedCategory);
    //         return;
    //     }

    //     let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    //     if (currentPage > totalPages) currentPage = 1; // Nếu vượt quá số trang, quay về trang đầu

    //     // Hiển thị sản phẩm của trang hiện tại
    //     filteredProducts.forEach((product, index) => {
    //         product.style.display = (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) 
    //             ? "block" 
    //             : "none";
    //     });

    //     // Cập nhật giao diện phân trang
    //     let paginationContainer = document.querySelector(".pagination");
    //     paginationContainer.innerHTML = ""; // Xóa phân trang cũ

    //     if (totalPages > 1) { // Tạo nút phân trang nếu có hơn 1 trang
    //         for (let i = 1; i <= totalPages; i++) {
    //             let button = document.createElement("button");
    //             button.className = "page-link";
    //             button.innerText = i;
    //             button.dataset.page = i;
    //             if (i === currentPage) button.classList.add("active");
    //             paginationContainer.appendChild(button);
    //         }
    //     }
    // }

    // // Xử lý sự kiện khi bấm vào nút phân trang
    // const pagination = document.querySelector(".pagination");
    // if (pagination) {
    //     pagination.addEventListener("click", function (event) {
    //         if (event.target.tagName === "BUTTON") {
    //             currentPage = parseInt(event.target.dataset.page);
    //             updateProducts();
    //         }
    //     });
    // }
    
    // Xử lý sự kiện lọc sản phẩm khi thay đổi radio input
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            const category = item.textContent.trim().toLowerCase();
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('category', category);
            urlParams.set('page', '1'); // Reset trang về 1 khi đổi filter
            window.location.search = urlParams.toString();
        });
    });
    

    // Cập nhật class active cho navigation (dành cho nhãn)
    document.querySelectorAll(".nav-item").forEach(label => {
        label.addEventListener("click", function () {
            document.querySelectorAll(".nav-item").forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });


      

    // updateProducts(); // Chạy lần đầu khi trang tải

    // test fetch sản phẩm 
    const searchTerm = 'm';
    const urll = `pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`;
    console.log('Fetching:', urll); // Kiểm tra URL

    fetch(urll)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    // Xử lý gọi sản phẩm từ server
    // Xóa dấu tiếng Việt
function removeVietnameseTones(str) {
    return str.normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D");
}

// Hiển thị gợi ý tìm kiếm (autocomplete)
function showHints(inputField) {
    const rawInput = inputField.value.trim();
    const searchTerm = removeVietnameseTones(rawInput.toLowerCase());
    const hintContainer = inputField.closest(".search-container").querySelector(".hint-container");

    if (!searchTerm) {
        hintContainer.innerHTML = "";
        hintContainer.style.display = "none";
        return;
    }

    fetch(`pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(products => {
            hintContainer.innerHTML = "";

            if (!products || products.length === 0) {
                const notFoundItem = document.createElement("div");
                notFoundItem.className = "hint-item";
                notFoundItem.textContent = "Không tìm thấy sản phẩm";
                notFoundItem.style.textAlign = "center";
                notFoundItem.style.padding = "8px";
                notFoundItem.style.color = "#999";
                hintContainer.appendChild(notFoundItem);
                hintContainer.style.display = "block";
                return;
            }

            products.forEach(item => {
                const hintItem = document.createElement("div");
                hintItem.className = "hint-item";
                hintItem.dataset.productId = item.product_id;
                hintItem.innerHTML = `
                    <img src="${item.image}" alt="${item.product_name}" 
                         style="width:30px; height:30px; margin-right:10px; vertical-align:middle;">
                    ${item.product_name}
                `;

                hintItem.addEventListener("mousedown", e => e.preventDefault()); // ngăn mất focus
                hintItem.addEventListener("click", () => {
                    window.location.href = `home?pages=product&id=${item.product_id}`;
                });

                hintContainer.appendChild(hintItem);
            });

            hintContainer.style.display = "block";
        })
        .catch(error => console.error("Lỗi khi lấy gợi ý:", error));
}


    const searchInputs = document.querySelectorAll(".search-input");
    const searchButtons = document.querySelectorAll(".searchBtn");

    // Gợi ý sản phẩm
    function showHints(inputField) {
        const rawInput = inputField.value.trim();
        const searchTerm = removeVietnameseTones(rawInput.toLowerCase());

        const hintContainer = inputField.closest(".search-container").querySelector(".hint-container");
        if (!hintContainer) return;

        if (!searchTerm) {
            hintContainer.innerHTML = "";
            hintContainer.style.display = "none";
            return;
        }

        fetch(`pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(products => {
                hintContainer.innerHTML = "";

                if (!products || products.length === 0) {
                    const notFoundItem = document.createElement("div");
                    notFoundItem.className = "hint-item";
                    notFoundItem.textContent = "Không tìm thấy sản phẩm";
                    notFoundItem.style.textAlign = "center";
                    notFoundItem.style.padding = "8px";
                    notFoundItem.style.color = "#999";
                    hintContainer.appendChild(notFoundItem);
                    hintContainer.style.display = "block";
                    return;
                }

                products.forEach(item => {
                    const hintItem = document.createElement("div");
                    hintItem.className = "hint-item";
                    hintItem.dataset.productId = item.product_id;
                    hintItem.innerHTML = `
                        <img src="${item.image}" alt="${item.product_name}" 
                            style="width:30px; height:30px; margin-right:10px; vertical-align:middle;">
                        ${item.product_name}
                    `;

                    hintItem.addEventListener("mousedown", (e) => {
                        e.preventDefault(); // giữ focus
                        isSelectingHint = true;
                    });

                    hintItem.addEventListener("click", () => {
                        window.location.href = `home?pages=product&id=${item.product_id}`;
                    });

                    hintContainer.appendChild(hintItem);
                });

                hintContainer.style.display = "block";
            })
            .catch(error => {
                console.error("Lỗi khi lấy gợi ý:", error);
            });
    }

    function removeVietnameseTones(str) {
        return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    }

    let inputTimeout = null;
    let isSelectingHint = false;
    let lastInputValue = "";
    
    searchInputs.forEach(input => {
        // Khi gõ tiếng Việt bằng IME
        input.addEventListener("compositionend", function () {
            lastInputValue = this.value.trim();
        });
    
        input.addEventListener('input', function () {
            const hintContainer = this.closest(".search-container").querySelector(".hint-container");
            if (!hintContainer) return;
    
            const value = this.value.trim();
            lastInputValue = value;
    
            // Hủy timeout trước nếu có
            if (inputTimeout) clearTimeout(inputTimeout);
    
            if (value === '') {
                hintContainer.innerHTML = '';
                hintContainer.style.display = 'none';
    
                // Xóa term khỏi URL & reload trang
                const url = new URL(window.location);
                url.searchParams.delete('term');
                url.searchParams.set('page', 1);
                window.location.href = url.toString();
                return;
            }
    
            // Chờ 500ms rồi mới fetch hint
            inputTimeout = setTimeout(() => {
                showHints(input);
            }, 500);
        });
    
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
    
                const raw = lastInputValue || this.value.trim();
                if (raw) {
                    const term = encodeURIComponent(raw);
                    window.location.href = `?term=${term}&page=1`;
                }
            }
        });
    
        input.addEventListener("blur", function () {
            setTimeout(() => {
                if (!isSelectingHint) {
                    const hintContainer = this.closest(".search-container").querySelector(".hint-container");
                    if (hintContainer) hintContainer.style.display = "none";
                }
                isSelectingHint = false;
            }, 200);
        });
    });
    
    // Ghi lại trạng thái khi click vào gợi ý
    document.addEventListener("mousedown", e => {
        if (e.target.closest(".hint-item")) {
            isSelectingHint = true;
        }
    });
    
    
    // Ghi lại trạng thái khi click vào hint
    document.addEventListener("mousedown", e => {
        if (e.target.closest(".hint-item")) {
            isSelectingHint = true;
        }
    });
    
    // Ẩn gợi ý nếu click ngoài vùng tìm kiếm
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".search-container") && !event.target.closest(".hint-item")) {
            document.querySelectorAll(".hint-container").forEach(hint => {
                hint.innerHTML = "";
                hint.style.display = "none";
            });
        }
    });
    
    // Xử lý nút tìm kiếm
    searchButtons.forEach(button => {
        button.addEventListener("click", function () {
            const searchInput = button.closest(".input-wrapper").querySelector(".search-input");
            if (searchInput) {
                const raw = searchInput.value.trim();
                if (raw) {
                    const term = encodeURIComponent(raw);
                    window.location.href = `?term=${term}&page=1`;
                }
            }
        });
    });
    


    
});

/*scroll*/
let lastScrollTop = 0;
const header = document.querySelector('.header');
const mediaQuery = window.matchMedia('(max-width: 1390px)');

function handleScroll() {
    if (mediaQuery.matches) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('hide');
        } else {
            // Scrolling up
            header.classList.remove('hide');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    } else {
        // If not in responsive mode, always show the header
        header.classList.remove('hide');
    }
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Listen for resize events to handle orientation changes
window.addEventListener('resize', handleScroll);

// Initial call to set the correct state
handleScroll();

// back to top scrolling
window.onscroll = function () {
    toggleBackToTopButton();
};

function toggleBackToTopButton() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


$(document).ready(function(){
    $('.carousel_wrapper').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: $('.custom-prev'),
        nextArrow: $('.custom-next'),
        dotsClass: 'carousel-dots',
        responsive: [
            {
                breakpoint: 1197,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
});