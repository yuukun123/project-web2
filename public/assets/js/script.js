function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Toggle active class for both hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}

function myFunction() {
    const input = document.getElementById('search');
    // Add your search functionality here
}

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {

    e.preventDefault();
    window.location.href = 'index.php'; 
});

// get the data from the local storage
const blurOverlay = document.querySelector('.blur-overlay'); // Make sure this exists in your HTML
const btnCart = document.querySelectorAll('.sp-cart');
const shoppingCart = document.querySelector('.shopping-cart'); // Only one shopping-cart
const close = document.querySelectorAll('.shopping-cart .close');

btnCart.forEach(btn => {
    btn.addEventListener('click', () => {
        if (shoppingCart) {
            shoppingCart.classList.add('active'); // Change display to make the cart visible
            blurOverlay.classList.add('active'); // Optional: Only if blur overlay exists
        }
    });
});

close.forEach(btn => {
    btn.addEventListener('click', () => {
        if (shoppingCart) {
            shoppingCart.classList.remove('active'); // Change display to make the cart visible
            blurOverlay.classList.remove('active'); // Optional: Only if blur overlay exists
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // =============================
    // 1. Lấy các phần tử DOM
    // =============================
    const loginBtns   = document.querySelectorAll('.btnLogin-popup');   // Các nút "Login"
    const logoutBtns  = document.querySelectorAll('.btnLogout-popup');  // Các nút "Register / Logout"
    const loginBtn    = document.getElementById('login-btn');           // Nút login chính (nếu có)
    const notificate  = document.getElementById("notificate");          // Khung thông báo
    const message     = document.getElementById("message");             // Nội dung thông báo

    // =============================
    // 2. Hàm kiểm tra / lấy user
    // =============================
    function getCurrentUser() {
        const currentUser = localStorage.getItem('UserStr');
        return currentUser ? JSON.parse(currentUser) : null;
    }

    function isLoggedIn() {
        return !!getCurrentUser(); // true nếu user tồn tại, false nếu không
    }

    // =============================
    // 3. Hàm cập nhật nút Login
    // =============================
    function updateLoginButtons() {
        const currentUser = getCurrentUser();
        console.log('Current user from localStorage:', currentUser);

        // Nếu user đã login => đổi text nút thành tên user
        // Ngược lại => để text "Login"
        loginBtns.forEach(button => {
            if (currentUser) {
            button.textContent = currentUser.username;
            button.classList.add('logged-in');
            } else {
            button.textContent = 'Login';
            button.classList.remove('logged-in');
            }
        });
    }

    // =============================
    // 4. Hàm cập nhật nút Register/Logout
    // =============================
    function updateLogoutButtons() {
        const currentUser = getCurrentUser();
        logoutBtns.forEach(btn => {
            if (currentUser) {
            // Nếu đã login => nút này thành "Logout"
            btn.textContent = 'Logout';
            } else {
            // Chưa login => nút này thành "Register"
            btn.textContent = 'Register';
            }
        });
    }

    // =============================
    // 5. Hàm cập nhật tất cả nút
    // =============================
    function updateAllButtons() {
        updateLoginButtons();
        updateLogoutButtons();
    }

    // =============================
    // 6. Xử lý khi user trở lại trang 
    //    (localStorage.getItem("loggedIn") === "true")
    // =============================
    if (localStorage.getItem("loggedIn") === "true") {
    const currentUser = getCurrentUser();
    if (currentUser && notificate && message) {
        message.innerHTML = `Welcome back, ${currentUser.username}!<br>Have a good day!`;
        notificate.classList.add("show");

        // 2 giây sau ẩn
        setTimeout(() => {
        notificate.classList.remove("show");
        notificate.classList.add("hide");
        // 1 giây sau (transition) => display none
        setTimeout(() => {
            notificate.style.display = "none";
        }, 1000);
        }, 2000);
    }

    // Xoá cờ
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    }

    // =============================
    // 7. Lần đầu gọi hàm cập nhật
    // =============================
    updateAllButtons();

    // =============================
    // 8. Lắng nghe sự kiện storage (đa tab)
    // =============================
    window.addEventListener('storage', function(e) {
        if (e.key === 'UserStr') {
            console.log('Storage event triggered:', e);
            updateAllButtons();
        }
    });

    // =============================
    // 9. Nút loginBtn (nếu có) => chặn sang login nếu đã login
    // =============================
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault(); // chặn hành vi mặc định (nếu <a href> hoặc <button> có onclick)
            if (isLoggedIn()) {
            alert("You are already logged in!");
            } else {
            window.location.href = '?pages=login';
            }
        });
    }

    // =============================
    // 10. Xử lý logout
    // =============================
    logoutBtns.forEach(button => {
        button.addEventListener('click', function() {
            const currentUser = getCurrentUser();
            if (currentUser) {
            // User đang login => thực hiện logout
            console.log("Logout button clicked");
            localStorage.removeItem('UserStr');
            updateLoginButtons(); 
            alert('Logout successful!');
            window.location.href = '?page=home';
            } else {
            // Chưa login => thực hiện logic register
            console.log("Register button clicked");
            window.location.href = '?pages=register';
            }
        });
    });


    // =============================
    // 11. Sự kiện tuỳ chỉnh (nếu có)
    // =============================
    window.addEventListener('userLoggedIn', function() {
        updateAllButtons();
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