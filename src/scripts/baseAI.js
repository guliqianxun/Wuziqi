function evaluateMove(board, x, y, player) {
    let score = 0;

    // 方向向量
    const directions = [
        [0, 1], // 垂直
        [1, 0], // 水平
        [1, 1], // 对角线1
        [-1, 1] // 对角线2
    ];

    directions.forEach(([dx, dy]) => {
        let count = 0;
        // 向一个方向检查
        for (let i = 1; i <= 4; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[nx].length && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }
        // 向相反方向检查
        for (let i = 1; i <= 4; i++) {
            const nx = x - i * dx;
            const ny = y - i * dy;
            if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[nx].length && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }
        score += count;
    });

    return score;
}

export function findBestMove(board, player) {
    let maxScore = -Infinity;
    let bestMove = null;

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[x][y] === 0) { // 确保是空位
                // console.log('Evaluating move:', x, y);
                const score = evaluateMove(board, x, y, player);
                if (score > maxScore) {
                    maxScore = score;
                    bestMove = { x, y };
                }
            }
        }
    }

    return bestMove;
}

