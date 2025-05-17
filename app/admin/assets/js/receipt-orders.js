// receipt_orders.js

// Khai báo biến ở phạm vi toàn cục hoặc module nếu dùng module
const citySelect = document.getElementById("registerCity");
const districtSelect = document.getElementById("registerDistrict");
const wardSelect = document.getElementById("registerWard");

// Sử dụng các hidden input mới để lưu trữ TÊN đã chọn
const cityNameSelectedHidden = document.getElementById("city_name_selected");
const districtNameSelectedHidden = document.getElementById("district_name_selected");
const wardNameSelectedHidden = document.getElementById("ward_name_selected");

const filterForm = document.getElementById('filter-form'); // Lấy form bằng ID

// Hàm tiện ích để chuẩn hóa tên địa danh
function normalizeLocationName(name) {
    if (typeof name !== 'string') return '';
    // Chỉ bỏ "Thành phố " ở đầu (không phân biệt hoa thường)
    // Giữ lại "Tỉnh "
    return name
        .replace(/^Thành phố\s*/i, '')
        .trim();                      // Bỏ khoảng trắng thừa ở hai đầu
}

async function fetchAndPopulateCities() {
    try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const cities = await response.json();

        citySelect.innerHTML = "<option value=''>Select City</option>"; // Reset
        cities.forEach(city => {
            const displayName = normalizeLocationName(city.name); // Chuẩn hóa tên hiển thị
            let option = new Option(displayName, city.code);
            option.dataset.name = city.name; // Lưu tên gốc vào dataset.name
            citySelect.add(option);
        });

        if (typeof initialCityName !== 'undefined' && initialCityName && citySelect.options.length > 1) {
            let cityWasSelected = false;
            [...citySelect.options].forEach(opt => {
                if (opt.dataset.name === initialCityName) {
                    opt.selected = true;
                    citySelect.value = opt.value;
                    cityWasSelected = true;
                }
            });
            if (cityWasSelected) {
                await handleCityChange();
            }
        }
        citySelect.dispatchEvent(new CustomEvent('citiesLoaded'));
    } catch (error) {
        console.error("Error fetching cities:", error);
        citySelect.innerHTML = "<option value=''>Error loading cities</option>";
    }
}

async function fetchDistricts(cityCode) {
    districtSelect.innerHTML = "<option value=''>Loading Districts...</option>";
    wardSelect.innerHTML = "<option value=''>Select Ward</option>";
    // districtNameSelectedHidden.value và wardNameSelectedHidden.value sẽ được cập nhật trong handle...Change
    // không cần reset ở đây vì handleCityChange sẽ gọi fetchDistricts,
    // và handleDistrictChange sẽ gọi fetchWards, chúng sẽ tự cập nhật hidden input tương ứng.
    // Khi city thay đổi, district và ward sẽ được reset bởi các hàm con.

    if (!cityCode) {
        districtSelect.innerHTML = "<option value=''>Select District</option>";
        districtNameSelectedHidden.value = ""; // Đảm bảo reset hidden khi không có cityCode
        wardNameSelectedHidden.value = "";   // và cả ward
        return;
    }

    try {
        const response = await fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        districtSelect.innerHTML = "<option value=''>Select District</option>";
        data.districts.forEach(district => {
            const displayName = normalizeLocationName(district.name);
            let option = new Option(displayName, district.code);
            option.dataset.name = district.name;
            districtSelect.add(option);
        });

        if (typeof initialDistrictName !== 'undefined' && initialDistrictName && districtSelect.options.length > 1) {
            let districtWasSelected = false;
            [...districtSelect.options].forEach(opt => {
                if (opt.dataset.name === initialDistrictName) {
                    opt.selected = true;
                    districtSelect.value = opt.value;
                    districtWasSelected = true;
                }
            });
            if (districtWasSelected) {
                await handleDistrictChange();
            }
        }
    } catch (error) {
        console.error("Error fetching districts:", error);
        districtSelect.innerHTML = "<option value=''>Error loading districts</option>";
    }
}

