let timerInterval;
let alarmInterval;

function startCountdown() {
    // Trigger full-screen mode as soon as the countdown starts
    enterFullScreen();

    // Hide countdown selection inputs and start button
    document.querySelector('.countdown-selection').style.display = 'none';
    document.querySelector('button').style.display = 'none';

    // Clear any existing countdown interval
    clearInterval(timerInterval);

    // Get values from input fields
    const days = parseInt(document.getElementById("set-days").value) || 0;
    const hours = parseInt(document.getElementById("set-hours").value) || 0;
    const minutes = parseInt(document.getElementById("set-minutes").value) || 0;
    const seconds = parseInt(document.getElementById("set-seconds").value) || 0;

    // Show or hide each part of the countdown based on user input
    document.getElementById("days-container").style.display = days > 0 ? "inline-block" : "none";
    document.getElementById("hours-container").style.display = hours > 0 || days > 0 ? "inline-block" : "none";
    document.getElementById("minutes-container").style.display = minutes > 0 || hours > 0 || days > 0 ? "inline-block" : "none";
    document.getElementById("seconds-container").style.display = "inline-block";

    // Calculate total time in milliseconds
    const totalTime = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds) * 1000;
    const endTime = new Date().getTime() + totalTime;

    // Update countdown every second
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = endTime - now;

        if (timeRemaining > 0) {
            // Update the countdown display
            document.getElementById("days").innerText = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("seconds").innerText = Math.floor((timeRemaining % (1000 * 60)) / 1000).toString().padStart(2, '0');
        } else {
            clearInterval(timerInterval); // Stop the countdown
            startAlarm(); // Start the alarm sound and alert at the same time
        }
    }

    // Initial call and interval setup
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
}

// Function to start the alarm sound and alert simultaneously
function startAlarm() {
    const alarmSound = document.getElementById("alarmSound");

    // Play the alarm sound immediately
    alarmSound.play();

    // Show the alert immediately (simultaneously with the sound)
    alert("Time is up!");

    // Stop the alarm sound once the alert is dismissed
    alarmSound.pause();
    alarmSound.currentTime = 0;

    // Once the sound has finished or user clicked OK, reset everything
    exitFullScreen(); // Exit full screen after alert
    resetTimer(); // Reset the timer back to the initial state after the alert
}

// Function to make the page go full screen
function enterFullScreen() {
    const elem = document.documentElement;  // Fullscreen on the document

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

// Function to exit full-screen mode after alert
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

// Function to reset everything back to the initial countdown screen
function resetTimer() {
    // Show countdown selection inputs and start button again
    document.querySelector('.countdown-selection').style.display = 'block';
    document.querySelector('button').style.display = 'inline-block';

    // Reset the countdown display
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
}
