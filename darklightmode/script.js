// Device ki current dark/light preference check karne ke liye media query banate hain.
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Theme button aur paragraph ko HTML se select karte hain.
const themeButton = document.querySelector("#themeButton");
const themeText = document.querySelector("#themeText");

// Ye function selected theme ki class body par lagata hai.
function applyTheme(theme) {
    // Pehle dono classes remove karte hain, taaki purani theme na rahe.
    document.body.classList.remove("dark", "light");

    // Ab sirf selected theme ki class add karte hain.
    document.body.classList.add(theme);

    // User ko current theme ke baare mein text dikhate hain.
    themeText.textContent = `Current theme: ${theme}`;

    // Button par next theme ka action clearly dikhate hain.
    themeButton.textContent = theme === "dark"? "Switch to Light": "Switch to Dark";
}

// Device preference ko theme name mein convert karte hain.
function getSystemTheme() {
    return darkModeQuery.matches ? "dark" : "light";
}

// Page load par saved theme read karte hain.
const savedTheme = localStorage.getItem("theme");

// Saved theme ho to use priority dete hain; warna system theme use karte hain.
const startingTheme = savedTheme || getSystemTheme();

// Starting theme page par apply karte hain.
applyTheme(startingTheme);

// Button click hone par current theme ko opposite theme mein change karte hain.
themeButton.addEventListener("click", function () {
    // Check karte hain ki abhi dark theme active hai ya nahi.
    const currentTheme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    // Dark ko light aur light ko dark mein change karte hain.
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    // New theme page par apply karte hain.
    applyTheme(nextTheme);

    // New theme ko browser mein save karte hain.
    localStorage.setItem("theme", nextTheme);
});

// System theme change hone par update tabhi karo jab user ne theme save na ki ho.
darkModeQuery.addEventListener("change", function () {
    if (!localStorage.getItem("theme")) {
        applyTheme(getSystemTheme());
    }
});
