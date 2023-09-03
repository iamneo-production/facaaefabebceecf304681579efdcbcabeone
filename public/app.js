document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".btn");
    const resultDisplay = document.querySelector(".result");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameOver = false;
  
    // Function to check for a win or a draw
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].value && cells[a].value === cells[b].value && cells[a].value === cells[c].value) {
          return cells[a].value;
        }
      }
  
      if ([...cells].every((cell) => cell.value)) {
        return "Draw";
      }
  
      return null;
    }
  
    // Function to handle cell click
    function handleCellClick(event) {
      const cell = event.target;
      if (!cell.value && !gameOver) {
        cell.value = currentPlayer;
        cell.disabled = true;
        cell.style.backgroundColor = currentPlayer === "X" ? "red" : "blue";
        currentPlayer = currentPlayer === "X" ? "O" : "X";
  
        const winner = checkWinner();
        if (winner) {
          if (winner === "Draw") {
            resultDisplay.textContent = "It's a Draw!";
          } else {
            resultDisplay.textContent = `Player ${winner} Wins!`;
          }
          gameOver = true;
        } else {
          resultDisplay.textContent = `Player ${currentPlayer} Turn`;
        }
      }
    }
  
    // Function to reset the game
    function resetGame() {
      cells.forEach((cell) => {
        cell.value = "";
        cell.disabled = false;
        cell.style.backgroundColor = "white";
      });
      resultDisplay.textContent = "Player X Turn";
      currentPlayer = "X";
      gameOver = false;
    }
  
    // Event listeners
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
  });