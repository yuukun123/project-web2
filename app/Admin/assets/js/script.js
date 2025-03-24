function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Toggle active class for both hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {

    e.preventDefault();
    window.location.href = 'home.php'; 
});



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

function displayWelcomeMessage() {
    // Nếu đã hiển thị lời chào trước đó, không làm gì cả
    if (localStorage.getItem("welcomeShownAdmin") === "true") {
        return;
    }
    
    fetch('../Api_php/session-admin.php', {
        method: 'GET',
        credentials: 'include'  // đảm bảo gửi cookie phiên
    })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn && data.username) {
            const notificate = document.getElementById("notificate");
            const message = document.getElementById("message");

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
    })
    .catch(error => console.error("Error fetching session data:", error));
}


document.addEventListener("DOMContentLoaded", function () {

    displayWelcomeMessage();

});
