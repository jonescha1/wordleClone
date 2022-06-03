document.addEventListener("DOMContentLoaded", () => {
  buildBoard();
  function buildBoard() {
    const board = document.getElementById("board");

    for (let i = 0; i < 30; i++) {
      let block = document.createElement("div");
      block.setAttribute("id", i + 1);
      block.setAttribute("class", "block");
      board.appendChild(block);
    }
  }
});
