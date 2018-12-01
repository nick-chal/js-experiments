console.log('apple');

var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 500;
var GAP = 120;

var container = document.getElementsByClassName('container')[0];

function Bird() {
  this.x = 150;
  this.y = CANVAS_HEIGHT / 2;

  this.speed = 0;
  this.gravity = 1.2;
  this.upForce = 15;

  this.element;

  this.init = function () {
    this.element = document.createElement('div');
    this.element.style.height = '32px';
    this.element.style.width = '32px';
    this.element.classList.add('bird');
    this.element.style.position = 'absolute';
    this.element.style.backgroundColor = 'white';
    this.element.style.borderRadius = '0';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';

  }

  this.updateBird = function () {

    this.speed += this.gravity;
    if (this.speed > 20) this.speed = 20;
    this.y += this.speed;
    this.element.style.top = this.y + 'px';
    if (this.speed < -10) this.speed = -10;

    if (this.y + 32 > CANVAS_HEIGHT) {
      this.speed = 0;
      this.y = CANVAS_HEIGHT - 32;
      this.element.style.top = (CANVAS_HEIGHT - 32) + 'px';
    }
    if (this.y < 0) {
      this.speed = 0;
      this.y = 0;
      this.element.style.top = 0 + 'px';
    }

  }

  this.goUp = function () {
    console.log('ip');
    this.speed -= this.upForce;
    // if (this.speed < -35) this.speed = 1;
  }

}


function Pipe() {
  this.height = randomGenerator(10, 400);
  this.x = CANVAS_WIDTH;
  var speed = 5;
  this.eleTop;
  this.eleBottom;
  this.eleTop = document.createElement('div');
  this.eleBottom = document.createElement('div');

  this.init = function () {

    this.eleTop.style.position = 'absolute';
    this.eleTop.style.top = '0px';
    this.eleTop.style.width = '15px';
    this.eleTop.style.backgroundColor = 'black';
    this.eleTop.style.height = this.height + 'px';
    this.eleTop.style.left = this.x + 'px'


    this.eleBottom.style.position = 'absolute';
    this.eleBottom.style.bottom = '0px';
    this.eleBottom.style.width = '15px';
    this.eleBottom.style.backgroundColor = 'black';
    this.eleBottom.style.height = (CANVAS_HEIGHT - this.height - GAP) + 'px';
    this.eleBottom.style.left = this.s + 'px';


    container.appendChild(this.eleTop);
    container.appendChild(this.eleBottom);
  }

  this.updatePipe = function () {
    this.x -= speed;
    this.eleBottom.style.left = this.x + 'px';
    this.eleTop.style.left = this.x + 'px';
  }

  this.remove = function () {
    container.removeChild(this.eleTop);
    container.removeChild(this.eleBottom);
  }
}


function Game() {

  var bird = new Bird();
  var mainInterval;
  var pipes = [];
  var gameScore = 0;
  var gameCounter = 0;


  this.gameInit = function () {
    bird.init();
    container.appendChild(bird.element);
    mainInterval = setInterval(run, 40)
  }

  function run() {
    gameCounter++;
    bird.updateBird();
    if (gameCounter % 75 === 0) {
      var newPipe = new Pipe();
      newPipe.init();
      pipes.push(newPipe);
      console.log(pipes);
    }
    for (var i = 0; i < pipes.length; i++) {
      pipes[i].updatePipe();
      if (pipes[i].x == 140) {
        gameScore++;
      }
      if (pipes[i].x < -1) {
        pipes[i].remove();
        pipes.shift();
      }
    }


  }

  this.checkCollision = function (bird, pipe) {

  }

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) bird.goUp();

  });


}


function randomGenerator(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

var game = new Game();

game.gameInit();