
// Select hamburger and mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle active state on click
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
    window.location.href = './user-index.html'; 
});

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {

    const paymentMethodRadios = document.querySelectorAll('input[name="payment_method"]');
    const cardInput = document.getElementById('card-input');

    // Add an event listener to all radio buttons
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'credit-card' && radio.checked) {
                cardInput.classList.add('active'); // Show card input
            } else {
                cardInput.classList.remove('active'); // Hide card input
            }
        });
    });

    const menuItems = {
        Mousse: [
            { links: '../Client/user-product/index-login-1.html', id: '1', name: 'Avocado Mousse', price: '510,000 VND', image: '../Img/Mousse/Avocado_Mousse.jpg' },
            { links: '../Client/user-product/index-login-2.html', id: '2', name: 'Blueberry Mousse', price: '510,000 VND', image: '../Img/Mousse/Blueberry_Mousse.jpg' },
            { links: '../Client/user-product/index-login-3.html', id: '3', name: 'Corn Mousse', price: '520,000 VND', image: '../Img/Mousse/Corn_Mousse.jpg' },
            { links: '../Client/user-product/index-login-4.html', id: '4', name: 'Longan Mousse', price: '530,000 VND', image: '../Img/Mousse/Longan_Mousse.jpg' },
            { links: '../Client/user-product/index-login-5.html', id: '5', name: 'Mango Mousse', price: '540,000 VND', image: '../Img/Mousse/Mango_Mousse.jpg' },
            { links: '../Client/user-product/index-login-6.html', id: '6', name: 'Melon Mousse', price: '550,000 VND', image: '../Img/Mousse/Melon_Mousse.jpg'},
        ],
        Croissant: [
            { links: '../Client/user-product/index-login-7.html', id: '7', name: 'Avocado Croissant', price: '110,000 VND', image: '../Img/Croissant/Avocado_Croissant.jpg' },
            { links: '../Client/user-product/index-login-8.html', id: '8', name: 'Choco Mallow Croissant', price: '110,000 VND', image: '../Img/Croissant/Choco_Mallow_Croissant.png' },
            { links: '../Client/user-product/index-login-9.html', id: '9', name: 'Dinosaur Almond Croissant', price: '120,000 VND', image: '../Img/Croissant/Dinosaur_Almond_Croissant.png' },
            { links: '../Client/user-product/index-login-10.html', id: '10', name: 'Honey Almond Croissant', price: '130,000 VND', image: '../Img/Croissant/Honey_Almond_Croissant.png' },
            { links: '../Client/user-product/index-login-11.html', id: '11', name: 'Matcha Croissant', price: '140,000 VND', image: '../Img/Croissant/Matcha_Croissant.jpg' },
            { links: '../Client/user-product/index-login-12.html', id: '12', name: 'Plain Croissant', price: '150,000 VND', image: '../Img/Croissant/Plain_Croissant.png' },
        ],
        Drink: [
            { links: '../Client/user-product/index-login-13.html', id: '13', name: 'Choco Mallow', price: '55,000 VND', image: '../Img/Drink/Choco_Mallow.png' },
            { links: '../Client/user-product/index-login-14.html', id: '14', name: 'Lemon Tea', price: '60,000 VND', image: '../Img/Drink/Lemon_Tea.png' },
            { links: '../Client/user-product/index-login-15.html', id: '15', name: 'Lychee Tea', price: '70,000 VND', image: '../Img/Drink/Lychee_Tea.png' },
            { links: '../Client/user-product/index-login-16.html', id: '16', name: 'Matcha Latte', price: '75,000 VND', image: '../Img/Drink/Matcha_Latte.png' },
            { links: '../Client/user-product/index-login-17.html', id: '17', name: 'Matcha Mallow', price: '80,000 VND', image: '../Img/Drink/Matcha_Mallow.png' },
            { links: '../Client/user-product/index-login-18.html', id: '18', name: 'Matcha Misu', price: '85,000 VND', image: '../Img/Drink/Matcha_Misu.png' }
        ]
    };
    
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
    
    

    const loginBtns = document.querySelectorAll('.btnLogin-popup');
    const logoutBtns = document.querySelectorAll('.btnLogout-popup');

       // Function to get current user from localStorage
    function getCurrentUser() {
        const currentUser = localStorage.getItem('UserStr');
        return currentUser ? JSON.parse(currentUser) : null;
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
    

    // // Create wrapper functions for localStorage
    // window.userStorage = {
    //     setCurrentUser: function(userData) {
    //         localStorage.setItem('currentUser', JSON.stringify(userData));
    //         updateLoginButtons();
    //     },
    //     getCurrentUser: function() {
    //         return getCurrentUser();
    //     },
    //     removeCurrentUser: function() {
    //         localStorage.removeItem('currentUser');
    //         updateLoginButtons();
    //     }
    // };
    
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
            window.location.href = '../index.html';
        });
    });

    window.addEventListener('userLoggedIn', function(e) {
        updateLoginButtons();
    });


    const btn = document.querySelector('.pay-button');

    // Function to show confirmation
    function showConfirmation() {
        document.querySelector('.my-order').style.display = 'none';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('confirmation').style.display = 'block';
    }

    // Function to auto-fill the form from local storage for a logged-in user
    function autoFillForm() {
        const currentUser = getCurrentUser();

        // document.getElementById("full_name").value = currentUser.username;
        // document.getElementById("phone").value = localStorage.getItem("user_phone") || "";
        // document.getElementById("address").value = localStorage.getItem("user_address") || "";
        // document.getElementById("delivery_date").value = localStorage.getItem("user_delivery_date") || "";
        // document.getElementById("note").value = localStorage.getItem("user_note") || "";
    
        

        console.log("Auto-fill function called");
        console.log("Full Name from Local Storage:", currentUser.username);
        // document.getElementById("full_name").value = currentUser.username || "";
        document.getElementById("phone").value = currentUser.phone;
        document.getElementById("address").value = currentUser.address;
    
    }

    // Function to clear the form
    function clearForm() {
        document.getElementById("full_name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("address").value = "";
        document.getElementById("delivery_date").value = "";
        document.getElementById("note").value = "";
    }

    // Event listener for the pay button
    btn.addEventListener('click', function() {
        const name = document.querySelector("#full_name");
        const phone = document.querySelector("#phone");
        const address = document.querySelector("#address");
        const date = document.querySelector("#delivery_date");

        const fields = [
            { field: name, message: "Please enter YOUR NAME." },
            { field: phone, message: "Please enter YOUR PHONE NUMBER." },
            { field: address, message: "Please enter YOUR ADDRESS." },
            { field: date, message: "Please select a DATE." }
        ];
        
        const emptyFields = fields.filter(({ field }) => field.value === "");
        
        if (emptyFields.length === fields.length) {
            alert("All fields are required. Please fill in all the fields.");
        } else if (emptyFields.length > 0) {
            alert(emptyFields[0].message); // Thông báo lỗi đầu tiên
        } else {
            showConfirmation();
        }
    });

    // Event listeners for radio buttons
    document.getElementById("autoFill").addEventListener("change", function() {
        if (this.checked) {
            autoFillForm();
        }
    });

    document.getElementById("clearFill").addEventListener("change", function() {
        if (this.checked) {
            clearForm();
        }
    });

    // Initial auto-fill if 'Auto fill' is selected by default
    window.onload = function() {
        if (document.getElementById("autoFill").checked) {
            autoFillForm();
        }
    };


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





