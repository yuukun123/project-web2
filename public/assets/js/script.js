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
    const searchTerm = '';
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
    // function showHints(inputField) {
    //     const rawInput = inputField.value.trim();
    //     const searchTerm = removeVietnameseTones(rawInput.toLowerCase());

    //     const hintContainer = inputField.closest(".search-container").querySelector(".hint-container");
    //     if (!hintContainer) return;

    //     if (!searchTerm) {
    //         hintContainer.innerHTML = "";
    //         hintContainer.style.display = "none";
    //         return;
    //     }

    //     fetch(`pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`)
    //         .then(response => response.json())
    //         .then(products => {
    //             hintContainer.innerHTML = "";

    //             if (!products || products.length === 0) {
    //                 const notFoundItem = document.createElement("div");
    //                 notFoundItem.className = "hint-item";
    //                 notFoundItem.textContent = "Không tìm thấy sản phẩm";
    //                 notFoundItem.style.textAlign = "center";
    //                 notFoundItem.style.padding = "8px";
    //                 notFoundItem.style.color = "#999";
    //                 hintContainer.appendChild(notFoundItem);
    //                 hintContainer.style.display = "block";
    //                 return;
    //             }

    //             products.forEach(item => {
    //                 const hintItem = document.createElement("div");
    //                 hintItem.className = "hint-item";
    //                 hintItem.dataset.productId = item.product_id;
    //                 hintItem.innerHTML = `
    //                     <img src="${item.image}" alt="${item.product_name}" 
    //                         style="width:30px; height:30px; margin-right:10px; vertical-align:middle;">
    //                     ${item.product_name}
    //                 `;

    //                 hintItem.addEventListener("mousedown", (e) => {
    //                     e.preventDefault(); // giữ focus
    //                     isSelectingHint = true;
    //                 });

    //                 hintItem.addEventListener("click", () => {
    //                     window.location.href = `home?pages=product&id=${item.product_id}`;
    //                 });

    //                 hintContainer.appendChild(hintItem);
    //             });

    //             hintContainer.style.display = "block";
    //         })
    //         .catch(error => {
    //             console.error("Lỗi khi lấy gợi ý:", error);
    //         });
    // }

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


// script.js

// ... (toggleMenu, logo click, myFunction - giữ nguyên) ...
// function toggleMenu(hamburger) {
//     const mobileMenu = document.getElementById('mobileMenu');
//     mobileMenu.classList.toggle('active');
//     document.querySelectorAll('.hamburger').forEach(icon => {
//         icon.classList.toggle('active');
//     });
// }

// const logo = document.querySelector('.logo');
// if (logo) { // Thêm kiểm tra null
//     logo.addEventListener('click', function(e) {
//         e.preventDefault();
//         window.location.href = 'home'; // Đảm bảo 'home' là URL hợp lệ
//     });
// }


// function myFunction() { // Hàm này chưa có nội dung, có thể bạn sẽ thêm sau
//     const input = document.getElementById('search');
//     // Add your search functionality here
// }

// function displayWelcomeMessage() {
//     if (localStorage.getItem("welcomeShown") === "true") {
//         return;
//     }
//     fetch('includes/session.php', { // Đảm bảo đường dẫn này đúng từ vị trí trang HTML
//         method: 'GET',
//         credentials: 'include'
//     })
//     .then(response => {
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         return response.json();
//     })
//     .then(data => {
//         if (data.loggedIn && data.username) {
//             const notificate = document.getElementById("notificate");
//             const message = document.getElementById("message");
//             if (notificate && message) { // Kiểm tra phần tử tồn tại
//                 message.innerHTML = `Welcome back, ${data.username}!<br>Have a good day!`;
//                 notificate.classList.add("show");
//                 setTimeout(() => {
//                     notificate.classList.remove("show");
//                     notificate.classList.add("hide");
//                     setTimeout(() => {
//                         notificate.style.display = "none";
//                     }, 1000);
//                 }, 2000);
//                 localStorage.setItem("welcomeShown", "true");
//             }
//         }
//     })
//     .catch(error => console.error("Error fetching session data:", error));
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const currentUrl = new URL(window.location.href); // Sử dụng window.location.href
//     if (currentUrl.searchParams.has('term')) {
//         // Cân nhắc: Chỉ xóa 'term' nếu nó rỗng hoặc không muốn giữ lại khi tải lại trang
//         // Hoặc có thể bạn muốn giữ lại 'term' để ô tìm kiếm được điền sẵn
//         // Ví dụ: currentUrl.searchParams.delete('term');
//         // window.history.replaceState(null, '', currentUrl.toString());
//     }

