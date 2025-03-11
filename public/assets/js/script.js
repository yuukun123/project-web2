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
    const loginBtn  = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Kiểm tra đăng nhập qua PHP session
    function checkLoginStatus() {
        fetch("http://localhost/project-web2/includes/session.php", {
            method: "GET",
            credentials: "include" // QUAN TRỌNG: Để gửi cookie PHPSESSID
        })
        .then(response => response.json())
        .then(data => {
            console.log("Session Data:", data); // Debug session
            if (data.loggedIn) {
                document.body.classList.add("logged-in");
            } else {
                document.body.classList.remove("logged-in");
            }
            updateUI();
        })
        .catch(error => console.error("Lỗi kiểm tra session:", error));
    }

    // Cập nhật giao diện đăng nhập
    function updateUI() {

        if (document.body.classList.contains('logged-in')) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    // Kiểm tra và chặn hành động nếu chưa đăng nhập
    function protectCartActions() {
        document.querySelectorAll(".sp-cart").forEach(button => {
            button.addEventListener("click", function () {
                fetch("http://localhost/project-web2/includes/session.php")
                    .then(response => response.json())
                    .then(data => {
                        if (!data.loggedIn) {
                            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
                            window.location.href = "login";
                        } else {
                            let productId = this.dataset.id;
                            addToCart(productId);
                        }
                    })
                    .catch(error => console.error("Lỗi kiểm tra đăng nhập:", error));
            });
        });
    }

    // Hàm thêm vào giỏ hàng
    function addToCart(productId) {
        fetch("http://localhost/project-web2/includes/cart.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Sản phẩm đã được thêm vào giỏ hàng!");
            } else {
                alert("Lỗi khi thêm sản phẩm vào giỏ hàng.");
            }
        })
        .catch(error => console.error("Lỗi khi thêm vào giỏ hàng:", error));
    }
    
    // Chạy kiểm tra đăng nhập và bảo vệ giỏ hàng
    checkLoginStatus();
    protectCartActions();

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