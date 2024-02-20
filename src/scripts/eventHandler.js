// eventHandlers.js
import { Game } from './game.js';

const game = new Game();
const canvas = document.getElementById('chessBoard');
const cellSize = 32; // 可能需要调整，确保与 draw.js 中的设置一致
const boardOffset = 16; // 同上

function registerClickEvent() {
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left - boardOffset) / cellSize);
        const y = Math.floor((event.clientY - rect.top - boardOffset) / cellSize);
        game.makeMove(x, y);
    });
}

export function initUI() {
    game.initGame();
    registerClickEvent();
    // 初始化按钮事件监听器
    // 获取按钮元素
    const regardButton = document.querySelector('.game-controls .deck-button:nth-child(1)');
    const restartButton = document.querySelector('.game-controls .deck-button:nth-child(2)');
    const mainMenuButton = document.querySelector('.game-controls .deck-button:nth-child(3)');

    regardButton.addEventListener('click', () => {
        game.undoMove(); // 悔棋并回退游戏状态
    });
    

    // 为重新开始按钮添加事件监听器
    restartButton.addEventListener('click', () => {
        game.initGame(); // 重置游戏
    });

    // 为返回主菜单按钮添加事件监听器
    mainMenuButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // 更改当前页面的 URL 以返回主菜单
    });
}

initUI();


    