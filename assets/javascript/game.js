// declare variables (remaining guesses, wrong guesses, hidden word, words[], wins, losses)
var user = {
    guesses: 0,
    wrongGuesses: 0,
    correctGuesses: 0,
    wins: 0,
    losses: 0
};
var secretWords = ["saguaro", "ocatillo", "teddy-bear-cholla", "creosote", "prickly-pear-cholla", "mesquite", "palo-verde", "mormon-tea", "acacia", "brittlebush", "barrel-cactus", "jojoba", "mistletoe", "agave", "hedgehog-cactus", "ironwood", "sycamore", "yucca", "organ-pipe-cactus", "squirrel", "javalina", "whiptail-lizard", "tarantula", "black-widow", "horned-toad", "coyote", "desert-tortoise", "vermillion-flycatcher", "cactus-wren", "kestrel", "red-tailed-hawk"];
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
    user.wrongGuesses = 0;
    user.correctGuesses = 0;
    user.wins = 0;
    user.losses = 0;
    // click to solve button
    var solveButton = document.createElement("button");
    solveButton.innerHTML = "click to solve";
    solveButton.setAttribute("id", "solve"); 
    solveButton.setAttribute("class", "bg-success text-warning");
    button.appendChild(solveButton);
};
// function to display the user stats including wins, losses, guessed letters, and remaining guesses
var showStats = function () {
    document.getElementById("user-stats").innerHTML = `guesses remaining: ${user.guesses} <br>wins: ${user.wins} <br>losses: ${user.losses}`;
};
// select at random one of the words from the secretWords array and set hiddenWord to that string
// then push each letter into the array!
var newWord = function() {
    user.guesses = 13;
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
// display the information on the screen for new word
    document.getElementById("secret-word").innerHTML = `${displayWordMap.join(" ")}`;
    document.getElementById("guessed-letters").innerHTML = `guessed letters: ${guessedLetters.join(", ")}`;
// open console for the word (helpful when testing)
    console.log(hiddenWord);
};
// start game with a new word and new score
var startingState = function() {
    document.getElementById("game").innerHTML = "Press any key to begin!";
    document.onkeyup = function(event) {
    var keyPressed = event.key;
// press s key to start the game
    if (keyPressed) {
    document.getElementById("game").innerHTML = "Welcome! <br> please press a lettter to guess the word <br>";
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
};
var isAlphabetCharacter = function(letter) {
    return (letter.length === 1) && /[a-z]/i.test(letter);
};
var checkWord = function () {
    if (displayWordMap.join("") === hiddenWord) {
    alert("good job!");
    user.wins++;
    confirmNewWord();
    }
};
var youLose = function() {
    if (user.guesses < 1) {
    alert("sorry you lose");
    user.losses++;
    confirmNewWord();
    }
};
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
startingState()
var runGame = function() {
    document.getElementById("solve").onclick = function() {
        var solveAttempt = prompt("what is your guess? (please use hyphens \"-\" between multiple word answers)");
        if (solveAttempt === hiddenWord) {
            alert("correct!");
            user.wins++;
            confirmNewWord();
        } else {
            alert("incorrect. keep trying.");
            user.guesses--;
        }
    }
    document.onkeyup = function(event) {
    var keyPressed = event.key;
// checks if key pressed has already been guessed
    if (inArray(guessedLetters, keyPressed)) {
        document.getElementById("alert").innerHTML = `you have already guessed the letter ${keyPressed}!`;
        console.log("already guessed");
// checks if key pressed is in the hidden word array
    } else if (inArray(hiddenWordMap, keyPressed)) {
        user.correctGuesses++;
// decrease guesses by 1          
        user.guesses--;
// store the value in guessed letters
        guessedLetters.push(keyPressed); 
// if so, loop through the array and do all the stuff at the exact location of the correct guess in both arrays
        for (var i = 0; i < hiddenWordMap.length; i++) {
            if (keyPressed === hiddenWordMap[i] && keyPressed != "-" && keyPressed != "*") {
            document.getElementById("alert").innerHTML = "--> :)"; 
// reveal hidden letters when correctly guessed. splice(index location to begin, number to delete, thing to replace it with)
            displayWordMap.splice(hiddenWordMap.indexOf(hiddenWordMap[i]), 1, hiddenWordMap[i]);
            hiddenWordMap.splice(hiddenWordMap.indexOf(hiddenWordMap[i]), 1, "*");
            } 
        }
            document.getElementById("secret-word").innerHTML = `${displayWordMap.join(" ")}`;
            document.getElementById("guessed-letters").innerHTML = `guessed letters: ${guessedLetters.join(", ")}`;
            showStats();
        } else if (isAlphabetCharacter(keyPressed)) {
            document.getElementById("alert").innerHTML = "--> :("; 
            guessedLetters.push(keyPressed);
            user.wrongGuesses++;
// decrease guesses by 1          
            user.guesses--;
            document.getElementById("secret-word").innerHTML = `${displayWordMap.join(" ")}`;
            document.getElementById("guessed-letters").innerHTML = `guessed letters: ${guessedLetters.join(", ")}`;
            showStats();
        } else {
            document.getElementById("alert").innerHTML = "Woah hey that's not a letter!"; 
        }
// when whole word is correctly guessed, increase wins(score) by 1
        checkWord();
// when remaining guesses run out, increase losses by 1
        youLose();
    }
};