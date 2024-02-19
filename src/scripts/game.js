// GameState.js
export const GameState = {
    INIT: 'init',
    BLACK_MOVE: 'blackMove',
    WHITE_MOVE: 'whiteMove',
    CHECK_WIN: 'checkWin',
    END: 'end',
    DRAW: 'draw'
};

// Game.js
export class Game {
    constructor() {
        this.currentState = GameState.INIT;
        this.boardState = this.initializeBoard();
        this.currentPlayer = 1; // Black goes first
        this.currentState = GameState.BLACK_MOVE;
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
        this.currentPlayer = -this.currentPlayer; // Switch between 1 and -1
    }

    updateGameState(newState) {
        this.currentState = newState;
        this.handleStateChange();
    }

    handleStateChange() {
        switch (this.currentState) {
            case GameState.BLACK_MOVE:
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

    makeMove = (x, y, callback) =>{
        if (![GameState.BLACK_MOVE, GameState.WHITE_MOVE].includes(this.currentState)) return;

        if (this.boardState[y][x] === 0) {
            // save the current state of the board and the current player
            this.saveCurrentState();

            this.boardState[y][x] = this.currentPlayer;
            callback(x, y, this.currentPlayer); 
            if (this.checkWin(x, y)) {
                this.updateGameState(GameState.END);  
            } else {
                
                this.switchPlayer();
                this.updateGameState(this.currentPlayer === 1 ? GameState.BLACK_MOVE : GameState.WHITE_MOVE);
            }
            if (this.checkDraw()) {
                this.updateGameState(GameState.DRAW);
            }
        }else{
            console.log('Invalid move');
            return;
        }
    }

    checkWin = (x, y) => {
        const map = this.boardState;
        // 检查一行是否有5个连续的当前玩家的棋子
        const win = (arr) =>{
            let n = 0; // 连续棋子的数量
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === this.currentPlayer) {
                    n++;
                    if (n === 5) return true; // 如果连续5个棋子相同，则获胜
                } else {
                    n = 0; // 重置连续棋子的数量
                }
            }
            return false;
        }
    
        // 横方向
        if (win(map[y])){
            return true;
        }
    
        // 纵方向
        const colArr = map.map(row => row[x]);
        if (win(colArr)){
            return true;
        }
    
        // 撇方向
        const pieArr = [];
        for (let i = Math.max(x - y, 0), j = Math.max(y - x, 0); i < 15 && j < 15; i++, j++) {
            pieArr.push(map[j][i]);
        }
        if (win(pieArr)){
            return true;
        }
    
        // 捺方向
        const naArr = [];
        for (let i = x + y, j = 0; i >= 0 && j < 15; i--, j++) {
            if (i < 15) naArr.push(map[j][i]);
        }
        if (win(naArr)){
            return true;
        }
    
        return false; // 如果不是平局，也没有玩家获胜，则返回false
    }

    checkDraw() {
        return this.boardState.every(row => row.every(cell => cell !== 0));
    }

    handleWin() {
        // wait for the UI to update for 20ms
        setTimeout(() => {
            alert(`Player ${this.currentPlayer === 1 ? 'Black' : 'White'} wins!`);
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
        this.currentState = this.history.length > 0 ? (this.currentPlayer === 1 ? GameState.BLACK_MOVE : GameState.WHITE_MOVE) : GameState.INIT;
    }

    initGame = () =>{
        this.boardState = this.initializeBoard();
        this.currentPlayer = 1;
        this.currentState = GameState.BLACK_MOVE;
    }
}
