document.addEventListener('DOMContentLoaded', function() {
    const save = document.querySelector('.save'); // Nút lưu
    const blurOverlay = document.querySelector('.blur-overlay');
    const save_suc = document.querySelector('.save-success');
    const close = document.querySelector('.close');
    
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
        let description = document.getElementById("description").value.trim();
        let imagePath = document.getElementById("filePath").value.trim();

        // In ra console để debug
        console.log("📌 Dữ liệu nhập vào:");
        console.log("🛒 Name:", name);
        console.log("💲 Price:", price);
        console.log("📌 Status:", status);
        console.log("📁 Category:", category);
        console.log("📏 Size:", size);
        console.log("📃 Description:", description);
        console.log("🖼 Image Path:", imagePath);

        // Kiểm tra nếu có trường nào bị thiếu
        if (!name || !price || !status || !category || !size || !imagePath) {
            alert("⚠️ Vui lòng điền đầy đủ thông tin!");
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
        formData.append("description", description);
        formData.append("image", imagePath);

        // Gửi request AJAX để lưu sản phẩm
        fetch("../Controllers/add-product-process.php", {
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
                alert("✅ Thêm sản phẩm thành công!");
                
                // Reset form sau khi lưu
                let form = document.getElementById("add-product-form"); // 🔹 Đúng ID của form
                if (form) {
                    form.reset();
                } else {
                    console.error("❌ Lỗi: Không tìm thấy form với ID 'add-product-form'.");
                }                

            } else {
                alert("❌ Lỗi khi lưu sản phẩm: " + data.message);
            }
        })
        .catch(error => {
            console.error("❌ Lỗi khi gửi dữ liệu:", error);
            alert("❌ Có lỗi xảy ra! Vui lòng thử lại.");
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
    fetch("../Api_php/get-size.php")
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

            console.log("✅ Dữ liệu đã hiển thị trên select.");
        })
        .catch(error => console.error("❌ Lỗi khi gọi API:", error));
    
    
    // Đường dẫn ảnh
    document.getElementById("fileInput").addEventListener("change", function (event) {
        previewImage(event);  // 👉 Gọi hàm preview
    
        let file = this.files[0];
        let category = document.getElementById("category").value; // Lấy category từ select
    
        if (!category) {
            alert("⚠️ Vui lòng chọn category trước khi upload hình!");
            return;
        }
    
        let formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);
    
        fetch("../Api_php/upload-img.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                // ✅ Chỉ gán vào input #filePath
                let filePathInput = document.getElementById("filePath");
                filePathInput.value = data.filePath;
            } else {
                alert("❌ Upload failed: " + data.error);
            }
        })
        .catch(error => console.error("❌ Lỗi khi upload ảnh:", error));
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
            preview.src = '';
            preview.style.display = 'none';
            filePathInput.value = '';
        }
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
    

});
