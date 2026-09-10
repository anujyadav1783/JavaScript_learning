let div = document.querySelector("ul");

// The click happens on an <li>, but the event bubbles up to its parent <ul>.
// That is why the click listener can be attached to the <ul>.
div.addEventListener("click", function (e) {
     // e.target is the exact element that was clicked, for example an <li>.
     // toggle() adds the "lt" class if it is missing and removes it if present.
     e.target.classList.toggle("lt");
});