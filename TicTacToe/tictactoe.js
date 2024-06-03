let currentPlayer = 'X';
const statusDiv = document.getElementById('status');




function checkWin() {
    const cells = document.querySelectorAll('.cell');
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent === currentPlayer &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}

function checkTie() {
    const cells = document.querySelectorAll('.cell');
    return Array.from(cells).every(cell => cell.textContent === 'X' || cell.textContent === 'O');
}

function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.onclick = null);
}


function handleClick(cell) {
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;

        if (checkWin()) {
            statusDiv.textContent = `${currentPlayer} wins!`;
            disableBoard();
        } else if (checkTie()) {
            statusDiv.textContent = "It's a tie!";
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }
}


document.getElementById('rst').addEventListener("click", function (e) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    statusDiv.textContent = '';
    currentPlayer = 'X';
    cells.forEach(cell => cell.onclick = function () { handleClick(cell); });

});