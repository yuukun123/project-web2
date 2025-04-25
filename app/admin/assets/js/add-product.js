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

    let allSizes = [];

    const save = document.querySelector('.save'); // Nút lưu
    const blurOverlay = document.querySelector('.blur-overlay');
    const save_suc = document.querySelector('.save-success');
    const close = document.querySelector('.close');
    const fileInput = document.getElementById("fileInput")
    const categorySelect = document.getElementById("category");
    
    // Biến flag để ngăn double submit
    let isSubmitting = false;

    // Bắt sự kiện khi ấn nút "Save"
    save.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn load lại trang
        
        // Nếu đang gửi, không thực hiện lại
        if(isSubmitting) return;
        isSubmitting = true;

        // Lấy dữ liệu từ form
        let name = document.getElementById("name").value.trim();
        let price = document.getElementById("price").value.trim();
        let status = document.getElementById("status").value.trim();
        let category = document.getElementById("category").value.trim();
        let size = document.getElementById("size").value.trim();
        let ingredient = document.getElementById("ingredient").value.trim();
        let imagePath = document.getElementById("filePath").value.trim();
        let expirationDate = document.getElementById("expiration_date").value.trim();
        let storage = document.getElementById("storage").value.trim();
        // Kiểm tra giá trị của giá trị đã nhập
        if (!/^\d+(\.\d{1,2})?$/.test(price)) {
            alert("���️ Price must be a valid number (e.g., 12.34)");
            isSubmitting = false;  // reset flag
            return;
        }
        
        if (!expirationDate) {
            alert("⚠️ Please select an expiration date!");
            isSubmitting = false;  // reset flag
            return;
        }
        
        // Đảm bảo định dạng ngày tháng kiểu TEXT (YYYY-MM-DD)
        let expirationDateText = expirationDate; 

        // In ra console để debug
        console.log("📌 Dữ liệu nhập vào:");
        console.log("🛒 Name:", name);
        console.log("💲 Price:", price);
        console.log("📌 Status:", status);
        console.log("📁 Category:", category);
        console.log("📏 Size:", size);
        console.log("📃 Ingredient:", ingredient);
        console.log("📅 Expiration Date:", expirationDate);
        console.log("🏠 Storage:", storage);
        console.log("🖼 Image Path:", imagePath);

        // Kiểm tra nếu có trường nào bị thiếu
        if (!name || !price || !status || !category || !size || !imagePath) {
            alert("⚠️ Please fill in all the information!");
            isSubmitting = false;  // reset flag
            return;
        }

        // Tạo object dữ liệu gửi đi
        let formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("status", status);
        formData.append("category", category);
        formData.append("size", size);
        formData.append("ingredient", ingredient);
        formData.append("expiration_date", expirationDateText); // Đảm bảo định dạng kiểu TEXT
        formData.append("storage", storage); // Nếu cần thiết
        formData.append("image", imagePath);

        // Gửi request AJAX để lưu sản phẩm
        fetch("Controllers/add-product-process.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("📌 Phản hồi từ server:", data); // Kiểm tra phản hồi từ server

            if (data.success) {
                // Hiển thị popup thành công
                save_suc.classList.add('active-popup');
                blurOverlay.classList.add('active');
                
                // Hiển thị thông báo
                alert("✅ Product added successfully.!");
                
                // Reset form sau khi lưu
                let form = document.getElementById("add-product-form"); // 🔹 Đúng ID của form
                if (form) {
                    form.reset();
                } else {
                    console.error("❌ Lỗi: Không tìm thấy form với ID 'add-product-form'.");
                }                

            } else {
                alert("❌ Error saving product: " + data.message);
            }
        })
        .catch(error => {
            console.error("❌ Lỗi khi gửi dữ liệu:", error);
            alert("❌ An error occurred! Please try again.");
        })
        .finally(() => {
            // Reset lại flag sau khi hoàn thành gửi
            isSubmitting = false;
        });
    });

    // Đóng popup khi bấm nút close
    close.addEventListener('click', function(event) {
        event.stopPropagation();
        save_suc.classList.remove('active-popup');
        blurOverlay.classList.remove('active');
    });
    
    const addCategory = document.querySelector('.add-category');
    const addStatus = document.querySelector('.add-status');
    
    addCategory.addEventListener('click', function(event) {
        event.preventDefault();
        alert("This function is still under development")
    });
    
    addStatus.addEventListener('click', function(event) {
        event.preventDefault();
        alert("This function is still under development")
    });

    // Cập nhật kích thước theo database
    let sizeSelect = document.getElementById("size");

    // Xóa dữ liệu cũ và giữ lại option mặc định
    sizeSelect.innerHTML = '<option selected="selected">--Select size--</option>';

    // Gọi API để lấy danh sách size
    fetch("Api_php/get-size.php")
        .then(response => response.json())
        .then(data => {
            console.log("📌 Dữ liệu từ API:", data); // Kiểm tra dữ liệu API

            // Kiểm tra dữ liệu có đúng là mảng không
            if (!Array.isArray(data)) {
                console.error("❌ API không trả về mảng hợp lệ:", data);
                return;
            }

            // Thêm dữ liệu vào <select>
            data.forEach(item => {
                console.log("🧐 Kiểm tra từng phần tử:", item); // Debug từng phần tử

                if (!item.size_id || !item.size_name) {
                    console.warn("⚠️ Dữ liệu bị thiếu hoặc sai:", item);
                    return;
                }

                let option = document.createElement("option");
                option.value = item.size_id;  
                option.textContent = item.size_name;
                sizeSelect.appendChild(option);
            });

            // 👉 Lưu vào biến toàn cục
            allSizes = data;

            console.log("✅ Dữ liệu size đã lưu vào allSizes:", allSizes);

            console.log("✅ Dữ liệu đã hiển thị trên select.");
        })
        .catch(error => console.error("❌ Lỗi khi gọi API:", error));

    // Cập nhật danh sách category theo database
    categorySelect.addEventListener('change', function () {
        const selectedCategory = this.value.trim().toLowerCase();
        console.log("🔍 Category đã chọn:", selectedCategory);
        console.log("📦 Danh sách size hiện tại:", allSizes);
    
        sizeSelect.innerHTML = '<option selected="selected">--Select size--</option>';
    
        let filteredSizes = [];
    
        if (selectedCategory === "mousse") {
            filteredSizes = allSizes.filter(size => size.size_name.toLowerCase() === "16cm");
        } else if (selectedCategory === "drink") {
            filteredSizes = allSizes.filter(size => size.size_name.toLowerCase() === "l");
        } else if (selectedCategory === "croissant") {
            filteredSizes = allSizes.filter(size => size.size_name.toLowerCase() === "10cm");
        }
    
        if (filteredSizes.length === 0) {
            console.warn(`⚠️ Không có size phù hợp cho category "${selectedCategory}"`);
            return;
        }
    
        filteredSizes.forEach(item => {
            const option = document.createElement("option");
            option.value = item.size_id;
            option.textContent = item.size_name;
            sizeSelect.appendChild(option);
        });
    
        console.log("✅ Size đã cập nhật theo category.");
    });
    
    
    // Đường dẫn ảnh
    fileInput.addEventListener("change", function (event) {
        const file = this.files[0];

        // Kiểm tra nếu chưa chọn category
        if (!categorySelect.value || categorySelect.value === "--Select category--") {
            alert("⚠️ Please select a category before uploading an image!");
            fileInput.value = "";
            return;
        }

        // Kiểm tra định dạng và kích thước
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            alert("❌ Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.");
            fileInput.value = "";
            clearPreview();
            return;
        }

        if (file.size > maxSize) {
            alert("❌ File size exceeds 5MB. Please choose a smaller image.");
            fileInput.value = "";
            clearPreview();
            return;
        }

        // 👉 Nếu hợp lệ thì hiển thị preview và upload
        previewImage(event);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", categorySelect.value);

        fetch("Api_php/upload-img.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                const filePathInput = document.getElementById("filePath");
                filePathInput.value = data.filePath;
            } else {
                alert("❌ Upload failed: " + data.error);
                clearPreview();
                fileInput.value = "";
            }
        })
        .catch(error => {
            console.error("❌ Lỗi khi upload ảnh:", error);
            clearPreview();
            fileInput.value = "";
        });
    });

    function previewImage(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('imagePreview');
        const filePathInput = document.getElementById('filePath');

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
            reader.readAsDataURL(file);
            filePathInput.value = file.name;
        } else {
            clearPreview();
        }
    }

    function clearPreview() {
        const preview = document.getElementById('imagePreview');
        const filePathInput = document.getElementById('filePath');

        preview.src = '';
        preview.style.display = 'none';
        filePathInput.value = '';
    }


    // Xóa dữ liệu khi form reset
    const form = document.getElementById("add-product-form");  // �� Đúng ID của form
    form.addEventListener("reset", function() {
        const preview = document.getElementById('imagePreview');
        preview.src = '';
        preview.style.display = 'none';
    
        // Cũng nên xóa đường dẫn trong input filePath:
        document.getElementById('filePath').value = '';
    });
    
    document.getElementById('expiration_date').setAttribute('min', new Date().toISOString().split('T')[0]);

});
