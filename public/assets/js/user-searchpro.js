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
    window.location.href = './user-index.html'; 
});

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    
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

    
    //Render
        
    // Sample data structure for items
    const menuItems = {
        Mousse: [
            { links: '../Client/user-product/index-login-1.html', id: '1', name: 'Avocado Mousse', price: '510,000 VND', image: '../Img/Mousse/Avocado_Mousse.jpg' },
            { links: '../Client/user-product/index-login-2.html', id: '2', name: 'Blueberry Mousse', price: '510,000 VND', image: '../Img/Mousse/Blueberry_Mousse.jpg' },
            { links: '../Client/user-product/index-login-3.html', id: '3', name: 'Corn Mousse', price: '520,000 VND', image: '../Img/Mousse/Corn_Mousse.jpg' },
            { links: '../Client/user-product/index-login-4.html', id: '4', name: 'Longan Mousse', price: '530,000 VND', image: '../Img/Mousse/Longan_Mousse.jpg' },
            // { links: '../Client//user-product/index-login-1.html', id: '5', name: 'Mango Mousse', price: '540,000 VND', image: '../Img/Mousse/Mango_Mousse.jpg' },
            // { links: '../Client//user-product/index-login-1.html', id: '6', name: 'Melon Mousse', price: '550,000 VND', image: '../Img/Mousse/Melon_Mousse.jpg'},
        ],
        Croissant: [
            { links: '../Client/user-product/index-login-7.html', id: '7', name: 'Avocado Croissant', price: '110,000 VND', image: '../Img/Croissant/Avocado_Croissant.jpg' },
            { links: '../Client/user-product/index-login-8.html', id: '8', name: 'Choco Mallow Croissant', price: '110,000 VND', image: '../Img/Croissant/Choco_Mallow_Croissant.png' },
            { links: '../Client/user-product/index-login-9.html', id: '9', name: 'Dinosaur Almond Croissant', price: '120,000 VND', image: '../Img/Croissant/Dinosaur_Almond_Croissant.png' },
            { links: '../Client/user-product/index-login-10.html', id: '10', name: 'Honey Almond Croissant', price: '130,000 VND', image: '../Img/Croissant/Honey_Almond_Croissant.png' },
            // { links: '../Client//user-product/index-login-1.htmll', id: '11', name: 'Matcha Croissant', price: '140,000 VND', image: '../Img/Croissant/Matcha_Croissant.jpg' },
            // { links: '../Client//user-product/index-login-1.htmll', id: '12', name: 'Plain Croissant', price: '150,000 VND', image: '../Img/Croissant/Plain_Croissant.png' },
        ],
        Drink: [
            { links: '../Client/user-product/index-login-13.html', id: '13', name: 'Choco Mallow', price: '55,000 VND', image: '../Img/Drink/Choco_Mallow.png' },
            { links: '../Client/user-product/index-login-14.html', id: '14', name: 'Lemon Tea', price: '60,000 VND', image: '../Img/Drink/Lemon_Tea.png' },
            { links: '../Client/user-product/index-login-15.html', id: '15', name: 'Lychee Tea', price: '70,000 VND', image: '../Img/Drink/Lychee_Tea.png' },
            { links: '../Client/user-product/index-login-16.html', id: '16', name: 'Matcha Latte', price: '75,000 VND', image: '../Img/Drink/Matcha_Latte.png' }
            // { links: '../Food_Infor_Login/index-login-17.html', id: '17', name: 'Matcha Mallow', price: '80,000 VND', image: '../Img/Drink/Matcha_Mallow .png' },
            // { links: '../Food_Infor_Login/index-login-18.html', id: '18', name: 'Matcha Misu', price: '85,000 VND', image: '../Img/Drink/Matcha_Misu.png' },
        ]
    };

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
            filterItems(category === 'all' ? 'All' : category === 'mousse' ? 'Mousse' : category.charAt(0).toUpperCase() + category.slice(1));
        });
    });

    // Function to create a new item card
    function createItemCard(item) {
        const card = document.createElement('div');
        card.className = 'movie-item';
        card.innerHTML = `
            <a href="${item.links}" target="_blank">
                <img class="poster-img" height="300" width="300" src="${item.image}" alt="${item.name}">
            </a>
            <p class="title">${item.name}</p>
            <button class="sp-cart butn title">
                <p class="text-color">Price: ${item.price}</p>
            </button>
        `;

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

        // Initialize items in each category and All section
    Object.entries(menuItems).forEach(([category, items]) => {
        // Add to category-specific section
        addItemsToCategory(category === 'Mousse' ? 'Mousse' : category, items);
        
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

    // Function to show hints based on user input
    function showHints() {
        const searchInput = document.getElementById('search');
        const hintContainer = document.getElementById('hintContainer');
        const searchTerm = searchInput.value.toLowerCase();
    
        // Clear previous hints
        hintContainer.innerHTML = '';
    
        // Show hints if there's input
        if (searchTerm) {
            Object.values(menuItems).flat().forEach(item => {
                if (item.name.toLowerCase().includes(searchTerm)) {
                    const hintItem = document.createElement('div');
                    hintItem.className = 'hint-item';
    
                    // Create an image element
                    const hintImage = document.createElement('img');
                    hintImage.src = item.image; // Set the image source
                    hintImage.alt = item.name; // Set alt text for accessibility
                    hintImage.style.width = '30px'; // Set image width
                    hintImage.style.height = '30px'; // Set image height
                    hintImage.style.marginRight = '10px'; // Space between image and text
    
                    // Append the image and the text to the hint item
                    hintItem.appendChild(hintImage);
                    hintItem.appendChild(document.createTextNode(item.name));
    
                    hintItem.onclick = function() {
                        searchInput.value = item.name; // Fill input with selected hint
                        hintContainer.innerHTML = ''; // Clear hints
                        hintContainer.style.display = 'none'; // Hide hints
                        searchItems(); // Call search function
                    };
                    hintContainer.appendChild(hintItem);
                }
            });
    
            // Show or hide the hint container based on content
            hintContainer.style.display = hintContainer.innerHTML ? 'block' : 'none';
        } else {
            hintContainer.style.display = 'none'; // Hide if no input
        }
    }


    // // Event listener for search button click
    document.querySelector('.searchBtn').addEventListener('click', function() {
        searchItems();
    });

    // Event listener for pressing Enter in the search input
    document.getElementById('search').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchItems();
        }
    });

    const searchInput = document.getElementById('search');
    const hintContainer = document.getElementById('hintContainer');
    searchInput.addEventListener('blur' ,() => {
        console.log('1111')
        setTimeout(() => {
            hintContainer.innerHTML = ''; // Clear hints
            hintContainer.style.display = 'none';
        },200)
        
    })

    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            // If the input is cleared, show all items
             // Reset to show all item
            const categoryContainers = document.querySelectorAll('#All');
    
            categoryContainers.forEach(container => {
                container.innerHTML = '';
            });
                const allContainer = document.getElementById('All');
                const mousseContainer = document.getElementById('Mousse');
                const croissantContainer = document.getElementById('Croissant');
                const drinkContainer = document.getElementById('Drink');

                // Xóa nội dung cũ (nếu có)
                allContainer.innerHTML = '';
                mousseContainer.innerHTML = '';
                croissantContainer.innerHTML = '';
                drinkContainer.innerHTML = '';

                // Duyệt qua các sản phẩm trong menuItems
                for (const category in menuItems) {
                    menuItems[category].forEach(item => {
                        const itemCard = createItemCard(item); // Tạo thẻ HTML cho mỗi sản phẩm

                        // Thêm sản phẩm vào danh mục tương ứng
                        if (category === 'Mousse') {
                            mousseContainer.appendChild(itemCard);
                        } else if (category === 'Croissant') {
                            croissantContainer.appendChild(itemCard);
                        } else if (category === 'Drink') {
                            drinkContainer.appendChild(itemCard);
                        }

                        // Thêm sản phẩm vào container 'All'
                        allContainer.appendChild(itemCard.cloneNode(true));
                    });
                }
            filterItems('All');
        } else {
            showHints(); // Show hints based on current input
        }
    });

    function searchItems() {
        const searchTerm = document.getElementById('search').value.toLowerCase(); // Get the search query
        const allContainer = document.getElementById('All');
        const mousseContainer = document.getElementById('Mousse');
        const croissantContainer = document.getElementById('Croissant');
        const drinkContainer = document.getElementById('Drink');
    
        // Clear previous results
        allContainer.innerHTML = '';
        mousseContainer.innerHTML = '';
        croissantContainer.innerHTML = '';
        drinkContainer.innerHTML = '';
    
        // Filter and display items based on the search term
        for (const category in menuItems) {
            menuItems[category].forEach(item => {
                if (item.name.toLowerCase().includes(searchTerm)) {
                    const itemCard = createItemCard(item);
    
                    // Add to the respective category container
                    if (category === 'Mousse') {
                        mousseContainer.appendChild(itemCard);
                    } else if (category === 'Croissant') {
                        croissantContainer.appendChild(itemCard);
                    } else if (category === 'Drink') {
                        drinkContainer.appendChild(itemCard);
                    }
    
                    // Also add matching items to the 'All' container
                    allContainer.appendChild(itemCard.cloneNode(true));
                }

                const cartBtn = document.querySelectorAll('.sp-cart')
                if (cartBtn) {
                    cartBtn.forEach(button => {
                        button.addEventListener('click', function() {
                            if (!isLoggedIn()) {
                                // alert('Please log in to view your cart!');
                                wrapper.classList.add('active-popup');
                                wrapper.classList.remove('active');
                                isRegisterForm = false;
                                blurOverlay.classList.add('active');
                            } else {
                                // Code to view cart goes here (if user is logged in)
                                console.log('Viewing cart...'); // Placeholder for cart viewing logic
                            }
                        });
                    });
                } 
            });
        }
        // Clear hints after searching
        const hintContainer = document.getElementById('hintContainer');
        hintContainer.innerHTML = '';  // Clear hints
        hintContainer.style.display = 'none';  // Hide hints
    }


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




