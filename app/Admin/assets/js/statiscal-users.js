/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM đã load");
    loadInitialData();
    document.getElementById("BtnSearch").addEventListener("click", search);
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
    fetch("../../Admin/Controllers/statistical-user-process.php")
        .then(response => response.json())
        .then(data => {
            console.log("Dữ liệu từ PHP:", data);
            renderUser(data);
        })
        .catch(error => console.error("Lỗi:", error));
}

function search() {
    console.log("🔍 Đã nhấn nút search");
    const searchBox = document.getElementById("searchUser");
    if (!searchBox) {
        console.error("❌ Không tìm thấy input searchUser");
        return;
    }
    
    const searchValue = searchBox.value.trim();
    if (!searchValue) {
        alert("⚠️ Please enter keyword search!");
        loadInitialData();
        return;
    }

    const requestData = { searchValue: searchValue };

    fetch("../../Admin/Controllers/searchUser-statistical-process.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log("🔹 Dữ liệu search:", data);
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
                <td>${user.total_order}</td>
                <td>${user.total_spending}</td>
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
    console.log("📤 Gửi yêu cầu lấy hóa đơn cho sản phẩm ID:", userName);
    fetch(`../../Admin/Controllers/detail-statistical-user.php?user_name=${userName}`)
        .then(response => response.json())
        .then(data => {
            console.log("📦 Dữ liệu hóa đơn nhận được:", data);

            if (data.length > 0) {
                renderReceipt(data);
                document.querySelector(".div-receipt").classList.add("open");
            } else {
                alert("Không có hóa đơn nào chứa sản phẩm này.");
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
                    <label><strong>Customer name:</strong></label>
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
