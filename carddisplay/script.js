let first = document.querySelector("form");

let second = document.querySelectorAll("input");

first.addEventListener("submit", function(dts) {

    dts.preventDefault();

    // Create card
    let card = document.createElement("div");
    card.classList.add("card");

    // Create image
    let profile = document.createElement("img");
    profile.classList.add("profile");

    // Create heading
    let h1 = document.createElement("h1");

    // Create paragraph
    let p = document.createElement("p");

    // Create email
    let email = document.createElement("p");

    // Take values from inputs
    h1.textContent = second[0].value;

    p.textContent = second[1].value;

    email.textContent = second[3].value;

    profile.src = second[4].value;

    // Put elements inside card
    card.append(profile, h1, p, email);

    

    cardContainer.append(card);

});