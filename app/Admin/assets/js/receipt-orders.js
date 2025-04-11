const orders = [
    { id: 'ND001', customer: 'Nguyễn Thanh Bình', phone: '0908070112', date: '2024-10-01', status: 'Loading', address: 'Quận 1', product: 'Product A' },
    { id: 'ND002', customer: 'Bùi Minh Ngọc', phone: '0908070113', date: '2024-10-05', status: 'Confirmed', address: 'Quận 3', product_id: 'SP003, SP006' , product: 'Corn Mousse (x1), Melon Mousse (x1)' , address_more: '105 bà Huyện Thanh Quan, phường Võ Thị Sáu, Quận 3, TP. HCM' },
    { id: 'ND003', customer: 'Dương Nhiên Phong', phone: '0908070114', date: '2024-10-10', status: 'Delivered', address: 'Quận 8', product: 'Product C' },
    { id: 'ND004', customer: 'Võ Anh Hào', phone: '0908070115', date: '2024-10-15', status: 'Canceled', address: 'Quận 1', product: 'Product D' },
    { id: 'ND005', customer: 'Trần Huy Hoàng', phone: '0908070116', date: '2024-10-21', status: 'Canceled', address: 'Quận 12', product: 'Product E' },
    { id: 'ND006', customer: 'Nguyễn Hoàng Tín', phone: '0908070117', date: '2024-10-22', status: 'Delivered', address: 'Quận 5', product: 'Product F' }
];

function filterOrders() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const orderStatus = document.getElementById('orderStatus').value;
    const orderList = document.getElementById('orderList');

    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return (!fromDate || new Date(fromDate) <= orderDate) &&
               (!toDate || orderDate <= new Date(toDate)) &&
               (!orderStatus || order.status === orderStatus);
});

orderList.innerHTML = filteredOrders.map(order => `
    <tr>
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.date}</td>
        <td class="${order.status === 'Canceled' ? 'canceled' : (order.status === 'Delivered' ? 'delivered' : (order.status ==='Confirmed' ? 'confirmed' : (order.status ==='Loading' ? 'loading' : '')))}">${order.status}</td>
        <td>${order.address}</td>
        <td><div class="edit-btn">
                <button onclick="showDetailOrders('${order.id}')">
                    <ion-icon name="create-outline">
                </button>
            </div>
    </tr>
`).join('');

    if(filteredOrders.length === 0){
        orderList.innerHTML = "<tr><td colspan = '6'>Order does not exist!</td></tr>";
    }
}


function getDistrictNumber(address){ //address tham số truyền vào chứa đ/c giao hàng
    const match = address.match(/\d+/); // timf số trong địa chỉ // \d: đại diện cho một chữ số (0-9) .dấu '+' cho biết ít nhất một chữ số (nhiều chữ số liên tiếp cũng được)
                                        //match(/\d+/) là mảng chứ các chuỗi số tìm thấy trong address. Nếu k tìm thấy thì NULL
    return match ? parseInt(match[0], 10) : 0; //Chuyển đổi số thành số nguyên
                                                //match ?: Kiểm tra xem match có true (Tìm thấy số) hay không (false nếu k tìm thấy số)
                                                //parseInt(match[0], 10): chuyển đổi chuỗi số đầu tiên ( và duy nhất trong trường hợp này) thành số nguyên ở hệ cơ số 10.
                                                //: 0 : nếu không tìm thấy số thì trả về 0

    //Nếu address là "Quận 12":

    // address.match(/\d+/) sẽ trả về ["12"].

    // parseInt("12", 10) sẽ chuyển đổi chuỗi "12" thành số nguyên 12.

// Kết quả của hàm là 12.
}

//Sort theo quận

function sortOrders(){
        orders.sort((a, b) => getDistrictNumber(a.address) - getDistrictNumber(b.address));
        filterOrders();
}    

function showDetailOrders() {
    const order = orders.find(o => o.id === 'ND002');
    if (order) {
        document.getElementById('customer_name').value = order.customer;
        document.getElementById('phone').value = order.phone;
        document.getElementById('order_date').value = order.date
        document.getElementById('delivery_address').value = order.address_more;
        document.getElementById('product_info').value = order.product;
        document.getElementById('product_id').value = order.product_id;
        document.getElementById('order_status').value = order.status;

        document.getElementById('DetailOrders').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
}

function hideDetailOrders(detailordersId) {
    document.getElementById(detailordersId).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


// Ban đầu hiển thị tất cả đơn hàng
window.onload = filterOrders;

function loadOrders() {
    const params = new URLSearchParams(window.location.search);
    fetch('../Controllers/get_orders.php?' + params.toString())
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('order-table-body');
            tbody.innerHTML = '';
            data.orders.forEach(row => {
                const tr = document.createElement('tr');
                tr.className = row.status.toLowerCase();
                tr.innerHTML = `
                    <td>${row.order_id}</td>
                    <td>${row.user_name}</td>
                    <td>${row.order_date}</td>
                    <td>${row.delivery_date}</td>
                    <td>${row.delivery_time || ''}</td>
                    <td>${row.status}</td>
                    <td>${row.payment_method}</td>
                    <td>${row.full_address}</td>
                    <td>${Number(row.total_cost).toLocaleString()} VND</td>
                    <td>
                        <form class="status-form">
                            <input type="hidden" name="order_id" value="${row.order_id}">
                        </form>
                        <button class="btn-update icon-detail" onclick="showOrderDetail(${row.order_id})" title="Edit">
                            <ion-icon name="create-outline"></ion-icon>
                        </button>

                    </td>
                `;
                tbody.appendChild(tr);
            });

            document.querySelectorAll('.status-form').forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(this);

                    fetch('../Controllers/update_status.php', {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success) {
                            alert('✅ Update Successful!');
                            loadOrders();
                        } else {
                            alert('❌ ' + res.message);
                        }
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        alert('❌ Error when send process.');
                    });
                });
            });
        });
}

function showOrderDetail(orderId) {
    fetch(`../Controllers/get_order_detail.php?order_id=${orderId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('detail_order_id').textContent = '#' + data.order_id;
            document.getElementById('customer_name').value = data.customer_name;
            document.getElementById('phone').value = data.phone;
            document.getElementById('order_date').value = data.order_date;
            document.getElementById('delivery_address').value = data.delivery_address;
            document.getElementById('product_info').value = data.product_info;
            document.getElementById('product_id').value = data.product_id;
            document.getElementById('order_note').value = data.notes;
            const select = document.getElementById('order_status');
            select.innerHTML = `
                <option value="Pending" ${data.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Processing" ${data.status === 'Processing' ? 'selected' : ''}>Processing</option>
                <option value="Completed" ${data.status === 'Completed' ? 'selected' : ''}>Completed</option>
                <option value="Cancelled" ${data.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            `;

            document.getElementById('DetailOrders').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        });
}

function updateOrderStatusFromDetail() {
    const orderId = document.getElementById('detail_order_id').textContent.replace('#', '');
    const newStatus = document.getElementById('order_status').value;

    const formData = new FormData();
    formData.append('order_id', orderId);
    formData.append('status', newStatus);

    fetch('../Controllers/update_status.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            alert('✅ Status updated successfully!');
            loadOrders();
        } else {
            alert('❌ ' + res.message);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('❌ Failed to update.');
    });
}

function hideDetailOrders(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function renderPagination(totalPages, currentPage) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = (i === currentPage) ? 'active' : '';
        btn.onclick = () => loadOrders(i); // gọi lại loadOrders với page mới
        pagination.appendChild(btn);
    }
}


loadOrders();
setInterval(loadOrders, 5000);

