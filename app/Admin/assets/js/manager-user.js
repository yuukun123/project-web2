/* admin data */
document.addEventListener("DOMContentLoaded", function () {
  function getCurrentUser() {
    const admins = localStorage.getItem('AdminUser');
    return admins ? JSON.parse(admins) : [];
  }

  // Check if the admin is logged in and update button text
  function updateLoginButton() {
    const loginButton = document.getElementById('login-btn');
    const admins = getCurrentUser();

    if (admins) {
      loginButton.textContent = admins.username; // Change button to admin's name
      loginButton.disabled = true; // Optionally, disable the button after login
    }
  }

  const logoutButton = document.getElementById("logout-btn");

  // Handle the logout functionality
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("currentUser"); // remove logged-in user from localStorage
    window.location.replace("../index.html");
  });

  const initialUsers = [
    {
      id: "CT001",
      username: "user1",
      email: "user1@example.com",
      password: "12345",
      address: "distress 1"
    },
    {
      id: "CT002",
      username: "user2",
      email: "user2@example.com",
      password: "22345",
      address: "distress 1"
    },
    {
      id: "CT003",
      username: "user3",
      email: "user3@example.com",
      password: "32345",
      address: "distress 1"
    },
    {
      id: "CT004",
      username: "user4",
      email: "user4@example.com",
      password: "42345",
      address: "distress 1"
    },
    {
      id: "CT005",
      username: "user5",
      email: "user5@example.com",
      password: "52345",
      address: "distress 1"
    },
    {
      id: "CT006",
      username: "user6",
      email: "user6@example.com",
      password: "62345",
      address: "distress 1"
    }
  ];

  // Lưu vào localStorage nếu chưa có dữ liệu
  if (!localStorage.getItem("userList")) {
    localStorage.setItem("userList", JSON.stringify(initialUsers));
  }

  updateLoginButton();

  // Hàm load users từ localStorage và hiển thị lên bảng
  function loadUsers() {
    const users = JSON.parse(localStorage.getItem("userList")) || [];
    // Xóa toàn bộ nội dung tbody trước khi load lại để tránh duplicate hiển thị
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";
    users.forEach(user => {
      addUserToTable(user);
    });
  }

  loadUsers();

  // Gán sự kiện cho nút save (đảm bảo chỉ gán một lần)
  const save = document.querySelector('.save-btn');
  // Hủy sự kiện cũ nếu có
  save.removeEventListener('click', saveHandler);
  save.addEventListener('click', saveHandler);

  function saveHandler(event) {
    event.preventDefault();
    // Xác nhận hành động từ người dùng
    if (confirm("Bạn có chắc chắn muốn lưu thông tin?")) {
      saveUser();
    }
  }
});

