/*Home data*/
function myFunction() {
    const input = document.getElementById('search');
    // Add your search functionality here
}

document.addEventListener('DOMContentLoaded', function() {

    
    // Các biến và sự kiện khác của trang...

    // const searchInputs = document.querySelectorAll(".search-input");
    // const searchButtons = document.querySelectorAll(".searchBtn");

    // // Hàm tìm kiếm sản phẩm (giữ nguyên nếu cần)
    // function searchItems(searchTerm) {
    //     let allProducts = document.querySelectorAll("#product-container .movie-item");
    //     if (searchTerm.trim() === "") {
    //         allProducts.forEach(product => product.style.display = "block");
    //         return;
    //     }
    //     let found = false;
    //     allProducts.forEach(product => {
    //         let productName = product.querySelector(".title").innerText.toLowerCase();
    //         if (productName.includes(searchTerm.toLowerCase())) {
    //             product.style.display = "block";
    //             found = true;
    //         } else {
    //             product.style.display = "none";
    //         }
    //     });
    //     if (!found) {
    //         document.getElementById("product-container").innerHTML = "<p>Không tìm thấy sản phẩm nào!</p>";
    //     }
    // }

    // let isSelectingHint = false;
    // // Hàm hiển thị gợi ý tìm kiếm
    // function showHints(inputField) {
    //     const searchTerm = inputField.value.trim();
    //     const hintContainer = inputField.closest(".search-container").querySelector(".hint-container");

    //     if (!searchTerm) {
    //         hintContainer.innerHTML = "";
    //         hintContainer.style.display = "none";
    //         return;
    //     }

    //     fetch(`http://localhost/project-web2/pages/getAllProduct.php?term=${encodeURIComponent(searchTerm)}`)
    //         .then(response => response.json())
    //         .then(products => {
    //             hintContainer.innerHTML = "";
    //             if (!products || products.length === 0) {
    //                 hintContainer.style.display = "none";
    //                 return;
    //             }

    //             products.forEach(item => {
    //                 const hintItem = document.createElement("div");
    //                 hintItem.className = "hint-item";
    //                 // Sử dụng dataset để lưu product_id
    //                 hintItem.dataset.productId = item.product_id;
    //                 hintItem.innerHTML = `
    //                     <img src="${item.image}" alt="${item.product_name}" style="width:30px; height:30px; margin-right:10px;">
    //                     ${item.product_name}
    //                 `;

    //                 // Dùng mousedown để tránh mất focus trước khi xử lý
    //                 hintItem.addEventListener("mousedown", function (event) {
    //                     event.preventDefault(); // Ngăn trình duyệt hiểu là nhấp ra ngoài input
    //                     isSelectingHint = true;
    //                 });

    //                 hintItem.addEventListener("click", function () {
    //                     isSelectingHint = false; // Reset biến
    //                     console.log(item.product_id);
    //                     window.location.href = `home?pages=product&id=${item.product_id}`;
    //                 });                    

    //                 hintContainer.appendChild(hintItem);
    //             });

    //             hintContainer.style.display = "block";
    //         })
    //         .catch(error => console.error("Lỗi khi lấy gợi ý:", error));
    // }

    // let inputTimeout = null; // Biến lưu bộ đếm thời gian
    // // Gán sự kiện cho từng ô tìm kiếm
    // searchInputs.forEach(input => {
    //     input.addEventListener("input", function () {
        
    //         if (event.data === " ") return;

    //         clearTimeout(inputTimeout); // Xóa bộ đếm thời gian trước đó
    //         const searchField = this;
            
    //         inputTimeout = setTimeout(() => {
    //             showHints(searchField); // Gọi hàm hiển thị hint sau khi người dùng ngừng nhập
    //         }, 500); // Chờ 500ms sau khi ngừng nhập mới gọi API
            
    //         if (this.value.trim() === "") {
    //             console.log("Ô tìm kiếm trống - Đang tải lại danh sách sản phẩm gốc...");
    //             // Nếu có hàm loadAllProducts(), gọi ở đây
    //             loadAllProducts();
    //         }
    //     });

    //     input.addEventListener("keypress", function (event) {
    //         if (event.key === "Enter") {
    //             searchItems(this.value);
    //         }
    //     });

    //     input.addEventListener("blur", function () {
    //         setTimeout(() => {
    //             if (!isSelectingHint) {
    //                 this.closest(".search-container").querySelector(".hint-container").style.display = "none";
    //             }
    //             isSelectingHint = false;
    //         }, 200); // Đợi 200ms để kiểm tra xem người dùng có click vào hint không
    //     });

    // });

    // // Xử lý click ngoài vùng input/hint-container
    // document.addEventListener("click", function (event) {
    //     if (!event.target.closest(".search-container") && !event.target.closest(".hint-item")) {
    //         document.querySelectorAll(".hint-container").forEach(hint => {
    //             hint.innerHTML = "";
    //             hint.style.display = "none";
    //         });
    //     }
    // });

    // // Gán sự kiện click cho nút tìm kiếm
    // searchButtons.forEach(button => {
    //     button.addEventListener("click", function () {
    //         let searchInput = button.closest(".input-wrapper").querySelector(".search-input");
    //         if (searchInput) {
    //             searchItems(searchInput.value);
    //         }
    //     });
    // });
    
    

});