//     const blurOverlay = document.querySelector(".blur-overlay");
//     const btnCart = document.querySelectorAll(".add-to-cart");
//     const shoppingCart = document.querySelector(".shopping-cart");
//     // const cartBtn = document.getElementById("cart-btn"); // Bạn đã comment code sử dụng nó
//     const cartBtns = document.querySelectorAll(".sp-cart");
//     const closeBtns = document.querySelectorAll(".close");
//     const loginBtn = document.getElementById("login-btn");
//     const logoutBtn = document.getElementById("logout-btn");
//     // const cartCounts = document.querySelectorAll(".cart-count"); // Không thấy sử dụng trực tiếp biến này
//     const payButton = document.querySelector(".pay-btn-link");
//     const payLink = document.querySelector(".pay-link");

//     function checkLoginStatus(callback) {
//         fetch("includes/session.php", { // Đảm bảo đường dẫn này đúng
//             method: "GET",
//             credentials: "include"
//         })
//         .then(response => {
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             return response.json();
//         })
//         .then(data => {
//             console.log("Session Data:", data);
//             if (data.loggedIn) {
//                 document.body.classList.add("logged-in");
//             } else {
//                 document.body.classList.remove("logged-in");
//             }
//             updateUI();
//             if (callback) callback(data.loggedIn);
//         })
//         .catch(error => {
//             console.error("Lỗi kiểm tra session:", error);
//             // Xử lý UI nếu không lấy được session, ví dụ coi như chưa đăng nhập
//             document.body.classList.remove("logged-in");
//             updateUI();
//             if (callback) callback(false); // Giả sử chưa đăng nhập nếu có lỗi
//         });
//     }

//     function updateUI() {
//         const isLoggedIn = document.body.classList.contains("logged-in");
//         if (loginBtn) loginBtn.style.display = isLoggedIn ? "none" : "inline-block";
//         if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
//     }

//     if (cartBtns.length > 0 && shoppingCart) { // Thêm kiểm tra shoppingCart
//         cartBtns.forEach(cartBtn => {
//             cartBtn.addEventListener("click", () => {
//                 checkLoginStatus((isLoggedIn) => {
//                     if (isLoggedIn) {
//                         fetchCart();
//                         shoppingCart.classList.add("active");
//                         if (blurOverlay) blurOverlay.classList.add("active");
//                     } else {
//                         alert("You need to log in to view the cart!");
//                         window.location.href = "login"; // Đảm bảo 'login' là URL hợp lệ
//                     }
//                 });
//             });
//         });
//     }

//     displayWelcomeMessage();

//     checkLoginStatus((isLoggedIn) => {
//         if (!isLoggedIn) {
//             console.log("Không đăng nhập, xóa flag welcomeShown");
//             localStorage.removeItem("welcomeShown");
//             console.log("welcomeShown flag removed:", localStorage.getItem("welcomeShown"));
//         }
//     });

//     if (shoppingCart) { // Thêm kiểm tra shoppingCart
//         closeBtns.forEach(button => {
//             button.addEventListener("click", function (event) {
//                 event.stopPropagation();
//                 shoppingCart.classList.remove("active");
//                 if (blurOverlay) blurOverlay.classList.remove("active");
//                 console.log("Đóng giỏ hàng");
//             });
//         });
//     }

//     btnCart.forEach(button => {
//         button.addEventListener("click", function (event) {
//             event.stopPropagation();
//             checkLoginStatus((isLoggedIn) => {
//                 if (!isLoggedIn) {
//                     alert("You need to log in to add products to the cart!");
//                     window.location.href = "login";
//                 } else {
//                     let productId = this.getAttribute("data-id");
//                     if (!productId) {
//                         alert("Error: Product ID not found!");
//                         return;
//                     }
//                     addToCart(productId);
//                 }
//             });
//         });
//     });

