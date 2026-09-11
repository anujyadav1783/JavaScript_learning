// Current progress percentage ko 0 se start kar rahe hain.
let count = 0;

// Download ko complete hone mein 20 seconds lagenge.
let seconds = 20;

// HTML ke progress bar aur percentage text ko select kar rahe hain.
let progress = document.querySelector("#progressBar");
let percentText = document.querySelector("#percentText");
let downloadHeading = document.querySelector("#downloadHeading");

// 100 small steps mein progress bar ko fill karenge.
let progressInterval = setInterval(function () {
	if (count < 100) {
		count++;

		// Progress bar ki width ko current percentage ke according update karo.
		progress.style.width = `${count}%`;

		// Screen par current percentage show karo.
		percentText.textContent = `${count}%`;
	} else {
		// 100% complete hone ke baad interval ko stop karo.
		downloadHeading.textContent = "Downloaded";
		clearInterval(progressInterval);
	}
}, (seconds * 1000) / 100);