/*Home data*/
document.addEventListener('DOMContentLoaded', function() {

    function isLoggedIn() {
        return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
    }

    function viewCart(){
        const cartBtn = document.querySelectorAll('.sp-cart')
        if (cartBtn.length > 0) {
            cartBtn.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    
                    if (!isLoggedIn()) {
                        alert('Please log in to buy!');
                        window.location.href = '?pages=login';
                    } else {
                        // Code to view cart goes here (if user is logged in)
                        console.log('Viewing cart...'); // Placeholder for cart viewing logic
                    }
                });
            });
        }
    }
    // // const cartBtn = document.getElementById('cart-btn');
    // const cartBtn = document.querySelectorAll('.sp-cart')
    // if (cartBtn.length > 0) {
    //     cartBtn.forEach(button => {
    //         button.addEventListener('click', function(event) {
    //             event.preventDefault();
                
    //             if (!isLoggedIn()) {
    //                 alert('Please log in to buy!');
    //                 window.location.href = '?pages=login';
    //             } else {
    //                 // Code to view cart goes here (if user is logged in)
    //                 console.log('Viewing cart...'); // Placeholder for cart viewing logic
    //             }
    //         });
    //     });
    // }

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
    // const tabContents = document.querySelectorAll('.tab_content');
    // const navLinks = document.querySelectorAll('.nav-links label');

    // Function to filter items with animation
    function filterItems(category) {
        const allTabContents = document.querySelectorAll('.tab_content');
        allTabContents.forEach(content => {
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.display = 'none';
            }, 300); // Match CSS animation duration
        });

        const selectedContent = document.getElementById(category);
        if (selectedContent) {
            setTimeout(() => {
                selectedContent.style.display = 'grid';
                requestAnimationFrame(() => {
                    selectedContent.style.opacity = '1';
                });
            }, 300);
        }

        if (category === 'All') {
            setupPagination('All', allItems);
        } else {
            const categoryItems = menuItems[category] || [];
            setupPagination(category, categoryItems);
        }
    }

    // Add event listeners for filter inputs
    filterInputs.forEach(input => {
        input.addEventListener('change', function () {
            const category = this.id.replace('filter-', '');
            const formattedCategory = category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);
            filterItems(formattedCategory);

            // Scroll to the top after filtering
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    const menuItemsPerPage = 8;

    const allItems = Object.values(menuItems).flat();

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
                alert('Please log in to buy!');
                window.location.href = './Home/login.html';
            } else {
                // Logic for viewing the cart if logged in
                console.log('Viewing cart...');
            }
        });
    
        return card;
    }


    // Function to render items for a specific section and page
    function renderItems(containerId, items, page = 1) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = ''; // Clear previous items

        const start = (page - 1) * menuItemsPerPage;
        const end = start + menuItemsPerPage;
        const itemsToShow = items.slice(start, end);

        itemsToShow.forEach(item => {
            container.appendChild(createItemCard(item));
        });
    }

    // Function to set up pagination for a section
    function setupPagination(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;
    
        const paginationContainer = document.querySelector('.pagination');
        if (!paginationContainer) return;
    
        paginationContainer.innerHTML = ''; // Clear previous pagination buttons
    
        const totalPages = Math.ceil(items.length / menuItemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.className = 'page-link';
            button.textContent = i;
    
            button.addEventListener('click', () => {
                // Scroll to top of the page (or specific container)
                window.scrollTo({
                    top: 0, // Adjust to scroll to a specific position (e.g., element.offsetTop)
                    behavior: 'smooth', // Smooth scrolling animation
                });
    
                // Remove "active" class from all buttons
                const allButtons = paginationContainer.querySelectorAll('.page-link');
                allButtons.forEach(btn => btn.classList.remove('active'));
    
                // Add "active" class to the clicked button
                button.classList.add('active');
    
                // Render items for the selected page
                renderItems(containerId, items, i);
            });
    
            if (i === 1) button.classList.add('active'); // Default to first page
            paginationContainer.appendChild(button);
        }
    
        // Render first page by default
        renderItems(containerId, items, 1);
    }
    
    // Initialize the "All" section
    setupPagination('All', allItems);    
});


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
        { links: '../Client/user-product/index-login-18.html', id: '18', name: 'Matcha Misu', price: '85,000 VND', image: '../Img/Drink/Matcha_Misu.png' }
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

    // Xử lý sự kiện cho giỏ hàng
    const blurOverlay = document.querySelector('.blur-overlay'); 
    const btnCart = document.querySelectorAll('.sp-cart');
    const shoppingCart = document.querySelector('.shopping-cart'); 
    const close = document.querySelectorAll('.shopping-cart .close');

    btnCart.forEach(btn => {
        btn.addEventListener('click', () => {
            if (shoppingCart) {
                shoppingCart.classList.add('active');
                blurOverlay.classList.add('active');
            }
        });
    });

    close.forEach(btn => {
        btn.addEventListener('click', () => {
            if (shoppingCart) {
                shoppingCart.classList.remove('active');
                blurOverlay.classList.remove('active');
            }
        });
    });
}