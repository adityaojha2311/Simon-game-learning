var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    level++;
  var randomNumber = Math.random();
  randomNumber = Math.round(randomNumber * 4);
  randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  $("#level-title").text("Level " + level);
  $("#" + randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);
}

$(".btn").click(function() {

  var userChoosenColour = this.id;
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {

  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }


});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {




    if (userClickedPattern.length === gamePattern.length) {


      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER , PRESS A KEY TO RESTART");
    startOver();
  }


}

function startOver() {
  gamePattern = [];
userClickedPattern = [];
  level = 0;
  started = false;


}
