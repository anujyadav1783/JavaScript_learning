let file = document.getElementById("input");
let btn = document.getElementById("btn1");

btn.addEventListener("click", function () {
    file.click();
});
file.addEventListener("change", function (dts){
    btn.textContent = file.files[0].name;    
      
}   )