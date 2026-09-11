// Form aur name input ko HTML se select kar rahe hain.
let form = document.querySelector("form");
let nameInput = document.querySelector("#name");
let nameError = document.querySelector("#nameError");

// Form submit hone par ye function chalega.
form.addEventListener("submit", function (e) {
    // Page reload hone se rokta hai, taaki JavaScript validation ka result dikhe.
    e.preventDefault();

    // Input ki value se extra spaces remove kar rahe hain.
    let name = nameInput.value.trim();

    // Name 2 characters ya usse chhota ho to error message show karo.
    if (name.length <= 2) {
        nameError.textContent = "Name should be longer than 2 characters";
        return;
    }

    // Valid name milne par purana error message clear karo.
    nameError.textContent = "";

    // Console mein submitted name show karo.
    console.log("Form submitted successfully:", name);

    // Successful submit ke baad form fields ko initial state mein lao.
    form.reset();
});