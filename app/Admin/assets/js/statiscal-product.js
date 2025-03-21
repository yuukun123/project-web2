
    document.addEventListener("DOMContentLoaded", function () {
        loadInitialData();
        document.getElementById("filterForm").addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("✅ Form submit, gọi filterData()");
            filterData();
        });
    });
    // Lấy dữ liệu khi trang load
    function loadInitialData() {
        fetch("../../Admin/Controllers/statistical-process.php")
            .then(response => response.json())
            .then(data => {
                console.log("Dữ liệu từ PHP:", data);
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
        console.log("📤 Gửi dữ liệu lọc:", { fromDate, toDate });
        let requestData = {
            fromDate: fromDate,
            toDate: toDate
        };

        fetch("../../Admin/Controllers/filter-statiscal-process.php", {
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
                    <td>${order.delivery_date}</td>
                    <td>${order.product_name}</td>
                    <td>${order.quantity}</td>
                    <td>
                        <button class="js-detail-btn" data-id="${order.id}">
                            <ion-icon name="receipt-outline"></ion-icon>
                        </button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = rows;
    }

    // const detailBtns = document.querySelectorAll('.js-detail-btn')
    // const receipt = document.querySelector('.div-receipt ')
    // const removedetailBtn = document.querySelector('.close-btn')
    // function showDetail() {
    //     receipt.classList.add('open')
    // }
    // for(const detailBtn of detailBtns ){
    //     detailBtn.addEventListener('click',showDetail)
    // }
    // removedetailBtn.addEventListener('click', function(){
    //     receipt.classList.remove('open')
    // })

    //     let detailButton = document.querySelector(".div-receipt");
    //     let closeBtn = document.querySelector(".close-btn");

    //     tableBody.addEventListener("click", (event) => {
    //         if (event.target.closest(".js-detail-btn")) {
    //         // Thêm class để hiện
    //              detailButton.classList.add("open");
    //             }
    //     });

    //     closeBtn.addEventListener("click", function () {
    //     // Gỡ class để ẩn
    //     detailButton.classList.remove("open");
    // });
