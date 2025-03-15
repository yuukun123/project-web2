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

document.addEventListener("DOMContentLoaded", function () {
    const blurOverlay = document.querySelector(".blur-overlay"); 
    const btnCart = document.querySelectorAll(".add-to-cart"); // Nút thêm sản phẩm vào giỏ hàng
    const shoppingCart = document.querySelector(".shopping-cart"); // Cửa sổ giỏ hàng
    const cartBtn = document.getElementById("cart-btn"); // Nút mở giỏ hàng
    const closeBtns = document.querySelectorAll(".shopping-cart .close");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const cartCount = document.querySelector(".cart-count");


    // 🏷 Kiểm tra trạng thái đăng nhập từ session
    function checkLoginStatus(callback) {
        fetch("http://localhost/project-web2/includes/session.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log("Session Data:", data);
            console.log("Đã đăng nhập:", data.loggedIn);
            console.log("ID người dùng:", data.user_id);

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

    // 🔄 Cập nhật giao diện Login / Logout
    function updateUI() {
        const isLoggedIn = document.body.classList.contains("logged-in");
        if (loginBtn) loginBtn.style.display = isLoggedIn ? "none" : "inline-block";
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
    }

    // 🛒 Mở giỏ hàng (Chỉ kiểm tra đăng nhập khi bấm vào biểu tượng giỏ hàng)
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            checkLoginStatus((isLoggedIn) => {
                if (isLoggedIn) {
                    fetchCart(); // ✅ Cập nhật danh sách giỏ hàng
                    shoppingCart.classList.add("active");
                    if (blurOverlay) blurOverlay.classList.add("active");
                } else {
                    alert("Bạn cần đăng nhập để xem giỏ hàng!");
                    window.location.href = "login";
                }
            });
        });
    }
    

    // ❌ Đóng giỏ hàng
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            shoppingCart.classList.remove("active");
            if (blurOverlay) blurOverlay.classList.remove("active");
        });
    });

    // 🛒 Thêm sản phẩm vào giỏ hàng (Chỉ kiểm tra đăng nhập khi bấm vào nút sản phẩm)
    btnCart.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // 🛑 Ngăn không cho sự kiện lan lên trên

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

    // xem giỏ hàng 
    function updateCartCount() {
        fetch("http://localhost/project-web2/includes/cart_action.php?cart_count=1", {
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

    // ✅ 🛒 Thêm sản phẩm vào giỏ hàng
    function addToCart(productId) {
        console.log("Đang gửi request thêm sản phẩm:", productId);
        fetch("http://localhost/project-web2/includes/cart_action.php", {
            method: "POST",
            credentials: "include", // đảm bảo gửi cookie session
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "add", product_id: parseInt(productId) })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response từ server:", data);
            if (data.success) {
                alert("Đã thêm sản phẩm vào giỏ hàng!");
                // Option 1: Reload lại trang để cập nhật giỏ hàng
                location.reload();
                
                // Option 2: Gọi các hàm cập nhật giỏ hàng động nếu bạn đã xử lý chúng
                // fetchCart();
                // updateCartCount();
            } else {
                alert("Lỗi: " + data.message);
            }
        })
        .catch(error => console.error("Lỗi khi thêm vào giỏ hàng:", error));
    }
    
    
    function removeFromCart(productId) {
        fetch("http://localhost/project-web2/includes/cart_action.php", {
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

    function updateQuantity(productId, change) {
        fetch("http://localhost/project-web2/includes/cart_action.php", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "update", product_id: productId, quantity_change: change })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCart();
                updateCartCount();
            } else {
                alert("Lỗi khi cập nhật số lượng: " + data.message);
            }
        })
        .catch(error => console.error("Lỗi cập nhật số lượng:", error));
    }
    

    // 🛒 Lấy danh sách giỏ hàng
    function fetchCart() {
        fetch("http://localhost/project-web2/includes/cart.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.text())
        .then(data => {
            console.log("Dữ liệu giỏ hàng nhận được:", data);
            if (shoppingCart) {
                // shoppingCart.innerHTML = data;
                // shoppingCart.classList.add("active");
                // if (blurOverlay) blurOverlay.classList.add("active");
            } else {
                console.error("Không tìm thấy phần tử .shopping-cart trên trang!");
            }
        })
        .catch(error => console.error("Lỗi khi fetch giỏ hàng:", error));
    }
    


    // 🚀 Khởi chạy khi trang tải xong
    checkLoginStatus();
    fetchCart();
    updateCartCount();

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