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

// const logo = document.querySelector('.logo');
// logo.addEventListener('click', function(e) {

//     e.preventDefault();
//     window.location.href = '../index.php'; 
// });

/*login*/
// Lấy các phần tử
// const wrapper = document.querySelector('.wrapper');

// // Link bên trong popup
// const loginLink = document.querySelector('.login-link');
// const registerLink = document.querySelector('.register-link');

// // Nút mở popup dạng login
// const btnPopup = document.querySelectorAll('.btnLogin-popup');
// // Nút mở popup dạng register
// const btnOutPopup = document.querySelectorAll('.btnLogout-popup');

// // Form
// const loginForm = document.getElementById("loginForm");
// const registerForm = document.getElementById("registerForm");

// // Ẩn/hiện form qua CSS inline (hoặc bạn dùng class)
// function showLogin() {
// // loginForm.style.display = "block";
// // registerForm.style.display = "none";
// // Bảo đảm wrapper có popup
// wrapper.classList.add('active-popup');
// // Bỏ class active => hiển thị Login
// wrapper.classList.remove('active');
// console.log('login')
// }

// function showRegister() {
// // loginForm.style.display = "none";
// // registerForm.style.display = "block";
// // Bật popup
// wrapper.classList.add('active-popup');
// // Thêm class active => hiển thị Register
// wrapper.classList.add('active');
// console.log('register')
// }

// // Khi bấm nút .btnLogin-popup => mở popup + Login
// btnPopup.forEach(btn => {
//     btn.addEventListener('click', () => {
//         showLogin();
//     });
// });

// // Khi bấm nút .btnLogout-popup => mở popup + Register
// btnOutPopup.forEach(btn => {
//     btn.addEventListener('click', () => {
//         showRegister();
//     });
// });

// // Khi bấm link “Login” trong popup => chuyển sang form Login
// loginLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     showLogin();
// });

// // Khi bấm link “Register” trong popup => chuyển sang form Register
// registerLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     showRegister();
// });


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
    const loginForm = document.getElementById('loginForm');
    if (loginForm){
        loginForm.addEventListener('submit', function(event) {
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
    }

    // Handle Register Form Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm){
        registerForm.addEventListener('submit', function(event) {
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
                window.location.href = '../index.php';
            }
        });
    }

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
});
