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

    document.getElementById('username').value = user.username;
    document.getElementById('first_name').value = user.first_name;
    document.getElementById('last_name').value = user.last_name;
    document.getElementById('password').value = user-password;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;

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


async function editUser(username) {
    const response = await fetch(`Api_php/get-user.php?user_name=${username}`);
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
    let errors = [];

    const fields = ['username', 'first_name', 'last_name', 'email', 'phone', 'password', 'role', 'street', 'city', 'district', 'ward'];

    // Lấy dữ liệu từ input và kiểm tra nếu trống
    fields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            formData.append(id, element.value.trim());
            if (!element.value.trim()) {
                errors.push(`Please enter ${id.replace('_', ' ')}.`);
            }
        } else {
            console.warn(`⚠️ Element with ID: ${id} not found`);
        }
    });

    const userId = document.getElementById('user_id');
    if (userId) formData.append('id', userId.value.trim());

    // 📌 Kiểm tra email hợp lệ
    const emailElement = document.getElementById('email');
    if (emailElement && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailElement.value.trim())) {
        errors.push("Invalid email.");
    }

    // 📌 Kiểm tra số điện thoại hợp lệ
    const phoneElement = document.getElementById('phone');
    const phonePattern = /^(03[2-9]|05[2,6,8,9]|07[0-9]|08[1-9]|09[0-9])\d{7}$/;
    if (phoneElement && !phonePattern.test(phoneElement.value.trim())) {
        errors.push("Invalid phone number.");
    }

    // 📌 Kiểm tra mật khẩu hợp lệ
    const passwordElement = document.getElementById('password');
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordElement && !passwordElement.readOnly) {
        if (!passwordPattern.test(passwordElement.value.trim())) {
            errors.push("Password must be at least 8 characters long, including uppercase letters, lowercase letters, numbers, and special characters.");
        }
    }

    // Nếu có lỗi, hiển thị thông báo lỗi bằng alert
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    // Gửi dữ liệu nếu hợp lệ
    fetch('Api_php/save-user.php', { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => {
            alert(data);
            closeModal();
            loadUserTable();
        })
        .catch(console.error);
}

let currentPage = 1;
const rowsPerPage = 8;

function paginateTable() {
    const rows = Array.from(document.querySelectorAll('#userTableContainer table tbody tr'))
        .filter(row => row.style.display !== 'none'); // chỉ lấy các hàng đang hiển thị (sau tìm kiếm)
    
    const rowsPerPage = 8;
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    let currentPage = 1;

    function showPage(page) {
        currentPage = page;
        rows.forEach((row, index) => {
            row.style.display = (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) ? '' : 'none';
        });

        renderPagination();
    }

    function renderPagination() {
        const paginationContainer = document.getElementById('paginationContainer');
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            if (i === currentPage) button.classList.add('active');
            button.addEventListener('click', () => showPage(i));
            paginationContainer.appendChild(button);
        }
    }

    // Gọi lần đầu
    if (rows.length > 0) {
        showPage(1);
    } else {
        document.getElementById('paginationContainer').innerHTML = '';
    }
}




function loadUserTable() {
    fetch('Controllers/user-process.php')
        .then(response => response.text())
        .then(html => {
            document.getElementById('userTableContainer').innerHTML = html;
            paginateTable();  // Gọi phân trang sau khi load bảng
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

let pendingUserName = null;
let pendingStatus = null;

function toggleLockUser(username, currentStatus, role) {
    pendingUserName = username;
    pendingStatus = currentStatus === 'locked';
    document.getElementById('confirmLockModal').style.display = 'flex';

    // Kiểm tra nếu người dùng là admin và bị khóa
    if (role === 'admin' && pendingStatus) {
        logout();
    }
}



document.getElementById('confirmLockBtn').addEventListener('click', () => {
    if (pendingUserName !== null) {
        const formData = new FormData();
        formData.append('user_name', pendingUserName);
        formData.append('action', pendingStatus ? 'unlock' : 'lock');

        fetch('Api_php/lock-user.php', { method: 'POST', body: formData })
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
    pendingUserName = null;
    pendingStatus = null;
}

window.onload = loadUserTable;

// tìm kiếm user
function searchUser() {
    const inputField = document.querySelector('.find');
    const filter = inputField.value.trim().toLowerCase();
    const table = document.querySelector('#userTableContainer table');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    // Xóa dòng "Not found" nếu có từ lần tìm kiếm trước
    const notFoundRow = tbody.querySelector('.not-found-row');
    if (notFoundRow) {
        notFoundRow.remove();
    }

    if (filter === "") {
        // Hiển thị lại tất cả hàng
        rows.forEach(row => row.style.display = '');
        currentPage = 1;
        paginateTable();
        return;
    }

    let found = false;
    rows.forEach(row => {
        const username = row.querySelector('td:nth-child(1)')?.textContent.toLowerCase() || '';
        if (username.includes(filter)) {
            row.style.display = '';
            found = true;
        } else {
            row.style.display = 'none';
        }
    });

    if (!found) {
        // Tạo dòng mới hiển thị "Not found"
        const newRow = document.createElement('tr');
        newRow.classList.add('not-found-row');
        const td = document.createElement('td');
        td.colSpan = rows[0].children.length;
        td.style.textAlign = 'center';
        td.textContent = 'Not found';
        newRow.appendChild(td);
        tbody.appendChild(newRow);
    }

    currentPage = 1;
    paginateTable();
}


// Gán sự kiện vào nút tìm kiếm để chỉ tìm khi nhấn nút
document.querySelector('.search').addEventListener('click', searchUser);

// Ngăn việc tìm kiếm khi nhập chữ, chỉ tìm khi nhấn nút
document.querySelector('.find').addEventListener('input', function () {
    if (this.value.trim() === "") {
        searchUser(); // Khi ô tìm kiếm trống, gọi lại để reset bảng
    }
});






// document.querySelector('.find').addEventListener('input', function () {
//     const filter = this.value.toLowerCase();
//     const table = document.querySelector('#userTableContainer table');
//     if (!table) return; // Nếu chưa có table thì không làm gì

//     const rows = table.querySelectorAll('tbody tr');
//     rows.forEach(row => {
//         const username = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
//         const email = row.querySelector('td:nth-child(3)')?.textContent.toLowerCase() || '';
//         if (username.includes(filter) || email.includes(filter)) {
//             row.style.display = '';
//         } else {
//             row.style.display = 'none';
//         }
//     });
// });
