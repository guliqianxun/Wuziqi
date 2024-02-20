// draw.js
const canvas = document.getElementById('chessBoard');
const ctx = canvas.getContext('2d');
const cellSize = 32;
const boardOffset = 16;

export function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除棋盘
    ctx.beginPath();
    for (let i = 0; i <= 15; i++) {
        ctx.moveTo((i + 1) * cellSize, cellSize);
        ctx.lineTo((i + 1) * cellSize, cellSize + 15 * cellSize + 1);
        ctx.moveTo(cellSize, (i + 1) * cellSize);
        ctx.lineTo(cellSize + 15 * cellSize + 1, (i + 1) * cellSize);
    }
    ctx.stroke();
}

export function drawPiece(x, y, player) {
    ctx.beginPath();
    ctx.arc(boardOffset + x * cellSize + cellSize / 2, boardOffset + y * cellSize + cellSize / 2, cellSize / 2 * 0.8, 0, 2 * Math.PI);
    ctx.fillStyle = player === 1 ? 'black' : 'white';
    ctx.fill();
    ctx.stroke();
}

export function redrawBoard(game) {
    drawBoard();

    for (let y = 0; y < game.boardState.length; y++) {
        for (let x = 0; x < game.boardState[y].length; x++) {
            const player = game.boardState[y][x];
            if (player !== 0) {
                drawPiece(x, y, player);
            }
        }
    }
}
