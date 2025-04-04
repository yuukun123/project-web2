document.addEventListener("DOMContentLoaded", function () {
    const citySelect = document.getElementById("registerCity");
    const districtSelect = document.getElementById("registerDistrict");
    const wardSelect = document.getElementById("registerWard");
    const form = document.getElementById('registerForm');
    
    // Các input ẩn để lưu tên
    const cityNameHidden = document.getElementById("city_name");
    const districtNameHidden = document.getElementById("district_name");
    const wardNameHidden = document.getElementById("ward_name");

    // Kiểm tra nếu đang ở trang Register
    if (citySelect && districtSelect && wardSelect) {
        // Lấy danh sách thành phố
        fetch("https://provinces.open-api.vn/api/p/")
            .then(response => response.json())
            .then(data => {
                data.forEach(city => {
                    // Sử dụng city.code làm value để gọi API,
                    // thêm thuộc tính data-name chứa tên
                    let option = new Option(city.name, city.code);
                    option.setAttribute("data-name", city.name);
                    citySelect.add(option);
                });
            })
            .catch(error => console.error("Error fetching cities:", error));

        // Khi chọn thành phố, cập nhật input ẩn và load quận/huyện
        citySelect.addEventListener("change", function () {
            const selectedCity = citySelect.options[citySelect.selectedIndex];
            const cityCode = citySelect.value;
            // Cập nhật hidden input: tên thành phố
            cityNameHidden.value = selectedCity.getAttribute("data-name") || "";
            
            // Reset quận, phường
            districtSelect.innerHTML = "<option value=''>Select District</option>";
            wardSelect.innerHTML = "<option value=''>Select Ward</option>";
            
            if (cityCode) {
                fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`)
                    .then(response => response.json())
                    .then(data => {
                        data.districts.forEach(district => {
                            let option = new Option(district.name, district.code);
                            option.setAttribute("data-name", district.name);
                            districtSelect.add(option);
                        });
                    })
                    .catch(error => console.error("Error fetching districts:", error));
            }
        });

        // Khi chọn quận/huyện, cập nhật input ẩn và load phường/xã
        districtSelect.addEventListener("change", function () {
            const selectedDistrict = districtSelect.options[districtSelect.selectedIndex];
            const districtCode = districtSelect.value;
            // Cập nhật hidden input: tên quận/huyện
            districtNameHidden.value = selectedDistrict.getAttribute("data-name") || "";
            
            wardSelect.innerHTML = "<option value=''>Select Ward</option>";
            
            if (districtCode) {
                fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                    .then(response => response.json())
                    .then(data => {
                        data.wards.forEach(ward => {
                            let option = new Option(ward.name, ward.code);
                            option.setAttribute("data-name", ward.name);
                            wardSelect.add(option);
                        });
                    })
                    .catch(error => console.error("Error fetching wards:", error));
            }
        });

        // Khi chọn phường/xã, cập nhật input ẩn
        wardSelect.addEventListener("change", function () {
            const selectedWard = wardSelect.options[wardSelect.selectedIndex];
            wardNameHidden.value = selectedWard.getAttribute("data-name") || "";
        });

        // Xử lý submit form
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                // Đảm bảo cập nhật lại hidden input nếu người dùng không thay đổi sau lần chọn đầu tiên
                const selectedCity = citySelect.options[citySelect.selectedIndex];
                const selectedDistrict = districtSelect.options[districtSelect.selectedIndex];
                const selectedWard = wardSelect.options[wardSelect.selectedIndex];
                cityNameHidden.value = selectedCity ? selectedCity.getAttribute("data-name") : "";
                districtNameHidden.value = selectedDistrict ? selectedDistrict.getAttribute("data-name") : "";
                wardNameHidden.value = selectedWard ? selectedWard.getAttribute("data-name") : "";
                
                const formData = new FormData(form);
                fetch('pages/Controllers/register_process.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        window.location.href = 'login';
                    } else {
                        alert('An error occurred:\n' + data.errors.join('\n'));
                    }
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    alert('An unknown error occurred.');
                });
            });
        }
    }

    // Xử lý thông báo lỗi từ query string nếu có
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
        let message = '';
        switch (error) {
            case 'role_not_allowed':
                message = 'Your account does not have permission to access this area.';
                break;
            case 'wrong_password':
                message = 'Incorrect password. Please try again.';
                break;
            case 'user_not_found':
                message = 'No account found with this username.';
                break;
            case 'account_locked':
                message = 'Your account has been locked. Please contact the administrator.';
                break;
            case 'method_not_allowed':
                message = 'Invalid submission method.';
                break;
            default:
                message = 'An unknown error occurred.';
        }
        if (message) {
            alert(message);
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }
    
});

// Hiệu ứng cho input: thêm class "has-content" khi có nội dung
document.querySelectorAll(".input-box input").forEach((input) => {
    input.addEventListener("input", function () {
        if (this.validity.valid || this.value.trim() !== "") {
            this.classList.add("has-content");
        } else {
            this.classList.remove("has-content");
        }
    });
});
