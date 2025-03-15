/*Home data*/

document.addEventListener("DOMContentLoaded", function () {
    const citySelect = document.getElementById("registerCity");
    const districtSelect = document.getElementById("registerDistrict");
    const wardSelect = document.getElementById("registerWard");

    // Lấy danh sách tỉnh/thành phố từ API
    fetch("https://provinces.open-api.vn/api/p/")
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                let option = new Option(city.name, city.code);
                citySelect.add(option);
            });
        });

    // Khi chọn tỉnh/thành phố -> Load danh sách quận/huyện
    citySelect.addEventListener("change", function () {
        let cityCode = citySelect.value;
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
                });
        }
    });

    // Khi chọn quận/huyện -> Load danh sách phường/xã
    districtSelect.addEventListener("change", function () {
        let districtCode = districtSelect.value;
        wardSelect.innerHTML = "<option value=''>Select Ward</option>";

        if (districtCode) {
            fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                .then(response => response.json())
                .then(data => {
                    data.wards.forEach(ward => {
                        let option = new Option(ward.name, ward.code);
                        wardSelect.add(option);
                    });
                });
        }
    });


    const form = document.getElementById('registerForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        const formData = new FormData(form);

        fetch('pages/Controllers/register_process.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = 'http://localhost/project-web2/login';
            } else {
                alert('Đã xảy ra lỗi:\n' + data.errors.join('\n'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi không xác định.');
        });
    });
    
});

document.querySelectorAll(".input-box input").forEach((input) => {
    input.addEventListener("input", function () {
        if (this.validity.valid || this.value.trim() !== "") {
            this.classList.add("has-content");
        } else {
            this.classList.remove("has-content");
        }
    });
});

