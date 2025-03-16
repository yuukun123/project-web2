/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    const save = document.querySelector('.save');
    const cancel = document.querySelector('.cancel');
    const save_suc = document.querySelector('.save-success');
    const cancel_suc = document.querySelector('.cancel-success');
    const blurOverlay = document.querySelector('.blur-overlay');
    const close = document.querySelector('.close');
    const close2 = document.querySelectorAll('.close2');
    
    save.addEventListener('click', function(event) {
        event.preventDefault();
        save_suc.classList.add('active-popup');
        blurOverlay.classList.add('active');
    })
    
    close.addEventListener('click', function(event) {
        event.stopPropagation();
        save_suc.classList.remove('active-popup');
        blurOverlay.classList.remove('active');
    })
    
    cancel.addEventListener('click', function(event) {
        event.preventDefault();
        cancel_suc.classList.add('active-popup');
        blurOverlay.classList.add('active');
    });
    
    
    close2.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation()
            cancel_suc.classList.remove('active-popup');
            blurOverlay.classList.remove('active');
            
    
            // Check the value of the button and display the appropriate alert
            if (btn.value === "Yes") {
                alert("Cancel success");
            } else if (btn.value === "No") {
                alert("Cancel unsuccess");
            }
        });
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

    // cập nhật kích thước theo database
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
            data.forEach(size => {
                console.log("🧐 Kiểm tra từng phần tử:", size); // Debug từng phần tử

                if (!size.size_id || !size.size_name) {
                    console.warn("⚠️ Dữ liệu bị thiếu hoặc sai:", size);
                    return;
                }

                let option = document.createElement("option");
                option.value = size.size_id;  
                option.textContent = size.size_name;
                sizeSelect.appendChild(option);
            });

            console.log("✅ Dữ liệu đã hiển thị trên select.");
        })
        .catch(error => console.error("❌ Lỗi khi gọi API:", error));
    
    
    // đường đãn ảnh
    document.getElementById("fileInput").addEventListener("change", function() {
        const file = this.files[0];
        if (!file) return;
    
        let formData = new FormData();
        formData.append("file", file);
    
        fetch("../Api_php/upload-img.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("filePath").value = data.filePath; // Hiển thị đường dẫn ảnh
            } else {
                alert("Lỗi upload ảnh: " + data.error);
            }
        })
        .catch(error => console.error("Lỗi khi upload ảnh:", error));
    });
    
    
});


