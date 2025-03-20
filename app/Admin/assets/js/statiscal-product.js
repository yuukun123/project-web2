/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
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

    const logoutButton = document.getElementById('logout-btn');

    // Handle the logout functionality
    logoutButton.addEventListener('click', function() {
        // Optionally, clear user data from localStorage or sessionStorage
        localStorage.removeItem('currentUser'); // Example: remove the logged-in user from localStorage

        // Redirect to home page (you can modify the URL as needed)
        window.location.href = '../index.html'; // Redirect to the home page
    });

    // Automatically set admin name on page load if already logged in
    updateLoginButton();
});


function toggleGrade(contentId, chevronId) {
    var chevron = document.querySelectorAll(('#' + chevronId));
    var content = document.querySelectorAll(('#' + contentId));


    chevron.forEach((btn) => {
        btn.classList.toggle('up');
        btn.classList.toggle('down');
    })

    content.forEach((btn) => {
        // Toggle visibility of content
        if (btn.style.display === "none") {
            btn.style.display = "block";

            console.log("11");
        } else {
            btn.style.display = "none";
            console.log("12");
        }
    })
}



const detailBtns = document.querySelectorAll('.js-detail-btn')
const receipt = document.querySelector('.div-receipt ')
const removedetailBtn = document.querySelector('.close-btn')
function showDetail() {
    receipt.classList.add('open')
}
for(const detailBtn of detailBtns ){
    detailBtn.addEventListener('click',showDetail)
}
removedetailBtn.addEventListener('click', function(){
    receipt.classList.remove('open')
})
// filter 
const orders = [
    { date: "2025-01-15", product: "Avocado Mousse", quantity: 2, amount: "1.020.000đ" },
    { date: "2025-01-30", product: "Avocado Mousse", quantity: 3, amount: "1.620.000đ" },
    { date: "2025-02-05", product: "Matcha Croissant", quantity: 7, amount: "980.000đ" },
    { date: "2025-02-10", product: "Lemon Tea", quantity: 10, amount: "600.000đ" },
    { date: "2025-02-22", product: "Matcha Latte", quantity: 15, amount: "1.125.000đ" }
];
function filterData(){
    let fromDate = document.getElementById("fromDate").value;
    let toDate = document.getElementById("toDate").value;
    let tableBody = document.getElementById("orderBody")
    //  convert time to digit
    let from = new Date(fromDate).getTime();
    let to = new Date(toDate).getTime();
    //delete old values 
    tableBody.innerHTML="";
    //filter by date
    let filterOrders = orders.filter(order=>{
        let orderDate = new Date(order.date).getTime();
        return (!fromDate || orderDate >= from ) && (!toDate || orderDate <= to);
    });
    //render values
    filterOrders.forEach(order=>{
        let no = 0;
        no++;
        let row = `
            <tr>
                <td>#${no}</td>
                <td>${order.date}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td >
                     <div class="detail">
                        <button class="js-detail-btn">
                            <ion-icon name="receipt-outline"></ion-icon>
                        </button>  
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
        
    });
    let detailButton = document.querySelector(".div-receipt");
    let closeBtn = document.querySelector(".close-btn");

    tableBody.addEventListener("click", (event) => {
        if (event.target.closest(".js-detail-btn")) {
        // Thêm class để hiện
             detailButton.classList.add("open");
            }
    });

    closeBtn.addEventListener("click", function () {
    // Gỡ class để ẩn
    detailButton.classList.remove("open");
});

}