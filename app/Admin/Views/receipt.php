<div class="filter-main">
    <div class="subtitle_table">
        <div class="filter-date">
            <label for="fromDate" >From:</label>
        <div class="btn_date">
            <input type="date" id="fromDate" min="2020-01-01" max="2030-01-01">
        </div>
        <label for="toDate">To:</label>
        <div class="btn_date">
            <input type="date" id="toDate" min="2020-01-01" max="2030-01-01">
        </div>
        <div class="btn_filter">
            <button onclick="filterOrders()">Filter Orders</button>
        </div>
        </div>
        <div class="status-filter">
            <label for="orderStatus" >Status:</label>
        <div class="btn_date">
            <select id="orderStatus" onchange="filterOrders()">
                <option value="">All</option>
                <option value="Loading">Loading</option>
                <option value="Confirmed">Confirm</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
            </select>
        </div>
        <div class="btn_filter">
            <button onclick="sortOrders()">Sort Address (District)</button>
        </div>        
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Delivery Address</th>
                <th>Detail</th>
            </tr>
        </thead>
        <tbody id="orderList">
            <!-- Danh sách đơn hàng sẽ hiển thị ở đây -->
        </tbody>
    </table>
</div>
<div class="overlay" id="overlay"></div>
<div class="ShowDetail edit-ShowDetailOrder" id="DetailOrders">
    <h2>Detail Order</h2>
    <div class="id_order">
        <p>ID Order: <strong>#ND002</strong></p>
    </div>
    <div class="scroll-see">
        <form>
            <div class="form-horizontal">
                <div class="form-group">
                    <label for="customer_name">Customer Name:</label>
                    <input type="text" id="customer_name" readonly>
                </div>
                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" readonly>
                </div>
                <div class="form-group">
                    <label for="order_date">Order Date:</label>
                    <input type="text" id="order_date" readonly>
                </div>
                <div class="form-group">
                    <label for="delivery_address">Delivery Address:</label>
                    <input type="text" id="delivery_address" readonly>
                </div>
                <div class="form-group">
                    <label for="product_info">Product Info:</label>
                    <input type="text" id="product_info" readonly>
                </div>
                <div class="form-group">
                    <label for="product_info">Product ID:</label>
                    <input type="text" id="product_id" readonly>
                </div>
                <div class="form-group">
                    <label for="order_status">Order Status:</label>
                    <select id="order_status">
                        <option value="Loading">Loading</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                </div>
                <div class="form-buttons">
                    <button type="button" class="save-btn" onclick="hideDetailOrders('DetailOrders')">Save</button>
                    <button type="button" class="close-btn" onclick="hideDetailOrders('DetailOrders')">Close</button>
                </div>
            </div>
        </form>
    </div>