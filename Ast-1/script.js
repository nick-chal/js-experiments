var slider = document.getElementsByClassName('slider')[0];
var rightArrow = document.getElementById('right-arrow');
var leftArrow = document.getElementById('left-arrow');
var navButtons = document.getElementsByClassName('dot-container')[0].getElementsByTagName('span');

var imageWidth = 800;
var imageNum = slider.getElementsByTagName('img').length;

var x = 0;
var speed = 5;
var delta = 1;

var mainTimeout;
var buttonTimeInterval;

rightArrow.addEventListener('click', function () {
	buttonSlide(1);
});

leftArrow.addEventListener('click', function () {
	buttonSlide(-1);
})

for (var i = 0; i < navButtons.length; i++) {
	navButtons[i].addEventListener('click', function (e) {
		navSlide(e);
	})
}

var navIndex;

function navSlide(event) {
	clearInterval(mainInterval);
	clearInterval(buttonTimeInterval);
	clearTimeout(mainTimeout);
	navIndexPosition = (parseInt(event.target.className.slice('10', event.target.className.length)) - 1) * imageWidth;

	if (navIndexPosition === x) {
		runAll(2000);
	} else {
		if (navIndexPosition < x) delta = -1;
		else delta = 1;
		buttonTimeInterval = setInterval(function () {

			slider.style.left = '-' + x + 'px';
			if (x === navIndexPosition) {
				clearInterval(buttonTimeInterval);
				runAll(2000);
			} else {
				x += (speed * delta);
			}

		}, 4)
	}

}

function buttonSlide(d) {
	delta = d;
	clearInterval(mainInterval);
	clearInterval(buttonTimeInterval);
	clearTimeout(mainTimeout);

	if ((x >= imageWidth * (imageNum - 1) && delta === 1) || (x === 0 && delta === -1)) {
		clearInterval(mainInterval);
		runAll(0);
	} else {
		runAll(0);
	}
}


function slide() {
	slider.style.left = '-' + x + 'px';
	x += (speed * delta);

	if (x >= imageWidth * (imageNum - 1)) delta = -1;
	else if (x <= 0) delta = 1;

	if (x % imageWidth === 0) {
		slider.style.left = '-' + x + 'px';
		clearInterval(mainInterval);
		runAll(2000);
	}
}


var mainInterval;

function runAll(timeLimit) {
	mainTimeout = setTimeout(function () {
		mainInterval = setInterval(slide, 4);
	}, timeLimit);
}

runAll(2000);