const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.querySelector('.message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isGameActive = true;
    currentPlayer = 'X';
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'win');
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
};

const handleCellClick = (e) => {
    const cell = e.target;
    const currentClass = currentPlayer === 'X' ? 'x' : 'o';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
};

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
    cell.textContent = currentPlayer;
};

const swapTurns = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        const hasWon = combination.every(index => cells[index].classList.contains(currentClass));
        if (hasWon) {
            combination.forEach(index => cells[index].classList.add('win')); // Add 'win' class to the winning cells
        }
        return hasWon;
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const endGame = (draw) => {
    if (draw) {
        messageElement.textContent = 'It\'s a draw!';
    } else {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
    }
    isGameActive = false;
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
};

restartButton.addEventListener('click', startGame);

startGame();
