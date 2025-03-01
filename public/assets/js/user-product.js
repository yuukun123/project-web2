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
    window.location.href = '../user-index.html'; 
});

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    const loginBtns = document.querySelectorAll('.btnLogin-popup');
    const logoutBtns = document.querySelectorAll('.btnLogout-popup');

    // Get stored users from localStorage
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
            window.location.href = '../../index.html';
        });
    });

    window.addEventListener('userLoggedIn', function(e) {
        updateLoginButtons();
    });

    //Render
    const filterInputs = document.querySelectorAll('.filter-input');
    const tabContents = document.querySelectorAll('.tab_content');
    const navLinks = document.querySelectorAll('.nav-links label');

    // Function to filter items with animation
    function filterItems(category) {
        // Remove active class from all tabs
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to selected tab
        const activeLink = document.querySelector(`label[for="filter-${category.toLowerCase()}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Hide all sections first
        tabContents.forEach(content => {
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.display = 'none';
            }, 300); // Match this with CSS animation duration
        }); 

        // Show selected section with animation
        const selectedContent = document.getElementById(category);
        if (selectedContent) {
            setTimeout(() => {
                selectedContent.style.display = 'grid';
                requestAnimationFrame(() => {
                    selectedContent.style.opacity = '1';
                });
            }, 300);
        }
    }

    // Add click event listeners to all filter inputs
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            const category = this.id.replace('filter-', '');
            filterItems(category === 'all' ? 'All' : category === 'mousse' ? 'Mouse' : category.charAt(0).toUpperCase() + category.slice(1));
        });
    });

    // Function to create a new item card
    function createItemCard(item) {
        const card = document.createElement('div');
        card.className = 'movie-item';
        card.innerHTML = `
            <a href="#">
                <img class="poster-img" height="300" width="300" src="${item.image}" alt="${item.name}">
            </a>
            <p class="title">${item.name}</p>
            <button class="butn title">
                <p class="text-color">Price: ${item.price}</p>
            </button>
        `;
        return card;
    }

    // Function to add items to a category
    function addItemsToCategory(categoryId, items) {
        const container = document.getElementById(categoryId);
        if (container) {
            items.forEach(item => {
                container.appendChild(createItemCard(item));
            });
        }
    }

    // Sample data structure for items
    const menuItems = {
        Mousse: [
            { id: '1', name: 'Avocado Mousse', price: '510,000 VND', image: '../Img/Mousse/Avocado_Mousse.jpg' },
            { id: '2', name: 'Blueberry Mousse', price: '510,000 VND', image: '../Img/Mousse/Blueberry_Mousse.jpg' },
            { id: '3', name: 'Corn Mousse', price: '520,000 VND', image: '../Img/Mousse/Corn_Mousse.jpg' },
            { id: '4', name: 'Longan Mousse', price: '530,000 VND', image: '../Img/Mousse/Longan_Mousse.jpg' },
            { id: '5', name: 'Mango Mousse', price: '540,000 VND', image: '../Img/Mousse/Mango_Mousse.jpg' },
            { id: '6', name: 'Melon Mousse', price: '550,000 VND', image: '../Img/Mousse/Melon_Mousse.jpg'},
        ],
        Croissant: [
            { id: '7', name: 'Avocado Croissant', price: '110,000 VND', image: '../Img/Croissant/Avocado_Croissant.jpg' },
            { id: '8', name: 'Choco Mallow Croissant', price: '110,000 VND', image: '../Img/Croissant/Choco Mallow Croissant.jpg' },
            { id: '9', name: 'Dinosaur Almond Croissant', price: '120,000 VND', image: '../Img/Croissant/Dinosaur Almond Croissant.jpg' },
            { id: '10', name: 'Honey Almond Croissant', price: '130,000 VND', image: '../Img/Croissant/AHoney Almond Croissant.jpg' },
            { id: '11', name: 'Matcha Croissant', price: '140,000 VND', image: '../Img/Croissant/Matcha Croissant.jpg' },
            { id: '12', name: 'Plain Croissant', price: '150,000 VND', image: '../Img/Croissant/Plain Croissant.jpg' },
        ],
        Drink: [
            { id: '13', name: 'Choco Mallow', price: '55,000 VND', image: '../Img/Drink/Choco_Mallow.png' },
            { id: '14', name: 'Lemon Tea', price: '60,000 VND', image: '../Img/Drink/Lemon_Tea.png' },
            { id: '15', name: 'Lychee Tea', price: '70,000 VND', image: '../Img/Drink/Lychee_Tea.png' },
            { id: '16', name: 'Matcha Latte', price: '75,000 VND', image: '../Img/Drink/Matcha_Latte.png' },
            { id: '17', name: 'Matcha Mallow', price: '80,000 VND', image: '../Img/Drink/Matcha_Mallow.png' },
            { id: '18', name: 'Matcha Misu', price: '85,000 VND', image: '../Img/Drink/Matcha_Misu.png' },
        ]
    };

    // Initialize items in each category and All section
    Object.entries(menuItems).forEach(([category, items]) => {
        // Add to category-specific section
        addItemsToCategory(category === 'Mousse' ? 'Mouse' : category, items);
        
        // Add to All section
        addItemsToCategory('All', items);
    });

    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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

/*search*/
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('search');
    const label = document.querySelector('label[for="search"]');

    // Function to check if input is focused or has value
    function toggleLabel() {
        console.log('Input value:', input.value);
        if (input.value.trim() !== "" || document.activeElement === input) {
            console.log('Adding floating class');
            label.classList.add('floating');
        } else {
            console.log('Removing floating class');
            label.classList.remove('floating');
        }
    }

    // Event listeners for focus, blur, and input changes
    input.addEventListener('focus', toggleLabel);
    input.addEventListener('blur', toggleLabel);
    input.addEventListener('input', toggleLabel);
});

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
// Select the plus and minus buttons
let plusBtn = document.querySelector('.plus-btn');
let minusBtn = document.querySelector('.minus-btn');
let inputElement = document.querySelector('.quantity-button input');

// Parse the input value as an integer
let amount = parseInt(inputElement.value);

let render = (amount) => {
    inputElement.value = amount;
};

let handlePlus = () => {
    amount++;
    render(amount);
};

let handleMinus = () => {
    if (amount > 1) {
        amount--;
        render(amount);
    }
};

// Attach event listeners

plusBtn.addEventListener('click', handlePlus);

minusBtn.addEventListener('click', handleMinus);

inputElement.addEventListener('input', ()=>{
    amount = inputElement.value;
    amount = parseInt(amount);  
    amount = (isNaN(amount)||amount==0)?1:amount;
    render(amount);
})
    const blurOverlay = document.querySelector('.blur-overlay'); // Make sure this exists in your HTML
    const btnCart = document.querySelectorAll('.sp-cart');
    const shoppingCart = document.querySelector('.shopping-cart'); // Only one shopping-cart
    const close = document.querySelectorAll('.shopping-cart .close,.add-to-cart .close');

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


