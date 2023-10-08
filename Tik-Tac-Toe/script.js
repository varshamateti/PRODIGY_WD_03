// script.js

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Define winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]   // Diagonals
    ];

    function handleCellClick(index) {
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            if (checkWin(currentPlayer)) {
                message.textContent = `Player ${currentPlayer} wins...!`;
                highlightWinningCells(currentPlayer);
                gameActive = false;
            } else if (!board.includes('')) {
                message.textContent = 'It\'s a draw!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin(player) {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    }

    function highlightWinningCells(player) {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
            }
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (gameActive) {
                handleCellClick(index);
            }
        });
    });

    resetButton.addEventListener('click', resetGame);

    resetGame();
});
