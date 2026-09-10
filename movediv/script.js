let box=document.querySelector(".box");
window.addEventListener("mousemove",function(ets){
    box.style.top=ets.clientY+"px";
    box.style.left=ets.clientX+"px";
   
})
