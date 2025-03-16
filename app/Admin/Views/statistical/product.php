<div class="div-receipt">
    <div class="receipt">
        <p class="title-receipt">Detail Receipt</p>
        <p class="id-receipt">ID Receipt: <strong> #ND002</strong></p>
        <div class="form-group">
            <label for="customer_name"><strong>Customer name:</strong> </label>
            <input type="text" value="Võ Anh Hào" id="customer_name" readonly>
        </div>
        <div class="form-group">
            <label for="phone_number"><strong>Phone number:</strong> </label>
            <input type="text" value="0868137377" id="phone_number" readonly>
        </div>
        <div class="form-group">
            <label for="address"><strong>Delivery address</strong></label>
            <input type="text" value="100/9 Chiến Thắng, Phường 9, Quận Phú Nhuận, Tp.HCM" id="address" readonly>
        </div>
        <table class="table-detail">
            <thead>
                <tr>
                    <th>Name product</th>
                    <th>Quantity</th>
                    <th>Unit price</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Avocado Mousse</td>
                    <td>2</td>
                    <td>510.000đ</td>
                    <td>1.020.000đ</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; text-align: right;">Total price:</td>
                    <td colspan="3">1.020.000đ</td>
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



<div class="filter">

    <div class="time">
        
        <div class="to">
            <p>From:</p>
            <input type="date" name="" id="fromDate">
            <p>To</p>
            <input type="date" name="" id="toDate">
        </div>
    </div>
    <div class="div">
        <button class="sta-btn" onclick="filterData()">Filter</button>
    </div>
</div>



<p class="main-title">TOTAL ORDER</p>
<div class="bd-bt"></div>

<table class="table-total-order">
    <thead>
        <tr>
            <th class="title item">Date</th>
            <th class="title item">Product Name</th>
            <th class="title item">Quantity sales</th>
            <th class="title item">Total amount</th>
            <th class="title item">Receipt</th>
        </tr>
    </thead>
    <tbody id="orderBody">
        <!-- <tr>
            <td class="text item">15/01/2025</td>
            <td class="text item">
                <div class="div-unpopular">
                Avocado Mousse
                <div class="unpopular">
                    <p>unpopular</p>
                </div>
                </div>
                    
            </td>
            
            <td class="text item">2 </td>
            <td class="text item">1.020.000đ</td>
            <td >
                <div class="detail">
                    <button class="js-detail-btn">
                        <ion-icon name="receipt-outline"></ion-icon>
                        </button>
                </div>
                </td>
        </tr>
        <tr>
            <td class="text item">30/01/2025</td>
            <td class="text item">
                <div class="div-unpopular">
                Avocado Mousse
                <div class="unpopular">
                    <p>unpopular</p>
                </div>
                </div>
                    
            </td>
            
            <td class="text item">3 </td>
            <td class="text item">1.620.000đ</td>
            <td >
                <div class="detail">
                    <button class="js-detail-btn">
                        <ion-icon name="receipt-outline"></ion-icon>
                        </button>  
                </div>
                </td>
        </tr>
        <tr>
            <td class="text item ">05/02/2025</td>
            <td class="text item ">
                <div class="div-best-seller">
                    Matcha Croissant
                
                </div>
                    
            </td>
            
            <td class="text item">7 </td>
            <td class="text item">980.000đ</td>
            <td >
                <div class="detail">
                    <button class="js-detail-btn">
                        <ion-icon name="receipt-outline"></ion-icon>
                        </button>
                </div>
                </td>
        </tr>
        <tr>
            <td class="text item ">10/02/2025</td>
            <td class="text item ">
                <div class="div-best-seller">
                    Lemon Tea
                
                </div>
                
            </td>
            
            <td class="text item">10 </td>
            <td class="text item">600.000đ</td>
            <td >
                <div class="detail">
                    <button class="js-detail-btn">
                        <ion-icon name="receipt-outline"></ion-icon>
                        </button>
                        </td>
                </div>
        </tr>
        <tr>
            <td class="text item ">22/02/2025</td>
            <td class="text item ">
                <div class="div-best-seller">
                    Matcha Latte
                <div class="best-seller">
                    <p>best-seller</p>
                    </div>
                </div>
                
            </td>
            
            <td class="text item">15 </td>
            <td class="text item">1.125.000đ</td>
            <td>
                <div class="detail">
                    <button class="js-detail-btn">
                        <ion-icon name="receipt-outline"></ion-icon>
                        </button>
                </div>
                </td>
        </tr>
        <tr>
            <td colspan="4" class="item-total">Total amount all:</td>
            <td class="item-price">5.372.000đ</td>
        </tr>
            -->

    </tbody>
</table>
<div class="receipt-detail">
    <div class="receipt">
        
    </div>
</div>