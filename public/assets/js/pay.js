document.addEventListener('DOMContentLoaded', function () {

// Hàm kiểm tra chuỗi có chứa link hay không
    function containsLink(text) {
        const urlPattern = /https?:\/\/|www\./i;
        return urlPattern.test(text);
    }

    
    const citySelect = document.getElementById("registerCity");
    const districtSelect = document.getElementById("registerDistrict");
    const wardSelect = document.getElementById("registerWard");
    const streetInput = document.getElementById("registerStreet");

    const receiverName = document.getElementById("full_name");
    const receiverPhone = document.getElementById("phone");

    const autoFillRadio = document.getElementById("autoFill");
    const otherRadio = document.getElementById("sendOther");

    const userCity = userAddressInfo.city;
    const userDistrict = userAddressInfo.district;
    const userWard = userAddressInfo.ward;
    const userStreet = userAddressInfo.street;

    const timeInput = document.getElementById('delivery_time');

    timeInput.addEventListener('change', function () {
        const selectedTime = timeInput.value;
        if (!selectedTime) return;

        const [hourStr, minuteStr] = selectedTime.split(':');
        const hours = parseInt(hourStr, 10);
        const minutes = parseInt(minuteStr, 10);

        const totalMinutes = hours * 60 + minutes;

        const minMinutes = 8 * 60;    // 08:00 = 480 phút
        const maxMinutes = 20 * 60;   // 20:00 = 1200 phút

        if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
            alert('Thời gian phải nằm trong khoảng từ 08:00 đến 20:00.');
            timeInput.value = ''; // reset lại input
        }
    });

    // Auto-fill địa chỉ
    // autoFillRadio.addEventListener("change", function () {
    //     if (this.checked) {
    //         citySelect.innerHTML = `<option selected>${userCity}</option>`;
    //         districtSelect.innerHTML = `<option selected>${userDistrict}</option>`;
    //         wardSelect.innerHTML = `<option selected>${userWard}</option>`;
    //         streetInput.value = userStreet;

    //         citySelect.disabled = true;
    //         districtSelect.disabled = true;
    //         wardSelect.disabled = true;
    //         streetInput.readOnly = true;
    //     }
    // });

    // Chọn "Gửi đến địa chỉ khác"
    otherRadio.addEventListener("change", function () {
        if (this.checked) {
            citySelect.classList.remove('select-disabled');
            districtSelect.classList.remove('select-disabled');
            wardSelect.classList.remove('select-disabled');
            streetInput.classList.remove('readonly-input');

            receiverName.readOnly = false;
            receiverPhone.readOnly = false;
            receiverName.value = '';
            receiverPhone.value = '';
            streetInput.value = '';
    
            // Reset option
            citySelect.innerHTML = "<option value=''>Select City</option>";
            districtSelect.innerHTML = "<option value=''>Select District</option>";
            wardSelect.innerHTML = "<option value=''>Select Ward</option>";

            
    
            // Load city data
            fetch("https://provinces.open-api.vn/api/p/")
                .then(response => response.json())
                .then(data => {
                    data.forEach(city => {
                        let option = new Option(city.name, city.code);
                        citySelect.add(option);
                    });
                })
                .catch(err => console.error("Lỗi tải danh sách thành phố:", err));
        }
    });
    

    // Load district khi chọn city
    citySelect.addEventListener("change", function () {
        const cityCode = this.value;
        districtSelect.innerHTML = "<option value=''>Select District</option>";
        wardSelect.innerHTML = "<option value=''>Select Ward</option>";

        if (cityCode) {
            fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`)
                .then(response => response.json())
                .then(data => {
                    data.districts.forEach(district => {
                        let option = new Option(district.name, district.code);
                        districtSelect.add(option);
                    });
                })
                .catch(err => console.error("Lỗi tải quận/huyện:", err));
        }
    });

    // Load ward khi chọn district
    districtSelect.addEventListener("change", function () {
        const districtCode = this.value;
        wardSelect.innerHTML = "<option value=''>Select Ward</option>";

        if (districtCode) {
            fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                .then(response => response.json())
                .then(data => {
                    data.wards.forEach(ward => {
                        let option = new Option(ward.name, ward.code);
                        wardSelect.add(option);
                    });
                })
                .catch(err => console.error("Lỗi tải phường/xã:", err));
        }
    });

    // hiện thông tin thanh toán
    // const Momo = document.getElementById('Momo-fields');
    // const VNPay = document.getElementById('VNPay-fields');
    // const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
    
    // paymentMethods.forEach(method => {
    //     method.addEventListener('change', function() {
    //         // Ẩn tất cả các phương thức thanh toán trước
    //         Momo.classList.remove('show');
    //         VNPay.classList.remove('show');
    
    //         // Hiển thị phương thức thanh toán được chọn
    //         if (this.value === 'Momo') {
    //             Momo.classList.add('show');
    //         } else if (this.value === 'VNPay') {
    //             VNPay.classList.add('show');
    //         }
    //     });
    // });
    
    // // Ẩn tất cả các phương thức thanh toán khi tải trang
    // window.addEventListener('load', () => {
    //     Momo.classList.remove('show');
    //     VNPay.classList.remove('show');
    // });
    
    // Lấy ngày hôm nay và định dạng lại theo định dạng yyyy-mm-dd
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // Đặt ngày hôm nay là giá trị min của input
    document.getElementById("delivery_date").setAttribute("min", today);
    
    

    // Submit form và hiện confirmation
    document.getElementById('payment-form').addEventListener('submit', function (e) {

        // Kiểm tra số điện thoại nếu gửi đến địa chỉ khác
        if (otherRadio.checked) {
            const phone = receiverPhone.value.trim();
            const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
        
            if (!phoneRegex.test(phone)) {
                alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số, bắt đầu bằng 03, 05, 07, 08 hoặc 09.");
                receiverPhone.focus();
                e.preventDefault();
                return false;
            }
        }
        
        

        const timeInput = document.getElementById('delivery_time');
        const selectedTime = timeInput.value;
    
        if (selectedTime) {
            const [hours, minutes] = selectedTime.split(':').map(Number);
            const totalMinutes = hours * 60 + minutes;
    
            if (totalMinutes < 480 || totalMinutes > 1200) {
                e.preventDefault();
                alert('Delivery time must be between 08:00 and 20:00.');
                timeInput.focus();
                return false;
            }
        }
        
        const urlPattern = /(https?:\/\/|www\.)[^\s]+|[^\s]+\.(com|net|org|vn|info|biz|edu)/i;
        const inputs = this.querySelectorAll('input[type="text"], input[type="number"], textarea');
    
        for (const input of inputs) {
            if (urlPattern.test(input.value)) {
                alert('Links are not allowed in input fields. Please remove any URLs before proceeding.');
                input.focus();
                e.preventDefault(); // Ngăn form được gửi
                return false;
            }
        }

        e.preventDefault();

        updateAddressNames(); // Cập nhật tên city/district/ward

        const formData = new FormData(this);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        fetch('pages/order_process.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Hiển thị confirmation popup
                document.getElementById('confirmation-overlay').style.display = 'block';
                document.getElementById('confirmation').classList.add('show');

                document.getElementById('order-id-number').textContent = `#${data.order_id}`;
                document.getElementById('view-invoice-link').href = `receipt?order_id=${data.order_id}`;

                // Load danh sách sản phẩm đã đặt
                fetch('pages/get_last_order_items.php')
                    .then(res => res.json())
                    .then(items => {
                        let orderItemsHtml = '';
                        let totalCost = 0;

                        if (items.length > 0) {
                            // Hiển thị tên người nhận và địa chỉ nhận hàng
                            const infoHtml = `
                                <div class="receive-info">
                                    <div><strong>Recipient:</strong> ${items[0].receive_name}</div>
                                    <div><strong>Delivery address:</strong> ${items[0].receive_address}</div>
                                </div>
                            `;
                            document.getElementById('receive-address-display').innerHTML = infoHtml;
                        }                        

                        items.forEach(item => {
                            orderItemsHtml += `
                                <div class="receipt-rev">
                                    <div class="name-food">${item.product_name}</div>
                                    <div class="number">x${item.quantity}</div>
                                </div>
                            `;
                            totalCost += item.price * item.quantity;
                        });
                        document.getElementById('order-items').innerHTML = orderItemsHtml;
                        document.getElementById('total-cost-display').innerHTML = `Total: <span>${totalCost.toLocaleString()} VND</span>`;
                    });
            } else {
                alert(data.message || "Order failed.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("An error occurred while placing the order.");
        });
    });

    function autoFillAddress() {
        receiverName.value = userAddressInfo.full_name;
        receiverPhone.value = userAddressInfo.phone;
        citySelect.innerHTML = `<option value="${userCity}" selected>${userCity}</option>`;
        districtSelect.innerHTML = `<option value="${userDistrict}" selected>${userDistrict}</option>`;
        wardSelect.innerHTML = `<option value="${userWard}" selected>${userWard}</option>`;
        streetInput.value = userStreet;
    
        citySelect.classList.add('select-disabled');
        districtSelect.classList.add('select-disabled');
        wardSelect.classList.add('select-disabled');
        streetInput.classList.add('readonly-input');

        // Disable inputs nếu muốn tránh chỉnh sửa
        receiverName.readOnly = true;
        receiverPhone.readOnly = true;

        console.log("userAddressInfo:", userAddressInfo);
        console.log("userAddressInfo.phone:", userAddressInfo?.phone);
        console.log("userAddressInfo.full_name:", userAddressInfo?.full_name);

    }
    

    autoFillRadio.addEventListener("change", function () {
        if (this.checked) {
            autoFillAddress();
        }
    });
    
    if (autoFillRadio.checked) {
        autoFillAddress();
    }
    
    function updateAddressNames() {
        const selectedCityText = citySelect.options[citySelect.selectedIndex]?.text || '';
        const selectedDistrictText = districtSelect.options[districtSelect.selectedIndex]?.text || '';
        const selectedWardText = wardSelect.options[wardSelect.selectedIndex]?.text || '';
    
        document.getElementById("shipping_city_name").value = selectedCityText;
        document.getElementById("shipping_district_name").value = selectedDistrictText;
        document.getElementById("shipping_ward_name").value = selectedWardText;
    }
    
    
});


