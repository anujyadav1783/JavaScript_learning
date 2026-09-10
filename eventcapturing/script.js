let diva = document.querySelector(".a");
let divb = document.querySelector(".b");
let divc = document.querySelector(".c");
let button = document.querySelector("button");

// Without a third argument, the click uses bubbling: it moves from the
// clicked button up through its parent divs, from inside to outside.
button.addEventListener("click", function (e) {
    console.log("button clicked");
});
divc.addEventListener("click", function (e) {
    console.log("divc clicked");
});
divb.addEventListener("click", function (e) {
    console.log("divb clicked");
});
diva.addEventListener("click", function (e) {
    console.log("diva clicked");
});