//     function addToCart(productId) {
//         console.log("Đang gửi request thêm sản phẩm:", productId);
//         fetch("includes/cart_action.php", { // Đảm bảo đường dẫn này đúng
//             method: "POST",
//             credentials: "include",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ action: "add", product_id: parseInt(productId) })
//         })
//         .then(response => {
//             if (!response.ok) return response.text().then(text => { throw new Error(`Server Error ${response.status}: ${text}`) });
//             return response.json();
//         })
//         .then(data => {
//             console.log("Response từ server (addToCart):", data);
//             if (data.success) {
//                 alert("Product has been added to the cart!");
//                 fetchCart();
//                 updateCartCount();
//             } else {
//                 alert("Error: " + (data.message || "Could not add product."));
//             }
//         })
//         .catch(error => console.error("Lỗi khi thêm vào giỏ hàng:", error));
//     }

//     window.removeFromCart = function removeFromCart(productId) { // Gán vào window để HTML có thể gọi
//         fetch("includes/cart_action.php", { // Đảm bảo đường dẫn này đúng
//             method: "POST",
//             credentials: "include",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ action: "remove", product_id: productId })
//         })
//         .then(response => {
//             if (!response.ok) return response.text().then(text => { throw new Error(`Server Error ${response.status}: ${text}`) });
//             return response.json();
//         })
//         .then(data => {
//             if (data.success) {
//                 fetchCart();
//                 updateCartCount();
//             } else {
//                 alert("Error deleting product: " + (data.message || "Unknown error."));
//             }
//         })
//         .catch(error => console.error("Lỗi khi xóa sản phẩm:", error));
//     }

//     window.updateQuantity = function updateQuantity(productId, change) { // Gán vào window
//         let inputField = document.getElementById(`quantity_${productId}`);
//         if (!inputField) return;
//         let newQuantity = parseInt(inputField.value) + change;
//         if (newQuantity < 1) newQuantity = 1;
//         inputField.value = newQuantity;
//         sendUpdateRequest(productId, newQuantity);
//         // updateTotalPrice(); // fetchCart sẽ cập nhật lại nên có thể không cần gọi riêng ở đây
//     }

//     window.updateQuantityDirectly = function updateQuantityDirectly(productId, value) { // Gán vào window
//         let inputField = document.getElementById(`quantity_${productId}`);
//         if (!inputField) return;
//         let newQuantity = parseInt(value);
//         if (isNaN(newQuantity) || newQuantity < 1) {
//             newQuantity = 1; // Hoặc có thể lấy giá trị cũ nếu input không hợp lệ
//         }
//         inputField.value = newQuantity;
//         sendUpdateRequest(productId, newQuantity);
//         // updateTotalPrice();
//     }

//     function sendUpdateRequest(productId, quantity) {
//         fetch("includes/cart_action.php", { // Đảm bảo đường dẫn này đúng
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             credentials: "include",
//             body: JSON.stringify({
//                 action: "update",
//                 product_id: productId,
//                 quantity: quantity
//             })
//         })
//         .then(response => {
//             if (!response.ok) return response.text().then(text => { throw new Error(`Server Error ${response.status}: ${text}`) });
//             return response.json();
//         })
//         .then(data => {
//             if (data.success) {
//                 fetchCart();
//                 updateCartCount();
//                 // updateTotalPrice đã được gọi trong fetchCart (nếu cart.php trả về tổng tiền) hoặc cần gọi riêng
//             } else {
//                 alert("An error occurred while updating the cart!");
//                 // Có thể fetchCart để revert lại giá trị cũ nếu update lỗi
//                 fetchCart();
//             }
//         })
//         .catch(error => {
//             console.error("Lỗi khi cập nhật số lượng:", error);
//             fetchCart(); // Lấy lại trạng thái giỏ hàng cũ nếu có lỗi
//         });
//     }

//     // updateTotalPrice nên được gọi sau khi fetchCart cập nhật DOM xong
//     // Hoặc cart.php có thể trả về tổng tiền và bạn cập nhật từ đó.
//     // Nếu cart.php chỉ trả về HTML của các item, thì updateTotalPrice phải chạy sau khi innerHTML được cập nhật.
//     // function updateTotalPrice() { ... } // Giữ nguyên hoặc tích hợp vào fetchCart

