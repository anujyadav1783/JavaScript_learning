// Browser se pooch rahe hain ki user ke device mein dark mode enabled hai ya nahi.
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Page par dark ya light class lagane wala function.
function setDarkOrLight() {
    // Agar device dark mode use kar raha hai...
    if (darkModeQuery.matches) {
        // Body mein dark class add karke dark theme apply karo.
        document.body.classList.add("dark");

        // Light class remove karo, taaki dono themes ek saath apply na hon.
        document.body.classList.remove("light");
    } else {
        // Agar device dark mode mein nahi hai, to light class add karo.
        document.body.classList.add("light");

        // Dark class remove karo.
        document.body.classList.remove("dark");
    }
}

// Page load hote hi current device theme apply karo.
setDarkOrLight();

// Jab user device ki theme change kare, function dobara run karo.
darkModeQuery.addEventListener("change", function () {
    setDarkOrLight();
});
