var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickPattern.length-1);

})

function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 100);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 20);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    startOver();
  }
}

function nextSequence() {
  userClickPattern = [];

  level ++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);
}

function playSound(name) {
  var audioPlay = new Audio("sounds/" + name + ".mp3");
  audioPlay.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}