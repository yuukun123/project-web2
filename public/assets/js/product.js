document.addEventListener("DOMContentLoaded", function () {
    const minusBtn = document.querySelector(".minus-btn");
    const plusBtn = document.querySelector(".plus-btn");
    const quantityInput = document.querySelector(".quantity-button input");
    const shoppingCart = document.querySelector(".shopping-cart"); // Cửa sổ giỏ hàng
    const addToCartBtn = document.querySelector(".add-to-cart-detail");
    const cartCount = document.querySelector(".cart-count"); // Số lượng hiển thị trên giỏ hàng
    const blurOverlay = document.querySelector(".blur-overlay");

    // 🔼 Tăng số lượng
    plusBtn.addEventListener("click", function () {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // 🔽 Giảm số lượng (không nhỏ hơn 1)
    minusBtn.addEventListener("click", function () {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // 🛒 Xử lý thêm vào giỏ hàng
    addToCartBtn.addEventListener("click", function () {
        const productId = addToCartBtn.dataset.id;
        const quantity = parseInt(quantityInput.value);

        fetch("includes/cart_action_detail.php", { // GỌI ĐÚNG FILE PHP
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "add",
                product_id: productId,
                quantity: quantity // Gửi số lượng từ input
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.redirect) {
                window.location.href = data.redirect;
            }
            
            alert(data.message); // Thông báo sản phẩm đã được thêm

            if (data.success) {
                fetchCart();
                updateCartCount(data.cart_count); // Cập nhật số lượng giỏ hàng
            }
        })
        .catch((error) => console.error("Lỗi:", error));
    });

    function fetchCart() {
        fetch("includes/cart.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.text())
        .then(data => {
            console.log("Dữ liệu giỏ hàng nhận được:", data);
            const cartContent = document.querySelector(".cart-scroll"); // Chỉ cập nhật nội dung sản phẩm
            if (cartContent) {
                if (data.includes("empty-cart")) { // Kiểm tra nếu có nội dung rỗng từ PHP
                    cartContent.innerHTML = `
                        <div class="emptyCart">
                            <div class="close-icon"> <ion-icon name="alert-circle-outline"></ion-icon> </div>
                            <p class="empty-cart">Your cart is empty.</p>
                        </div>
                    `;
                }
                else {
                    // Cập nhật danh sách sản phẩm mà không ảnh hưởng nút đóng
                    cartContent.innerHTML = data;
                }
            } else {
                console.error("Không tìm thấy phần tử .cart-content trên trang!");
            }
    
            // Hiển thị giỏ hàng và lớp mờ nếu chưa hiển thị
            shoppingCart.classList.add("active");
            if (blurOverlay) blurOverlay.classList.add("active");
        })
        .catch(error => console.error("Lỗi khi fetch giỏ hàng:", error));
    }

    // 🔄 Hàm cập nhật số lượng giỏ hàng
    function updateCartCount() {
        fetch("includes/cart_action.php?cart_count=1", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log("Số lượng giỏ hàng:", data.count);
            if (cartCount) {
                cartCount.textContent = data.count || 0;
            }
        })
        .catch(error => console.error("Lỗi khi lấy số lượng giỏ hàng:", error));
    }

    updateCartCount();
});
