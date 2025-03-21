function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function findBestMatchByName(list, name) {
    if (!name) return null;
    const normName = normalizeString(name);
    return list.find(item => {
        const normItemName = normalizeString(item.name);
        return normItemName === normName || normItemName.includes(normName) || normName.includes(normItemName);
    }) || null;
}


async function showEditUserForm(user) {
    document.getElementById('modalTitle').innerText = "Edit User";

    document.getElementById('user_id').value = user.user_id;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('password').value = user.password;
    document.getElementById('role').value = user.role;
    document.getElementById('street').value = user.street;
    document.getElementById('created_at').value = user.created_at;
    document.getElementById('updated_at').value = user.updated_at;

    document.getElementById('username').readOnly = true;
    document.getElementById('email').readOnly = true;
    document.getElementById('password').readOnly = true;

    // Load city and select correct city
    const cities = await loadCities();
    const cityMatch = findBestMatchByName(cities, user.city);
    if (cityMatch) {
        document.getElementById('city').value = cityMatch.code;

        // Load districts of that city
        const cityData = await fetchCityData(cityMatch.code);
        await loadDistrictsByCityData(cityData);

        // Find and select district
        const districtMatch = findBestMatchByName(cityData.districts, user.district);
        if (districtMatch) {
            document.getElementById('district').value = districtMatch.code;

            // Load wards
            const res = await fetch(`https://provinces.open-api.vn/api/d/${districtMatch.code}?depth=2`);
            const districtData = await res.json();
            const wardSelect = document.getElementById('ward');
            wardSelect.innerHTML = '<option value="">Select ward</option>';
            districtData.wards.forEach(w => {
                const opt = document.createElement("option");
                opt.value = w.name;
                opt.textContent = w.name;
                wardSelect.appendChild(opt);
            });

            // Find and select ward
            const wardMatch = findBestMatchByName(districtData.wards, user.ward);
            if (wardMatch) {
                wardSelect.value = wardMatch.name;
            } else {
                console.log("Không tìm thấy ward:", user.ward);
            }
        } else {
            console.log("Không tìm thấy district:", user.district);
        }
    } else {
        console.log("Không tìm thấy city:", user.city);
    }

    document.getElementById('userModal').style.display = 'flex';
}


async function editUser(userId) {
    const response = await fetch(`../Api_php/get-user.php?id=${userId}`);
    const user = await response.json();
    showEditUserForm(user);
}

async function fetchCityData(cityCode) {
    const res = await fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
    return res.json();
}

async function loadCities() {
    const res = await fetch("https://provinces.open-api.vn/api/?depth=1");
    const cities = await res.json();
    const citySelect = document.getElementById("city");
    citySelect.innerHTML = '<option value="">Select city</option>';
    cities.forEach(city => {
        citySelect.insertAdjacentHTML('beforeend', `<option value="${city.code}">${city.name}</option>`);
    });
    return cities;
}

async function loadDistrictsByCityData(cityData, selectedDistrictCode = '') {
    const districtSelect = document.getElementById("district");
    districtSelect.innerHTML = '<option value="">Select district</option>';
    cityData.districts.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.code;
        opt.textContent = d.name;
        districtSelect.appendChild(opt);
    });
    if (selectedDistrictCode) districtSelect.value = selectedDistrictCode;
}

async function loadDistricts() {
    const cityCode = document.getElementById("city").value;
    if (cityCode) {
        const cityData = await fetchCityData(cityCode);
        await loadDistrictsByCityData(cityData);
    }
}

async function loadWardsByDistrictCode(districtCode, selectedWard = '') {
    const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    const districtData = await res.json();
    const wardSelect = document.getElementById("ward");
    wardSelect.innerHTML = '<option value="">Select ward</option>';
    districtData.wards.forEach(w => {
        const opt = document.createElement("option");
        opt.value = w.name;
        opt.textContent = w.name;
        wardSelect.appendChild(opt);
    });
    if (selectedWard) wardSelect.value = selectedWard;
}

async function loadWards() {
    const districtCode = document.getElementById("district").value;
    if (districtCode) await loadWardsByDistrictCode(districtCode);
}

function saveUser() {
    const formData = new FormData();
    ['username', 'email', 'phone', 'password', 'role', 'street'].forEach(id => {
        formData.append(id, document.getElementById(id).value);
    });
    ['city', 'district', 'ward'].forEach(id => {
        formData.append(id, document.getElementById(id).options[document.getElementById(id).selectedIndex].text);
    });
    const userId = document.getElementById('user_id').value;
    if (userId) formData.append('id', userId);

    fetch('../Api_php/save-user.php', { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => {
            alert(data);
            closeModal();
            loadUserTable();
        })
        .catch(console.error);
}

function loadUserTable() {
    fetch('../Controllers/user-process.php')
        .then(response => response.text())
        .then(html => {
            document.getElementById('userTableContainer').innerHTML = html;
        })
        .catch(console.error);
}

function showAddUserForm() {
    document.getElementById('modalTitle').innerText = "Add New User";
    document.querySelectorAll('#userFormContainer input').forEach(input => input.value = '');
    loadCities();

    document.getElementById('username').readOnly = false;
    document.getElementById('email').readOnly = false;
    document.getElementById('password').readOnly = false;

    document.getElementById('userModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
    document.querySelectorAll('#userFormContainer input').forEach(input => input.value = '');
}

let pendingUserId = null;
let pendingStatus = null;

function toggleLockUser(userId, currentStatus) {
    pendingUserId = userId;
    pendingStatus = currentStatus === 'locked';
    document.getElementById('confirmLockModal').style.display = 'flex';
}

document.getElementById('confirmLockBtn').addEventListener('click', () => {
    if (pendingUserId !== null) {
        const formData = new FormData();
        formData.append('id', pendingUserId);
        formData.append('action', pendingStatus ? 'unlock' : 'lock');

        fetch('../Api_php/lock-user.php', { method: 'POST', body: formData })
            .then(response => response.text())
            .then(data => {
                alert(data);
                closeConfirmModal();
                loadUserTable();
            })
            .catch(console.error);
    }
});

function closeConfirmModal() {
    document.getElementById('confirmLockModal').style.display = 'none';
    pendingUserId = null;
    pendingStatus = null;
}

window.onload = loadUserTable;