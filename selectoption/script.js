let select = document.querySelector("select");
let heading = document.querySelector("h1");

select.addEventListener("change", function () {
    heading.textContent = `${select.value} is selected`;
});