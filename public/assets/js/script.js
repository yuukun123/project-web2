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

    // Function to get current user from localStorage
    const loginBtns = document.querySelectorAll('.btnLogin-popup');
    const logoutBtns = document.querySelectorAll('.btnLogout-popup');

    // Function to get current user from localStorage
    function getCurrentUser() {
        const currentUser = localStorage.getItem('UserStr');
        return currentUser ? JSON.parse(currentUser) : null;

    }
    
    if (localStorage.getItem("loggedIn") === "true") {
        const currentUser = getCurrentUser(); // Default to "User" if no username found
        const notificate = document.getElementById("notificate");
        const message = document.getElementById("message");
    
        // Display personalized messages
        message.innerHTML = `Welcome back, ${currentUser.username}!<br>Have a good day!`;
        notificate.classList.add("show");

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notificate.classList.remove("show");
        notificate.classList.add("hide"); // Add 'hide' to slide out

        // Optional: Remove the element from the DOM after animation
        setTimeout(() => {
            notificate.style.display = "none";
        }, 1000); // Match the CSS transition duration
    }, 2000);
    
        // Clear the login flag and username
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
    }


    // Function to update all login buttons if admin is logged in
    function updateLoginButtons() {
        const currentUser = getCurrentUser(); // Get the current user from localStorage
        console.log('Current user from localStorage:', currentUser); // Debug log
    
        if (currentUser) { 
            loginBtns.forEach(button => {
                button.textContent = currentUser.username; // Set the button text to the user's name
                button.classList.add('logged-in'); // Add a class to indicate user is logged in
            });
        } else {
            loginBtns.forEach(button => {
                button.textContent = 'Login'; // Reset button text to "Login"
                button.classList.remove('logged-in'); // Remove the logged-in class
            });
        }
    }
    updateLoginButtons();

    // Setup storage event listener for cross-tab updates
    window.addEventListener('storage', function(e) {
        if (e.key === 'UserStr') {
            console.log('Storage event triggered:', e); // Debug log
            updateLoginButtons();
        }
    });

    // Handle the logout functionality for both logout buttons (mobile and desktop)
    logoutBtns.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Logout button clicked");
            localStorage.removeItem('UserStr');
            updateLoginButtons(); // Update buttons immediately after logout
            alert('Logout successful!');
            window.location.href = '?page=home';
        });
    });

    window.addEventListener('userLoggedIn', function(e) {
        updateLoginButtons();
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