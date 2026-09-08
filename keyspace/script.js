let c = document.querySelector("h1");
document.addEventListener("keydown",function(dts){
   let val= dts.key;
   if(val==" "){
    c.textContent="Space key is pressed";
   }
   else{
    c.textContent=val;
   }
})