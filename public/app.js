// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player moves
const ticTacToe = (element, index) => {
    // Check if the cell is already filled
    if (cells[index] !== '') return;

    // Update the game state
    cells[index] = currentPlayer;
    element.textContent = currentPlayer;

    // Check for winning conditions
    for (const condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            // Display the winning message
            result.textContent = `${currentPlayer} wins!`;

            // Disable all buttons after a win
            btns.forEach(btn => btn.disabled = true);
            return; // Exit the function to prevent further moves
        }
    }

    // Update the current player's turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    result.textContent = `Current Player: ${currentPlayer}`;
};

// Function to reset the game
const resetGame = () => {
    // Reset game state
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';

    // Clear X and O symbols from cells on the game board
    btns.forEach((btn, i) => {
        btn.textContent = '';
        btn.disabled = false;
    });

    // Update the result element
    result.textContent = 'Current Player: X';
};

btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

document.querySelector('#reset').addEventListener('click', resetGame);