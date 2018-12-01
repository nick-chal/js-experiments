var MIN_SIZE = 15;
var MAX_SIZE = 40;
var BOX_LIMIT = 50;
var CANVAS_HEIGHT = 500;
var CANVAS_WIDTH = 950;

function Game(number, type) {
  var balls = [];
  var container = document.getElementsByClassName('container')[0];
  var ballInterval;
  var moving = false;
  var type = type;
  that = this;

  this.toggle = function () {
    if (moving) {
      clearInterval(ballInterval);
      moving = false;
    } else {
      moving = true;
      ballInterval = setInterval(moveAll, 10);
    }
  }

  this.init = function () {
    container.style.width = CANVAS_WIDTH + 'px';
    container.style.height = CANVAS_HEIGHT + 'px';
    for (var i = 0; i < number; i++) {
      var childBall = createBall();
      balls.push(childBall);
      container.appendChild(balls[i].element);
      //'rbg(' + randomGenerator(0, 255) + ',' + randomGenerator(0, 255) + ',' + randomGenerator(0, 255) + ')';
    }
    //console.log(balls);

    this.toggle();


  }


  function moveBall(i) {
    var boundaryPosition = checkBoundary(balls[i]);
    var collision;
    switch (boundaryPosition) {
      case 1:
        balls[i].deltaX *= -1;
        break;
      case 2:
        balls[i].deltaY *= -1;
        break;
      default:
        if (type === 'box') {
          collision = checkCollisionBox(balls[i], 0, balls.length, i)
        } else {
          collision = checkCollisionBall(balls[i], 0, balls.length, i)
        }
        if (collision) {
          balls[i].deltaX *= -1;
          balls[i].deltaY *= -1;

        }

    }
    balls[i].x += (balls[i].deltaX * balls[i].speedX);
    balls[i].y += (balls[i].deltaY * balls[i].speedY);

    if (type === 'ball') {
      balls[i].centerX = balls[i].x + balls[i].radius;
      balls[i].centerY = balls[i].y + balls[i].radius;
    }

    balls[i].draw();

  }

  function moveAll() {
    for (var i = 0; i < balls.length; i++) {
      moveBall(i);
    }
  }


  function createBall() {
    var correctStart = false;
    do {
      if (type === 'box') {
        var obj = new Box();
        obj.boxProperties();
        correctStart = checkCollisionBox(obj, 0, balls.length, -1);
      } else {
        var obj = new Ball();
        obj.ballProperties();
        correctStart = checkCollisionBall(obj, 0, balls.length, -1);
      }

    } while (correctStart);
    return obj;
  }

  function checkCollisionBox(obj, start, end, position) {
    for (var i = start; i < end; i++) {
      if (position !== i) {
        if (obj.x <= (balls[i].x + balls[i].radius) && (obj.x + obj.radius) >= balls[i].x && obj.y <= (balls[i].y + balls[i].radius) && (obj.y + obj.radius) >= balls[i].y) {
          return true;
        }
      }

    }
    return false;
  }

  function checkCollisionBall(obj, start, end, position) {
    for (var i = start; i < end; i++) {
      if (position !== i) {
        var centerDistanceX = obj.centerX - balls[i].centerX;
        var centerDistanceY = obj.centerY - balls[i].centerY;
        var collisionDistance = parseFloat((obj.radius + balls[i].radius) / 2);
        var centerDistance = centerDistanceX * centerDistanceX + centerDistanceY * centerDistanceY;
        if (Math.sqrt(centerDistance) <= collisionDistance) {
          return true;
        }
      }
    }
    return false;
  }

  function checkBoundary(obj) {
    if (obj.x <= 0 || (obj.x + obj.radius) >= CANVAS_WIDTH) return 1
    else if (obj.y <= 0 || (obj.y + obj.radius) >= CANVAS_HEIGHT) return 2
    return 3;
  }

}



function Box() {
  this.element = document.createElement('div');
  this.radius = randomGenerator(MIN_SIZE, MAX_SIZE);
  this.x = randomGenerator(5, CANVAS_WIDTH - 55);
  this.y = randomGenerator(5, CANVAS_HEIGHT - 55);
  this.speedX = randomGenerator(.5, 2);
  this.speedY = randomGenerator(.5, 2);
  this.deltaX = randomGenerator(1, 10) < 5 ? 1 : -1;
  this.deltaY = randomGenerator(1, 10) < 5 ? 1 : -1;

  this.boxProperties = function () {
    this.element.classList.add('box');
    this.element.style.position = 'absolute';
    this.element.style.borderRadius = '0%';
    this.element.style.height = this.radius + 'px';
    this.element.style.width = this.radius + 'px';
    this.element.style.backgroundColor = 'rgb(' + randomColor() + ')';
  }

  this.draw = function () {

    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

}


function Ball() {

  this.element = document.createElement('div');
  this.radius = randomGenerator(MIN_SIZE, MAX_SIZE);
  this.x = randomGenerator(5, CANVAS_WIDTH - 55);
  this.y = randomGenerator(5, CANVAS_HEIGHT - 55);
  this.speedX = randomGenerator(.5, 2);
  this.speedY = randomGenerator(.5, 2);
  this.deltaX = randomGenerator(1, 10) < 5 ? 1 : -1;
  this.deltaY = randomGenerator(1, 10) < 5 ? 1 : -1;
  this.centerX = this.x + this.radius;
  this.centerY = this.y + this.radius;

  this.ballProperties = function () {
    this.element.classList.add('ball');
    this.element.style.position = 'absolute';
    this.element.style.borderRadius = '50%';
    this.element.style.height = this.radius + 'px';
    this.element.style.width = this.radius + 'px';
    this.element.style.backgroundColor = 'rgb(' + randomColor() + ')';
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }
}


function randomGenerator(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

function randomColor() {
  var red = randomGenerator(0, 255);
  var green = randomGenerator(0, 255);
  var blue = randomGenerator(0, 255);
  return red + "," + green + ',' + blue;
}

var ballButton = document.getElementById('ball');
var boxButton = document.getElementById('box');

ballButton.addEventListener('click', function () {
  var container = document.getElementsByClassName('container')[0];
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  var game = new Game(BOX_LIMIT, 'ball');
  game.init();
  button = document.getElementById('toggle');
  button.addEventListener('click', game.toggle);
  button.style.display = 'inline-block';
})

boxButton.addEventListener('click', function () {
  var container = document.getElementsByClassName('container')[0];
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  var game = new Game(BOX_LIMIT, 'box');
  game.init();
  button = document.getElementById('toggle');
  button.addEventListener('click', game.toggle);
  button.style.display = 'inline-block';
})