document.addEventListener("DOMContentLoaded", function () {
    const citySelect = document.getElementById("registerCity");
    const districtSelect = document.getElementById("registerDistrict");
    const wardSelect = document.getElementById("registerWard");
    const form = document.getElementById('registerForm');
    
    const cityNameHidden = document.getElementById("city_name");
    const districtNameHidden = document.getElementById("district_name");
    const wardNameHidden = document.getElementById("ward_name");

    if (citySelect && districtSelect && wardSelect) {
        // Lấy danh sách thành phố
        fetch("https://provinces.open-api.vn/api/p/")
            .then(response => response.json())
            .then(data => {
                data.forEach(city => {
                    let option = new Option(city.name, city.code);
                    option.dataset.name = city.name; // Sử dụng dataset
                    citySelect.add(option);
                });
            })
            .catch(error => console.error("Error fetching cities:", error));

        // Khi chọn thành phố
        citySelect.addEventListener("change", function () {
            const selectedCity = citySelect.options[citySelect.selectedIndex];
            const cityCode = citySelect.value;
            cityNameHidden.value = selectedCity?.dataset.name || selectedCity?.text || "";
            
            districtSelect.innerHTML = "<option value=''>Select District</option>";
            wardSelect.innerHTML = "<option value=''>Select Ward</option>";
            
            if (cityCode) {
                fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`)
                    .then(response => response.json())
                    .then(data => {
                        data.districts.forEach(district => {
                            let option = new Option(district.name, district.code);
                            option.dataset.name = district.name;
                            districtSelect.add(option);
                        });
                    })
                    .catch(error => console.error("Error fetching districts:", error));
            }
        });

        // Khi chọn quận/huyện
        districtSelect.addEventListener("change", function () {
            const selectedDistrict = districtSelect.options[districtSelect.selectedIndex];
            const districtCode = districtSelect.value;
            districtNameHidden.value = selectedDistrict?.dataset.name || selectedDistrict?.text || "";

            wardSelect.innerHTML = "<option value=''>Select Ward</option>";
            
            if (districtCode) {
                fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                    .then(response => response.json())
                    .then(data => {
                        data.wards.forEach(ward => {
                            let option = new Option(ward.name, ward.code);
                            option.dataset.name = ward.name;
                            wardSelect.add(option);
                        });
                    })
                    .catch(error => console.error("Error fetching wards:", error));
            }
        });

        // Khi chọn phường/xã
        wardSelect.addEventListener("change", function () {
            const selectedWard = wardSelect.options[wardSelect.selectedIndex];
            wardNameHidden.value = selectedWard?.dataset.name || selectedWard?.text || "";
        });

        // Xử lý submit form
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                const loginUserNameInput = document.getElementById('loginUserName');
                
                // Regex kiểm tra URL chặt chẽ hơn
                const urlPattern = /\b((http|https):\/\/|www\.)[^\s]+|[^\s]+\.(com|net|org|vn|info|biz|edu)(\b|\/)/i;

                const usernameValue = loginUserNameInput?.value?.trim().toLowerCase() || "";

                if (loginUserNameInput && urlPattern.test(usernameValue)) {
                    alert('Links are not allowed in the username field. Please remove any URLs before proceeding.');
                    loginUserNameInput.focus();
                    return; // DỪNG tại đây
                }

                // Cập nhật hidden inputs
                const selectedCity = citySelect.options[citySelect.selectedIndex];
                const selectedDistrict = districtSelect.options[districtSelect.selectedIndex];
                const selectedWard = wardSelect.options[wardSelect.selectedIndex];

                cityNameHidden.value = selectedCity?.dataset.name || selectedCity?.text || "";
                districtNameHidden.value = selectedDistrict?.dataset.name || selectedDistrict?.text || "";
                wardNameHidden.value = selectedWard?.dataset.name || selectedWard?.text || "";

                // Gửi form
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

// Hiệu ứng cho input
document.querySelectorAll(".input-box input").forEach((input) => {
    input.addEventListener("input", function () {
        if (this.validity.valid || this.value.trim() !== "") {
            this.classList.add("has-content");
        } else {
            this.classList.remove("has-content");
        }
    });
});
