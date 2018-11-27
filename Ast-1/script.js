console.log('aple');

var imageWidth = 800;
var imageNum = 3;
var x = 0;
var speed = 1;
var delta = 2;
var slider = document.getElementsByClassName('slider')[0];

function slide() {

  slider.style.left = '-' + x + 'px';
  if (x == imageWidth * 2) {
    clearInterval(mainInterval);
    waitMore();
  } else if ((x) == 0 || x == 800) {
    clearInterval(mainInterval);
    waitTime();
  }
  x = x + (speed * delta);
}

function waitTime() {
  //console.log(x);
  setTimeout(runAll, 2000);

}

function waitMore() {
  setTimeout(initiateRestart, 2000);
}

var restartInterval;

function initiateRestart() {
  delta = -4;
  console.log(x);
  x = 1600;
  restartInterval = setInterval(restart, 4);
}

function restart() {
  slider.style.left = '-' + x + 'px';
  x = x + (speed * delta);
  if (x == 0) {
    clearInterval(restartInterval);
    x = 0;
    delta = 2
    runAll();
  }
}

var mainInterval;

function runAll() {
  mainInterval = setInterval(slide, 4);
}

runAll();
// setTimeout(runAll, 3000);