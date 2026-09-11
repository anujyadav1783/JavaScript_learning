// HTML ke alert div ko select karke alertBanner variable mein store kar rahe hain.
const alertBanner = document.querySelector("#alertBanner");

// HTML ke close button ko select karke closeButton variable mein store kar rahe hain.
const closeButton = document.querySelector("#closeButton");

// HTML ke show button ko select karke showButton variable mein store kar rahe hain.
const showButton = document.querySelector("#showButton");

// setTimeout() se milne wali timer ID ko baad mein clear karne ke liye variable.
let hideTimer;

// Ye function alert ko 3 seconds baad hide karne ka timer start karta hai.
function hideAlertAfterThreeSeconds() {
    // Agar pehle se koi timer chal raha hai to usse cancel karte hain.
    clearTimeout(hideTimer);

    // setTimeout() ke andar ka function 3000 milliseconds baad chalega.
    hideTimer = setTimeout(function () {
        // Alert mein hidden class add karke usse screen se hide karte hain.
        alertBanner.classList.add("hidden");

    // 3000 milliseconds ka matlab 3 seconds hota hai.
    }, 3000);
}

// Close button par click event listener attach kar rahe hain.
closeButton.addEventListener("click", function () {
    // Close button click hone par pending auto-hide timer cancel karte hain.
    clearTimeout(hideTimer);

    // Timer ka wait kiye bina alert ko immediately hide karte hain.
    alertBanner.classList.add("hidden");
});

// Show button par click event listener attach kar rahe hain.
showButton.addEventListener("click", function () {
    // hidden class remove karke alert ko dobara visible karte hain.
    alertBanner.classList.remove("hidden");

    // Alert show hone ke baad 3-second auto-hide timer dobara start karte hain.
    hideAlertAfterThreeSeconds();
});

// Page load hote hi pehla 3-second auto-hide timer start karte hain.
hideAlertAfterThreeSeconds();
