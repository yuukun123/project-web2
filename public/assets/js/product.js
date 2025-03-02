/*Home data*/
document.addEventListener('DOMContentLoaded', function() {
    // Get stored users from localStorage
    function getStoredUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Save users to localStorage
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Function to save the current user to localStorage after login
    function setCurrentUser(user) {
        localStorage.setItem('UserStr', JSON.stringify(user));
    }

    // Initialize admin and client users
    function initializeUsers() {
        let users = getStoredUsers();

        if (!users.find(user => user.email === 'client@gmail.com')) {
            users.push({ 
                username: 'Client', 
                email: 'client@gmail.com', 
                password: 'client123', 
                phone: '0812345678', 
                address: '273 Đ. An Dương Vương, Phường 3, Quận 5, Hồ Chí Minh' ,
            });
        }

        saveUsers(users); // Save the updated users list to localStorage
    }

    // Call this function to ensure admin and client are in the users list
    initializeUsers();

    // Handle Login Form Submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        // const LoginConfirmPassword = document.getElementById('loginConfirmPassword').value;

        const users = getStoredUsers();
        const user = users.find(user => user.email === email && user.password === password );

        if (user) {
            alert('Login successful!');
            setCurrentUser(user);
            window.location.href = '../../Client/user-index.html';
        } else {
            alert('Invalid email or password!');
        }
    });

    // Handle Register Form Submission
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const phone = document.getElementById('registerPhone').value;
        const address = document.getElementById('registerAddress').value;

        const users = getStoredUsers();

        // Check if email or username is already registered
        if (users.find(user => user.email === email || user.username === username)) {
            alert('Email or username is already registered!');
        } 
        else {
            if (phone.length !== 10) {
                alert('Invalid phone number!');
                return;
            }
            
            // Check if password and confirm password match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Add the new user to the user list
            users.push({ username, email, password, phone, address , role: 'client'});
            saveUsers(users);

            // Alert and redirect to login
            alert('Registration successful!');
            window.location.href = 'index.html';
        }
    });

    // Function to get current user from localStorage
    function getCurrentUser() {
        const currentUser = localStorage.getItem('UserStr');
        return currentUser ? JSON.parse(currentUser) : null;

    }

    function isLoggedIn() {
        return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
    }

    // const cartBtn = document.getElementById('cart-btn');
    const cartBtn = document.querySelectorAll('.sp-cart')
    if (cartBtn.length > 0) {
        cartBtn.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                if (!isLoggedIn()) {
                    alert('Please log in to buy!');
                    window.location.href = '../login.html';
                } else {
                    // Code to view cart goes here (if user is logged in)
                    console.log('Viewing cart...'); // Placeholder for cart viewing logic
                }
            });
        });
    }
   
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
            { id: '1', name: 'Avocado Mousse', price: '510,000 VND', image: 'img/Mousse/Avocado_Mousse.jpg' },
            { id: '2', name: 'Blueberry Mousse', price: '510,000 VND', image: 'img/Mousse/Blueberry_Mousse.jpg' },
            { id: '3', name: 'Corn Mousse', price: '520,000 VND', image: 'img/Mousse/Corn_Mousse.jpg' },
            { id: '4', name: 'Longan Mousse', price: '530,000 VND', image: 'img/Mousse/Longan_Mousse.jpg' },
            { id: '5', name: 'Mango Mousse', price: '540,000 VND', image: 'img/Mousse/Mango_Mousse.jpg' },
            { id: '6', name: 'Melon Mousse', price: '550,000 VND', image: 'img/Mousse/Melon_Mousse.jpg'},
        ],
        Croissant: [
            { id: '7', name: 'Avocado Croissant', price: '110,000 VND', image: 'img/Croissant/Avocado_Croissant.jpg' },
            { id: '8', name: 'Choco Mallow Croissant', price: '110,000 VND', image: 'img/Croissant/Choco_Mallow_Croissant.png' },
            { id: '9', name: 'Dinosaur Almond Croissant', price: '120,000 VND', image: 'img/Croissant/Dinosaur_Almond_Croissant.png' },
            { id: '10', name: 'Honey Almond Croissant', price: '130,000 VND', image: 'img/Croissant/Honey_Almond_Croissant.png' },
            { id: '11', name: 'Matcha Croissant', price: '140,000 VND', image: 'img/Croissant/Matcha_Croissant.jpg' },
            { id: '12', name: 'Plain Croissant', price: '150,000 VND', image: 'img/Croissant/Plain_Croissant.png' },
        ],
        Drink: [
            { id: '13', name: 'Choco Mallow', price: '55,000 VND', image: 'img/Drink/Choco_Mallow.png' },
            { id: '14', name: 'Lemon Tea', price: '60,000 VND', image: 'img/Drink/Lemon_Tea.png' },
            { id: '15', name: 'Lychee Tea', price: '70,000 VND', image: 'img/Drink/Lychee_Tea.png' },
            { id: '16', name: 'Matcha Latte', price: '75,000 VND', image: 'img/Drink/Matcha_Latte.png' },
            { id: '17', name: 'Matcha Mallow', price: '80,000 VND', image: 'img/Drink/Matcha_Mallow.png' },
            { id: '18', name: 'Matcha Misu', price: '85,000 VND', image: 'img/Drink/Matcha_Misu.png' },
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
    
