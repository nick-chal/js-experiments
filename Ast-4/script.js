var container = document.getElementsByClassName('main-container')[0];
var gameOver = false;
var gameInitial = true;
var textDisplay = document.getElementsByClassName('insert')[0];
var scoreDisplay = document.getElementsByTagName('span')[0];
var msgBoard = document.getElementsByClassName('msg')[0];

var wordsArray = ["about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];


function Word() {
  var word = wordsArray[randomGenerator(0, wordsArray.length)];
  var length = word.length;
  this.element = document.createElement('div');
  this.span = [];
  this.charArray = [];
  this.updated = false;

  var y = -5;
  var x = randomGenerator(25, 850);
  this.speed;

  this.init = function () {
    for (var i = 0; i < length; i++) {
      var keycode = randomGenerator(65, 66);
      this.charArray.push(word[i]);
      var spanElement = document.createElement('span');
      spanElement.textContent = (word[i]);
      this.span.push(spanElement)
      this.element.appendChild(this.span[i]);
    }
    this.element.classList.add(this.charArray.join(""));
    this.element.style.position = 'absolute';
    this.element.style.background = 'white';
    this.element.style.top = y + 'px';
    this.element.style.left = x + 'px';
    this.element.style.border = '1px solid black';
    this.element.style.boxShadow = '0 0 2px black';
    container.appendChild(this.element);
  }

  this.update = function () {
    y += this.speed;
    this.element.style.top = y + 'px';
    if (y + 31 >= container.offsetHeight) {
      gameOver = true;
    }
  }

  this.updateSpan = function (num = length) {
    for (var i = 0; i < length; i++) {
      this.span[i].style.background = (i < num) ? 'cornflowerblue ' : 'white';
      this.span[i].style.textDecoration = (i < num) ? 'line-through' : 'none';
    }
  }


  this.remove = function () {
    container.removeChild(this.element);
  }
}


function Game() {
  var wordList;
  var counter;
  var typedList;
  var mainInterval;
  var score;
  var speedCount;
  var that = this;

  this.gameRun = function () {
    document.addEventListener('keydown', pressEvent);
    gameInit();
  }

  var gameInit = function () {
    wordList = [];
    counter = 35;
    typedList = [];
    score = 0;
    speedCount = 90;
    gameOver = false;
    textDisplay.textContent = "";
    textDisplay.style.color = 'black';
    scoreDisplay.textContent = score;
  }


  var run = function () {
    if (!gameOver) {
      counter++;
      if (counter % 50 === 0) {
        var word = new Word();
        word.init();
        if ((score + 1) % 5 == 0 && score <= 28) {
          clearInterval(mainInterval);
          speedCount -= score < 30 ? 10 : 5;
          mainInterval = setInterval(run, speedCount);
          console.log(speedCount);
        }
        word.speed = 2;
        wordList.push(word);
      }
      for (var i = 0; i < wordList.length; i++) {
        wordList[i].update();
      }
    } else {
      clearInterval(mainInterval);
      textDisplay.textContent = "GAME OVER!!!";
      textDisplay.style.color = 'red';
      msgBoard.style.display = 'block';
      gameInitial = true;
      msgBoard.getElementsByTagName('p')[0].textContent = 'Your score is ' + score;
      msgBoard.getElementsByTagName('p')[1].textContent = 'Press Space to Restart';
    }
  }


  var pressEvent = function (event) {
    if (!gameOver && !gameInitial) {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        typedList.push((String.fromCharCode(event.keyCode)).toLowerCase());
        updateInsert();
      } else if (event.keyCode === 8 || event.keyCode === 46) {
        typedList.pop();
        updateInsert();
      } else if (event.keyCode === 13) {
        checkComplete();
      }
    } else if (gameInitial) {
      if (event.keyCode === 32) {
        wordList.forEach(function (word) {
          word.remove();
        })
        gameInit();
        mainInterval = setInterval(run, speedCount);
        gameInitial = false;
        gameOver = false;
        msgBoard.style.display = 'none';
      }
    }
  }

  var checkComplete = function () {
    for (var i = 0; i < wordList.length; i++) {
      if (wordList[i].charArray.join("") === typedList.join("")) {
        for (var j = 0; j < wordList.length; j++) {
          if (wordList[j].updated) {
            wordList[j].updateSpan(0);
            wordList[j].updated = false;
          }
        }
        wordList[i].remove();
        textDisplay.textContent = "";
        typedList = [];
        wordList.splice(i, 1);
        score++;
        scoreDisplay.textContent = score;
        break;
      }
    }
  }

  var checkMatch = function () {
    var textLength = typedList.length;
    for (var i = 0; i < wordList.length; i++) {
      if (wordList[i].charArray.slice(0, textLength).join("") === typedList.join("")) {
        wordList[i].updateSpan(textLength);
        wordList[i].updated = true;
      } else {
        if (wordList[i].updated) {
          wordList[i].updateSpan(0);
          wordList[i].updated = false;
        }
      }
    }
  }

  var updateInsert = function () {
    textDisplay.textContent = typedList.join("");
    checkMatch();
  }
}

var game = new Game();
game.gameRun();



function randomGenerator(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}