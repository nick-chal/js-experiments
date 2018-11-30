function Ball(number) {
  this.balls = [];
  var container = document.getElementsByClassName('container')[0];
  var ballInterval;
  var deltaX = 1;
  var deltaY = 1;
  var moving = false;
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

  this.draw = function () {
    for (var i = 0; i < number; i++) {
      var childBall = createBall();
      that.balls.push(childBall);
      container.appendChild(that.balls[i].element);
      //'rbg(' + randomGenerator(0, 255) + ',' + randomGenerator(0, 255) + ',' + randomGenerator(0, 255) + ')';
    }
    //console.log(balls);

    that.toggle();


  }



  function moveBall(i) {
    var boundaryPosition = checkBoundary(that.balls[i]);
    switch (boundaryPosition) {
      case 1:
        that.balls[i].deltaX *= -1;
        break;
      case 2:
        that.balls[i].deltaY *= -1;
        break;
      default:
        if (!checkCollision(that.balls[i], 0, that.balls.length, i)) {
          that.balls[i].element.style.left = that.balls[i].x + 'px';
          that.balls[i].element.style.top = that.balls[i].y + 'px';
        } else {
          that.balls[i].deltaX *= -1;
          that.balls[i].deltaY *= -1;
        }
    }
    that.balls[i].x += (that.balls[i].deltaX * that.balls[i].speedX);
    that.balls[i].y += (that.balls[i].deltaY * that.balls[i].speedY);
  }

  function moveAll() {
    for (var i = 0; i < that.balls.length; i++) {
      moveBall(i);
    }
  }


  function createBall() {
    var run = false;
    do {
      var obj = {};
      obj.element = document.createElement('div');
      obj.radius = randomGenerator(10, 25);
      obj.x = randomGenerator(5, 640);
      obj.y = randomGenerator(5, 340);
      run = checkCollision(obj, 0, that.balls.length, -1);
      obj.speedX = randomGenerator(.5, 3);
      obj.speedY = randomGenerator(.5, 3);
      obj.deltaX = randomGenerator(0, 10) < 5 ? 1 : -1;
      obj.deltaY = randomGenerator(0, 10) < 5 ? 1 : -1;
      obj.element.style.position = 'absolute';
      obj.element.style.left = obj.x + 'px';
      obj.element.style.top = obj.y + 'px';
      obj.element.style.height = obj.radius + 'px';
      obj.element.style.width = obj.radius + 'px';
      obj.element.style.backgroundColor = 'black';
    } while (run);
    return obj;
  }

  function checkCollision(obj, start, end, position) {
    for (var i = start; i < end; i++) {
      if (position !== i) {
        if (obj.x <= (that.balls[i].x + that.balls[i].radius) && (obj.x + obj.radius) >= that.balls[i].x && obj.y <= (that.balls[i].y + that.balls[i].radius) && (obj.y + obj.radius) >= that.balls[i].y) {
          console.log('collide');
          return true;
        }
      }

    }
    return false;
  }

  function checkBoundary(obj) {
    if (obj.x <= 0 || (obj.x + obj.radius) >= 700) return 1
    else if (obj.y <= 0 || (obj.y + obj.radius) >= 400) return 2
    return 3;
  }

}

function randomGenerator(start, end) {
  return Math.floor(Math.random() * end) + start;
}

var ball = new Ball(10);
ball.draw();

button = document.getElementsByTagName('button')[0];
button.addEventListener('click', ball.toggle);