//     function fetchCart() {
//         fetch("includes/cart.php", { // Đảm bảo đường dẫn này đúng
//             method: "GET",
//             credentials: "include"
//         })
//         .then(response => {
//             if (!response.ok) return response.text().then(text => { throw new Error(`Server Error ${response.status}: ${text}`) });
//             return response.text(); // cart.php trả về HTML
//         })
//         .then(data => {
//             console.log("Dữ liệu giỏ hàng nhận được:", data);
//             const cartContent = document.querySelector(".cart-scroll");
//             const cartTotalContainer = document.querySelector(".cart-total"); // Giả sử có container này

//             if (cartContent) {
//                 cartContent.innerHTML = data; // Cập nhật item

//                 // Sau khi cập nhật item, tính lại và cập nhật tổng tiền
//                 let totalPrice = 0;
//                 let itemCount = 0;
//                 cartContent.querySelectorAll(".cart-item").forEach(item => {
//                     const priceElement = item.querySelector(".item-price");
//                     const quantityInput = item.querySelector(".quantity-input");
//                     if (priceElement && quantityInput) {
//                         let price = parseFloat(priceElement.dataset.price); // Lấy giá gốc từ data-attribute
//                         let quantity = parseInt(quantityInput.value);
//                         if (!isNaN(price) && !isNaN(quantity)) {
//                              totalPrice += price * quantity;
//                              itemCount++;
//                         }
//                     }
//                 });

//                 const totalAmountElement = document.querySelector(".cart-total .total-amount");
//                 if (totalAmountElement) {
//                     totalAmountElement.textContent = totalPrice.toLocaleString() + " ₫";
//                 }

//                 // Xử lý hiển thị/ẩn phần tổng tiền và nút thanh toán dựa trên giỏ hàng rỗng
//                 if (itemCount === 0 || data.includes("empty-cart")) {
//                     if(cartTotalContainer) cartTotalContainer.style.display = 'none';
//                     cartContent.innerHTML = `
//                         <div class="emptyCart" style="text-align: center; padding: 20px;">
//                             <div class="close-icon" style="font-size: 40px; color: #ccc;"> <ion-icon name="alert-circle-outline"></ion-icon> </div>
//                             <p class="empty-cart" style="color: #777;">Your cart is empty.</p>
//                         </div>`;
//                 } else {
//                     if(cartTotalContainer) cartTotalContainer.style.display = 'block'; // Hoặc giá trị display phù hợp
//                 }


//             } else {
//                 console.error("Không tìm thấy phần tử .cart-scroll trên trang!");
//             }

//             if (shoppingCart) shoppingCart.classList.add("active"); // Mở giỏ hàng nếu chưa mở
//             if (blurOverlay) blurOverlay.classList.add("active");
//             updateCartCount(); // Cập nhật lại số lượng trên icon
//         })
//         .catch(error => {
//             console.error("Lỗi khi fetch giỏ hàng:", error);
//              const cartContent = document.querySelector(".cart-scroll");
//              if(cartContent) cartContent.innerHTML = `<div style="color:red; text-align:center; padding:20px;">Error loading cart.</div>`;
//         });
//     }

//     function updateCartCount() {
//         fetch("includes/cart_action.php?cart_count=1", { // Đảm bảo đường dẫn này đúng
//             method: "GET",
//             credentials: "include"
//         })
//         .then(response => {
//             if (!response.ok) return response.text().then(text => { throw new Error(`Server Error ${response.status}: ${text}`) });
//             return response.json();
//         })
//         .then(data => {
//             console.log("Số lượng giỏ hàng:", data.count);
//             const count = data.count || 0;
//             document.querySelectorAll(".cart-count").forEach(cartCount => {
//                 cartCount.textContent = count;
//             });

//             if (payButton && payLink) { // Thêm kiểm tra null
//                 if (count > 0) {
//                     payButton.removeAttribute("disabled");
//                     payButton.classList.remove("disabled");
//                     payLink.classList.remove("disabled-link");
//                 } else {
//                     payButton.setAttribute("disabled", "true");
//                     payButton.classList.add("disabled");
//                     payLink.classList.add("disabled-link");
//                 }
//             }
//         })
//         .catch(error => console.error("Lỗi khi lấy số lượng giỏ hàng:", error));
//     }

