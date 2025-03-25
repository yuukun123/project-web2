/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
    
        let formData = new FormData(this);
    
        fetch("Login_Processing/login_processing.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Dữ liệu từ server:", data); // Hiển thị toàn bộ dữ liệu trả về
            console.log("Tên người dùng vừa nhập:", data.username_nhap);
            console.log("Mật khẩu vừa nhập:", data.password_nhap);
            
            if (data.status === "success") {
                console.log("Tên người dùng từ DB:", data.username_db);
                console.log("Mật khẩu từ DB (hash):", data.password_db);
                window.location.href = data.redirect;
            } else {
                console.log("Lỗi đăng nhập:", data.message);
                alert(data.message);
            }
        })
        .catch(error => console.error("Lỗi:", error));
    });

    function checkLoginStatus(callback) {
        console.log("Đang gọi checkLoginStatus...");
        fetch("Api_php/session-admin.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => {
            console.log("Response status:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu session trả về:", data);
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
    
    checkLoginStatus(isLoggedIn => {
        if (!isLoggedIn) {
            console.log("Không đăng nhập, xóa flag welcomeShownAdmin");
            localStorage.removeItem("welcomeShownAdmin");
            console.log("welcomeShownAdmin flag removed:", localStorage.getItem("welcomeShownAdmin"));
        }
    });
});