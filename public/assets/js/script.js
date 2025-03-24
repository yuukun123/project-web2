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
    window.location.href = '/project-web2/home'; 
});

function myFunction() {
    const input = document.getElementById('search');
    // Add your search functionality here
}

document.addEventListener("DOMContentLoaded", function () {
    const blurOverlay = document.querySelector(".blur-overlay");
    const btnCart = document.querySelectorAll(".add-to-cart"); // Nút thêm sản phẩm
    const shoppingCart = document.querySelector(".shopping-cart"); // Cửa sổ giỏ hàng
    const cartBtn = document.getElementById("cart-btn"); // Nút mở giỏ hàng
    const closeBtns = document.querySelectorAll(".close");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const cartCount = document.querySelector(".cart-count");

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
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            checkLoginStatus((isLoggedIn) => {
                if (isLoggedIn) {
                    fetchCart(); // Load giỏ hàng từ database
                    shoppingCart.classList.add("active");
                    if (blurOverlay) blurOverlay.classList.add("active");
                } else {
                    alert("Bạn cần đăng nhập để xem giỏ hàng!");
                    window.location.href = "login";
                }
            });
        });
    }

    // Khi nhấn nút đóng giỏ hàng
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("close")) {
            shoppingCart.classList.remove("active");
            if (blurOverlay) blurOverlay.classList.remove("active");
            console.log("Đóng giỏ hàng");
        }
    });
    

    // Thêm sản phẩm vào giỏ hàng (trên trang sản phẩm)
    btnCart.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            checkLoginStatus((isLoggedIn) => {
                if (!isLoggedIn) {
                    alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
                    window.location.href = "login";
                } else {
                    let productId = this.getAttribute("data-id");
                    if (!productId) {
                        alert("Lỗi: Không tìm thấy ID sản phẩm!");
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
                alert("Đã thêm sản phẩm vào giỏ hàng!");
                fetchCart();
                updateCartCount();
            } else {
                alert("Lỗi: " + data.message);
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
                alert("Lỗi khi xóa sản phẩm: " + data.message);
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
                alert("Có lỗi xảy ra khi cập nhật giỏ hàng!");
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
                            <p class="empty-cart">Giỏ hàng của bạn đang trống.</p>
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
            if (cartCount) {
                cartCount.textContent = data.count || 0;
            }
        })
        .catch(error => console.error("Lỗi khi lấy số lượng giỏ hàng:", error));
    }

    window.addEventListener("pageshow", function (event) {
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            location.reload();
        }
    });
    

    // Khi trang tải xong, kiểm tra trạng thái đăng nhập và cập nhật số lượng giỏ hàng
    checkLoginStatus();
    updateCartCount();
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;
    window.updateQuantityDirectly = updateQuantityDirectly;
    

    // search product
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

        fetch(`pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`)
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