//     if (payLink && payButton) { // Thêm kiểm tra null
//         payLink.addEventListener("click", function(event) {
//             if (payButton.hasAttribute("disabled")) {
//                 event.preventDefault();
//                 alert("Your cart is empty. Please add products before proceeding to checkout!");
//             }
//         });
//     }

//     checkLoginStatus();
//     updateCartCount(); // Gọi ban đầu

//     // Loại bỏ đoạn test fetch getAllProduct.php ở đây nếu không cần thiết nữa
//     // Hoặc đảm bảo nó xử lý lỗi response.ok
//     /*
//     const testSearchTerm = ''; // Hoặc 'm'
//     const testUrl = `pages/getAllProduct.php?term=${encodeURIComponent(testSearchTerm)}`;
//     console.log('Initial Fetching Test:', testUrl);
//     fetch(testUrl)
//         .then(response => {
//             if (!response.ok) {
//                 return response.text().then(text => { throw new Error(`Test Fetch Server Error ${response.status}: ${text}`); });
//             }
//             return response.json();
//         })
//         .then(data => console.log("Test fetch data:", data))
//         .catch(error => console.error('Test fetch error:', error));
//     */

//     // --- LOGIC TÌM KIẾM SẢN PHẨM ---
//     // Gộp các khai báo hàm bị trùng lặp
//     function removeVietnameseTones(str) {
//         if (typeof str !== 'string') return str;
//         return str.normalize("NFD")
//                   .replace(/[\u0300-\u036f]/g, "")
//                   .replace(/đ/g, "d")
//                   .replace(/Đ/g, "D");
//     }

//     // Hàm showHints nên chỉ có một phiên bản
//     function showHints(inputField) {
//         const rawInput = inputField.value.trim();
//         const searchTermForHint = removeVietnameseTones(rawInput.toLowerCase()); // Đổi tên biến để tránh nhầm lẫn
//         const hintContainer = inputField.closest(".search-container")?.querySelector(".hint-container");

//         if (!hintContainer) return; // Nếu không tìm thấy container, thoát

//         if (!searchTermForHint) {
//             hintContainer.innerHTML = "";
//             hintContainer.style.display = "none";
//             return;
//         }
//         // SỬA ĐƯỜNG DẪN CHO ĐÚNG VỚI VỊ TRÍ CỦA getAllProduct.php
//         // Nếu getAllProduct.php nằm trong thư mục `pages` ở gốc, và script.js cũng ở gốc (hoặc HTML ở gốc)
//         // thì `pages/getAllProduct.php` là đúng.
//         // Nếu script.js nằm trong thư mục con (ví dụ assets/js) và HTML ở gốc, đường dẫn vẫn là `pages/...`
//         // Hãy đảm bảo đường dẫn này phân giải đúng từ URL hiện tại của trang.
//         fetch(`pages/getAllProduct.php?term=${encodeURIComponent(searchTermForHint)}`) // Sửa searchTerm
//             .then(response => {
//                 if (!response.ok) {
//                     return response.text().then(text => {
//                         console.error(`Server Error (showHints) ${response.status}:`, text);
//                         throw new Error(`Server responded with ${response.status}.`);
//                     });
//                 }
//                 return response.json();
//             })
//             .then(products => {
//                 hintContainer.innerHTML = "";
//                 if (!products || products.length === 0) {
//                     const notFoundItem = document.createElement("div");
//                     notFoundItem.className = "hint-item";
//                     notFoundItem.textContent = "Không tìm thấy sản phẩm";
//                     notFoundItem.style.textAlign = "center";
//                     notFoundItem.style.padding = "8px";
//                     notFoundItem.style.color = "#999";
//                     hintContainer.appendChild(notFoundItem);
//                 } else {
//                     products.forEach(item => {
//                         const hintItem = document.createElement("div");
//                         hintItem.className = "hint-item";
//                         hintItem.dataset.productId = item.product_id;
//                         hintItem.innerHTML = `
//                             <img src="${item.image || 'path/to/default/image.png'}" alt="${item.product_name || 'N/A'}"
//                                  style="width:30px; height:30px; margin-right:10px; vertical-align:middle;">
//                             ${item.product_name || 'Unknown Product'}
//                         `;
//                         hintItem.addEventListener("mousedown", (e) => {
//                             e.preventDefault();
//                             isSelectingHint = true;
//                         });
//                         hintItem.addEventListener("click", () => {
//                             window.location.href = `home?pages=product&id=${item.product_id}`; // Đảm bảo URL này đúng
//                         });
//                         hintContainer.appendChild(hintItem);
//                     });
//                 }
//                 hintContainer.style.display = "block";
//             })
//             .catch(error => {
//                 console.error("Lỗi khi lấy gợi ý:", error);
//                 hintContainer.innerHTML = `<div class="hint-item" style="color:red;text-align:center;padding:8px;">Lỗi tải gợi ý.</div>`;
//                 hintContainer.style.display = "block";
//             });
//     }

