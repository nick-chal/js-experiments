var slider = document.getElementsByClassName('slider')[0];
// var rightArrow = document.getElementById('right-arrow');
// var leftArrow = document.getElementById('left-arrow');
// var navButtons = document.getElementsByClassName('dot-container')[0].getElementsByTagName('span');

function Carousel(element, width, height) {
	this.slider = element;
	this.sliderParent = slider.parentNode;
	this.sliderContainer = document.createElement('div');
	this.width = width;
	this.height = height;
	this.images = this.slider.getElementsByTagName('img');
	this.imageNumber = this.images.length;
	this.rightArrow = document.createElement('img');
	this.leftArrow = document.createElement('img');
	this.dotContainer = document.createElement('div');
	this.navButtons = [];
	that = this;

	var imageWidth = that.width;
	var x = 0;
	var speed = 5;
	var delta = 1;
	var navIndex;

	var mainTimeout;
	var buttonTimeInterval;
	var mainInterval;

	function createAll() {
		this.sliderContainer = document.createElement('div');
		this.rightArrow = document.createElement('img');
		this.leftArrow = document.createElement('img');
		this.dotContainer = document.createElement('div');
		that.sliderParent.removeChild(that.slider);
		that.sliderContainer.appendChild(that.slider);
		that.sliderContainer.appendChild(that.dotContainer);
		that.sliderContainer.appendChild(that.leftArrow);
		that.sliderContainer.appendChild(that.rightArrow);
		that.sliderParent.appendChild(that.sliderContainer);
	}

	function dotInit() {
		that.dotContainer.style.position = 'absolute';
		that.dotContainer.style.bottom = '5%';
		that.dotContainer.style.left = '45%';
		for (var i = 0; i < that.imageNumber; i++) {
			var spanElement = document.createElement('span');
			spanElement.style.margin = "5px";
			spanElement.style.width = '10px';
			spanElement.style.height = '10px';
			spanElement.style.borderRadius = '50%';
			spanElement.style.display = 'inline-block';
			spanElement.style.backgroundColor = 'darkgray';
			spanElement.setAttribute('class', 'nav-button' + i);
			that.dotContainer.appendChild(spanElement);
			that.navButtons.push(spanElement);
			spanElement.addEventListener('click', function (e) {
				navSlide(e);
			});
		}
	}

	function slideContainerStyler() {
		that.sliderContainer.style.width = width + 'px';
		that.sliderContainer.style.height = height + 'px';
		that.sliderContainer.style.overflow = 'hidden';
		// this.sliderContainer.style.boxShadow
		that.sliderContainer.style.position = 'relative';
	}

	function sliderStyler() {
		that.slider.style.position = 'absolute';
		that.slider.style.height = '100%';
		that.slider.style.width = (that.imageNumber * that.width) + 'px';
	}

	function imgStyler() {
		for (var i = 0; i < that.imageNumber; i++) {
			that.images[i].style.height = that.height + 'px';
			that.images[i].style.width = that.width + 'px'
			that.images[i].style.float = 'left';
			that.images[i].style.display = 'block';
		}
	}

	function arrowStyler() {
		that.leftArrow.style.position = 'absolute';
		that.leftArrow.style.left = '0';
		that.leftArrow.style.top = '44%';
		that.leftArrow.style.height = '50px';
		that.leftArrow.style.width = '50px';
		that.leftArrow.src = './images/left-arrow.png';
		that.leftArrow.style.cursor = 'pointer';
		that.rightArrow.style.position = 'absolute';
		that.rightArrow.style.right = '0';
		that.rightArrow.style.top = '44%';
		that.rightArrow.style.height = '50px';
		that.rightArrow.style.width = '50px';
		that.rightArrow.src = './images/right-arrow.png';
		that.rightArrow.style.cursor = 'pointer';
	}

	that.rightArrow.addEventListener('click', function () {
		buttonSlide(1);
	});

	that.leftArrow.addEventListener('click', function () {
		buttonSlide(-1);
	})

	for (var i = 0; i < that.navButtons.length; i++) {
		that.navButtons[i].addEventListener('click', function (e) {
			navSlide(e);
		})
	}

	function navSlide(event) {
		clearInterval(mainInterval);
		clearInterval(buttonTimeInterval);
		clearTimeout(mainTimeout);
		speed = 10;
		navIndexPosition = (parseInt(event.target.className.slice('10', event.target.className.length))) * imageWidth;

		if (navIndexPosition === x) {
			initiateMovement(2000);
		} else {
			if (navIndexPosition < x) delta = -1;
			else delta = 1;
			buttonTimeInterval = setInterval(function () {

				slider.style.left = '-' + x + 'px';
				if (x === navIndexPosition) {
					clearInterval(buttonTimeInterval);
					initiateMovement(((x != 0) && (x != imageWidth * (that.imageNumber - 1)) ? 2000 : 000));
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

		if ((x >= imageWidth * (that.imageNumber - 1) && delta === 1) || (x === 0 && delta === -1)) {
			clearInterval(mainInterval);
			initiateMovement(0);
		} else {
			initiateMovement(0);
		}
	}


	function slide() {
		slider.style.left = '-' + x + 'px';
		x += (speed * delta);

		if (x >= imageWidth * (that.imageNumber - 1)) delta = -1;
		else if (x <= 0) delta = 1;

		if (x % imageWidth === 0) {
			slider.style.left = '-' + x + 'px';
			clearInterval(mainInterval);
			initiateMovement(2000);
		}
	}

	function initiateMovement(timeLimit) {
		speed = 5;
		mainTimeout = setTimeout(function () {
			mainInterval = setInterval(slide, 4);
		}, timeLimit);
	}

	that.documentInit = function () {
		createAll();
		dotInit();
		slideContainerStyler();
		console.log(that.sliderContainer);
		sliderStyler();
		imgStyler();
		arrowStyler();
		console.log(that.sliderContainer);
		initiateMovement(2000);
	}
}

var carousel = new Carousel(slider, 400, 400);

carousel.documentInit();