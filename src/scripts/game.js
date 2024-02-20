import { findBestMove } from './baseAI.js'; 
import { drawPiece, redrawBoard,drawBoard } from './draw.js';

// GameState.js
export const GameState = {
    INIT: 'init',
    BLACK_MOVE: 'blackMove',
    WHITE_MOVE: 'whiteMove',
    CHECK_WIN: 'checkWin',
    END: 'end',
    DRAW: 'draw'
};
 
const player1 = { id: 1, isAI: false };
const player2 = { id: -1, isAI: true };

function updatePlayerIndicators(currentPlayer) {
    const player1Indicator = document.querySelector('.player-indicator.player1');
    const player2Indicator = document.querySelector('.player-indicator.player2');

    // 根据当前玩家更新指示器的激活状态
    if (currentPlayer === 1) {
        player1Indicator.classList.add('active');
        player2Indicator.classList.remove('active');
    } else if (currentPlayer === -1) {
        player2Indicator.classList.add('active'); 
        player1Indicator.classList.remove('active');
    } else {
        // 游戏未开始或已结束
        player1Indicator.classList.remove('active');
        player2Indicator.classList.remove('active');
    }
}

// Game.js
export class Game {
    constructor() {
        this.currentState = GameState.INIT;
        this.boardState = this.initializeBoard();
        this.currentPlayer = player1; // 示例：玩家 1，非 AI
        this.currentState = GameState.BLACK_MOVE;
        updatePlayerIndicators(this.currentPlayer.id);
        this.history = []; 
    }

    initializeBoard() {
        console.log('initializeBoard');
        return Array(15).fill(null).map(() => Array(15).fill(0));
    }
    saveCurrentState() {
        // save the current state of the board and the current player
        this.history.push({
            boardState: JSON.parse(JSON.stringify(this.boardState)),
            currentPlayer: this.currentPlayer
        });
    }
    

    switchPlayer() {
        // this.currentPlayer.id = this.currentPlayer.id === 1 ? -1 : 1; // 切换玩家编号
        // this.currentPlayer.isAI = false; // 切换 AI 状态
        this.currentPlayer = this.currentPlayer.id === 1 ? player2 : player1;
        updatePlayerIndicators(this.currentPlayer.id);
    }

    updateGameState(newState) {
        this.currentState = newState;
        this.handleStateChange();
    }

    handleStateChange() {
        switch (this.currentState) {
            case GameState.BLACK_MOVE:
                break;
            case GameState.WHITE_MOVE:
                // Handle player move
                break;
            case GameState.CHECK_WIN:
                // Check for a win condition
                break;
            case GameState.DRAW: 
                this.handleDraw();
                break;
            case GameState.END:
                this.handleWin();
                break;
        }
    }

    makeMove = (x, y) => {
        if (![GameState.BLACK_MOVE, GameState.WHITE_MOVE].includes(this.currentState)) return;
    
        if (this.boardState[x][y] === 0) {
            this.saveCurrentState();
    
            this.boardState[x][y] = this.currentPlayer.id;
            console.log('Current board state:', this.boardState);
            drawPiece(x, y, this.currentPlayer.id); // 直接调用 drawPiece 来绘制棋子(array[row][column]， 
            if (this.checkWin(y,x)) {
                this.updateGameState(GameState.END);
            } else {
                this.switchPlayer();
                this.updateGameState(this.currentPlayer.id === 1 ? GameState.BLACK_MOVE : GameState.WHITE_MOVE);
                if (this.currentPlayer.isAI) {
                    const aiMove = findBestMove(this.boardState, this.currentPlayer.id);
                    console.log('AI move:', aiMove);
                    if (aiMove) {
                        this.makeMove(aiMove.x, aiMove.y); // AI 落子
                    }
                }
            }
            if (this.checkDraw()) {
                this.updateGameState(GameState.DRAW);
            }
        } else {
            console.log('Invalid move');
            return;
        }
    };

    checkWin = (column, row) => {
        const map = this.boardState;
        // 检查一行是否有5个连续的当前玩家的棋子
        const win = (arr) => {
            let n = 0; // 连续棋子的数量
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === this.currentPlayer.id) {
                    n++;
                    if (n === 5) return true; // 如果连续5个棋子相同，则获胜
                } else {
                    n = 0; // 重置连续棋子的数量
                }
            }
            return false;
        };
    
        // 横方向
        if (win(map[row])) {
            return true;
        }
    
        // 纵方向
        const colArr = map.map(row => row[column]);
        if (win(colArr)) {
            return true;
        }
    
        // 撇方向
        const pieArr = [];
        for (let i = Math.max(column - row, 0), j = Math.max(row - column, 0); i < 15 && j < 15; i++, j++) {
            pieArr.push(map[j][i]);
        }
        if (win(pieArr)) {
            return true;
        }
    
        // 捺方向
        const naArr = [];
        for (let i = column + row, j = 0; i >= 0 && j < 15; i--, j++) {
            if (i < 15) naArr.push(map[j][i]);
        }
        if (win(naArr)) {
            return true;
        }
    
        return false; // 如果不是平局，也没有玩家获胜，则返回false
    };
    

    checkDraw() {
        return this.boardState.every(row => row.every(cell => cell !== 0));
    }

    handleWin() {
        // wait for the UI to update for 20ms
        setTimeout(() => {
            alert(`Player ${this.currentPlayer.id === 1 ? 'Black' : 'White'} wins!`);
        }, 200);
        
    }

    handleDraw() {
        setTimeout(() => {
            alert('Draw!');
        }, 200);
        
    }

    undoMove() {
        if (this.history.length === 0) {
            console.log('No moves to undo');
            return;
        }

        const prevState = this.history.pop(); // pop the last state from the history
        this.boardState = prevState.boardState; // restore the board state
        this.currentPlayer = prevState.currentPlayer; // restore the current player

        // uf the game is not in the init state, switch to the previous state
        this.currentState = this.history.length > 0 ? (this.currentPlayer.id === 1 ? GameState.BLACK_MOVE : GameState.WHITE_MOVE) : GameState.INIT;
        redrawBoard(this.boardState);
    }

    initGame = () =>{
        this.currentState = GameState.INIT;
        this.boardState = this.initializeBoard();
        this.currentPlayer = player1; // 示例：玩家 1，非 AI
        this.currentState = GameState.BLACK_MOVE;
        updatePlayerIndicators(this.currentPlayer.id);
        this.history = []; 
        drawBoard();
        console.log('initGame finished');
    }
}
