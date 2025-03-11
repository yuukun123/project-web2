/*Home data*/

document.addEventListener('DOMContentLoaded', function() {





    // Handle Register Form Submission
    // const registerForm = document.getElementById('registerForm');
    // if (registerForm){
    //     registerForm.addEventListener('submit', function(event) {
    //         event.preventDefault(); // Prevent default form submission
    //         const username = document.getElementById('registerUsername').value.toLowerCase();
    //         const email = document.getElementById('registerEmail').value;
    //         const password = document.getElementById('registerPassword').value;
    //         const confirmPassword = document.getElementById('registerConfirmPassword').value;
    //         const phone = document.getElementById('registerPhone').value;
    //         const address = document.getElementById('registerAddress').value;

    //         const regex = /[\s\u00C0-\u1EF9]/; // Kiểm tra khoảng trắng hoặc ký tự có dấu

    //         const users = getStoredUsers();

    //         // Check if email or username is already registered
    //         if (users.find(user => user.email === email || user.username === username)) {
    //             alert('Email or username is already registered!');
    //         } 
    //         else {
    //             if (phone.length !== 10) {
    //                 alert('phone number must be at least 10 characters');
    //                 return;
    //             }

    //             if(regex.test(username)){
    //                 alert('Username must not contain any whitespace or special characters');
    //                 return;
    //             }
                
    //             // Check if password and confirm password match
    //             if (password !== confirmPassword) {
    //                 alert('Passwords do not match!');
    //                 return;
    //             }

    //             // Add the new user to the user list
    //             users.push({ username, email, password, phone, address , role: 'client'});
    //             saveUsers(users);

    //             // Alert and redirect to login
    //             alert('Registration successful!');
    //             localStorage.setItem("loggedIn", "true");
    //             window.location.href = '?pages=home';
    //         }
    //     });
    // }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(registerForm);

            fetch('app/config/register_process.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Registration successful!');
                    window.location.href = '?pages=login'; // Chuyển hướng về trang đăng nhập
                } else {
                    alert(data.message); // Hiển thị lỗi từ server
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Function to get current user from localStorage
    // function getCurrentUser() {
    //     const currentUser = localStorage.getItem('UserStr');
    //     return currentUser ? JSON.parse(currentUser) : null;

    // }

    // function isLoggedIn() {
    //     return !!getCurrentUser(); // Returns true if currentUser exists, false otherwise
    // }

    // // const cartBtn = document.getElementById('cart-btn');
    // const cartBtn = document.querySelectorAll('.sp-cart')
    // if (cartBtn.length > 0) {
    //     cartBtn.forEach(button => {
    //         button.addEventListener('click', function(event) {
    //             event.preventDefault();
                
    //             if (!isLoggedIn()) {
    //                 // alert('Please log in to view your cart!');
    //             } else {
    //                 // Code to view cart goes here (if user is logged in)
    //                 console.log('Viewing cart...'); // Placeholder for cart viewing logic
    //             }
    //         });
    //     });
    // }

    const cartBtns = document.querySelectorAll('.sp-cart');

    if (cartBtns.length > 0) {
        cartBtns.forEach(button => {
            button.addEventListener('click', async function(event) {
                event.preventDefault();

                const loggedIn = await checkLoginStatus();

                if (!loggedIn) {
                    alert('Please log in to view your cart!');
                    window.location.href = '?pages=login';
                } else {
                    console.log('Viewing cart...');
                }
            });
        });
    }
});
