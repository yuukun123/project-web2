function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Toggle active class for both hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}


const save = document.querySelector('.save');
const cancel = document.querySelector('.cancel');
const save_suc = document.querySelector('.save-success');
const cancel_suc = document.querySelector('.cancel-success');
const blurOverlay = document.querySelector('.blur-overlay');
const close = document.querySelector('.close');
const close2 = document.querySelectorAll('.close2');

save.addEventListener('click', function(event) {
    event.preventDefault();
    save_suc.classList.add('active-popup');
    blurOverlay.classList.add('active');
})

close.addEventListener('click', function(event) {
    event.stopPropagation();
    save_suc.classList.remove('active-popup');
    blurOverlay.classList.remove('active');
})

cancel.addEventListener('click', function(event) {
    event.preventDefault();
    cancel_suc.classList.add('active-popup');
    blurOverlay.classList.add('active');
});


close2.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation()
        cancel_suc.classList.remove('active-popup');
        blurOverlay.classList.remove('active');
        

        // Check the value of the button and display the appropriate alert
        if (btn.value === "Yes") {
            alert("Cancel success");
        } else if (btn.value === "No") {
            alert("Cancel unsuccess");
        }
    });
});

const addCategory = document.querySelector('.add-category');
const addStatus = document.querySelector('.add-status');

addCategory.addEventListener('click', function(event) {
    event.preventDefault();
    alert("This function is still under development")
});

addStatus.addEventListener('click', function(event) {
    event.preventDefault();
    alert("This function is still under development")
});

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {

    // Get stored users from localStorage
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
        localStorage.removeItem('AdminUser'); // Example: remove the logged-in user from localStorage

        // Redirect to home page (you can modify the URL as needed)
        window.location.replace('../index.html'); // Redirect to the home page
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

