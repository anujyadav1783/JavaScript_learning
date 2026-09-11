/*
    JavaScript timers revision

    setTimeout()  -> callback ko ek baar, given delay ke baad chalata hai.
    setInterval() -> callback ko baar-baar, given delay ke gap par chalata hai.
    clearTimeout()  -> pending setTimeout ko cancel karta hai.
    clearInterval() -> running setInterval ko stop karta hai.

    Delay milliseconds mein hota hai:
    1000 milliseconds = 1 second
*/

// setTimeout ka basic example: ye message sirf ek baar 2 seconds baad print hoga.
const welcomeTimeout = setTimeout(function () {
    console.log("setTimeout: This message runs once after 2 seconds");
}, 2000);

// setTimeout ek timer ID return karta hai. Isi ID se timer cancel kiya ja sakta hai.
// clearTimeout(welcomeTimeout);
// Upar wali line uncomment karne par welcome message print nahi hoga.

// setTimeout callback ko arguments bhi pass kar sakte hain.
function showMessage(message, userName) {
    console.log("setTimeout with arguments:", message, userName);
}

setTimeout(showMessage, 3000, "Hello", "Anuj");

// setInterval ka basic example: ye callback har 1 second mein chalega.
let count = 10;

const countInterval = setInterval(function () {
    if (count > 0) {
        console.log("Countdown:", count);
        count--;
    } else {
        // Interval ko automatically stop karna zaroori hai,
        // warna callback continuously chalta rahega.
        clearInterval(countInterval);
        console.log("Countdown finished");
    }
}, 1000);

// setInterval bhi ek ID return karta hai.
// Kisi running interval ko pehle stop karna ho to:
// clearInterval(countInterval);

/*
    Important difference:

    setTimeout(function, 1000)
    -> function approximately 1 second baad ek baar chalega.

    setInterval(function, 1000)
    -> function approximately har 1 second mein repeat hoga.

    Timer exact timing guarantee nahi karta. JavaScript callback ko
    tab chalata hai jab call stack empty hota hai.
*/