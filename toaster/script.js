// Ye outer/factory function ek configuration object receive karta hai.
// Factory function ka matlab hai: ek function jo doosra customized function
// banakar return karta hai.
function createToaster(config) {
	// Ye inner function message receive karke toast show karega.
	// Is function ko return karna important hai, kyunki isi returned function ko
	// baad mein toaster("message") ki tarah call kiya jayega.
	//
	// Closure ka matlab hai ki inner function apne outer function ke variables
	// ko yaad rakhta hai, chahe outer function ka execution khatam ho chuka ho.
	// Yahan inner function config ko yaad rakhta hai.
	// Isliye createToaster() ke bahar bhi config.theme aur config.duration
	// available rehte hain.
	return function (str) {
		// str har call par aane wala naya toast message hai.
		// config har call ke liye same saved configuration provide karta hai.
		// Naya div element create karte hain.
		let div = document.createElement("div");

		// Toast ke andar message set karte hain.
		div.textContent = str;

		// Theme ke according toast ki classes choose karte hain.
		div.className = `inline-block ${config.theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}
		px-6 py-3 rounded shadow-lg pointer-events-none`;

		// Agar toast left/top default position par nahi hai, to parent ko screen
		// ke according position karne ke liye fixed positioning enable karte hain.
		// Yahan config.positionY likhna zaroori hai; sirf positionY likhne par
		// JavaScript ko koi defined variable nahi milega aur ReferenceError aayega.
		if (config.positionX !== "left" || config.positionY !== "top") {
			// Parent ko viewport ke respect mein position karne ke liye fixed class add karte hain.
			document.querySelector(".parent").classList.add("fixed");

			// += ka matlab hai existing classes ko remove kiye bina new classes add karna.
			// Template literal ke andar ${...} dynamic position classes banata hai.
			document.querySelector(".parent").className +=
				` ${config.positionX === "right" ? "right-5" : "left-5"} ${config.positionY === "bottom" ? "bottom-5" : "top-5"}`;
		}

		// Toast ko parent container ke andar add karte hain.
		document.querySelector(".parent").appendChild(div);

		// Kuch time baad toast ko automatically remove karte hain.
		setTimeout(() => {
			// Parent container se current toast div delete karte hain.
			document.querySelector(".parent").removeChild(div);
		}, config.duration * 1000);
	};
}

// Configuration object pass karke ek customized toaster function banate hain.
// createToaster() yahan inner function return karta hai, jo toaster variable mein
// store hota hai. Isi returned function ke saath config ka closure attach rehta hai.
let toaster = createToaster({
	// Toast ki horizontal position ki setting.
	positionX: "right",
	// Toast ki vertical position ki setting.
	positionY: "top",
	// Dark theme select karte hain.
	theme: "light",
	// Toast 3 seconds tak visible rahega.
	duration: 3,
});

// Closure ka fayda: har toaster apni alag configuration yaad rakh sakta hai.
// Example: neeche alag config se banaya gaya toaster dark theme aur 5 seconds
// ki duration use karega, bina pehle toaster ki settings ko change kiye.
// let errorToaster = createToaster({
// 	positionX: "left",
// 	positionY: "bottom",
// 	theme: "dark",
// 	duration: 5,
// });

// Isi pattern ko notifications, logging, API clients, counters aur event
// handlers mein use karte hain, jab function ko private/saved state chahiye.
// Closure se baar-baar config pass karne ki zaroorat nahi padti.

// Pehla toast message turant show karte hain.
toaster("Download Done");

// Doosra toast 2 seconds ke baad show karte hain.
setTimeout(() => {
	// setTimeout ka callback 2000 milliseconds ke baad run hota hai.
	toaster("Harsh accepted your request");
}, 2000);
