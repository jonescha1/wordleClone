document.addEventListener("DOMContentLoaded", () => {
  // Calls the function to create the game board
  buildBoard();

  //Holds an array of words the user has guessed
  let guessedWords = [[]];
  let word; //this is where the random word that is fetched will be stored.
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
    //By awaiting the getRandomWord function, the board will not build out on the screen unless it retrieves a word.
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
  //Gets the amount of guessed words.
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
  // Handler for when the user hits the Enter/Return key
  function submitHandler() {
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
  //function that will flip the corresponding blocks after hitting enter.
  function showCorrectBlocks(correctWordArr, guessedWordArr) {
    /* this variable will help change the block that the class "rotate" is assigned to.
     At the end of each guess, the current location of the elements position is set to the last block of that row (example: The first rows last element id is "5", 2nd row is "10" etc.). 
    By taking the last elements id number and subtracting 4, it will ensure that the below loop will start at the first block of that row.*/
    var elementPosition = 4;

    //Creating a nested loop scenarior to check the guessed word against the correct word
    for (let i = 0; i < guessedWordArr.length; i++) {
      for (let j = 0; j < correctWordArr.length; j++) {
        let count = 0;
        //This will check to see if a letter in the guessed word is in the correct word as well as if they are in the same index location.

        let blockParent = document.getElementById(
          String(availableSpace - elementPosition)
        );
        let firstChild = blockParent.querySelector(".block-inner");
        let secondChild = firstChild.querySelector(".block-back");
        if (guessedWordArr[i] === correctWordArr[j] && i == j) {
          //flip the corresponding block and set background color to green
          firstChild.classList.add("rotate");
          secondChild.style.backgroundColor = "#538d4e";
          secondChild.textContent = guessedWordArr[i];
        }
        // This just checks if the letter in the guessed word is anywhere within the correct word and has not already been asigned by the previous condition..
        else if (
          guessedWordArr[i] === correctWordArr[j] &&
          secondChild.textContent == ""
        ) {
          //flip the corresponding block and set the background color to yellow.
          firstChild.classList.add("rotate");
          secondChild.style.backgroundColor = "#b59f3b";
          secondChild.textContent = guessedWordArr[i];
        }
      }

      elementPosition = elementPosition - 1;
    }
  }

  // ********************************************************************************************
  // This function when called will show the blocks colors based on the users input and THEN it will show the player that they won.
  async function userCorrect(word, currentWord, length) {
    await showCorrectBlocks(word, currentWord, length);

    displayMessage(
      `Congratulations, You guessed the correct word on try #${length}!!`
    );
  }
  // ********************************************************************************************
  // This function when called will show the blocks colors based on the users input and THEN it will show the player that they have no more guesses
  async function userNoMoreGuesses(word, currentWord, length) {
    await showCorrectBlocks(word, currentWord, length);

    displayMessage(`No more guesses allowed. The correct word is ${word}!`);
  }

  // This functino will fetch a random word from the given http address and return the word.
  async function getRandomWord() {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const randomWord = await response.json();
    return randomWord;
  }

  //function to display a status message across the screen
  function displayMessage(status) {
    const message = document.createElement("div");
    message.setAttribute("id", "display_result");
    message.textContent = status;

    // let head = document.getElementsByTagName("header");
    document.body.insertBefore(message, document.body.firstChild);
    setTimeout(resetGame, 5000);
  }

  function resetGame() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    document.getElementById("display_result").remove();
    buildBoard();

    //Holds an array of words the user has guessed
    guessedWords = [[]];
    word; //this is where the random word that is fetched will be stored.
    availableSpace = 0;
    availableSpaceEl = document.getElementById(
      `block-front-` + String(availableSpace)
    );
  }
});
