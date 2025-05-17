/* admin data */
document.addEventListener('DOMContentLoaded', function () {
  // Function: Check login status
  function checkLoginStatus(callback) {
    console.log("Đang gọi checkLoginStatus...");
    fetch("Api_php/session-admin.php", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        console.log("Dữ liệu session trả về:", data);

        if (!data.loggedIn) {
          console.warn("Chưa đăng nhập. Chuyển về trang đăng nhập...");
          window.location.href = "login";
          return;
        }

        if (data.status && data.status.toLowerCase() === "locked") {
          console.warn("Tài khoản đã bị khóa. Chuyển về trang đăng nhập...");
          alert("Your account has been locked. You will be redirected to the login page.");
          window.location.href = "login";
          return;
        }

        if (data.loggedIn) {
          document.body.classList.add("logged-in");
        } else {
          document.body.classList.remove("logged-in");
        }

        if (callback) {
          callback(data.loggedIn);
        }
      })
      .catch(error => console.error("Lỗi khi kiểm tra session:", error));
  }

  // Gọi kiểm tra login
  checkLoginStatus((isLoggedIn) => {
    if (!isLoggedIn) {
      console.log("Không đăng nhập, xóa flag welcomeShownAdmin");
      localStorage.removeItem("welcomeShownAdmin");
    }
  });
});

// Hàm cập nhật các option trạng thái dựa theo trạng thái hiện tại
function updateStatusOptionsBasedOnCurrent(orderStatus) {
  const statuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
  const currentStatus = orderStatus.value;
  const currentIndex = statuses.indexOf(currentStatus);

  for (let option of orderStatus.options) {
    const optionIndex = statuses.indexOf(option.value);
    if (optionIndex < currentIndex) {
      option.disabled = true;
      option.hidden = true;
    } else {
      option.disabled = false;
      option.hidden = false;
    }
  }
}

// Hàm load chi tiết đơn hàng và xử lý hiển thị
function loadOrderDetail(orderId) {
  fetch(`Controllers/get_order_detail.php?order_id=${orderId}`)
    .then(res => res.json())
    .then(data => {
      const orderStatus = document.getElementById('order_status');

      // Render các option đầy đủ
      orderStatus.innerHTML = `
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      `;

      // Đặt trạng thái hiện tại
      orderStatus.value = data.status;

      // Cập nhật trạng thái các option
      updateStatusOptionsBasedOnCurrent(orderStatus);

      // Lắng nghe thay đổi và cập nhật lại nếu cần
      orderStatus.addEventListener('change', () => {
        updateStatusOptionsBasedOnCurrent(orderStatus);
      });

      // Hiển thị modal
      document.getElementById('DetailOrders').style.display = 'block';
      document.getElementById('overlay').style.display = 'block';
    })
    .catch(err => {
      console.error('Error loading order detail:', err);
      alert('❌ Failed to load order details.');
    });
}

// Toggle menu (nếu có)
function toggleGrade(contentId, chevronId) {
  var chevron = document.querySelectorAll('#' + chevronId);
  var content = document.querySelectorAll('#' + contentId);

  chevron.forEach((btn) => {
    btn.classList.toggle('up');
    btn.classList.toggle('down');
  });

  content.forEach((btn) => {
    btn.style.display = (btn.style.display === "none") ? "block" : "none";
  });
}
