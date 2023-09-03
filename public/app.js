// Variables to keep track of game state
let currentPlayer = 'X'; // 'X' or 'O'
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle a player's move
function handleCellClick(cell, cellIndex) {
  // Check if the clicked cell is empty and the game is active
  if (gameBoard[cellIndex] === '' && gameActive) {
    // Update the cell with the current player's symbol
    cell.innerText = currentPlayer;
    gameBoard[cellIndex] = currentPlayer;
    
    // Check for a win or a draw
    if (checkWin() || checkDraw()) {
      endGame();
    } else {
      // Switch to the other player's turn
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateTurnMessage();
    }
  }
}

// Function to check for a win
function checkWin() {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

// Function to check for a draw
function checkDraw() {
  return !gameBoard.includes('');
}

// Function to end the game
function endGame() {
  gameActive = false;
  const resultContainer = document.querySelector('.result');
  if (checkWin()) {
    resultContainer.innerText = `Player ${currentPlayer} wins!`;
  } else {
    resultContainer.innerText = 'It\'s a draw!';
  }
}

// Function to update the turn message
function updateTurnMessage() {
  const resultContainer = document.querySelector('.result');
  resultContainer.innerText = `Player ${currentPlayer}'s Turn`;
}

// Add click event listeners to the game cells
const cells = document.querySelectorAll('.btn');
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    handleCellClick(cell, index);
  });
});

// Add a click event listener to the reset button
const resetButton = document.getElementById('Reset');
resetButton.addEventListener('click', resetGame);

// Function to reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach((cell) => {
    cell.innerText = '';
  });
  updateTurnMessage();
}

// Initialize the game
updateTurnMessage();