async function fetchWards(districtCode) {
    wardSelect.innerHTML = "<option value=''>Loading Wards...</option>";
    // wardNameSelectedHidden.value sẽ được cập nhật trong handleDistrictChange

    if (!districtCode) {
        wardSelect.innerHTML = "<option value=''>Select Ward</option>";
        wardNameSelectedHidden.value = ""; // Đảm bảo reset hidden khi không có districtCode
        return;
    }

    try {
        const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        wardSelect.innerHTML = "<option value=''>Select Ward</option>";
        data.wards.forEach(ward => {
            const displayName = normalizeLocationName(ward.name);
            let option = new Option(displayName, ward.code);
            option.dataset.name = ward.name;
            wardSelect.add(option);
        });

        if (typeof initialWardName !== 'undefined' && initialWardName && wardSelect.options.length > 1) {
            [...wardSelect.options].forEach(opt => {
                if (opt.dataset.name === initialWardName) {
                    opt.selected = true;
                    wardSelect.value = opt.value;
                }
            });
            // Sau khi chọn ward, cập nhật hidden input
            handleWardChange(); // Gọi để cập nhật wardNameSelectedHidden
        }
    } catch (error) {
        console.error("Error fetching wards:", error);
        wardSelect.innerHTML = "<option value=''>Error loading wards</option>";
    }
}

async function handleCityChange() {
    const selectedCityOption = citySelect.options[citySelect.selectedIndex];
    cityNameSelectedHidden.value = selectedCityOption && selectedCityOption.value ? (selectedCityOption.dataset.name) : "";
    // Khi city thay đổi, reset district và ward hidden values vì chúng sẽ được load lại
    districtNameSelectedHidden.value = "";
    wardNameSelectedHidden.value = "";
    const cityCode = citySelect.value;
    await fetchDistricts(cityCode); // fetchDistricts sẽ tự động gọi handleDistrictChange nếu cần
}

async function handleDistrictChange() {
    const selectedDistrictOption = districtSelect.options[districtSelect.selectedIndex];
    districtNameSelectedHidden.value = selectedDistrictOption && selectedDistrictOption.value ? (selectedDistrictOption.dataset.name) : "";
    // Khi district thay đổi, reset ward hidden value
    wardNameSelectedHidden.value = "";
    const districtCode = districtSelect.value;
    await fetchWards(districtCode); // fetchWards sẽ tự động gọi handleWardChange nếu cần
}

function handleWardChange() {
    const selectedWardOption = wardSelect.options[wardSelect.selectedIndex];
    wardNameSelectedHidden.value = selectedWardOption && selectedWardOption.value ? (selectedWardOption.dataset.name) : "";
}


if (citySelect && districtSelect && wardSelect) {
    citySelect.addEventListener("change", handleCityChange);
    districtSelect.addEventListener("change", handleDistrictChange);
    wardSelect.addEventListener("change", handleWardChange);
}

