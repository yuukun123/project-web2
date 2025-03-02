//Search Pro
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
        { links: '../Client/user-product/index-login-18.html', id: '18', name: 'Matcha Misu', price: '85,000 VND', image: '../Img/Drink/Matcha_Misu.png' },
    ]
};

function search() {
    const name = document.getElementById('searchName').value.toLowerCase();
    const category = document.getElementById('searchCategory').value.toLowerCase();
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || 50000000;
    const productList = document.getElementById('productList');

    let filteredProducts = [];

    // Lọc sản phẩm theo điều kiện
    for (let key in menuItems) {
        const productArray = menuItems[key];
        filteredProducts = filteredProducts.concat(
            productArray.filter(product =>
                (name === '' || product.name.toLowerCase().includes(name)) &&
                (category === '' || key.toLowerCase().includes(category)) &&
                (minPrice === 0 || parseInt(product.price.replace(/[^0-9]/g, '')) >= minPrice) &&
                (maxPrice === 50000000 || parseInt(product.price.replace(/[^0-9]/g, '')) <= maxPrice)
            )
        );
    }

    // Ẩn danh sách sản phẩm ban đầu
    document.querySelector('.tab_content').style.display = 'none';

    // Xóa nội dung cũ của container All
    const allContainer = document.getElementById('All');
    allContainer.innerHTML = '';

    // Hiển thị sản phẩm tìm được
    productList.innerHTML = ''; // Xóa nội dung cũ
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productCard = ` 
                <div class="movie-item">
                    <a href="${product.links}" target="_blank">
                        <img class="poster-img" height="300" width="300" src="${product.image}" alt="${product.name}">
                    </a>
                    <p class="title">${product.name}</p>
                    <button class="sp-cart butn title">
                        <p class="text-color">Price: ${product.price}</p>
                    </button>
                </div>
            `;
            productList.innerHTML += productCard;
        });

        // Đảm bảo hiển thị đúng lớp CSS .tab_content
        productList.className = 'tab_content';
        productList.style.display = 'grid';
    } else {
        // Nếu không tìm thấy kết quả
        productList.innerHTML = "<p>No products found matching your criteria.</p>";
        productList.className = '';
        productList.style.display = 'block'; // Đảm bảo hiển thị lại nếu bị ẩn trước đó
    }
    
    function getCurrentUser() {
        const currentUser = localStorage.getItem('UserStr');
        return currentUser ? JSON.parse(currentUser) : null;
    }

    function isLoggedIn() {
        return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
    }
    const cartBtn = document.querySelectorAll('.sp-cart')
    if (cartBtn) {
        cartBtn.forEach(button => {
            button.addEventListener('click', function() {
                if (!isLoggedIn()) {
                    alert('Please log in to buy!');
                    window.location.href = './login.html';
                } else {
                    // Code to view cart goes here (if user is logged in)
                    console.log('Viewing cart...'); // Placeholder for cart viewing logic
                }
            });
        });
    }    
    
} 


// When reopening, restore the last form state
function openForm() {
    wrapper.classList.add('active-popup');
    if (isRegisterForm) {
        wrapper.classList.add('active');
    } else {
        wrapper.classList.remove('active');
    }
    blurOverlay.classList.add('active');
}


/*Home data*/
document.addEventListener('DOMContentLoaded', function() {
    
    function getCurrentUser() {
        const currentUser = localStorage.getItem('UserStr');
        return currentUser ? JSON.parse(currentUser) : null;
    }

    function isLoggedIn() {
        return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
    }
    const cartBtn = document.querySelectorAll('.sp-cart')
    if (cartBtn) {
        cartBtn.forEach(button => {
            button.addEventListener('click', function() {
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

    // Sample data structure for items
    const menuItems = {
        Mousse: [
            { links: '../Home/product/index-1.html', name: 'Avocado Mousse', price: '510,000 VND', image: '../Img/Mousse/Avocado_Mousse.jpg' },
            { links: '../Home/product/index-2.html', id: '2', name: 'Blueberry Mousse', price: '510,000 VND', image: '../Img/Mousse/Blueberry_Mousse.jpg' },
            { links: '../Home/product/index-3.html', id: '3', name: 'Corn Mousse', price: '520,000 VND', image: '../Img/Mousse/Corn_Mousse.jpg' },
            { links: '../Home/product/index-4.html', id: '4', name: 'Longan Mousse', price: '530,000 VND', image: '../Img/Mousse/Longan_Mousse.jpg' },
            // { links: '../Food_Infor/index-5.html', id: '5', name: 'Mango Mousse', price: '540,000 VND', image: '../Img/Mousse/Mango_Mousse.jpg' },
            // { links: '../Food_Infor/index-6.html', id: '6', name: 'Melon Mousse', price: '550,000 VND', image: '../Img/Mousse/Melon_Mousse.jpg'},
        ],
        Croissant: [
            { links: '../Home/product/index-7.html', id: '7', name: 'Avocado Croissant', price: '110,000 VND', image: '../Img/Croissant/Avocado_Croissant.jpg' },
            { links: '../Home/product/index-8.html', id: '8', name: 'Choco Mallow Croissant', price: '110,000 VND', image: '../Img/Croissant/Choco_Mallow_Croissant.png' },
            { links: '../Home/product/index-9.html', id: '9', name: 'Dinosaur Almond Croissant', price: '120,000 VND', image: '../Img/Croissant/Dinosaur_Almond_Croissant.png' },
            { links: '../Home/product/index-10.html', id: '10', name: 'Honey Almond Croissant', price: '130,000 VND', image: '../Img/Croissant/Honey_Almond_Croissant.png' },
            // { links: '../Food_Infor/index-11.html', id: '11', name: 'Matcha Croissant', price: '140,000 VND', image: '../Img/Croissant/Matcha_Croissant.jpg' },
            // { links: '../Food_Infor/index-12.html', id: '12', name: 'Plain Croissant', price: '150,000 VND', image: '../Img/Croissant/Plain_Croissant.png' },
        ],
        Drink: [
            { links: '../Home/product/index-13.html', id: '13', name: 'Choco Mallow', price: '55,000 VND', image: '../Img/Drink/Choco_Mallow.png' },
            { links: '../Home/product/index-14.html', id: '14', name: 'Lemon Tea', price: '60,000 VND', image: '../Img/Drink/Lemon_Tea.png' },
            { links: '../Home/product/index-15.html', id: '15', name: 'Lychee Tea', price: '70,000 VND', image: '../Img/Drink/Lychee_Tea.png' },
            { links: '../Home/product/index-16.html', id: '16', name: 'Matcha Latte', price: '75,000 VND', image: '../Img/Drink/Matcha_Latte.png' }
            // { links: '../Food_Infor/index-17.html', id: '17', name: 'Matcha Mallow', price: '80,000 VND', image: '../Img/Drink/Matcha_Mallow.png' },
            // { links: '../Food_Infor/index-18.html', id: '18', name: 'Matcha Misu', price: '85,000 VND', image: '../Img/Drink/Matcha_Misu.png' },
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
                console.log('Please log in to buy!');
                alert('Please log in to buy!');
                window.location.href = './login.html';
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