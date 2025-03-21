function showEditUserForm(userId) {
    fetch(`../Api_php/get-user.php?id=${userId}`)
        .then(response => response.json())
        .then(data => {
        if (!data.error) {
        document.getElementById('user_id').value = data.user_id;
        document.getElementById('username').value = data.user_name;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
        document.getElementById('password').value = data.password;
        document.getElementById('city').value = data.city;
        document.getElementById('district').value = data.district;
        document.getElementById('ward').value = data.ward;
        document.getElementById('street').value = data.street;
        document.getElementById('role').value = data.role;
        document.getElementById('created_at').value = data.created_at;
        document.getElementById('updated_at').value = data.updated_at;
        document.getElementById('modalTitle').innerText = "Edit User";
        document.getElementById('userModal').style.display = 'flex';
        document.getElementById('userModal').setAttribute('data-edit-id', userId);
        } else {
        alert(data.error);
        }
    })
    .catch(err => console.error(err));
}



function saveUser() {
    const userId = document.getElementById('userModal').getAttribute('data-edit-id');
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    if (userId) formData.append('id', userId);  // Nếu là edit thì gửi kèm ID

    fetch('save_user.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        closeModal();
        location.reload();
    })
    .catch(err => console.error(err));
}

window.onload = function() {
    loadUserTable();
};

function loadUserTable() {
    fetch('../Controllers/user-process.php')
        .then(response => response.text())
        .then(html => {
            document.getElementById('userTableContainer').innerHTML = html;
        })
        .catch(err => console.error(err));
}

function showAddUserForm() {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('address').value = '';
    document.getElementById('modalTitle').innerText = "Add User";
    document.getElementById('userModal').style.display = 'block';
    document.getElementById('userModal').removeAttribute('data-edit-id'); // Xóa edit id để biết đang thêm mới
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
    // Xóa dữ liệu cũ trong form nếu muốn:
    document.querySelectorAll('#userFormContainer input').forEach(input => {
        input.value = '';
    });
    // Nếu có attribute data-edit-id thì cũng reset:
    document.getElementById('userModal').removeAttribute('data-edit-id');
}
    



function toggleLockUser(userId, currentStatus) {
    const confirmMsg = currentStatus === 'locked' ? "Unlock this user?" : "Lock this user?";
    if (confirm(confirmMsg)) {
        const formData = new FormData();
        formData.append('id', userId);
        formData.append('action', currentStatus === 'locked' ? 'unlock' : 'lock');

        fetch('../Api_php/lock-user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadUserTable(); // Reload table
        })
        .catch(err => console.error(err));
    }
}
    