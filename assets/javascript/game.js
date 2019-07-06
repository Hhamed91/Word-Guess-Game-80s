var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var dicWordList = ["IllegalAlien", "Limelight", "Rosanna"];


var gameStarted = false;
var currentWord;
var wordAsDashes;
var guessesLeft;
var lettersGuessed;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace; //place in dicWordList array
var correctGuesses;
var wordAsArr = [];
var dashesArray = [];
var getWordList = [];

function initialize() {
	gameStarted = true;
	lettersGuessed = [];
	correctGuesses = 0;
	wordPlace = Math.floor(Math.random() * 3); // needs to be make the list longer than just 3 songs
	currentWord = dicWordList[wordPlace];			//string
	guessesLeft = 6;		                    //limited to 6 guesses
	wordAsDashes = makeIntoDashes(currentWord);	//string of dashes
	wordAsArr = currentWord.split('');			//array with letters
	dashesArray = wordAsDashes.split('');		//array with dashes


    //The innerHTML property sets or returns the HTML content (inner HTML) of an element.
    //set it up like Synta HTMLElementObject.innerHTML


	document.getElementById("currentWord").innerHTML = wordAsDashes;
	document.getElementById("lettersGuessed").innerHTML = "_";
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

// Make each word into underscores, visually like hangman
function makeIntoDashes(word) {
	var dashes = "";
	for (i = 0; i < word.length - 1; i++) {
		dashes += "_ ";
	}
	dashes += "_";
	return dashes;
}


// ************ Main function that controls what to do with each keystroke**********
function playGame(letter) {
	var letter = letter.toLowerCase();

	// 1- Checks if key is a letter - the indexOf() method is case sensitive so we set it up to accept only .toLowerCase()
    // Standard syntax is to be like: string.indexOf(searchvalue, start)

	if (alphabet.indexOf(letter) > -1) {
		if (wordAsArr.indexOf(letter) > -1) {
			correctGuesses++;
			displayLetter(letter);
		}
		else {
			if (lettersGuessed.indexOf(letter) > -1) {
				return;
			}
			else {
				guessesLeft--;
				document.getElementById("guessesLeft").innerHTML = guessesLeft;
				lettersGuessed.push(letter);
				document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
                // In case the player did not guess the word use alert
				if (guessesLeft == 0) {
					alert("Sorry! The correct answer is " + currentWord);
					initialize();
					numLosses++;
					document.getElementById("losses").innerHTML = numLosses;
				}
			}
		}
	}
}

// 2- Displays letter if it's in word
function displayLetter(letter) {
	// for each char in wordAsDashes, if matches currentWord then --> display
	for (i = 0; i < currentWord.length; i++) {
		if (letter == wordAsArr[i]) {
			dashesArray[i * 2] = letter;
			console.log(dashesArray); // testing to make sure i can see the new word
		}
	}
	document.getElementById("currentWord").innerHTML = dashesArray.join("");
	checkForWin();
}

// Checks for win by looking for "_". Also REMEMBER that === means equal value and equal type - for ref - https://www.w3schools.com/js/js_comparisons.asp
function checkForWin() {
	if (dashesArray.indexOf("_") === -1) {
		alert("WOOHOO! You got it. The correct answer is " + currentWord);
		numWins++;
		document.getElementById("wins").innerHTML = numWins;
		initialize();
	}
}
//Time to execute a JavaScript when a user releases a key

document.onkeyup = function (event) {
	if (!gameStarted) {
		document.getElementById("letsPlay").innerHTML = "";
		initialize();
		document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
		console.log(currentWord);
		gameStarted = true;
	}
	else {
		playGame(event.key);
	}
}
