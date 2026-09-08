let file = document.getElementById("input");
let btn = document.getElementById("btn1");

btn.addEventListener("click", function () {
    file.click();
});
file.addEventListener("change", function (dts){
    const selectedFile = dts.target.files[0];

    if (selectedFile) {
        btn.textContent = selectedFile.name;
    }
});