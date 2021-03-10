import { sayHi } from './sayhi.js';
import { Hub } from './tree.js';

//Debug proupose
console.log('type for import stuff for debugging: import(\'/scripts/logic.js\').then( m => module = m); ');

//###GAME SETUP
const buttons: NodeListOf<Element> = document.querySelectorAll("button");

enum PlayerSymbol {
    X = 'X',
    O = 'O'
}
enum CmdType {
    CELL,
    RESET,
    OHTER
}
enum Rendertype {
    CELL,
    OTHER
}
interface GameEnviroment {
    size: number;
    turn: PlayerSymbol;
    winner: PlayerSymbol;
    memory: PlayerSymbol[][]; //This will be a square matrix
    active: boolean;
    statusMsg: string;
    hasWin?: () => boolean;
};
//This should contains only pure functions
interface GameUtils {
    createEmptyMemory: (size: number) => PlayerSymbol[][];
    checkWin: (matrix: PlayerSymbol[][]) => boolean;
}
interface Game {
    state: GameEnviroment;
    utils: GameUtils
}
interface Command {
    cmdType: CmdType;
    name: string;
    x?: number;
    y?: number;
}
interface Rend {
    type: Rendertype;
    x?: number;
    y?: number;
    size?: number;
    turn: PlayerSymbol;
}

let game: Game = {
    state: {
        size: 3,
        turn: PlayerSymbol.X,
        winner: undefined,
        memory: createEmptyMemory(3),
        active: true,
        statusMsg: undefined
    },
    utils: {
        createEmptyMemory: createEmptyMemory,
        checkWin: checkWin
    }
}

let rotation = 0;
let interval = setInterval(() => {
    document.querySelectorAll('.icon').forEach((el) => {
        (el as HTMLElement).style.transform = `rotate(${rotation}deg)`;
        rotation = (rotation + 5) % 360;
    })
}, 2000);
clearInterval(interval);

//Insert grid elements iside the grid in the html and bind them with functionality
const divContainer = document.querySelector('.game--grid');
(divContainer as HTMLDivElement).style.gridTemplateColumns = `repeat(${game.state.size}, 1fr)`;
for (let i = 0; i < game.state.size * game.state.size; i++) {
    let memPosition = mapListToSquareMatrix(i, game.state.size);
    let div = document.createElement('div');
    div.innerHTML = '&nbsp';//TODO try do same thing whit CSS pseudo elements
    div.setAttribute('data-x', `${memPosition.x}`);
    div.setAttribute('data-y', `${memPosition.y}`);
    div.innerHTML = '&nbsp;';
    div.addEventListener('click', handleCellClick, { once: true });
    divContainer.appendChild(div);
}
document.querySelector('.game--restart').addEventListener('click', handleReset);

//###UTIL PURE FUNCTIONS
//Translates the index of a list into the coordinates of a matrix, matrix should be square.
function createEmptyMemory(size: number): PlayerSymbol[][] {
    let memory = [];
    for (let i = 0; i < size; i++) {
        memory[i] = [];
        for (let j = 0; j < size; j++) {
            memory[i][j] = undefined;
        }
    }
    return memory;
}
function mapListToSquareMatrix(listIndex: number, matrixSize: number) {
    let result = {
        x: listIndex % matrixSize,
        y: Math.trunc(listIndex / matrixSize)
    }
    return result;
}
function mapSquareMatrixToList(x: number, y: number, matrixSize: number): number {
    return matrixSize * y + x;
}
function checkWin(matrix: PlayerSymbol[][]): boolean {
    //Check columns
    for (let i = 0; i < matrix.length; i++) {
        let tmp = matrix[i][0];
        if (tmp == undefined) continue;//if first square is void no point furter check
        for (let j = 1; j < matrix.length; j++) {
            if (matrix[i][j] != tmp) break;
            if (j == matrix.length - 1) return true;
        }
    }
    //Check rows
    for (let i = 0; i < matrix.length; i++) {
        let tmp = matrix[0][i];
        if (tmp == undefined) continue;//if first square is void no point furter check
        for (let j = 1; j < matrix.length; j++) {
            if (matrix[j][i] != tmp) break;
            if (j == matrix.length - 1) return true;
        }
    }
    //Check diagonals
    let tmp = matrix[0][0];
    for (let i = 1; i < matrix.length; i++) {
        if (tmp == undefined) break;
        if (matrix[i][i] != tmp) break;
        if (i == matrix.length - 1) return true;
    }
    tmp = matrix[0][matrix.length - 1];
    for (let i = 1; i < matrix.length; i++) {
        if (tmp == undefined) break;
        if (matrix[i][matrix.length - 1 - i] != tmp) break;
        if (i == matrix.length - 1) return true;
    }
    return false;
}


//Transform input in command
function inputHandeler(event: Event): Command {
    let target: HTMLDivElement = (event.target as HTMLDivElement);
    let cmd: Command = { name: 'cell-click', cmdType: CmdType.CELL };
    cmd.x = parseInt(target.getAttribute('data-x'));
    cmd.y = parseInt(target.getAttribute('data-y'));
    return cmd;
}

//Update the state of the game, and returns what should be rendered
function update(cmd: Command, _gameState: GameEnviroment): Rend {
    let returnValue = undefined;
    if (cmd.cmdType == CmdType.CELL) {
        let playedTurn: PlayerSymbol = _gameState.turn;
        _gameState.turn = _gameState.turn == PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
        _gameState.memory[cmd.x][cmd.y] = playedTurn;
        _gameState.statusMsg = `Player ${playedTurn} turn`;
        if (checkWin(_gameState.memory)) {
            _gameState.winner = playedTurn;
            _gameState.active = false;
            _gameState.statusMsg = `Player ${_gameState.winner} WINS`;
        }
        let renderInfo: Rend = { type: Rendertype.CELL, x: cmd.x, y: cmd.y, turn: playedTurn, size: _gameState.size }
        returnValue = renderInfo;
    }
    return returnValue;
}

function renderCell(rendInfo: Rend) {
    let divNthPosition: number = mapSquareMatrixToList(rendInfo.x, rendInfo.y, rendInfo.size);
    let query: string = `div.game--grid > div:nth-child(${1 + divNthPosition})`;
    (document.querySelector(query) as HTMLDivElement).innerText = rendInfo.turn;
}

//AKA GAME LOOP
function handleCellClick(event: Event) {
    if (game.state.active == true) {
        let cmd = inputHandeler(event);
        let render = update(cmd, game.state);
        renderCell(render);
    }
}

//TMP FUNCTION
function handleReset(event: Event) {
    console.log({event: event, target: event.target});
    game.state.memory = game.utils.createEmptyMemory(game.state.size);
    game.state.active = true;
}
export { Hub, game, mapListToSquareMatrix, mapSquareMatrixToList, inputHandeler };