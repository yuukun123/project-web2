/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    // Function: Check login status
    function checkLoginStatus(callback) {
        console.log("Đang gọi checkLoginStatus...");
        fetch("Api_php/session-admin.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log("Dữ liệu session trả về:", data);

            // Nếu chưa đăng nhập, chuyển hướng về trang login
            if (!data.loggedIn) {
                console.warn("Chưa đăng nhập. Chuyển về trang đăng nhập...");
                window.location.href = "login";
                return;
            }
    
            // Check tài khoản bị khóa
            if (data.status && data.status.toLowerCase() === "locked") {
                console.warn("Tài khoản đã bị khóa. Chuyển về trang đăng nhập...");
                alert("Your account has been locked. You will be redirected to the login page.");
                window.location.href = "login"; // Hoặc đúng link login của bạn
                return;
            }
    
            // Check trạng thái đăng nhập
            if (data.loggedIn) {
                document.body.classList.add("logged-in");
            } else {
                document.body.classList.remove("logged-in");
            }
    
            if (callback) {
                callback(data.loggedIn);
            }
        })
        .catch(error => console.error("Lỗi khi kiểm tra session:", error));
    }    
    

    // Kiểm tra trạng thái đăng nhập
    checkLoginStatus((isLoggedIn) => {
        if (!isLoggedIn) {
            console.log("Không đăng nhập, xóa flag welcomeShownAdmin");
            localStorage.removeItem("welcomeShownAdmin");
            console.log("welcomeShownAdmin flag removed:", localStorage.getItem("welcomeShownAdmin"));
        }

        
    });

    // // Get stored users from localStorage
    // function getCurrentUser() {
    //     const admins = localStorage.getItem('AdminUser');
    //     return admins ? JSON.parse(admins) : [];
    // }

    // // Check if the admin is logged in and update button text
    // function updateLoginButton() {
    //     const loginButton = document.getElementById('login-btn');

    //     const admins = getCurrentUser();

    //     if (admins) {
    //         loginButton.textContent = admins.username; // Change button to admin's name
    //         loginButton.disabled = true; // Optionally, disable the button after login
    //     }
    // }

    // const logoutButton = document.getElementById('logout-btn');

    // // Handle the logout functionality
    // logoutButton.addEventListener('click', function() {
    //     // Optionally, clear user data from localStorage or sessionStorage
    //     localStorage.removeItem('AdminUser'); // Example: remove the logged-in user from localStorage

    //     // Redirect to home page (you can modify the URL as needed)
    //     window.location.replace('../index.html'); // Redirect to the home page
    // });

    // // Automatically set admin name on page load if already logged in
    // updateLoginButton();

    
});

// function toggleGrade(gradeId) {
//     const gradeElement = document.getElementById(gradeId);
//     const chevronElement = document.getElementById(`chevron${gradeId.slice(-2)}`);
    
//     gradeElement.classList.toggle('active');
//     chevronElement.classList.toggle('up');
//     chevronElement.classList.toggle('down');
// }


function toggleGrade(contentId, chevronId) {
    var chevron = document.querySelectorAll(('#' + chevronId));
    var content = document.querySelectorAll(('#' + contentId));


    chevron.forEach((btn) => {
        btn.classList.toggle('up');
        btn.classList.toggle('down');
    })

    content.forEach((btn) => {
        // Toggle visibility of content
        if (btn.style.display === "none") {
            btn.style.display = "block";

            console.log("11");
        } else {
            btn.style.display = "none";

            console.log("12");
        }
    })
}



