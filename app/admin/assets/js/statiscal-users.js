/*admin data*/
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

    console.log("✅ DOM đã load");
    loadInitialData();
    document.getElementById("filterForm").addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("✅ Form submit, gọi filterData()");
            filterData();
        });
    document.addEventListener("click", function (event) {
        let detailBtn = event.target.closest(".js-function-detail");
        if (detailBtn) {
            event.preventDefault();
            let userName = detailBtn.getAttribute("data-name");
            console.log("📝 Lấy chi tiết hóa đơn của user ID:", userName);
            if (userName) {
                showDetail(userName);
            } else {
                console.warn("⚠ Không có user_name hợp lệ");
            }
        }
    });

});

function loadInitialData() {
    fetch("Controllers/statistical-user-process.php")
        .then(response => response.json())
        .then(data => {
            console.log("Dữ liệu từ PHP:", data);
            renderUser(data);
        })
        .catch(error => console.error("Lỗi:", error));
}

function filterData() {
    console.log("⏳ Hàm filterData() đã chạy");
    let fromDate = document.getElementById("fromDate").value;
    let toDate = document.getElementById("toDate").value;
    // Lưu thời gian lọc vào biến toàn cục hoặc localStorage
    window.filterRange = { fromDate, toDate };
    console.log("📤 Gửi dữ liệu lọc:", { fromDate, toDate });
        let requestData = {
            fromDate: fromDate,
            toDate: toDate
        };

    fetch("Controllers/filter-statiscal-user-process.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log("🔹 Dữ liệu lọc:", data);
        if (data.length === 0) {
            alert("User not found!");
            return;
        }
        if (data.error) {
            console.warn("⚠️ Lỗi từ server:", data.error);
        } else {
            
                renderUser(data);
            
        }
    })
    .catch(error => console.error("❌ Lỗi khi fetch dữ liệu:", error));
}

function renderUser(data) {
    let tableBody = document.getElementById("orderBodyUsers");
    if (!tableBody) return;
    
    // 🟢 Lấy phần tử đầu tiên của data vì nó chứa danh sách user
    let usersList = Array.isArray(data[0]) ? data[0] : data; 

    tableBody.innerHTML = ""; 
    let rows = "";

    usersList.forEach((user, index) => {
        rows += `
            <tr>
                <td>#${index + 1}</td>
                <td>${user.user_name}</td>
                <td>${user.email}</td>
                <td>${user.total_order}</td>
                <td>${new Intl.NumberFormat('vi-VN').format(user.total_spending)} đ</td>
                <td>
                    <button class="js-function-detail" data-name="${user.user_name || ""}"><ion-icon name="receipt-outline"></ion-icon></button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = rows;
}
// Gửi yêu cầu lấy dữ liệu chi tiết hóa đơn
function showDetail(userName) {
    console.log("📤 Gửi yêu cầu lấy hóa đơn cho user:", userName);
    let url = `Controllers/detail-statistical-user.php?user_name=${userName}`
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

    let orderIds = Object.keys(ordersMap);
    
    let receiptsHTML = orderIds.map(orderId => {
        let orderData = ordersMap[orderId];
        let order = orderData.orderInfo;
        let rows = orderData.products.map(product => `
            <tr>
                <td>${product.product_name}</td>
                <td>${product.quantity}</td>
                <td>${new Intl.NumberFormat('vi-VN').format(product.price * product.quantity)} đ</td>
                <td>${product.note}</td>
            </tr>
        `).join("");

        return `
            <div class="receipt-box">
                <p class="title-receipt">ID Receipt: <strong>#${order.order_id}</strong></p>

                <div class="form-group">
                    <label><strong>Customer:</strong></label>
                    <input type="text" value="${order.user_name}" readonly>
                </div>
                <div class="form-group">
                    <label><strong>Phone number:</strong></label>
                    <input type="text" value="${order.phone}" readonly>
                </div>
                <div class="form-group">
                    <label><strong>Delivery address:</strong></label>
                    <input type="text" id="shippingAddress" value=" ${order.shipping_street}, ${order.shipping_ward}, ${order.shipping_district}, ${order.shipping_city}" readonly>
                </div>
                <div class="form-group">
                    <label><strong>Order date:</strong></label>
                    <input type="text" value="${order.order_date}" readonly>
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
                    <input type="text" value="${order.notes}" readonly>
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

    receiptContainer.innerHTML = receiptsHTML;
}



// Đóng hóa đơn
function closeDetail() {
    document.querySelector(".div-receipt").classList.remove("open");
}
// const receiptBtns =  document.querySelectorAll('.js-function-detail')
// const Receipt = document.querySelector('.div-receipt')
// const closebtn = document.querySelector('.close-btn')
// for(const receiptBtn of receiptBtns){
//     receiptBtn.addEventListener('click',function(){
       
//         Receipt.classList.add('open')
//     })
// }
// closebtn.addEventListener('click',function(){
    
//     Receipt.classList.remove('open')
// })
