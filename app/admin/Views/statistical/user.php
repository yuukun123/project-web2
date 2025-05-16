<form id="filterForm" action="../Controllers/filter-statiscal-user-process.php" class="filter">
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
<p class="main-title">TOP USERS</p>
<div class="bd-bt"></div>

<table  class="table-customer">
    <thead>
        <tr>
            <th>No</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Orders Made</th>
            <th>Total Spending</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody id="orderBodyUsers">
        
    </tbody>
</table>


<div class="div-receipt">
    <div class="receipt">
        <div class="row-1 flex">
            <div class="receipt-id">
                <p class="paragraph">Receipt ID:</p>
                <div class="paragraph">HD123</div>
            </div>
            <div class="receipt-date">
                <p class="paragraph">Receipt Date:</p>
                <div class="paragraph">20-10-2024</div>
            </div>
        </div>
        <table class="table-receipt">
        
        </table>
            <div class="close-btn fixed">
                <button >Cancel<ion-icon name="close-outline"></ion-icon></button>
            </div>
    </div>
</div>