function toggleGrade(contentId, chevronId) {
  var chevron = document.querySelectorAll('#' + chevronId);
  var content = document.querySelectorAll('#' + contentId);

  chevron.forEach((btn) => {
    btn.classList.toggle('up');
    btn.classList.toggle('down');
  });

  content.forEach((btn) => {
    if (btn.style.display === "none") {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
}

let userIdCounter = 4321; // Starting ID

// Hàm mở modal thêm user mới
function showAddUserForm() {
  document.getElementById("modalTitle").innerText = "Add User";
  document.getElementById("userModal").style.display = "flex";
  clearFormFields();
  // Xóa thuộc tính data-view-id để không nhận diện nhầm là edit
  document.getElementById("userModal").removeAttribute("data-view-id");
  // Cho phép chỉnh sửa các input
  document.getElementById("username").readOnly = false;
  document.getElementById("email").readOnly = false;
  document.getElementById("password").readOnly = false;
  document.getElementById("address").readOnly = false;
}

// Hàm mở modal xem/edit user
function showEditUserForm(userId) {
  document.getElementById("modalTitle").innerText = "View User";
  // Đặt data-view-id để nhận diện edit
  document.getElementById("userModal").setAttribute("data-view-id", userId);

  const users = JSON.parse(localStorage.getItem("userList")) || [];
  const user = users.find(u => u.id === userId);

  if (user) {
    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("address").value = user.address;

    // Set các input ở chế độ read-only khi xem
    document.getElementById("username").readOnly = true;
    document.getElementById("email").readOnly = true;
    document.getElementById("password").readOnly = true;
    document.getElementById("address").readOnly = true;

    document.getElementById("userModal").style.display = "flex";
  } else {
    console.error(`User with ID ${userId} not found.`);
  }
}

// Hàm lưu dữ liệu user
function saveUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const address = document.getElementById("address").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return;
  }

  if (!username || !email || !password || !address) {
    alert("All fields are required.");
    return;
  }

  const modalTitle = document.getElementById("modalTitle").innerText;
  // Nếu có data-view-id thì nhận diện là edit, nếu không thì là thêm mới
  const isEdit = document.getElementById("userModal").hasAttribute("data-view-id");
  let users = JSON.parse(localStorage.getItem("userList")) || [];

  if (isEdit) {
    // Chế độ edit
    const userId = document.getElementById("userModal").getAttribute("data-view-id");
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
      users[userIndex] = { 
        id: userId, 
        username, 
        email, 
        password, 
        address 
      };

      localStorage.setItem("userList", JSON.stringify(users));
      const row = document.getElementById(userId);
      if (row) {
        row.cells[1].innerText = username;
        row.cells[2].innerText = email;
        row.cells[3].innerText = password;
        row.cells[4].innerText = address;
      }
      alert("User updated successfully!");
    } else {
      alert("User not found!");
    }
  } else {
    // Chế độ thêm mới
    // Nếu bạn muốn đảm bảo không thêm duplicate theo một trường nào đó, ví dụ email:
    const duplicate = users.find(user => user.email === email);
    if (duplicate) {
      alert("User with this email already exists!");
      return;
    }

    userIdCounter++;
    const newUserId = `user${userIdCounter}`;
    const newUser = { id: newUserId, username, email, password, address };

    users.push(newUser);
    localStorage.setItem("userList", JSON.stringify(users));
    addUserToTable(newUser);
    alert("User added successfully!");
  }

  closeModal();
  // Reload bảng để đảm bảo không có duplicate hiển thị (nếu cần)
  reloadTable();
}

function formatId(id) {
  return id.replace(/^0+/, "");
}

// Hàm thêm user vào bảng
function addUserToTable(user) {
  const table = document.querySelector("table tbody");
  // Kiểm tra nếu row đã tồn tại thì không thêm nữa
  if (document.getElementById(user.id)) {
    return;
  }
  const newRow = table.insertRow();
  newRow.id = user.id;

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);
  const cell6 = newRow.insertCell(5);

  cell1.innerHTML = formatId(user.id);
  cell2.innerHTML = user.username;
  cell3.innerHTML = user.email;
  cell4.innerHTML = user.password;
  cell5.innerHTML = user.address;

  cell4.classList.add("hide1");
  cell5.classList.add("hide2");

  cell6.innerHTML = `
    <button class="button lock" onclick="toggleLock('${user.id}')">
      <ion-icon name="lock-closed-outline"></ion-icon>
    </button>
    <button class="button edit" onclick="showEditUserForm('${user.id}')">
      <ion-icon name="create-outline"></ion-icon>
    </button>
  `;
}

// Reload lại bảng hiển thị tất cả người dùng (tránh duplicate hiển thị)
function reloadTable() {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";
  const users = JSON.parse(localStorage.getItem("userList")) || [];
  users.forEach(user => {
    addUserToTable(user);
  });
}

// Hàm toggle lock/unlock
function toggleLock(userId) {
  document.getElementById('confirmLockModal').style.display = 'flex';

  const confirmLockBtn = document.getElementById('confirmLockBtn');
  confirmLockBtn.onclick = function() {
    const row = document.getElementById(userId);
    const lockButton = row.querySelector(".lock ion-icon");
    const isLocked = lockButton.getAttribute("name") === "lock-closed-outline";

    if (isLocked) {
      lockButton.setAttribute("name", "lock-open-outline");
    } else {
      lockButton.setAttribute("name", "lock-closed-outline");
    }
    closeConfirmModal();
  };
}

function closeConfirmModal() {
  document.getElementById('confirmLockModal').style.display = 'none';
}

function closeModal() {
  document.getElementById("userModal").style.display = "none";
}

function clearFormFields() {
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("address").value = "";
}
