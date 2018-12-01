console.log('apple');

var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 1200;

function Bird() {
  this.x = 150;
  this.y = CANVAS_HEIGHT / 2;

  this.speed = 0;
  this.gravity = 1;

  this.element;

  this.init = function () {
    this.element = document.createElement('div');
    this.element.style.height = '32px';
    this.element.style.width = '32px';
    this.element.classList.add('bird');
    this.element.style.position = 'absolute';
    this.element.style.backgroundColor = 'white';
    this.element.style.borderRadius = '50%';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';

  }

  this.update = function () {

    this.speed += this.gravity;
    this.y += this.speed;
    this.element.style.top = this.y + 'px';

    if (this.y > CANVAS_HEIGHT) {
      this.speed = 0;
      this.element.style.top = (CANVAS_HEIGHT - 32) + 'px';
    }

  }

}


function Game() {

  var container = document.getElementsByClassName('container')[0];
  var bird = new Bird();
  var mainInterval;


  this.gameInit = function () {
    bird.init();
    container.appendChild(bird.element);
    mainInterval = setInterval(run, 20)
  }

  function run() {
    bird.update();
  }


}

var game = new Game();

game.gameInit();