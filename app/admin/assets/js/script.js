function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
    // Toggle active class for all hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}

// Logo click event to navigate to home.php
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'home';
    });
}

// Function: Toggle Grade (hide/show content)
function toggleGrade(contentId, chevronId) {
    // Sử dụng template literal để chọn phần tử theo id
    const chevrons = document.querySelectorAll(`#${chevronId}`);
    const contents = document.querySelectorAll(`#${contentId}`);

    chevrons.forEach(btn => {
        btn.classList.toggle('up');
        btn.classList.toggle('down');
    });

    contents.forEach(el => {
        // Nếu chưa có giá trị display hoặc đang ẩn, hiện ra; ngược lại, ẩn đi.
        if (el.style.display === "none" || el.style.display === "") {
            el.style.display = "block";
            console.log("Hiển thị nội dung");
        } else {
            el.style.display = "none";
            console.log("Ẩn nội dung");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Function: Toggle Menu


    // Function: Display welcome message (chỉ hiển thị 1 lần)
    function displayWelcomeMessage() {
        // Nếu đã hiển thị lời chào trước đó, không làm gì cả
        if (localStorage.getItem("welcomeShownAdmin") === "true") {
            return;
        }
        
        fetch('Api_php/session-admin.php', {
            method: 'GET',
            credentials: 'include'  // đảm bảo gửi cookie phiên
        })
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn && data.username) {
                const notificate = document.getElementById("notificate");
                const message = document.getElementById("message");

                if (notificate && message) {
                    // Hiển thị lời chào cá nhân hóa dựa trên dữ liệu từ session-admin.php
                    message.innerHTML = `Welcome back, ${data.username}!<br>Have a good day!`;
                    
                    // Đảm bảo phần thông báo hiển thị
                    notificate.style.display = "block";
                    notificate.classList.add("show");

                    // Sau 2 giây, ẩn thông báo với hiệu ứng chuyển động
                    setTimeout(() => {
                        notificate.classList.remove("show");
                        notificate.classList.add("hide");

                        // Sau khi animation hoàn tất, ẩn hoàn toàn phần thông báo
                        setTimeout(() => {
                            notificate.style.display = "none";
                        }, 1000); // Thời gian này cần khớp với CSS transition duration
                    }, 2000);

                    // Đánh dấu đã hiển thị lời chào để lần sau không hiển thị lại
                    localStorage.setItem("welcomeShownAdmin", "true");
                }
            }
        })
        .catch(error => console.error("Error fetching session data:", error));
    }

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

    // Gọi hiển thị lời chào nếu đăng nhập

    displayWelcomeMessage();

    // Các chức năng khác (ví dụ: xử lý giỏ hàng, tìm kiếm, ...)
    // ...
});