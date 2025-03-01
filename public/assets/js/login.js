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
    window.location.href = '../index.html'; 
});

/*login*/
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelectorAll('.btnLogin-popup');
const btnOutPopup = document.querySelectorAll('.btnLogout-popup');
let isRegisterForm = false; // Track which form is currently shown


// const loginBtn = document.querySelector('#login-btn');
// const logoutBtn = document.querySelector('#logout-btn');

// loginBtn.addEventListener('click', () => {
//     wrapper.classList.add('active-popup');
//     wrapper.classList.remove('active');
// });

// logoutBtn.addEventListener('click', () => {
//     wrapper.classList.add('active-popup');
//     wrapper.classList.add('active');
// });



// Open login form
btnPopup.forEach(btn => {
    btn.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        wrapper.classList.remove('active');
        isRegisterForm = false;
    });
});

// Open register form
btnOutPopup.forEach(btn => {
    btn.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        wrapper.classList.add('active');
        isRegisterForm = true;
    });
});



/*Home data*/
document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const loginForm = document.querySelector(".form-box.login");
    const registerForm = document.querySelector(".form-box.register");
    let isRegisterForm = false; // Track which form is currently shown
    
    if (window.location.hash === "#register") {
        wrapper.classList.add("active");
    }

    // Add event listeners for manual switching between login and register
    registerLink.addEventListener("click", (e) => {
        e.preventDefault();
        wrapper.classList.add("active");
    });

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        wrapper.classList.remove("active");
    });
    
    // Switch to Register Form
    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active'); // Show register form
        isRegisterForm = true;
    });
    
    // Switch to Login Form
    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active'); // Show login form
        isRegisterForm = false;
    });
    

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
                username: 'client', 
                email: 'client@gmail.com', 
                password: '123', 
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
        const userName = document.getElementById('loginUserName').value.toLowerCase();
        const password = document.getElementById('loginPassword').value;
        // const LoginConfirmPassword = document.getElementById('loginConfirmPassword').value;

        const users = getStoredUsers();
        const user = users.find(user => user.username === userName.toLowerCase() && user.password === password );
        
        if (user) {
            alert('Login successful!');
            setCurrentUser(user);
            localStorage.setItem("loggedIn", "true");
            window.location.href = '../Client/user-index.html';
        } else {
            alert('Invalid email or password!');
        }
    });

    // Handle Register Form Submission
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const username = document.getElementById('registerUsername').value.toLowerCase();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const phone = document.getElementById('registerPhone').value;
        const address = document.getElementById('registerAddress').value;

        const regex = /[\s\u00C0-\u1EF9]/; // Kiểm tra khoảng trắng hoặc ký tự có dấu

        const users = getStoredUsers();

        // Check if email or username is already registered
        if (users.find(user => user.email === email || user.username === username)) {
            alert('Email or username is already registered!');
        } 
        else {
            if (phone.length !== 10) {
                alert('phone number must be at least 10 characters');
                return;
            }

            if(regex.test(username)){
                alert('Username must not contain any whitespace or special characters');
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
            localStorage.setItem("loggedIn", "true");
            window.location.href = '../index.html';
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
                    // alert('Please log in to view your cart!');
                } else {
                    // Code to view cart goes here (if user is logged in)
                    console.log('Viewing cart...'); // Placeholder for cart viewing logic
                }
            });
        });
    }

    //Render

    // Sample data structure for items
    const menuItems = {
        Mousse: [
            { links: './Home/product/index-1.html', id: '1', name: 'Avocado Mousse', price: '510,000 VND', image: './Img/Mousse/Avocado_Mousse.jpg' },
            { links: './Home/product/index-2.html', id: '2', name: 'Blueberry Mousse', price: '510,000 VND', image: './Img/Mousse/Blueberry_Mousse.jpg' },
            { links: './Home/product/index-3.html', id: '3', name: 'Corn Mousse', price: '520,000 VND', image: './Img/Mousse/Corn_Mousse.jpg' },
            { links: './Home/product/index-4.html', id: '4', name: 'Longan Mousse', price: '530,000 VND', image: './Img/Mousse/Longan_Mousse.jpg' },
            { links: './Home/product/index-5.html', id: '5', name: 'Mango Mousse', price: '540,000 VND', image: './Img/Mousse/Mango_Mousse.jpg' },
            { links: './Home/product/index-6.html', id: '6', name: 'Melon Mousse', price: '550,000 VND', image: './Img/Mousse/Melon_Mousse.jpg'},
        ],
        Croissant: [
            { links: './Home/product/index-7.html', id: '7', name: 'Avocado Croissant', price: '110,000 VND', image: './Img/Croissant/Avocado_Croissant.jpg' },
            { links: './Home/product/index-8.html', id: '8', name: 'Choco Mallow Croissant', price: '110,000 VND', image: './Img/Croissant/Choco_Mallow_Croissant.png' },
            { links: './Home/product/index-9.html', id: '9', name: 'Dinosaur Almond Croissant', price: '120,000 VND', image: './Img/Croissant/Dinosaur_Almond_Croissant.png' },
            { links: './Home/product/index-10.html', id: '10', name: 'Honey Almond Croissant', price: '130,000 VND', image: './Img/Croissant/Honey_Almond_Croissant.png' },
            { links: './Home/product/index-11.html', id: '11', name: 'Matcha Croissant', price: '140,000 VND', image: './Img/Croissant/Matcha_Croissant.jpg' },
            { links: './Home/product/index-12.html', id: '12', name: 'Plain Croissant', price: '150,000 VND', image: './Img/Croissant/Plain_Croissant.png' },
        ],
        Drink: [
            { links: './Home/product/index-13.html', id: '13', name: 'Choco Mallow', price: '55,000 VND', image: './Img/Drink/Choco_Mallow.png' },
            { links: './Home/product/index-14.html', id: '14', name: 'Lemon Tea', price: '60,000 VND', image: './Img/Drink/Lemon_Tea.png'},
            { links: './Home/product/index-15.html', id: '15', name: 'Lychee Tea', price: '70,000 VND', image: './Img/Drink/Lychee_Tea.png'},
            { links: './Home/product/index-16.html', id: '16', name: 'Matcha Latte', price: '75,000 VND', image: './Img/Drink/Matcha_Latte.png'},
            { links: './Home/product/index-17.html', id: '17', name: 'Matcha Mallow', price: '80,000 VND', image: './Img/Drink/Matcha_Mallow.png'},
            { links: './Home/product/index-18.html', id: '18', name: 'Matcha Misu', price: '85,000 VND', image: './Img/Drink/Matcha_Misu.png' },
        ],
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
            filterItems(category == 'all' ? 'All' : category == 'mousse' ? 'Mousse' : category.charAt(0).toUpperCase() + category.slice(1));
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
            <button class="sp-cart butn title" data-id="${item.id}">
                <p class="text-color">Price: ${item.price}</p>
            </button>
        `;

        // Function to get current user from localStorage
        function getCurrentUser() {
            const currentUser = localStorage.getItem('UserStr');
            return currentUser ? JSON.parse(currentUser) : null;

        }

        function isLoggedIn() {
            return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
        }

        // const cartBtn = document.getElementById('cart-btn');
        const cartBtn = card.querySelector('.sp-cart')
        cartBtn.addEventListener('click', function (event) {
            event.preventDefault();
    
            if (!isLoggedIn()) {
                // Handle login popup logic
                wrapper.classList.add('active-popup');
                wrapper.classList.remove('active');
                isRegisterForm = false;
                blurOverlay.classList.add('active');
                console.log('Please log in to view your cart!');
            } else {
                // Logic for viewing the cart if logged in
                console.log('Viewing cart...');
            }
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

    // const hintContainers = document.querySelectorAll('.hint-container');

    // document.addEventListener('click', (event) => {
    //     const isClickInside = [...hintContainers, ...loginBtns].some(el => el.contains(event.target));

    //     if (!isClickInside) {
    //         logoutContainers.forEach(container => {
    //             container.classList.remove('active-popup'); // Hide the logout container when clicked outside
    //         });
    //     }
    // });

    
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
