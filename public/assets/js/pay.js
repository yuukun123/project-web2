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
    

    // Khi chọn Auto-fill
    autoFillRadio.addEventListener("change", function () {
        if (this.checked) {
            // Set toàn bộ địa chỉ từ database
            citySelect.innerHTML = `<option selected>${userCity}</option>`;
            districtSelect.innerHTML = `<option selected>${userDistrict}</option>`;
            wardSelect.innerHTML = `<option selected>${userWard}</option>`;
            streetInput.value = userStreet;
            // Disable chọn city/district/ward
            citySelect.disabled = true;
            districtSelect.disabled = true;
            wardSelect.disabled = true;
            streetInput.readOnly = true;
        }
    });

    // Khi chọn Send to other
    otherRadio.addEventListener("change", function () {
        if (this.checked) {
            citySelect.disabled = false;
            districtSelect.disabled = false;
            wardSelect.disabled = false;
            streetInput.readOnly = false;
            streetInput.value = '';

            // Load lại city từ API
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
                });
        }
    });

    // Khi chọn city => load district
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

    // Khi chọn district => load ward
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

    // Khi load page, nếu auto-fill được chọn sẵn:
    if (autoFillRadio.checked) {
        autoFillRadio.dispatchEvent(new Event('change'));
    }
});
