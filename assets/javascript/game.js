// declare variables (remaining guesses, wrong guesses, hidden word, words[], wins, losses)
var user = {
    guesses: 13,
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
// variable to store when you lose
var lost;
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
    solveButton.setAttribute("class", "bg-light text-dark");
    button.appendChild(solveButton);
};
var hangMan = "";
// function to display the user stats including wins, losses, guessed letters, and remaining guesses
var showStats = function () {
    document.getElementById("user-stats").innerHTML = `guesses remaining: ${user.guesses} <br>wins: ${user.wins} <br>losses: ${user.losses} <br>guessed letters: ${guessedLetters.join(", ")}`;
};
// select at random one of the words from the secretWords array and set hiddenWord to that string
// then push each letter into the array!
var newWord = function() {
    lost = false;
    user.guesses = 13;
    hiddenWord = secretWords[Math.floor(Math.random() * secretWords.length)];
    hiddenWordMap = [];
    displayWordMap = [];
    guessedLetters = [];
    drawHangMan();
// this is where the background image function checks for an increase in wins
    backgroundImg();
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
    showStats();
// open console for the word (helpful when testing)
    console.log(hiddenWord);
};
var drawHangMan = function () {
    if (user.guesses === 13) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    } 
    if (user.guesses === 12) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 11) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>       ,--------.                              ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }    
    if (user.guesses === 10) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 9) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>       ,---|---.                                 ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 8) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>  _.  ,---|---.  ._                            ||  <br>    \\./     |    \\./                              ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 7) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>  _.  ,---|---.  ._                            ||  <br>    \\./     |    \\./                              ||  <br>            |                                     ||  <br>                                                  ||  <br>                                                  ||  <br>                                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 6) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>  _.  ,---|---.  ._                            ||  <br>    \\./     |    \\./                              ||  <br>            |                                     ||  <br>            /\\                                    ||  <br>                                                  ||  <br>                                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 5) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>  _.  ,---|---.  ._                            ||  <br>    \\./     |    \\./                              ||  <br>            |                                     ||  <br>            /\\                                    ||  <br>           /  \\                                   ||  <br>                                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 4) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>  _.  ,---|---.  ._                            ||  <br>    \\./     |    \\./                              ||  <br>            |                                     ||  <br>            /\\                                    ||  <br>           /  \\                                   ||  <br>          /    \\                                  ||  <br>       ,--------.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 3) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>  _.  ,---|---.  ._                            ||  <br>    \\./     |    \\./                              ||  <br>            |                                     ||  <br>            /\\                                    ||  <br>           /  \\                                   ||  <br>          /    \\                                  ||  <br>       ,-^----^-.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 2) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>  _.  ,---|---.  ._                            ||  <br>    \\./     |    \\./                              ||  <br>            |                                     ||  <br>            /\\                                    ||  <br>           /  \\                                   ||  <br>          /    \\                                  ||  <br>       ,-^----^-.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 1) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>        * .  . *                                 ||  <br>         \\ o /                                   ||  <br>   |.  ,---|---.  .|                             ||  <br>    \\./     |    \\./                              ||  <br>            |                                     ||  <br>            /\\                                    ||  <br>           /  \\                                   ||  <br>          /    \\                                  ||  <br>       ,-^----^-.                               ||  <br>    _/______\\_______________||  <br>   |_______________________||  <br>";
    }
    if (user.guesses === 0) {
        hangMan = "<br><br>             ____________________    <br>            //                                    ||  <br>          ,,,,,                                   ||  <br>       * x  x *                                 ||  <br>         \\ = /                                   ||  <br>   |.  ,---|---.  .|                             ||  <br>    \\./     |    \\./                              ||  <br>            |                                     ||  <br>            /\\                                    ||  <br>           /  \\                                   ||  <br>          /    \\                                  ||  <br>         ^    ^                                  ||  <br>    _______________________||  <br>   |_______________________||  <br>";
    }
    var putItHere = document.getElementById("hangman");
    putItHere.setAttribute("style", `font-family: "Arial"`)
    putItHere.innerHTML = `${hangMan}`;
}
var drawSaguaro = function() {
    var saguaro = "<br>    O <br>                +   <br>*         <br>      _'-'-'_  <br>      -| | | |_  <br>,,,   -| | | |-     <br>| ||  -| | | |_  <br>\\,\\,\\_| | | |-  <br>      -| | | |_  <br>     _| | | |-  <br>      -| | | |_  <br>     _| | | |-  <br>      -| | | |_  <br>     _| | | |-  <br>___-|_|| |___<br>";
    var putItHere = document.getElementById("saguaro");
    putItHere.setAttribute("style", `font-family: "Arial"`)
    putItHere.innerHTML = `${saguaro}`;
}
// variable to store user.wins for comparison
var win = user.wins;
// change background image to random image from the array when win happens
var backgroundImg = function() {
    var bodyTime = document.getElementById("body");
    var backGrounds = ["picture", "picture1", "picture2", "picture3", "picture4", "picture5", "new-gradient"];
    newImg = backGrounds[Math.floor(Math.random() * backGrounds.length)];
    if (win < user.wins) {
        bodyTime.setAttribute(`class`, `${newImg}`);
        win = user.wins;
    }
}
// start game with a new word and new score
var startingState = function() {
    drawSaguaro();
    drawHangMan();
    document.getElementById("secret-word").innerHTML = "Press any key to begin!";
    document.getElementById("user-stats").setAttribute("class", "hidden");
    document.getElementById("alert").setAttribute("class", "hidden");
    document.onkeyup = function(event) {
    var keyPressed = event.key;
// press s key to start the game
    if (keyPressed) {
    document.getElementById("alert").innerHTML = "Hello! <br>press a lettter if you think the hidden word contains it. <br>";
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
// function to see if the word is complete
var checkWord = function () {
    if (displayWordMap.join("") === hiddenWord) {
    document.getElementById("alert").innerHTML = "Congratulations! You got it!";
    user.wins++;
    confirmNewWord();
    } else if (user.guesses < 1) {
    document.getElementById("alert").innerHTML = "Sorry you lose!";
    user.losses++;
    lost = true;
    confirmNewWord();
    }
};
// funtion to ask if you want a new word
var confirmNewWord = function() {
    var alert = document.getElementById("alert");
    var wordButton = document.createElement("button");
    wordButton.innerHTML = "new word?";
    wordButton.setAttribute("id", "button"); 
    wordButton.setAttribute("class", "bg-light text-dark");
    alert.appendChild(wordButton);
    document.getElementById("button").onclick = function() {
        newWord();
        alert.removeChild(wordButton);
    }
}
// function that is the game itself
var runGame = function() {
    showStats();
    drawHangMan();
    document.getElementById("user-stats").setAttribute("class", "row justify-content-center white-box");
    document.getElementById("alert").setAttribute("class", "row justify-content-center white-box");
    document.getElementById("solve").onclick = function() {
        if (lost) {
            alert("too late! you have run all the way out of guesses!")
        } else {
            var solveAttempt = prompt("what is your guess? (please use hyphens \"-\" between multiple word answers)");
            if (solveAttempt === hiddenWord) {
                document.getElementById("alert").innerHTML = "Congratulations! You got it!";
                user.wins++;
                confirmNewWord();
            } else if (solveAttempt) {
                alert("incorrect. keep trying.");
                user.guesses--;
            }
        }
    }
    document.onkeyup = function(event) {
    var keyPressed = event.key;
    if (lost) {
        alert(`Pressing ${keyPressed} won't help you now! (you are out of guesses)`);
    } else
// checks if key pressed has already been guessed
    if (inArray(guessedLetters, keyPressed)) {
        document.getElementById("alert").innerHTML = `you have already guessed the letter ${keyPressed}!`;
        console.log("already guessed");
// checks if key pressed is in the hidden word array
    } else if (inArray(hiddenWordMap, keyPressed)) {
        user.correctGuesses++;
// store the value in guessed letters
        guessedLetters.push(keyPressed); 
// if so, loop through the array and do all the stuff at the exact location of the correct guess in both arrays
        for (var i = 0; i < hiddenWordMap.length; i++) {
            if (keyPressed === hiddenWordMap[i] && keyPressed != "-" && keyPressed != "*") {
            document.getElementById("alert").innerHTML = `${keyPressed} --> :)`; 
// replace hidden letters when correctly guessed. splice(index location to begin, number to delete, thing to replace it with)
            displayWordMap.splice(hiddenWordMap.indexOf(hiddenWordMap[i]), 1, hiddenWordMap[i]);
            hiddenWordMap.splice(hiddenWordMap.indexOf(hiddenWordMap[i]), 1, "*");
            } 
        }
// print it to the document for the user to see
            document.getElementById("secret-word").innerHTML = `${displayWordMap.join(" ")}`;
            showStats();
        } else if (isAlphabetCharacter(keyPressed)) {
            document.getElementById("alert").innerHTML = `${keyPressed} --> :(`; 
            guessedLetters.push(keyPressed);
            user.wrongGuesses++;
// decrease guesses by 1          
            user.guesses--;
            document.getElementById("secret-word").innerHTML = `${displayWordMap.join(" ")}`;
            showStats();
        } else {
            document.getElementById("alert").innerHTML = "Woah hey that's not a letter!"; 
        }
// this is where hangman is drawn to correspond with the remaining guess number
        drawHangMan();
// when whole word is correctly guessed, increase wins(score) by 1
        checkWord();
    }
};
// call the starting state which is the only thing we are actually calling outside of any functions
startingState();