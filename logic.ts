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

interface GameEnviroment {
    size: number;
    turn: PlayerSymbol;
    winner: PlayerSymbol;
    memory: PlayerSymbol[][]; //This will be a square matrix
    active: boolean;
    statusMsg: string;
    hasWin: () => boolean;
};
//#GAME STATE
function Game() {
    this.size = 3;
    this.turn = PlayerSymbol.X;
    this.winner = undefined;
    this.memory = [];
    this.active = true;
    this.statusMsg = undefined;
}
Game.prototype.hasWin = function () { return checkWin((this as GameEnviroment).memory); }

let gameState: GameEnviroment = new Game();



function Utils() { };
//Utils.prototype.win = checkWin;


//let gameState = GameE(); 

//Creating a NxN matrix for the game state memory
for (let i = 0; i < gameState.size; i++) {
    gameState.memory[i] = [];
    for (let j = 0; j < gameState.size; j++) {
        gameState.memory[i][j] = undefined;
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
(divContainer as HTMLDivElement).style.gridTemplateColumns = `repeat(${gameState.size}, 1fr)`;
for (let i = 0; i < gameState.size * gameState.size; i++) {
    let memPosition = mapListToSquareMatrix(i, gameState.size);
    let div = document.createElement('div');
    div.innerHTML = '&nbsp';//TODO try do same thing whit CSS pseudo elements
    div.setAttribute('data-x', `${memPosition.x}`);
    div.setAttribute('data-y', `${memPosition.y}`);
    div.innerHTML = '&nbsp;';
    div.addEventListener('click', handleCellClick, { once: true });
    divContainer.appendChild(div);
}

document.querySelector('.game--restart').addEventListener('click', () => { console.log('yolo') });

//###UTIL FUNCTIONS
//Translates the index of a list into the coordinates of a matrix, matrix should be square.
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


enum CmdType {
    CELL,
    RESET,
    OHTER
}
enum Rendertype {
    CELL,
    OTHER
}

interface Command {
    cmdType: CmdType;
    name: string;
    x?: number;
    y?: number;
}

function Render(render) {
    this.render = render;
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
function update(cmd: Command, _gameState: GameEnviroment) {

    let msg: string = `cell ${cmd.x}, ${cmd.y}`;
    console.log(msg);
    let renderFunc = undefined;

    if (cmd.cmdType == CmdType.CELL) {
        let playedTurn: PlayerSymbol = _gameState.turn;
        _gameState.turn = _gameState.turn == PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
        _gameState.memory[cmd.x][cmd.y] = playedTurn;
        _gameState.statusMsg = `Player ${playedTurn} turn`;
        if (_gameState.hasWin()) {
            _gameState.winner = playedTurn;
            _gameState.active = false;
            _gameState.statusMsg = `Player ${_gameState.winner} WINS`;
        }
        let renderInfo = { type: Rendertype.CELL, x: cmd.x, y: cmd.y, text: playedTurn }

        renderFunc = () => {
            (document.querySelector(
                `div.game--grid > div:nth-child(${1 + mapSquareMatrixToList(cmd.x, cmd.y, _gameState.size)})`
            ) as HTMLElement).innerText = playedTurn;
        }

    }


    console.log(mapSquareMatrixToList(cmd.x, cmd.y, _gameState.size));
    let render = new Render(renderFunc);
    return render;
}


//AKA GAME LOOP
function handleCellClick(event: Event) {

    if (gameState.active == true) {
        //###STAGE_1 PROCESS IMPUT

        //let cmd1: Command = { execute: inputHandler(event) };
        let cmd = inputHandeler(event);

        let render = update(cmd, gameState);
        render.render();
        //updateState(cmd1, gameState);

        //###STAGE_2 UPDATE STATE
        //RENDER
        //(target as HTMLDivElement).innerText = gameState.turn;
        //(document.querySelector('.game--status') as HTMLHeadElement).innerText = gameState.statusMsg;
        //statusBar.innerText = 'AA';
    } else {
        //(document.querySelector('.game--status') as HTMLHeadElement).innerText = `${gameState.statusMsg} fag`;
        //  statusBar.innerText = 'bb';

    }


}

export { Hub, gameState, mapListToSquareMatrix, mapSquareMatrixToList, inputHandeler as realInputHandeler };