//     const searchInputs = document.querySelectorAll(".search-input");
//     const searchButtons = document.querySelectorAll(".searchBtn");
//     let inputTimeout = null;
//     let isSelectingHint = false;
//     let lastInputValue = "";

//     searchInputs.forEach(input => {
//         input.addEventListener("compositionend", function () {
//             lastInputValue = this.value.trim(); // Cập nhật sau khi gõ IME
//         });

//         input.addEventListener('input', function () {
//             const value = this.value.trim(); // Lấy giá trị hiện tại, không phải lastInputValue
//             lastInputValue = value; // Cập nhật lastInputValue cho sự kiện Enter/Search button

//             if (inputTimeout) clearTimeout(inputTimeout);

//             const hintContainer = this.closest(".search-container")?.querySelector(".hint-container");
//             if (!hintContainer) return;

//             if (value === '') {
//                 hintContainer.innerHTML = '';
//                 hintContainer.style.display = 'none';
//                 // Cân nhắc lại việc reload khi input rỗng
//                 // const url = new URL(window.location.href);
//                 // if (url.searchParams.has('term')) {
//                 //     url.searchParams.delete('term');
//                 //     url.searchParams.set('page', '1'); // Hoặc giữ nguyên page hiện tại
//                 //     window.history.pushState({}, '', url.toString()); // Cập nhật URL không reload
//                 //     // Gọi hàm để render lại sản phẩm nếu cần (nếu trang render sản phẩm bằng JS)
//                 // }
//                 return;
//             }
//             inputTimeout = setTimeout(() => {
//                 showHints(this); // Truyền input element hiện tại
//             }, 300); // Giảm debounce một chút
//         });

//         input.addEventListener("keypress", function (event) {
//             if (event.key === "Enter") {
//                 event.preventDefault();
//                 const raw = lastInputValue.trim(); // Sử dụng lastInputValue đã cập nhật từ 'input' hoặc 'compositionend'
//                 if (raw) {
//                     const term = encodeURIComponent(raw);
//                     // Đảm bảo URL tìm kiếm là đúng, ví dụ trang 'search-results' hoặc 'products'
//                     window.location.href = `home?pages=shop&term=${term}&page=1`;
//                 }
//             }
//         });

//         input.addEventListener("blur", function () {
//             setTimeout(() => {
//                 if (!isSelectingHint) {
//                     const hintContainer = this.closest(".search-container")?.querySelector(".hint-container");
//                     if (hintContainer) hintContainer.style.display = "none";
//                 }
//                 isSelectingHint = false; // Reset sau khi kiểm tra
//             }, 150); // Giảm timeout một chút
//         });
//     });

//     document.addEventListener("mousedown", e => { // Chỉ cần một event listener này
//         if (e.target.closest(".hint-item")) {
//             isSelectingHint = true;
//         }
//     });

//     document.addEventListener("click", function (event) {
//         if (!event.target.closest(".search-container")) { // Kiểm tra nếu click không nằm trong search-container
//             document.querySelectorAll(".hint-container").forEach(hint => {
//                 hint.style.display = "none"; // Chỉ ẩn, không xóa innerHTML để giữ lại khi focus lại
//             });
//         }
//     });

