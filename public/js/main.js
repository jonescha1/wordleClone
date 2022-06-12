document.addEventListener("DOMContentLoaded", () => {
  // Calls the function to create the game board
  buildBoard();

  //Holds an array of words the user has guessed
  let guessedWords = [[]];
  let word; //This is just to for testing against a correct word. Will pull in random words later on.
  let availableSpace = 0;
  let availableSpaceEl = document.getElementById(
    `block-front-` + String(availableSpace)
  );

  // This will add the functionality for the user to input the character from the users keyboard
  document.addEventListener("keydown", (e) => {
    updateGuessedWords(e.key);
  });

  // ********************************************************************************************
  // Builds the game board wireframe
  async function buildBoard() {
    word = String(await getRandomWord());
    const board = document.getElementById("board");

    for (let i = 0; i < 30; i++) {
      let block = document.createElement("div");
      block.setAttribute("id", i + 1);
      block.setAttribute("class", "block");

      let inner = document.createElement("div");
      inner.setAttribute("class", "block-inner");

      let front = document.createElement("div");
      let back = document.createElement("div");

      front.setAttribute("class", "block-front");
      front.setAttribute("id", `block-front-` + i);
      back.setAttribute("class", "block-back");
      back.setAttribute("id", `block-back-` + i);

      inner.appendChild(front);
      inner.appendChild(back);

      block.appendChild(inner);
      board.appendChild(block);
    }
    console.log(word);
  }

  // ********************************************************************************************
  //Gets the number of guessed words.
  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  // ********************************************************************************************
  // Updates guessedWords array
  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (
      currentWordArr &&
      currentWordArr.length < 5 &&
      /^[a-zA-Z]$/gi.test(letter)
    ) {
      currentWordArr.push(letter);
      availableSpaceEl = document.getElementById(
        `block-front-` + String(availableSpace)
      );

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    } else if (letter === "Backspace" && availableSpace > 0) {
      //This if statement is to prevent the user from being able to delete previous guesses. They will be limited to deletin only the characters in the current row/guess.
      if (currentWordArr.length !== 0) {
        currentWordArr.pop();
        availableSpace = availableSpace - 1;
        availableSpaceEl = document.getElementById(
          `block-front-` + String(availableSpace)
        );
        availableSpaceEl.textContent = "";
      }
    } else if (letter === "Enter") {
      submitHandler();
    }
  }

  // ********************************************************************************************
  // Handler for when the user hit the Enter/Return key
  function submitHandler() {
    // const board = document.querySelectorAll("#board");
    const currentWordArr = getCurrentWordArr();
    const currentWord = currentWordArr.join("");

    if (currentWordArr.length == 5) {
      if (currentWord == word) {
        userCorrect(word, currentWord, guessedWords.length);
      } else if (guessedWords.length === 6) {
        //Will need to clear the board and start over. Figure out what to do in case the user exceeds the amounts of guesses.
        userNoMoreGuesses(word, currentWord, guessedWords.length);
      }
      showCorrectBlocks(word, currentWord, guessedWords.length);
      //Add a new array to the guessedWords array for the next row.
      guessedWords.push([]);
    } else if (currentWordArr.length !== 5) {
      window.alert("Word must be 5 letter");
    }
  }

  // ********************************************************************************************
  // Create a function that will flip the corresponding blocks after hitting enter.
  function showCorrectBlocks(correctWordArr, guessedWordArr) {
    // const currentWordArr = getCurrentWordArr(); //This will return the row of the current word
    var elementPosition = 4;

    for (let i = 0; i < guessedWordArr.length; i++) {
      //Creating a nested loop scenarior to check the guessed word against the correct word
      for (let j = 0; j < correctWordArr.length; j++) {
        //This will check to see if a letter in the guessed word is in the correct word as well as if they are in the same index location.
        console.log(guessedWordArr[i], correctWordArr[j]);
        let blockParent = document.getElementById(
          String(availableSpace - elementPosition)
        );
        let firstChild = blockParent.querySelector(".block-inner");
        let secondChild = firstChild.querySelector(".block-back");
        if (guessedWordArr[i] === correctWordArr[j] && i == j) {
          //Need to flip the corresponding block and set background color to green

          firstChild.classList.add("rotate");
          secondChild.style.backgroundColor = "#538d4e";
          secondChild.textContent = guessedWordArr[i];
        }
        // This just checks if the letter in the guessed word is anywhere within the correct word.
        else if (
          guessedWordArr[i] === correctWordArr[j] &&
          secondChild.textContent == ""
        ) {
          //Need to flip the corresponding block and set the background color to yellow.

          firstChild.classList.add("rotate");
          secondChild.style.backgroundColor = "#b59f3b";
          secondChild.textContent = guessedWordArr[i];
        }
      }
      // console.log(elementPosition);
      elementPosition = elementPosition - 1;
    }
  }

  // ********************************************************************************************
  async function userCorrect(word, currentWord, length) {
    await showCorrectBlocks(word, currentWord, length);
    console.log("correct answer");
  }
  // ********************************************************************************************
  async function userNoMoreGuesses(word, currentWord, length) {
    await showCorrectBlocks(word, currentWord, length);
    console.log("Sorry, No more guesses");
  }

  async function getRandomWord() {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const randomWord = await response.json();
    return randomWord;
  }
});

// Notes
// Need to clean code up. Possibly go about flipping the cards by grabbing each divs text content upon hitting enter and compairing it to the correct words characters
//Find a way to disable a key after the letter has been placed in the write spot. At this point the user is able to enter a whole row of the same letters some may be green and some yellow.
//change font of blocks
//pull in random word api or something to generate a random word.
//get rid of all the console logs and unneeded code.
