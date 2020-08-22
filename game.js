var gamePattern = new Array()

var userClickedPattern = new Array()

var buttonColors = ["red","blue","green","yellow"]

var level = 0

var start = false

$(document).keypress(function() {
    if(!start)
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
})

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
            nextSequence()
          }, 1000)
        }
      } else {
        console.log("wrong")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){$("body").removeClass("game-over")},100)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        gameOver()
      }

}

function gameOver(){
    start = false
    level = 0
    gamePattern = []
}

function nextSequence()
{
    userClickedPattern = []
    level++;

    $("#level-title").text("LEVEL " + level);

    var randomNumber = Math.floor(Math.random()*4)

    var randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor)
   // animatePress(randomChosenColor)

}

function playSound(name){
    // $("#"+name).fadeIn(300).fadeOut(300).fadeIn(300)

    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed")

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100)
}

  $(".btn").click(function(e){
    var userChosenColour= e.target.id

    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)

    animatePress(userChosenColour)

    console.log(checkAnswer(userClickedPattern.length-1))

});
