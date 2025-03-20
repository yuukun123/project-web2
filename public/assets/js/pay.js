// /*admin data*/
// document.addEventListener('DOMContentLoaded', function() {

//     const paymentMethodRadios = document.querySelectorAll('input[name="payment_method"]');
//     const cardInput = document.getElementById('card-input');

//     // Add an event listener to all radio buttons
//     paymentMethodRadios.forEach(radio => {
//         radio.addEventListener('change', () => {
//             if (radio.value === 'credit-card' && radio.checked) {
//                 cardInput.classList.add('active'); // Show card input
//             } else {
//                 cardInput.classList.remove('active'); // Hide card input
//             }
//         });
//     });



//     const btn = document.querySelector('.pay-button');

//     // Function to show confirmation
//     function showConfirmation() {
//         document.querySelector('.my-order').style.display = 'none';
//         document.getElementById('overlay').style.display = 'block';
//         document.getElementById('confirmation').style.display = 'block';
//     }

//     // Function to auto-fill the form from local storage for a logged-in user
//     function autoFillForm() {

//         // document.getElementById("full_name").value = currentUser.username;
//         // document.getElementById("phone").value = localStorage.getItem("user_phone") || "";
//         // document.getElementById("address").value = localStorage.getItem("user_address") || "";
//         // document.getElementById("delivery_date").value = localStorage.getItem("user_delivery_date") || "";
//         // document.getElementById("note").value = localStorage.getItem("user_note") || "";
    
        

//         console.log("Auto-fill function called");
//         console.log("Full Name from Local Storage:", currentUser.username);
//         // document.getElementById("full_name").value = currentUser.username || "";
//         document.getElementById("phone").value = currentUser.phone;
//         document.getElementById("address").value = currentUser.address;
    
//     }

//     // Function to clear the form
//     function clearForm() {
//         document.getElementById("full_name").value = "";
//         document.getElementById("phone").value = "";
//         document.getElementById("address").value = "";
//         document.getElementById("delivery_date").value = "";
//         document.getElementById("note").value = "";
//     }

//     // Event listener for the pay button
//     btn.addEventListener('click', function() {
//         const name = document.querySelector("#full_name");
//         const phone = document.querySelector("#phone");
//         const address = document.querySelector("#address");
//         const date = document.querySelector("#delivery_date");

//         const fields = [
//             { field: name, message: "Please enter YOUR NAME." },
//             { field: phone, message: "Please enter YOUR PHONE NUMBER." },
//             { field: address, message: "Please enter YOUR ADDRESS." },
//             { field: date, message: "Please select a DATE." }
//         ];
        
//         const emptyFields = fields.filter(({ field }) => field.value === "");
        
//         if (emptyFields.length === fields.length) {
//             alert("All fields are required. Please fill in all the fields.");
//         } else if (emptyFields.length > 0) {
//             alert(emptyFields[0].message); // Thông báo lỗi đầu tiên
//         } else {
//             showConfirmation();
//         }
//     });

//     // Event listeners for radio buttons
//     document.getElementById("autoFill").addEventListener("change", function() {
//         if (this.checked) {
//             autoFillForm();
//         }
//     });

//     document.getElementById("clearFill").addEventListener("change", function() {
//         if (this.checked) {
//             clearForm();
//         }
//     });

//     // Initial auto-fill if 'Auto fill' is selected by default
//     window.onload = function() {
//         if (document.getElementById("autoFill").checked) {
//             autoFillForm();
//         }
//     };


// });

document.addEventListener('DOMContentLoaded', function() {
    const cardDetailsSection = document.querySelector('.card-details');
    const creditCardFields = document.getElementById('credit-card-fields');
  
    if (cardDetailsSection && creditCardFields) {
      const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
  
      paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
          if (this.value === 'credit-card') {
            cardDetailsSection.classList.add('show');
            creditCardFields.style.display = 'flex';
          } else {
            cardDetailsSection.classList.remove('show');
            creditCardFields.style.display = 'none';
          }
        });
      });
  
      const selectedMethod = document.querySelector('input[name="payment_method"]:checked');
      if (!selectedMethod || selectedMethod.value !== 'credit-card') {
        cardDetailsSection.classList.remove('show');
        creditCardFields.style.display = 'none';
      } else {
        cardDetailsSection.classList.add('show');
        creditCardFields.style.display = 'flex';
      }
    }
  });