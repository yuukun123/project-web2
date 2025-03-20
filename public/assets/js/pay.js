document.addEventListener('DOMContentLoaded', function () {
    const citySelect = document.getElementById("registerCity");
    const districtSelect = document.getElementById("registerDistrict");
    const wardSelect = document.getElementById("registerWard");
    const streetInput = document.getElementById("registerStreet");

    const autoFillRadio = document.getElementById("autoFill");
    const otherRadio = document.getElementById("sendOther");

    const userCity = userAddressInfo.city;
    const userDistrict = userAddressInfo.district;
    const userWard = userAddressInfo.ward;
    const userStreet = userAddressInfo.street;

    // Auto-fill địa chỉ
    autoFillRadio.addEventListener("change", function () {
        if (this.checked) {
            citySelect.innerHTML = `<option selected>${userCity}</option>`;
            districtSelect.innerHTML = `<option selected>${userDistrict}</option>`;
            wardSelect.innerHTML = `<option selected>${userWard}</option>`;
            streetInput.value = userStreet;

            citySelect.disabled = true;
            districtSelect.disabled = true;
            wardSelect.disabled = true;
            streetInput.readOnly = true;
        }
    });

    // Chọn "Gửi đến địa chỉ khác"
    otherRadio.addEventListener("change", function () {
        if (this.checked) {
            citySelect.disabled = false;
            districtSelect.disabled = false;
            wardSelect.disabled = false;
            streetInput.readOnly = false;
            streetInput.value = '';

            citySelect.innerHTML = "<option value=''>Select City</option>";
            districtSelect.innerHTML = "<option value=''>Select District</option>";
            wardSelect.innerHTML = "<option value=''>Select Ward</option>";

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

    // Khi load trang nếu autoFill đã được chọn
    if (autoFillRadio.checked) {
        autoFillRadio.dispatchEvent(new Event('change'));
    }

    // Submit form và hiện confirmation
    document.getElementById('payment-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

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
                alert(data.message || "Đặt hàng thất bại.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Có lỗi xảy ra khi đặt hàng.");
        });
    });
});
