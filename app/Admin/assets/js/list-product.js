// const deleteImg = document.querySelector(".deleteimg")
// deleteImg.addEventListener('click',function(){
//     alert("Delete image successfully !")
// })


//  KHI CÓ SERVER PHP RỒI THÌ DÙNG ĐOẠN CODE NÀY
// // Giả sử bạn có sẵn đường dẫn ảnh cũ (VD: "uploads/old_image.jpg")
//   // Có thể được trả về từ một biến JS, AJAX, hay được nhúng sẵn
//   var oldImagePath = "uploads/old_image.jpg"; // Demo

//   // Gán đường dẫn cũ vào phần hiển thị text
//   document.getElementById("imagePathText").textContent = oldImagePath;

//   // Gán đường dẫn cũ vào thẻ <img> để hiển thị preview
//   var imgPreview = document.getElementById("imagePreview");
//   imgPreview.src = oldImagePath;

//   // Trường hợp bạn muốn hiển thị ảnh mới chọn (live preview) 
//   // thì có thể lắng nghe sự kiện change của input file:
//   var fileInput = document.getElementById("product_image");
//   fileInput.addEventListener("change", function(e) {
//     if (fileInput.files && fileInput.files[0]) {
//       // Tạo object URL để xem trước
//       var newImageURL = URL.createObjectURL(fileInput.files[0]);
//       imgPreview.src = newImageURL;
//       document.getElementById("imagePathText").textContent = "File just selected: " + fileInput.files[0].name;
//     }
// });

// 1) Lấy ảnh hiện tại và hiển thị đường dẫn theo định dạng "uploads/TênFile.jpg"
const imgElement = document.getElementById('imagePreview');
const filePathInput = document.getElementById('filePath');

// Lấy src tuyệt đối của ảnh
const fullSrc = imgElement.src;
const segments = fullSrc.split('/');
const fileName = segments[segments.length - 1];

// Gán đường dẫn theo format "uploads/TênFile.jpg"
filePathInput.value = "uploads/" + fileName;

// 2) Xử lý khi chọn ảnh mới
function handleFileChange(inputElement) {
    const file = inputElement.files[0];
    if (file) {
    // Cập nhật đường dẫn file
    const uploadPath = 'uploads/' + file.name;
    filePathInput.value = uploadPath;

    // Cập nhật ảnh hiển thị
    if (typeof URL.createObjectURL === 'function') {
        imgElement.src = URL.createObjectURL(file);
    } else {
        console.error("URL.createObjectURL không khả dụng trong trình duyệt này.");
    }
    }
}

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {

    function getCurrentUser() {
        const admins = localStorage.getItem('AdminUser');
        return admins ? JSON.parse(admins) : [];
    }
    

    if (localStorage.getItem("loggedAd") === "true") {
        const currentUser = getCurrentUser(); // Default to "User" if no username found
        const notificate = document.getElementById("notificate");
        const message = document.getElementById("message");
    
        // Display personalized messages
        message.innerHTML = `Welcome back, ${currentUser.username}!<br>Have a good day!`;
        notificate.classList.add("show");

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notificate.classList.remove("show");
        notificate.classList.add("hide"); // Add 'hide' to slide out

        // Optional: Remove the element from the DOM after animation
        setTimeout(() => {
            notificate.style.display = "none";
        }, 2000); // Match the CSS transition duration
    }, 3000);
    
        // Clear the login flag and username
        localStorage.removeItem("loggedAd");
        localStorage.removeItem("username");
    }

    // Check if the admin is logged in and update button text
    function updateLoginButton() {
        const loginButton = document.getElementById('login-btn');

        const admins = getCurrentUser();

        if (admins) {
            loginButton.textContent = admins.username; // Change button to admin's name
            loginButton.disabled = true; // Optionally, disable the button after login
        }
    }

    const logoutButton = document.getElementById('logout-btn');

    // Handle the logout functionality
    logoutButton.addEventListener('click', function() {
        // Optionally, clear user data from localStorage or sessionStorage
        localStorage.removeItem('currentUser'); // Example: remove the logged-in user from localStorage

        // Redirect to home page (you can modify the URL as needed)
        window.location.href = '../index.html'; // Redirect to the home page
    });

    // Automatically set admin name on page load if already logged in
    updateLoginButton();
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



// Hàm hiển thị form sửa và điền dữ liệu vào form
function editProduct(product) {
    // Hiển thị form sửa và overlay
    document.getElementById('editNotification').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    // Gán dữ liệu sản phẩm vào form
    document.getElementById('product_name').value = product.product_name;
    document.getElementById('product_price').value = product.price;
    document.getElementById('product_category').value = product.category_name || product.category_id;
    document.getElementById('product_status').value = product.status;

    // Hiển thị ảnh hiện tại
    const img = document.getElementById('current_product_image');
    img.src = product.image;
    img.style.display = 'block';

    // Đảm bảo nút "Save" xử lý gửi dữ liệu mới
    const form = document.querySelector('#editNotification form');
    form.onsubmit = function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product_id', product.product_id);
        formData.append('product_name', document.getElementById('product_name').value);
        formData.append('price', document.getElementById('product_price').value);
        formData.append('category_id', document.getElementById('product_category').value);
        formData.append('status', document.getElementById('product_status').value);

        const imageInput = document.getElementById('product_image');
        if (imageInput.files.length > 0) {
            formData.append('product_image', imageInput.files[0]);
        }

        fetch(`/project-web2/app/Admin/Views/products/list.product.php?id=${productId}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Cập nhật sản phẩm thành công!');
                hideNotification('editNotification');
                location.reload(); // Hoặc cập nhật giao diện nếu cần
            } else {
                alert('Cập nhật thất bại: ' + data.message);
            }
        })
        .catch(err => {
            console.error(err);
            alert('Có lỗi xảy ra khi gửi dữ liệu!');
        });
    };
}

function showEditNotification() {
    document.getElementById('editNotification').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideNotification(notificationId) {
    document.getElementById(notificationId).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function confirmDelete() {
    alert('Product has been deleted!');
    hideNotification('deleteNotification');
}

function showDeleteNotification() {
    document.getElementById('deleteNotification').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

