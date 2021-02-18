import { sayHi } from './sayhi.js';
import { Hub } from './tree.js';

//Debug proupose
console.log('type for import stuff for debugging: import(\'/scripts/logic.js\').then( m => module = m); ');

/*
setInterval(function () { console.log('merda') }, 100);
document.querySelector('.game--restart').addEventListener('click', longtime);
function longtime(){
    let o = undefined;
    for(let i = 0; i < 100000000; i++){
        o = new String(i);
    }
    console.log('longtime ended');
    console.log(o);
}
*/

//###GAME SETUP
const buttons: NodeListOf<Element> = document.querySelectorAll("button");
enum PlayerSymbol {
    X = 'X',
    O = 'O'
}
interface GameEnviroment {
    size: number;
    symbol: PlayerSymbol;
    winner: PlayerSymbol;
    memory: object[]; //Is a square matrix
    active: boolean;
};
//#GAME STATE
const gameState: GameEnviroment = {
    size: 4,
    symbol: PlayerSymbol.X,
    winner: undefined,
    memory: [],
    active: true
};
//Creating a NxN matrix
for (let i = 0; i < gameState.size; i++) {
    gameState.memory[i] = [];
    for (let j = 0; j < gameState.size; j++) {
        gameState.memory[i][j] = undefined;
    }
}

let rotation = 0;
let interval = setInterval(() => {
    document.querySelectorAll('.icon').forEach( (el) => {
        (el as HTMLElement).style.transform = `rotate(${rotation}deg)`;
        rotation = (rotation + 5) % 360;
    }  )
}, 1000);
clearInterval(interval);

//Binding Html and game logic
const cells: NodeListOf<Element> = document.querySelectorAll(".cell");
for (let i = 0; i < cells.length; i++) {
    let memPosition = mapListToSquareMatrix(i, gameState.size);
    cells[i].setAttribute('data-x', `${memPosition.x}`);
    cells[i].setAttribute('data-y', `${memPosition.y}`);
    cells[i].addEventListener('click', handleCellClick);
}
//buttons.forEach(btn => btn.addEventListener('click', handleCellClick));


//###UTIL FUNCTIONS
//Translates the index of a list into the coordinates of a matrix, matrix should be square.
function mapListToSquareMatrix(listIndex: number, matrixSize: number) {
    let result = {
        x: listIndex % matrixSize,
        y: Math.trunc(listIndex / matrixSize)
    }
    return result;
}
function mapSquareMatrixToList(mx: number, my: number, matrixSize: number): number {
    return matrixSize * my + mx;
}

function checkWin(matrix: object[]): boolean {
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


//AKA GAME LOOP
function handleCellClick(event: Event) {
    if (gameState.active == false) return;

    //###STAGE_1 PROCESS IMPUT
    let target: HTMLDivElement = (event.target as HTMLDivElement);
    let x: number = parseInt(target.getAttribute('data-x'));
    let y: number = parseInt(target.getAttribute('data-y'));

    //###STAGE_2 UPDATE STATE
    if (gameState.symbol == PlayerSymbol.X) {
        gameState.symbol = PlayerSymbol.O;
    } else gameState.symbol = PlayerSymbol.X;
    gameState.memory[x][y] = gameState.symbol;
    if (checkWin(gameState.memory)) {
        gameState.winner = gameState.symbol;
        gameState.active = false;
    }

    //RENDER
    (target as HTMLDivElement).innerText = gameState.symbol;

}

export { Hub, gameState, mapListToSquareMatrix, mapSquareMatrixToList };