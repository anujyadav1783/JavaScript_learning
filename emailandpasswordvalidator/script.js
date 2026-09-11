// Form aur uske input elements ko select kar rahe hain.
const form = document.querySelector("#registrationForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const ageInput = document.querySelector("#age");

// Form submit hone par browser ka default page reload rok kar validation chalayenge.
form.addEventListener("submit", function (event) {
   event.preventDefault();

   // Har submit se pehle purane error messages remove kar rahe hain.
   document.querySelector("#nameError").textContent = "";
   document.querySelector("#emailError").textContent = "";
   document.querySelector("#passwordError").textContent = "";
   document.querySelector("#ageError").textContent = "";
   document.querySelector("#successMessage").textContent = "";

   // trim() name aur email ke start/end ke extra spaces remove karta hai.
   const name = nameInput.value.trim();
   const email = emailInput.value.trim();
   const password = passwordInput.value;
   const age = Number(ageInput.value);

   // Email mein text@text.domain jaisa basic format check kar rahe hain.
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Password mein 8+ characters, lowercase, uppercase, number aur
   // special character hona zaroori hai.
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

   // Initially form ko valid maan rahe hain.
   let isFormValid = true;

   // Name empty ya 2 characters se chhota ho to error show karo.
   if (name.length <= 2) {
      document.querySelector("#nameError").textContent =
         "Name should be longer than 2 characters";
      isFormValid = false;
   }

   // Email regex ke format mein nahi hai to error show karo.
   if (!emailRegex.test(email)) {
      document.querySelector("#emailError").textContent =
         "Please enter a valid email";
      isFormValid = false;
   }

   // Password required rules follow nahi karta to error show karo.
   if (!passwordRegex.test(password)) {
      document.querySelector("#passwordError").textContent =
         "Password needs 8+ characters, uppercase, lowercase, number and special character";
      isFormValid = false;
   }

   // Age 18 se 120 ke beech honi chahiye.
   if (!Number.isInteger(age) || age < 18 || age > 120) {
      document.querySelector("#ageError").textContent =
         "Age must be a whole number between 18 and 120";
      isFormValid = false;
   }

   // Sirf tab success message aur reset hoga jab saari values valid hon.
   if (isFormValid) {
      document.querySelector("#successMessage").textContent =
         "Registration submitted successfully";
      console.log("Form submitted successfully:", { name, email, age });
      form.reset();
   }
});