//     searchButtons.forEach(button => {
//         button.addEventListener("click", function () {
//             const searchContainer = this.closest(".search-container") || this.closest(".input-wrapper");
//             const searchInput = searchContainer?.querySelector(".search-input");
//             if (searchInput) {
//                 const raw = searchInput.value.trim();
//                 if (raw) {
//                     const term = encodeURIComponent(raw);
//                     window.location.href = `home?pages=shop&term=${term}&page=1`; // Đảm bảo URL này đúng
//                 }
//             }
//         });
//     });

//     // Xử lý category filter
//     document.querySelectorAll(".nav-item").forEach(item => {
//         item.addEventListener("click", (e) => { // Sử dụng e cho event object
//             e.preventDefault(); // Ngăn hành động mặc định nếu là link <a>
//             const categoryValue = item.dataset.category || item.textContent.trim().toLowerCase(); // Ưu tiên data-category
//             const urlParams = new URLSearchParams(window.location.search);
//             if (categoryValue === "all" || categoryValue === "") {
//                 urlParams.delete('category');
//             } else {
//                 urlParams.set('category', categoryValue);
//             }
//             urlParams.set('page', '1');
//             // Giữ lại 'term' nếu có
//             // window.location.search = urlParams.toString(); // Reload với param mới
//             // Hoặc nếu bạn muốn chuyển đến trang shop:
//             window.location.href = `home?${urlParams.toString()}`;
//         });
//     });

//     // Cập nhật class active cho navigation (có thể không cần nếu server render)
//     const currentCategory = new URLSearchParams(window.location.search).get('category');
//     document.querySelectorAll(".nav-item").forEach(label => {
//         label.classList.remove("active");
//         const categoryValue = label.dataset.category || label.textContent.trim().toLowerCase();
//         if ((!currentCategory && (categoryValue === "all" || categoryValue === "")) || categoryValue === currentCategory) {
//             label.classList.add("active");
//         }
//     });


// }); // Kết thúc DOMContentLoaded

// // ... (handleScroll, toggleBackToTopButton, scrollToTop, Slick carousel - giữ nguyên) ...
// /*scroll*/
// let lastScrollTop = 0;
// const header = document.querySelector('.header');

// if (header) { // Thêm kiểm tra null cho header
//     const mediaQuery = window.matchMedia('(max-width: 1390px)');

//     function handleScroll() {
//         if (mediaQuery.matches) {
//             let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//             if (scrollTop > lastScrollTop) {
//                 header.classList.add('hide');
//             } else {
//                 header.classList.remove('hide');
//             }
//             lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
//         } else {
//             header.classList.remove('hide');
//         }
//     }
//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', handleScroll);
//     handleScroll(); // Initial call
// }


// window.onscroll = function () { // Có thể gộp vào event listener ở trên nếu muốn
//     toggleBackToTopButton();
// };

// function toggleBackToTopButton() {
//     const backToTopButton = document.getElementById("backToTop");
//     if (backToTopButton) { // Thêm kiểm tra null
//         if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//             backToTopButton.style.display = "block";
//         } else {
//             backToTopButton.style.display = "none";
//         }
//     }
// }

// function scrollToTop() {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// }

// // Slick Carousel (đảm bảo jQuery và Slick đã được nạp trước script này)
// if (typeof $ !== 'undefined' && $.fn.slick) { // Kiểm tra jQuery và Slick tồn tại
//     $(document).ready(function(){
//         const carousel = $('.carousel_wrapper');
//         if (carousel.length) { // Kiểm tra carousel tồn tại
//             carousel.slick({
//                 dots: true,
//                 infinite: true,
//                 speed: 500,
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 adaptiveHeight: true,
//                 prevArrow: $('.custom-prev').length ? $('.custom-prev') : null, // Kiểm tra arrow tồn tại
//                 nextArrow: $('.custom-next').length ? $('.custom-next') : null,
//                 dotsClass: 'carousel-dots',
//                 responsive: [
//                     {
//                         breakpoint: 1197,
//                         settings: { /* ... */ }
//                     },
//                     {
//                         breakpoint: 768,
//                         settings: { /* ... */ arrows: false }
//                     },
//                     {
//                         breakpoint: 480,
//                         settings: { /* ... */ arrows: false }
//                     }
//                 ]
//             });
//         }
//     });
// } else {
//     console.warn("jQuery or Slick Carousel not loaded. Carousel will not function.");
// }