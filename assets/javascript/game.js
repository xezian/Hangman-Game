// declare variables (remaining guesses, wrong guesses, hidden word, words[], wins, losses)
var user = {
    guesses: 0,
    wrongGuesses: 0,
    wins: 0,
    losses: "none"
}
var secretWords = ["pumpkin", "chicken", "porcupine", "pigeon", "squirrel", "weasel"];

    // array into which to push first "_" to represent each letter and then each actual letter of the hidden word.
var hiddenWord = "string";
var hiddenWordMap = [];

var startingScore = function() {
    user.guesses = 11;
    user.wrongGuesses = 0;
    user.wins = 0;
    user.losses = 0;
}

// select at random one of the words from the secretWords array and set hiddenWord to that string
// then push each letter into the array!
var newWord = function() {
    hiddenWord = secretWords[Math.floor(Math.random() * secretWords.length)];
    hiddenWordMap = [];
    for (i = 0; i < hiddenWord.length; i++) {
        hiddenWordMap.push(hiddenWord.charAt(i));
    }
}
newWord();
console.log(hiddenWordMap);
newWord();
console.log(hiddenWordMap);
console.log(user);
startingScore();
console.log(user);

// display one "_" the hiddenWordMap array to represent each letter of the new hiddenWord
//CODE >>>
var inArray = function(needle,haystack) {
    var count = haystack.length;
    for ( var i = 0; i < count; i++ ) {
        if ( haystack[i] === needle) {
            return true;
        }
    }
    return false;
}

var runGame = function() {
    document.onkeyup = function(event) {
    var keyPressed = event.key;
// press a key to select a letter
    if (inArray(keyPressed, hiddenWordMap)) {
// get key presses and store the letters in their appropriate variables
    for (var i = 0; i < hiddenWordMap.length; i++) {
            if (keyPressed === hiddenWordMap[i]) {
                alert(keyPressed + " is part of " + hiddenWord + "!") 
                // decrease guesses by 1          
                // reveal hidden letters when correctly guessed
// CODE >>> 
                } 
            }
        } else {
            alert(keyPressed + " is not part of " + hiddenWord);
            // decrease guesses by 1 and increases wrong guesses by 1
    // CODE >>>
        }
    // when whole word is correctly guessed, increase wins(score) by 1
        if (hiddenWordMap.toString === hiddenWord) {

        }
    }
};
// get the key that is pressed

// when remaining guesses run out, increase losses by 1

// start game over with a new word
var startingState = function() {
    document.onkeyup = function(event) {
    var keyPressed = event.key;
// press s key to start the game
    if (keyPressed === "s") {
        startingScore();
        newWord();
        runGame();
        console.log(hiddenWordMap);
        }
    }
};
startingState();
