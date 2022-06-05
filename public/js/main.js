document.addEventListener("DOMContentLoaded", () => {
  // Calls the function to create the game board
  buildBoard();

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
      back.setAttribute("class", "block-back");
      back.setAttribute("id", `block-back-` + i);

      let character = document.createElement("h2");
      // innerhtml needs to be activated when user inputs a character.
      character.innerHTML = i;

      back.appendChild(character);
      inner.appendChild(front);
      inner.appendChild(back);

      block.appendChild(inner);
      board.appendChild(block);
    }
  }
});
