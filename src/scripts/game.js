// game.js
export const game = {
    // 初始化棋盘状态，0表示空，1表示玩家一的棋子，-1表示玩家二的棋子
    boardState: Array(15).fill(null).map(() => Array(15).fill(0)),
    currentPlayer: 1, // 当前玩家
};

// 处理落子逻辑
export function makeMove(x, y, callback) {
    if (game.boardState[y][x] === 0) { // 检查选定位置是否为空
        game.boardState[y][x] = game.currentPlayer; // 更新棋盘状态
        callback(x, y,game.currentPlayer); // 绘制棋子
        game.currentPlayer = -game.currentPlayer; // 切换玩家
        if (checkWin(x,y)) {
            alert('win');
        }
    }
}
export function checkWin(x, y) {
    const map = game.boardState;

    // 检查一行是否有5个连续的当前玩家的棋子
    function win(arr) {
        let n = 0; // 连续棋子的数量
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === game.currentPlayer) {
                n++;
                if (n === 5) return true; // 如果连续5个棋子相同，则获胜
            } else {
                n = 0; // 重置连续棋子的数量
            }
        }
        return false;
    }

    // 横方向
    if (win(map[y])) return true;

    // 纵方向
    const colArr = map.map(row => row[x]);
    if (win(colArr)) return true;

    // 撇方向
    const pieArr = [];
    for (let i = Math.max(x - y, 0), j = Math.max(y - x, 0); i < 15 && j < 15; i++, j++) {
        pieArr.push(map[j][i]);
    }
    if (win(pieArr)) return true;

    // 捺方向
    const naArr = [];
    for (let i = x + y, j = 0; i >= 0 && j < 15; i--, j++) {
        if (i < 15) naArr.push(map[j][i]);
    }
    if (win(naArr)) return true;

    return false;
}


// 其他核心游戏逻辑函数
