let cout = document.querySelector("#input");
let span=document.querySelector("span");
cout.addEventListener("input",function(e){
    let val=e.target.value.length;
    if(val<50){
      span.innerHTML=val;
    }
    else{
        alert("you can not enter more than 50 character");
    }
    
})
