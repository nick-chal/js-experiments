var container = document.getElementsByClassName('main-container')[0];
var gameOver = false;

function Word() {

  this.length = randomGenerator(2, 6);
  this.element = document.createElement('div');
  this.span = [];
  this.charArray = [];

  this.y = -5;
  this.x = randomGenerator(25, 900);
  this.speed = 2;

  this.init = function () {
    for (var i = 0; i < this.length; i++) {
      var keycode = randomGenerator(65, 90);
      this.charArray.push(String.fromCharCode(keycode));
      var spanElement = document.createElement('span');
      spanElement.textContent = (this.charArray[i]).toLowerCase();
      this.span.push(spanElement)
      this.element.appendChild(this.span[i]);
    }
    console.log(this.charArray);


    this.element.classList.add(this.charArray.join(""));
    this.element.style.position = 'absolute';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.border = '1px solid black';
    this.element.style.boxShadow = '0 0 2px black';
    container.appendChild(this.element);
  }

  this.update = function () {
    this.y += this.speed;
    this.element.style.top = this.y + 'px';
  }

  this.remove = function () {
    container.removeChild(this.element);
  }

}


function Game() {
  var wordList = [];
  var counter = 0;
  var that = this;
  var mainInterval;

  this.gameRun = function () {
    mainInterval = setInterval(run, 100);
  }


  var run = function () {
    if (!gameOver) {
      counter++;
      console.log(counter);
      if (counter % 20 === 0) {
        var word = new Word();
        word.init();
        wordList.push(word);
      }
      for (var i = 0; i < wordList.length; i++) {
        wordList[i].update();
      }
      if (counter >= 200) gameOver = true;
    } else {
      clearInterval(mainInterval);
    }

  }
}

var game = new Game();
game.gameRun();



function randomGenerator(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}