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


/*Home data*/
document.addEventListener('DOMContentLoaded', function() {

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
                    window.location.href = './Home/login.html';
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

                function getCurrentUser() {
                    const currentUser = localStorage.getItem('UserStr');
                    return currentUser ? JSON.parse(currentUser) : null;
    
                }
    
                function isLoggedIn() {
                    return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
                }
    
                const cartBtn = document.querySelectorAll('.sp-cart');

                if (cartBtn) {
                    cartBtn.forEach(button => {
                        button.addEventListener('click', function (event) {
                            if (!isLoggedIn()) {
                                alert('Please log in to buy!');
                                window.location.href = './Home/login.html';
                            } else {
                                console.log(`Viewing cart for product: ${button.dataset.id}`);
                                // Add your cart logic here.
                            }
                            event.stopPropagation(); // Ngăn chặn các sự kiện click khác nếu cần
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
    function showHints(isMobile = false) {
        const searchInput = isMobile ? document.getElementById('searchPhone') : document.getElementById('search');
        const hintContainer = isMobile ? document.getElementById('hintContainerPhone') : document.getElementById('hintContainer');
        const searchTerm = searchInput.value.toLowerCase();
    
        hintContainer.innerHTML = ''; // Clear hints
    
        if (searchTerm) {
            Object.values(menuItems).flat().forEach(item => {
                if (item.name.toLowerCase().includes(searchTerm)) {
                    const hintItem = document.createElement('div');
                    hintItem.className = 'hint-item';
    
                    const hintImage = document.createElement('img');
                    hintImage.src = item.image;
                    hintImage.alt = item.name;
                    hintImage.style.width = '30px';
                    hintImage.style.height = '30px';
                    hintImage.style.marginRight = '10px';
    
                    hintItem.appendChild(hintImage);
                    hintItem.appendChild(document.createTextNode(item.name));
    
                    hintItem.onclick = function () {
                        searchInput.value = item.name;
                        hintContainer.innerHTML = '';
                        hintContainer.style.display = 'none';
                        searchItems(isMobile);
                    };
    
                    hintContainer.appendChild(hintItem);
                }
            });
            hintContainer.style.display = hintContainer.innerHTML ? 'block' : 'none';
        } else {
            hintContainer.style.display = 'none';
        }
    }
    
    // Search items based on input
    function searchItems(isMobile = false) {
        const searchInput = isMobile ? document.getElementById('searchPhone') : document.getElementById('search');
        const searchTerm = searchInput.value.toLowerCase();
    
        const allContainer = document.getElementById('All');
        const mousseContainer = document.getElementById('Mousse');
        const croissantContainer = document.getElementById('Croissant');
        const drinkContainer = document.getElementById('Drink');
    
        allContainer.innerHTML = '';
        mousseContainer.innerHTML = '';
        croissantContainer.innerHTML = '';
        drinkContainer.innerHTML = '';
    
        for (const category in menuItems) {
            menuItems[category].forEach(item => {
                if (item.name.toLowerCase().includes(searchTerm)) {
                    const itemCard = createItemCard(item);
                    if (category === 'Mousse') mousseContainer.appendChild(itemCard);
                    if (category === 'Croissant') croissantContainer.appendChild(itemCard);
                    if (category === 'Drink') drinkContainer.appendChild(itemCard);
                    allContainer.appendChild(itemCard.cloneNode(true));

                    
                    function getCurrentUser() {
                        const currentUser = localStorage.getItem('UserStr');
                        return currentUser ? JSON.parse(currentUser) : null;
        
                    }
        
                    function isLoggedIn() {
                        return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
                    }
        
                    const cartBtn = document.querySelectorAll('.sp-cart');

                    cartBtn.forEach(button => {
                        if (!button.dataset.eventBound) { // Kiểm tra nếu sự kiện chưa được gán
                            button.addEventListener('click', function (event) {
                                if (!isLoggedIn()) {
                                    alert('Please log in to buy!');
                                    window.location.href = './Home/login.html';
                                } else {
                                    console.log(`Viewing cart for product: ${button.dataset.id}`);
                                    // Add your cart logic here.
                                }
                                event.stopPropagation(); // Ngăn chặn các sự kiện click khác nếu cần
                            });
                    
                            button.dataset.eventBound = 'true'; // Đánh dấu rằng sự kiện đã được gán
                        }
                    });
                    
                    
                    
                }

            });
        }
    
        const hintContainer = isMobile ? document.getElementById('hintContainerPhone') : document.getElementById('hintContainer');
        hintContainer.innerHTML = '';
        hintContainer.style.display = 'none';
    }
    
    // Add event listeners
    document.querySelectorAll('.searchBtn').forEach(button => {
        button.addEventListener('click', function () {
            const isMobile = this.closest('.search-container-phone') !== null;
            searchItems(isMobile);
        });
    });
    
    document.querySelectorAll('#search, #searchPhone').forEach(input => {
        input.addEventListener('input', function () {
            const isMobile = this.id === 'searchPhone';
            showHints(isMobile);
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
