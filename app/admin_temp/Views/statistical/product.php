<form id="filterForm" action="../Controllers/filter-statiscal-process.php" class="filter">

    <div class="time">
        
        <div class="to">
            <p>From:</p>
            <input type="date" name="fromDate" id="fromDate">
            <p>To</p>
            <input type="date" name="toDate" id="toDate">
        </div>
    </div>
    <div class="div">
        <button id="filter-button" type="submit" class="sta-btn" >Filter</button>
    </div>
</form>

<div class="div-receipt">
    <div class="receipt">
        <p class="title-receipt">Detail Receipt</p>
        <p class="id-receipt">ID Receipt: <strong> #ND002</strong></p>
        <div class="form-group">
            <label for="customer_name"><strong>Customer name:</strong> </label>
            <input type="text" value="" id="customer_name" readonly>
        </div>
        <div class="form-group">
            <label for="phone_number"><strong>Phone number:</strong> </label>
            <input type="text" value="" id="phone_number" readonly>
        </div>
        <div class="form-group">
            <label for="address"><strong>Delivery address</strong></label>
            <input type="text" value="" id="address" readonly>
        </div>
        <table class="table-detail">
            <thead>
                <tr>
                    <th>Name product</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Avocado Mousse</td>
                    <td>2</td>
                    <td>1.020.000đ</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; text-align: right;">Describe:</td>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td style="font-weight: bold; text-align: right;">Payment:</td>
                    <td colspan="3">1.020.000đ</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; text-align: right;">Payment method:</td>
                    <td colspan="3">Cash</td>
                </tr>
            </tbody>
        </table>
            <div class="close-btn">
            <button>Cancel<ion-icon name="close-outline"></ion-icon></button>
        </div>
    </div>
</div>

<form id="form-product" action="../Controllers/statistical-process.php" method="post">
<div class="both-table">

<p  class="main-title">TOP 10 BEST SELLER PRODUCT</p>
<div class="bd-bt"></div>
<table class="table-best-seller">
    <thead>
        <tr>
            <th class="title item">No</th>
            <th class="title item">Date</th>
            <th class="title item">Product Name</th>
            <th class="title item">Quantity sales</th>
            <th class="title item">Receipt</th>
        </tr>
    </thead>
    <tbody id="orderBodyBestSeller">

        
    </tbody>
</table>

<p  class="main-title">TOP 10 UNPOPULAR PRODUCT</p>
<div class="bd-bt"></div>
<table class="table-unpopular">
    <thead>
        <tr>
            <th class="title item">No</th>
            <th class="title item">Date</th>
            <th class="title item">Product Name</th>
            <th class="title item">Quantity sales</th>
            <th class="title item">Receipt</th>
        </tr>
    </thead>
    <tbody id="orderBodyUnpopular">
   
    </tbody>
</table>
</div>
<div class="receipt-detail">
    <div class="receipt">
        
    </div>
</div>
</form>