console.log('apple');

var CANVAS_HEIGHT = 512;
var CANVAS_WIDTH = 500;
var GAP = 90;

var gameOver = false;

var container = document.getElementsByClassName('container')[0];

function Bird() {
  this.x = 70;
  this.y = CANVAS_HEIGHT / 2;
  this.counter = 0;

  this.speed = 0;
  this.gravity = 1.2;
  this.upForce = 20;

  this.width = 34;
  this.height = 24;

  this.element;

  this.init = function () {
    this.element = document.createElement('div');
    this.element.style.height = this.height + 'px';
    this.element.style.width = this.width + 'px';
    this.element.classList.add('bird');
    this.element.style.position = 'absolute';
    this.element.style.backgroundImage = "url('./images/bird-bg.png') ";
    this.element.style.backgroundPosition = 'center bottom';
    this.element.style.borderRadius = '0';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.zIndex = '200';
  }

  this.updateBird = function () {

    this.speed += this.gravity;
    if (this.speed > 20) this.speed = 20;
    this.y += this.speed;
    this.element.style.top = this.y + 'px';
    if (this.speed < -10) this.speed = -10;

    if (this.counter % 16 === 0) {
      this.element.style.backgroundPosition = 'center bottom';
    } else if (this.counter % 16 === 4 || this.counter % 16 === 12) {
      this.element.style.backgroundPosition = 'center center';
    } else if (this.counter % 16 === 8) {
      this.element.style.backgroundPosition = 'center top';
    }

    this.counter++;

    if (this.y + 32 >= CANVAS_HEIGHT) {
      gameOver = true;
      this.speed = 0;
      this.y = CANVAS_HEIGHT - 25;
      this.element.style.top = (CANVAS_HEIGHT - 25) + 'px';
    }
    if (this.y < 0) {
      gameOver = true;
      this.speed = 0;
      this.y = 0;
      this.element.style.top = 0 + 'px';
    }

  }

  this.goUp = function () {
    this.speed -= this.upForce;
    // if (this.speed < -35) this.speed = 1;
  }

}


function Pipe() {
  this.height = randomGenerator(10, 400);
  this.x = CANVAS_WIDTH;
  var speed = 4;
  this.eleTop;
  this.width = 50;
  this.eleBottom;
  this.eleTop = document.createElement('div');
  this.eleBottom = document.createElement('div');

  this.init = function () {

    this.eleTop.style.position = 'absolute';
    this.eleTop.style.top = '0px';
    this.eleTop.style.width = this.width + 'px';
    this.eleTop.style.backgroundImage = "url('./images/pipe.png') ";
    this.eleTop.style.height = this.height + 'px';
    this.eleTop.style.left = this.x + 'px'


    this.eleBottom.style.position = 'absolute';
    this.eleBottom.style.bottom = '112px';
    this.eleBottom.style.width = this.width + 'px';
    this.eleBottom.style.backgroundImage = "url('./images/pipe.png')";
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

function Base(start) {
  this.element = document.createElement('div');
  this.x = start;
  this.speed = 4;
  this.height = 112;
  this.width = 336;
  this.element.style.height = this.height + 'px';
  this.element.style.width = this.width + 'px';
  this.element.style.backgroundImage = "url('./images/base.png')";
  this.element.style.position = 'absolute';
  this.element.style.left = this.x + 'px';
  this.element.style.bottom = '0';
  container.appendChild(this.element);

  this.update = function () {
    this.x -= this.speed;
    this.element.style.left = this.x + 'px';
  }
  this.remove = function () {
    container.removeChild(this.element);
  }
}


function Game() {

  var bird = new Bird();
  var mainInterval;
  var gameOverInterval;
  var pipes = [];
  var base = [new Base(0), new Base(336), new Base(672)];
  var gameScore = 0;
  var gameCounter = 0;
  var scoreSheet = [document.createElement('div'), document.createElement('div')];

  function scoreInit() {
    for (var i = 0; i < scoreSheet.length; i++) {
      scoreSheet[i].style.height = '36px';
      scoreSheet[i].style.width = '24px';
      scoreSheet[i].style.position = 'absolute';
      scoreSheet[i].style.zIndex = '100';
      scoreSheet[i].style.top = '15px';
      scoreSheet[i].style.backgroundImage = "url('./images/0.png')";
      container.appendChild(scoreSheet[i]);
    }
    scoreSheet[0].style.left = '225px';
    scoreSheet[1].style.left = '251px';
  }

  function updateScore() {
    var tens;
    var ones;
    tens = gameScore >= 10 ? parseInt(gameScore / 10) : 0;
    ones = gameScore % 10;
    console.log(tens, ones);
    scoreSheet[0].style.backgroundImage = `url('./images/${tens}.png')`;
    scoreSheet[1].style.backgroundImage = `url('./images/${ones}.png')`;

  }



  this.gameInit = function () {
    bird.init();
    container.appendChild(bird.element);
    scoreInit();
    mainInterval = setInterval(run, 30);
  }

  function fallBird() {
    if (bird.y >= CANVAS_HEIGHT - 25) {
      clearInterval(gameOverInterval);
    } else {
      bird.updateBird();
    }
  }

  function run() {
    if (!gameOver) {
      gameCounter++;
      bird.updateBird();
      if (gameCounter % 75 === 0) {
        var newPipe = new Pipe();
        newPipe.init();
        pipes.push(newPipe);
      }
      if (base[0].x === -336) {
        base.push(new Base(672));
        base[0].remove();
        base.shift();
      }
      for (var i = 0; i < base.length; i++) {
        base[i].update();
      }

      for (var i = 0; i < pipes.length; i++) {
        pipes[i].updatePipe();
        if (pipes[i].x == 52) {
          gameScore++;
          updateScore();
        }
        checkCollision(bird, pipes[i]);
        if (pipes[i].x < -50) {
          pipes[i].remove();
          pipes.shift();
        }
      }
    } else {
      clearInterval(mainInterval);
      gameOverInterval = setInterval(fallBird, 30);

      // gameOverInterval = setInterval();

    }



  }

  var checkCollision = function (bird, pipe) {
    var eleBotY = pipe.eleBottom.style.height;
    if (pipe.x <= (bird.x + bird.width) && (pipe.x + pipe.width >= bird.x)) {
      if (bird.y <= pipe.height || (bird.y + bird.height) <= pipe.height) {
        gameOver = true;

      } else if (bird.y >= (pipe.height + GAP) || (bird.y + bird.height) >= (pipe.height + GAP)) {
        gameOver = true;
      }
    }
  }

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32 && !gameOver) bird.goUp();
  });


}



function randomGenerator(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

var game = new Game();

game.gameInit();