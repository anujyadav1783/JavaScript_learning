// how to see the properties of the event object in javascript?In JavaScript, you can see the properties of the event object by logging it to the console. When an event occurs, the event object is passed as an argument to the event handler function. You can use `console.log()` to inspect the event object and its properties.
let inp=document.getElementById("inputField");
inp.addEventListener("input",function(dts){
    console.log(dts);
})
