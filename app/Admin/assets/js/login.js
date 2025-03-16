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
    
    
    
});