let diva = document.querySelector(".a");
let divb = document.querySelector(".b");
let divc = document.querySelector(".c");
let button = document.querySelector("button");

// When the button is clicked, the event travels through two main phases:
//
// This example demonstrates the capturing phase.
// The event travels from the outer element toward the clicked button.
// Passing true as the third argument enables a capturing listener.
//
// The button is the event target, but the capturing listeners run first in
// outside-to-inside order. The console output will be:
// diva clicked -> divb clicked -> divc clicked -> button clicked
button.addEventListener("click", function (e) {
    console.log("button clicked");
}, true);
divc.addEventListener("click", function (e) {
    console.log("divc clicked");
}, true);
divb.addEventListener("click", function (e) {
    console.log("divb clicked");
}, true);
diva.addEventListener("click", function (e) {
    console.log("diva clicked");
}, true);