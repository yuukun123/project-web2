document.addEventListener("DOMContentLoaded", function () {
    const viewMoreBtns = document.querySelectorAll(".choose");
    const moreInforContent = document.querySelector('.more-infor-content');
    const blurOverlay = document.querySelector('.blur-overlay');

    const citySelect = document.getElementById("registerCity");
    const districtSelect = document.getElementById("registerDistrict");
    const wardSelect = document.getElementById("registerWard");
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
        const filterForm = document.querySelector('form');
        if (filterForm) {
            filterForm.addEventListener("submit", function () {
                const selectedCity = citySelect.options[citySelect.selectedIndex];
                const selectedDistrict = districtSelect.options[districtSelect.selectedIndex];
                const selectedWard = wardSelect.options[wardSelect.selectedIndex];

                cityNameHidden.value = selectedCity?.dataset.name || selectedCity?.text || "";
                districtNameHidden.value = selectedDistrict?.dataset.name || selectedDistrict?.text || "";
                wardNameHidden.value = selectedWard?.dataset.name || selectedWard?.text || "";
            });
        }
    }

    viewMoreBtns.forEach(item => {
        item.addEventListener('click', function(){
            const orderId = this.getAttribute('data-order-id');
            fetch(`pages/receipt-detail.php?order_id=${orderId}`)
                .then(response => response.text())
                .then(data => {
                    // Thay vì innerHTML
                    moreInforContent.innerHTML = '';
                    moreInforContent.insertAdjacentHTML('beforeend', data);
                    
                    const moreInfor = moreInforContent.querySelector('.more-infor');
                    blurOverlay.classList.add('active');
                    
                    // Lồng hai lần requestAnimationFrame để đảm bảo render kịp:
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            moreInfor.classList.add('active');
                        });
                    });                       

                    const iconClose = moreInfor.querySelector('.icon-close');
                    iconClose.addEventListener('click', function(){
                        moreInfor.classList.remove('active');

                        moreInfor.addEventListener('transitionend', () => {
                            blurOverlay.classList.remove('active');
                            moreInforContent.innerHTML = "";
                        }, { once: true });
                    });
                })
                .catch(error => console.error('Error loading order details:', error));
        });
    });
});
