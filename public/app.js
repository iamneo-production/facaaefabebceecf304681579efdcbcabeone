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
    // Check if the clicked cell is empty
    if (cells[index] === '' && result.innerText === '') {
        // Update the cell with the current player's symbol
        element.innerText = currentPlayer;
        cells[index] = currentPlayer;
        
        // Check for winning conditions
        for (const condition of conditions) {
            const [a, b, c] = condition;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                // Display the winning message
                result.innerText = `Player ${currentPlayer} wins!`;

                // Disable all buttons
                btns.forEach(btn => btn.disabled = true);

                return; // Exit the function
            }
        }

        // Switch to the other player's turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
        // Display the current player's turn
        result.innerText = `Player ${currentPlayer}'s Turn`;
    }
};

// Function to reset the game
const resetGame = () => {
    // Reset game state variables
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';

    // Clear the result message
    result.innerText = 'Player X\'s Turn';

    // Re-enable all buttons
    btns.forEach(btn => {
        btn.innerText = '';
        btn.disabled = false;
    });
};

// Add click event listeners to the buttons
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

// Add a click event listener to the "Reset" button
document.querySelector('#reset').addEventListener('click', resetGame);
