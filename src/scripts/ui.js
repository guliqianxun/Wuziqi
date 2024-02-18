// ui.js
import { game, makeMove } from './game.js';

const canvas = document.getElementById('chessBoard');
const ctx = canvas.getContext('2d');
const cellSize = 32; // 每个格子的大小
const boardOffset = 16; // 棋盘在Canvas上的偏移量

// 绘制棋盘函数
function drawBoard() {
    for (let i = 0; i <= 15; i++) {
        // 绘制棋盘的垂直线
        ctx.moveTo(32 + i * cellSize, 32);
        ctx.lineTo(32 + i * cellSize, 513);
        // 绘制棋盘的水平线
        ctx.moveTo(32, 32 + i * cellSize);
        ctx.lineTo(513, 32 + i * cellSize);
        ctx.stroke();
    }
}

// 绘制棋子的函数
function drawPiece(x, y, currentPlayer) {
    ctx.beginPath();
    ctx.arc(x * cellSize + cellSize / 2 + boardOffset, y * cellSize + cellSize / 2 + boardOffset, cellSize / 2 * 0.8, 0, 2 * Math.PI);
    if (currentPlayer === 1) {
        ctx.fillStyle = 'black';
    } else {
        ctx.fillStyle = 'white';
    }
    ctx.fill();
    //draw a border
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
}

// 初始化UI和事件监听器
export function initUI() {
    drawBoard(); // 调用函数绘制棋盘

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left - boardOffset) / cellSize);
        const y = Math.floor((event.clientY - rect.top - boardOffset) / cellSize);

        makeMove(x, y, drawPiece); // 调用核心逻辑中的makeMove函数，并传入drawPiece作为回调
    });
}