if (filterForm) {
    filterForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const params = new URLSearchParams(window.location.search);

        const fromDate = document.getElementById('fromDate').value;
        const toDate = document.getElementById('toDate').value;
        const status = document.getElementById('orderStatus').value;
        const searchInput = document.getElementById('searchInput');
        const search = searchInput ? searchInput.value.trim() : '';

        const citySelectedOriginalName = cityNameSelectedHidden.value; // Tên gốc: "Thành phố Hồ Chí Minh"
        const districtSelectedOriginalName = districtNameSelectedHidden.value;
        const wardSelectedOriginalName = wardNameSelectedHidden.value;

        // --- THAY ĐỔI CHÍNH Ở ĐÂY ---
        let locationFilterValue = "";
        if (wardSelectedOriginalName) {
            locationFilterValue = wardSelectedOriginalName; // Gửi tên gốc của phường
        } else if (districtSelectedOriginalName) {
            locationFilterValue = districtSelectedOriginalName; // Gửi tên gốc của quận
        } else if (citySelectedOriginalName) {
            // KHI CHỈ CHỌN CITY, gửi tên đã được RÚT GỌN bằng normalizeLocationName
            locationFilterValue = normalizeLocationName(citySelectedOriginalName);
            // Ví dụ: nếu citySelectedOriginalName là "Thành phố Hồ Chí Minh",
            // locationFilterValue sẽ là "Hồ Chí Minh"
        }
        // --- KẾT THÚC THAY ĐỔI CHÍNH ---

        if (fromDate) params.set("from_date", fromDate); else params.delete("from_date");
        if (toDate) params.set("to_date", toDate); else params.delete("to_date");
        if (status) params.set("status", status); else params.delete("status");
        if (search) params.set("search", search); else params.delete("search");

        if (locationFilterValue) {
            params.set("location", locationFilterValue);
        } else {
            params.delete("location");
        }

        // Gửi tên GỐC để PHP có thể điền lại dropdown một cách chính xác
        // (vì initialCityName, initialDistrictName, initialWardName từ PHP là tên gốc)
        if (citySelectedOriginalName) params.set("city_name", citySelectedOriginalName); else params.delete("city_name");
        if (districtSelectedOriginalName) params.set("district_name", districtSelectedOriginalName); else params.delete("district_name");
        if (wardSelectedOriginalName) params.set("ward_name", wardSelectedOriginalName); else params.delete("ward_name");

        params.set("page", "1");
        window.location.search = params.toString();
    });
}

// --- Các hàm chi tiết đơn hàng và cập nhật trạng thái (giữ nguyên như trước) ---
function showOrderDetail(orderId) {
    fetch(`Controllers/get_order_detail.php?order_id=${orderId}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
                return;
            }
            document.getElementById('detail_order_id').textContent = '#' + (data.order_id || '');
            document.getElementById('customer_name').value = data.customer_name || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('order_date').value = data.order_date || '';
            document.getElementById('delivery_address').value = data.delivery_address || '';
            document.getElementById('product_info').innerHTML = data.product_info || 'N/A';
            document.getElementById('product_id').value = data.product_id || '';
            document.getElementById('order_note').value = data.notes || '';

            const statusSelectDetail = document.getElementById('order_status_detail');
            const currentStatus = data.status;
            const validTransitions = {
                'Pending': ['Pending', 'Processing', 'Cancelled'],
                'Processing': ['Processing', 'Completed', 'Cancelled'],
                'Completed': ['Completed'],
                'Cancelled': ['Cancelled']
            };
            const allowedStatuses = validTransitions[currentStatus] || [currentStatus];

            statusSelectDetail.innerHTML = '';
            ['Pending', 'Processing', 'Completed', 'Cancelled'].forEach(status => {
                if (allowedStatuses.includes(status)) {
                    const option = document.createElement('option');
                    option.value = status;
                    option.textContent = status;
                    if (status === currentStatus) {
                        option.selected = true;
                    }
                    statusSelectDetail.appendChild(option);
                }
            });

            document.getElementById('DetailOrders').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        })
        .catch(err => {
            console.error('Error fetching order detail:', err);
            alert('Failed to fetch order details. ' + err.message);
        });
}

function updateOrderStatusFromDetail() {
    const orderId = document.getElementById('detail_order_id').textContent.replace('#', '');
    const newStatus = document.getElementById('order_status_detail').value;

    if (!orderId || !newStatus) {
        alert('Order ID or new status is missing.');
        return;
    }

    const formData = new FormData();
    formData.append('order_id', orderId);
    formData.append('status', newStatus);

    fetch('Controllers/update_status.php', {
        method: 'POST',
        body: formData
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}, message: ${res.statusText}`);
        return res.json();
    })
    .then(resData => {
        if (resData.success) {
            alert('✅ Status updated successfully!');
            location.reload();
        } else {
            alert('❌ ' + (resData.message || 'Failed to update status.'));
        }
    })
    .catch(err => {
        console.error('Error updating status:', err);
        alert('❌ Failed to update status. ' + err.message);
    });
}

function hideDetailOrders(detailOrdersId) {
    document.getElementById(detailOrdersId).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// --- Khởi tạo ---
document.addEventListener('DOMContentLoaded', () => {
    fetchAndPopulateCities();
});