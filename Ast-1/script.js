var slider = document.getElementsByClassName('slider')[0];
var rightArrow = document.getElementById('right-arrow');
var leftArrow = document.getElementById('left-arrow');

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

// @timeout milaune runall ma parameter

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