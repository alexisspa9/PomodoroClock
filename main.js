// declare the DOM elements
const sessionCounter = document.getElementById("sessionCounter");
const breakCounter = document.getElementById("breakCounter");
const sessionUp = document.getElementById("sessionUp");
const sessionDown = document.getElementById("sessionDown");
const breakUp = document.getElementById("breakUp");
const breakDown = document.getElementById("breakDown");
const playButton = document.getElementById("play");
const repeatButton = document.getElementById("repeat");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const timer = document.getElementById("timer");
const deck = document.getElementById("deck");
// add event listeners
sessionUp.addEventListener('click', function() {
	changeSession(1);
});
sessionDown.addEventListener('click', function() {
	changeSession(-1);
});
breakUp.addEventListener('click', function() {
	changeBreak(1);
});
breakDown.addEventListener('click', function() {
	changeBreak(-1);
});
pauseButton.addEventListener('click', pauseCounter);
playButton.addEventListener('click', playCounter);
stopButton.addEventListener('click', stopCounter);
repeatButton.addEventListener('click', restartCounter);


// our program starting values
let startTime = 25;
let startBreak = 5;
let currentSecs = startTime * 60;
let active = false;
let paused = false;
let isBreak = false;
let myinterval;



// counter function
function count() {
   active = true;
   timer.classList.remove("ping");
   myinterval = setInterval(countDown, 1000);
}


function countDown() {
	if (currentSecs == 0) {
   		isBreak = !isBreak;
   		currentSecs = isBreak ? startBreak * 60 : startTime * 60;
   		deck.innerHTML = isBreak ? "Break" : "Session";
   	}
	currentSecs--;
	setTheTime(currentSecs);
	timer.style.color = currentSecs < 10 ? "red" : "green";

}

// changes the sessionCounter value
function changeSession(value) {
	if (active || (startTime == 1 && value == -1)) {
		return;
	}
	startTime += value;
	currentSecs = startTime * 60;
	sessionCounter.innerHTML = startTime;
	setTheTime(currentSecs);
}

// changes the breakCounter value
function changeBreak(value) {
	if (active || (startBreak == 1 && value == -1)) {
		return;
	}
	startBreak += value;
	breakCounter.innerHTML = startBreak;
}
// starts the counter
function playCounter() {
	if(!active || paused) {
		myMove(playButton);
		deck.innerHTML = isBreak ? "Break" : "Session";
		count();
	}
}


// pauses the counter
function pauseCounter() {
	if(active) {
	myMove(pauseButton);
	paused = true;
	deck.innerHTML = "Paused";
	timer.classList.add("ping");
	clearInterval(myinterval);
	}
}

// stops the counter
function stopCounter() {
	myMove(stopButton);
	active = false;
	isBreak = false;
	paused = false;
	timer.classList.remove("ping");
	clearInterval(myinterval);
	deck.innerHTML = "Session";
	timer.style.color = "white";
	currentSecs = startTime * 60;
	setTheTime(currentSecs);

}

// restarts the counter
function restartCounter() {
	if(active) {
		myMove(repeatButton);
		stopCounter();
		playCounter();
	}
}


// sets the time in the timer element
function setTheTime(sec) {
	let hours = 0,
	    minutes = 0;

	hour = Math.floor(sec / 3600);
    sec = sec - (3600 * hour);
    minute = Math.floor(sec / 60);
    sec = sec - (60 * minute);
    if (hour > 0) {
		timer.innerHTML = n(hour) + ":" + n(minute) + ":" + n(sec);
    } else {
    	timer.innerHTML = n(minute) + ":" + n(sec);
    }

	//function to add leading 0
    function n(n) {
      return n > 9 ? "" + n : "0" + n;
    }
}


function myMove(element) {
  element.classList.add("pingBig");
  var id = setInterval(scale, 600);
  function scale() {
		    element.classList.remove("pingBig");
		      clearInterval(id);
	}
}
