import { Game } from './game.js'; // 导入 Game 类

const canvas = document.getElementById('chessBoard');
const ctx = canvas.getContext('2d');
const cellSize = 32; // 每个格子的大小
const boardOffset = 16; // 棋盘在 Canvas 上的偏移量

const game = new Game(); // 创建一个新的游戏实例

// 绘制棋盘
function drawBoard() {
    ctx.beginPath();
    for (let i = 0; i <= 15; i++) {
        // 绘制垂直线
        ctx.moveTo((i + 1) * cellSize, cellSize);
        ctx.lineTo((i + 1) * cellSize, cellSize + 15 * cellSize + 1);
        // 绘制水平线
        ctx.moveTo(cellSize, (i + 1) * cellSize);
        ctx.lineTo(cellSize + 15 * cellSize + 1, (i + 1) * cellSize);
    }
    ctx.stroke();
}

// 绘制棋子
function drawPiece(x, y, player) {
    ctx.beginPath();
    ctx.arc(boardOffset + x * cellSize + cellSize / 2, boardOffset + y * cellSize + cellSize / 2, cellSize / 2 * 0.8, 0, 2 * Math.PI);
    ctx.fillStyle = player === 1 ? 'black' : 'white';
    ctx.fill();
    ctx.stroke();
}

// 注册点击事件并处理用户交互
function registerClickEvent() {
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left - boardOffset) / cellSize);
        const y = Math.floor((event.clientY - rect.top - boardOffset) / cellSize);
        game.makeMove(x, y, drawPiece);
    });
}

// 重新绘制棋盘和棋子
function redrawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除棋盘
    drawBoard(); // 重新绘制棋盘

    // 根据游戏状态重新绘制所有棋子
    for (let y = 0; y < game.boardState.length; y++) {
        for (let x = 0; x < game.boardState[y].length; x++) {
            const player = game.boardState[y][x];
            if (player !== 0) {
                drawPiece(x, y, player);
            }
        }
    }
}

// 初始化 UI 并设置事件监听器
export function initUI() {
    drawBoard();
    registerClickEvent();

    // 获取按钮元素
    const regardButton = document.querySelector('.game-controls .deck-button:nth-child(1)');
    const restartButton = document.querySelector('.game-controls .deck-button:nth-child(2)');
    const mainMenuButton = document.querySelector('.game-controls .deck-button:nth-child(3)');

    regardButton.addEventListener('click', () => {
        game.undoMove(); // 悔棋并回退游戏状态
        redrawBoard(); // 重新绘制棋盘以反映当前游戏状态
    });
    

    // 为重新开始按钮添加事件监听器
    restartButton.addEventListener('click', () => {
        game.initGame(); // 重置游戏
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除棋盘
        drawBoard(); // 重新绘制棋盘
    });

    // 为返回主菜单按钮添加事件监听器
    mainMenuButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // 更改当前页面的 URL 以返回主菜单
    });
}

// // 调用 initUI 初始化游戏 UI
// initUI();
