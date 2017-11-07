// declare variables (remaining guesses, wrong guesses, hidden word, words[], wins, losses)
var user = {
    guesses: 11,
    wrongGuesses: 0,
    correctGuesses: 0,
    wins: 0,
    losses: 0
}
var secretWords = ["saguaro", "ocatillo", "cholla", "creosote", "prickly-pear", "mesquite", "palo-verde", "mormon-tea", "acacia", "brittlebush", "fishhook-barrel-cactus"];
// randomly selected secret word becomes hiddenWord
var hiddenWord = "";
// array into which to push each actual letter of the hidden word
var hiddenWordMap = [];
// array into which to push "_" to represent each letter and then each actual letter of the hidden word.
var displayWordMap =[];
// array into which to push every guessed letter.
var guessedLetters = [];
// function that resets the score at start of game
var startingScore = function() {
    user.guesses = 11;
    user.wrongGuesses = 0;
    user.correctGuesses = 0;
    user.wins = 0;
    user.losses = 0;
}
// select at random one of the words from the secretWords array and set hiddenWord to that string
// then push each letter into the array!
var newWord = function() {
    user.guesses = 11;
    hiddenWord = secretWords[Math.floor(Math.random() * secretWords.length)];
    hiddenWordMap = [];
    displayWordMap = [];
    guessedLetters = [];
    for (i = 0; i < hiddenWord.length; i++) {
        hiddenWordMap.push(hiddenWord.charAt(i));
// push "-" for between two-word hiddenWords, and then "_" for every letter of hiddenWord
        if (hiddenWord.charAt(i) === "-") {
            displayWordMap.push(hiddenWord.charAt(i));
        } else {
        displayWordMap.push("_");
        }
    }
    document.getElementById("secret-word").innerHTML = `${displayWordMap.join(" ")}`;
    document.getElementById("user-stats").innerHTML = `${user.guesses}`;
    console.log(displayWordMap);
    console.log(user);
};
// start game with a new word and new score
var startingState = function() {
    document.getElementById("game").innerHTML = "Press \"s\" key to begin!";
    document.onkeyup = function(event) {
    var keyPressed = event.key;
// press s key to start the game
    if (keyPressed === "s") {
    document.getElementById("game").innerHTML = "Welcome to HANGMAN, <br> please press a lettter to guess the word <br>";
        startingScore();
        newWord();
        runGame();
        }
    }
};
// function that searches an array for a value
var inArray = function(x,y) {
    var count = x.length;
    for ( var i = 0; i < count; i++ ) {
        if ( x[i] === y) {
            return true;
        }
    }
    return false;
}
var confirmNewWord = function() {
    var ask = confirm("new word?");
    if (ask) {
        newWord();
    } else {
        var reset = confirm("start over?")
        if (reset) {
            startingState();
        } 
    }
};
var runGame = function() {
    document.onkeyup = function(event) {
    var keyPressed = event.key;
// checks if key pressed is in the array
    if (inArray(guessedLetters, keyPressed)) {
        console.log("already guessed");
    } else if (inArray(hiddenWordMap, keyPressed)) {
        user.correctGuesses++;
        // decrease guesses by 1          
        user.guesses--;
// store the value in guessed letters
        guessedLetters.push(keyPressed); 
// if so, loop through the array and do all the stuff at the exact location of the correct guess in both arrays
        for (var i = 0; i < hiddenWordMap.length; i++) {
            if (keyPressed === hiddenWordMap[i] && keyPressed != "-" && keyPressed != "*") {
            console.log(keyPressed + "--> :)") 
// reveal hidden letters when correctly guessed
            displayWordMap.splice(hiddenWordMap.indexOf(hiddenWordMap[i]), 1, hiddenWordMap[i]);
            hiddenWordMap.splice(hiddenWordMap.indexOf(hiddenWordMap[i]), 1, "*");
            } 
        }
            console.log(displayWordMap);
            console.log("guessed letters: " + guessedLetters);
            console.log(user);
        } else {
            console.log(keyPressed + "--> :(");
            guessedLetters.push(keyPressed);
            user.wrongGuesses++;
            // decrease guesses by 1          
            user.guesses--;
            console.log(displayWordMap);
            console.log("guessed letters: " + guessedLetters);
            console.log(user);
        }
// when whole word is correctly guessed, increase wins(score) by 1
        if (displayWordMap.join("") === hiddenWord) {
        alert("good job!")
        user.wins++;
        confirmNewWord();
        }
// when remaining guesses run out, increase losses by 1
        if (user.guesses < 1) {
        alert("sorry you lose");
        user.losses++;
        confirmNewWord();
        }
    };
};
startingState();
