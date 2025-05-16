
document.addEventListener("DOMContentLoaded", function () {
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

    loadInitialData();
        document.getElementById("filterForm").addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("✅ Form submit, gọi filterData()");
            filterData();
        });
         // Lắng nghe sự kiện click của các button `.js-detail-btn`
         document.addEventListener("click", function (event) {
            let detailBtn = event.target.closest(".js-detail-btn");
            if (detailBtn) {
                event.preventDefault();
                let productId = detailBtn.getAttribute("data-id");
                console.log("📝 Lấy chi tiết hóa đơn của sản phẩm ID:", productId);
                if (productId) {
                    showDetail(productId);
                } else {
                    console.warn("⚠ Không có product_id hợp lệ");
                }
            }
        });
    });
    // Lấy dữ liệu khi trang load
    function loadInitialData() {
        fetch("Controllers/statistical-process.php")
            .then(response => response.json())
            .then(data => {
                console.log("Dữ liệu từ PHP:", data);
                console.log("📌 Best Seller:", data.bestseller);
                console.log("📌 Unpopular:", data.unpopular);
                renderData(data.bestseller, "orderBodyBestSeller");
                renderData(data.unpopular, "orderBodyUnpopular");
            })
            .catch(error => console.error("Lỗi:", error));
    }
    // **Hàm gửi yêu cầu lọc**
    function filterData() {
        console.log("⏳ Hàm filterData() đã chạy");
        let fromDate = document.getElementById("fromDate").value;
        let toDate = document.getElementById("toDate").value;
        window.filterRange = { fromDate, toDate };
        console.log("📤 Gửi dữ liệu lọc:", { fromDate, toDate });
        let requestData = {
            fromDate: fromDate,
            toDate: toDate
        };

        fetch("Controllers/filter-statiscal-process.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
        
        .then(response => response.json())  
        .then(data => {
            console.log("Dữ liệu lọc:", data);
            
            // Sử dụng dữ liệu lọc thay vì dữ liệu gốc
            if (data.bestseller_filter.length > 0 || data.unpopular_filter.length > 0) {
                renderData(data.bestseller_filter, "orderBodyBestSeller");
                renderData(data.unpopular_filter, "orderBodyUnpopular");
            } else {
                alert("Please enter date to filter !")
            }
        })
        .catch(error => console.error("❌ Lỗi khi lọc dữ liệu:", error));
    }


    // **Hàm render dữ liệu cho cả 2 bảng**
    function renderData(data, tableId) {
        let tableBody = document.getElementById(tableId);
        tableBody.innerHTML = ""; 
        let rows = "";
        data.forEach((order, index) => {
            rows += `
                <tr>
                    <td>#${index + 1}</td>
                    <td>${order.product_name}</td>
                    <td>${order.total_quantity}</td>
                    <td>
                        <button class="js-detail-btn" data-id="${order.product_id || ''}">
                            <ion-icon name="receipt-outline"></ion-icon>
                        </button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = rows;
    }
// Gửi yêu cầu lấy dữ liệu chi tiết hóa đơn
function showDetail(productId) {
    console.log("📤 Gửi yêu cầu lấy hóa đơn cho sản phẩm ID:", productId);
    let url = `Controllers/detail-statistical-process.php?product_id=${productId}`
     // Nếu đã có filterRange thì thêm vào query string
    if (window.filterRange && window.filterRange.fromDate && window.filterRange.toDate) {
        url += `&fromDate=${window.filterRange.fromDate}&toDate=${window.filterRange.toDate}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("📦 Dữ liệu hóa đơn nhận được:", data);

            if (data.length > 0) {
                renderReceipt(data);
                document.querySelector(".div-receipt").classList.add("open");
            } else {
                alert("No invoice contains this product.");
            }
        })
        .catch(error => console.error("❌ Lỗi khi tải hóa đơn:", error));
}
// Hiển thị thông tin hóa đơn
function renderReceipt(data) {
    let receiptContainer = document.querySelector(".receipt");

    console.log("📦 Dữ liệu hóa đơn nhận được:", data); // ✅ Debug 1: Xem dữ liệu đầu vào

    // Nhóm sản phẩm theo từng order_id
    let ordersMap = {};
    data.forEach(order => {
        if (!ordersMap[order.order_id]) {
            ordersMap[order.order_id] = {
                orderInfo: order,
                products: []
            };
        }
        ordersMap[order.order_id].products.push(order);
    });

    console.log("📊 Nhóm hóa đơn theo order_id:", ordersMap); // ✅ Debug 2: Kiểm tra dữ liệu nhóm

    let orderIds = Object.keys(ordersMap);
    
    let receiptsHTML = orderIds.map(orderId => {
        let orderData = ordersMap[orderId];
        let order = orderData.orderInfo;

        console.log(`📝 Hóa đơn ID: ${order.order_id} có ${orderData.products.length} sản phẩm`, orderData.products); // ✅ Debug 3: Xác nhận số lượng sản phẩm trong hóa đơn

        // ✅ Lấy tất cả sản phẩm của hóa đơn này
        let rows = orderData.products.map(product => `  
            <tr>
                <td>${product.product_name}</td>
                <td>${product.quantity}</td>
                <td>${new Intl.NumberFormat('vi-VN').format(product.price * product.quantity)} đ</td>
                <td>${product.note || "Không có"}</td>
            </tr>
        `).join("");

        return `
            <div class="receipt-box">
                <p class="title-receipt">ID Receipt: <strong>#${order.order_id}</strong></p>

                <div class="form-group">
                    <label><strong>Customer name:</strong></label>
                    <input type="text" value="${order.user_name}" readonly>
                </div>
                <div class="form-group">
                    <label><strong>Phone number:</strong></label>
                    <input type="text" value="${order.phone}" readonly>
                </div>
                <div class="form-group">
                    <label><strong>Delivery address:</strong></label>
                    <input type="text" value="${order.shipping_street}, ${order.shipping_ward}, ${order.shipping_district}, ${order.shipping_city}" readonly>
                </div>
                <div class="form-group">
                    <label><strong>Delivery date:</strong></label>
                    <input type="text" value="${order.delivery_date}" readonly>
                </div>
                <div class="form-group">
                    <label><strong>Status:</strong></label>
                    <input type="text" value="${order.status}" readonly>
                </div>
                <div class="form-group">
                    <label><strong>Greeting message:</strong></label>
                    <input type="text" value="${order.notes || "Không có"}" readonly>
                </div>

                <table class="table-detail">
                    <thead>
                        <tr>
                            <th>Name product</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}  
                        <tr>
                            <td style="font-weight: bold; text-align: right;">Total:</td>
                            <td colspan="3">${new Intl.NumberFormat('vi-VN').format(order.total_cost)} đ</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; text-align: right;">Payment method:</td>
                            <td colspan="3">${order.payment_method}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }).join("");

    // Thêm nút Cancel cố định bên ngoài các hóa đơn
    receiptsHTML += `
        <div class="close-btn fixed">
            <button onclick="closeDetail()">Cancel<ion-icon name="close-outline"></ion-icon></button>
        </div>
    `;

    console.log("📜 HTML hóa đơn được tạo:", receiptsHTML); // ✅ Debug 4: Xem HTML trước khi gán vào DOM

    receiptContainer.innerHTML = receiptsHTML;
}



// Đóng hóa đơn
function closeDetail() {
    document.querySelector(".div-receipt").classList.remove("open");
}
