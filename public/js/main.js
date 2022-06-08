document.addEventListener("DOMContentLoaded", () => {
  // Calls the function to create the game board
  buildBoard();

  //Holds an array of words the user has guessed
  let guessedWords = [[]];
  let word = "chase"; //This is just to for testing against a correct word. Will pull in random words later on.
  let availableSpace = 0;
  let availableSpaceEl = document.getElementById(
    `block-front-` + String(availableSpace)
  );

  // This will add the functionality for the user to input the character from the users keyboard
  document.addEventListener("keydown", (e) => {
    updateGuessedWords(e.key);
  });

  // Builds the game board wireframe
  function buildBoard() {
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
  }

  //Gets the number of guessed words.
  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

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

      // console.log(currentWordArr.length);
    } else if (letter === "Enter") {
      submitHandler();
    }
  }

  // Handler for when the user hit the Enter/Return key
  function submitHandler() {
    // const board = document.querySelectorAll("#board");
    const currentWordArr = getCurrentWordArr();
    const currentWord = currentWordArr.join("");

    if (currentWordArr.length == 5) {
      if (currentWord == word) {
        // user entered correct word
        // Will need to clear the board and start over. Figure out what to do when user wins.
        window.alert("Congrats!!!");
        // ***********************This block is for testing purposes***********************
        let blockParent = document.getElementById("1"); //******************************* */
        let child = blockParent.querySelector(".block-inner"); //************************ */
        child.classList.add("rotate"); //***************************************************
        // ***********************This block is for testing purposes***********************
      } else if (guessedWords.length === 6) {
        //Will need to clear the board and start over. Figure out what to do in case the user exceeds the amounts of guesses.
        window.alert("Sorry, no more guesses allowed");
      }
      //Add a new array to the guessedWords array for the next row.
      guessedWords.push([]);
    } else if (currentWordArr.length !== 5) {
      //Need to add
      window.alert("Word must be 5 letter");
      console.log(guessedWords);
    }
  }

  // ********************************
  // Create a function that will flip the corresponding blocks after hitting enter.
});
