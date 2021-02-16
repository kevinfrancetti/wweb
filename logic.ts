import { sayHi } from './sayhi.js';
import { Hub } from './tree.js';

//Debug proupose
console.log('type for import stuff for debugging: import(\'/scripts/logic.js\').then( m => module = m); ');


//###GAME SETUP
const cells: NodeListOf<Element> = document.querySelectorAll(".cell");
const buttons: NodeListOf<Element> = document.querySelectorAll("button");
const gameSize: number = 3;
enum GameTurn {
    X = 'X',
    O = 'O'
}
let turn = GameTurn.X;
//#GAME STATE
const gameMemory: object[] = [];//Memory of the game AKA game state [column][rows]
let currentTurn: string = GameTurn.X;

for (let i = 0; i < gameSize; i++) {
    gameMemory[i] = [];
    for (let j = 0; j < gameSize; j++) {
        gameMemory[i][j] = undefined; //Thois could be skipped
    }
}

//  TODO: SEPARATE HTML FROM ACTUAL CODE
for (let i = 0; i < cells.length; i++) {
    let memPosition = mapListToSquareMatrix(i, gameSize);
    cells[i].setAttribute('data-x', `${memPosition.x}`);
    cells[i].setAttribute('data-y', `${memPosition.y}`);
    cells[i].addEventListener('click', handleCellClick);
    //cellList[i].innerHTML = '';
    gameMemory[memPosition.x][memPosition.y] = cells[i];
}
buttons.forEach(btn => btn.addEventListener('click', handleCellClick));


//###UTIL FUNCTIONS
//Translates the index of a list into the coordinates of a matrix, matrix should be square.
function mapListToSquareMatrix(listIndex: number, matrixSize: number) {
    let result = {
        x: listIndex % matrixSize,
        y: Math.trunc(listIndex / matrixSize)
    }
    return result;
}

function checkWin(matrix: object[], label: string) {
    //Check columns
    for (let i = 0; i < matrix.length; i++) {
        let tmp = matrix[i][0].innerText;
        if (tmp == '') continue;//if first square is void no point furter check
        for (let j = 1; j < matrix.length; j++) {
            if (matrix[i][j].innerText != tmp) break;
            if (j == matrix.length - 1) console.log(`${tmp} wins`);
        }
    }
    //Check rows
    for (let i = 0; i < matrix.length; i++) {
        let tmp = matrix[0][i].innerText;
        if (tmp == '') continue;//if first square is void no point furter check
        for (let j = 1; j < matrix.length; j++) {
            if (matrix[j][i].innerText != tmp) break;
            if (j == matrix.length - 1) console.log(`${tmp} wins`);
        }
    }
    //Check diagonals
    let tmp = matrix[0][0].innerText;
    for(let i = 1; i < matrix.length; i++){
        if(tmp == '') break;
        if(matrix[i][i].innerText != tmp) break;
        if (i == matrix.length - 1) console.log(`${tmp} wins`);
    }
    tmp = matrix[0][matrix.length - 1].innerText;
    for(let i = 1; i < matrix.length; i++){
        if(tmp == '') break;
        if(matrix[i][matrix.length -1 - i].innerText != tmp) break;
        if (i == matrix.length - 1) console.log(`${tmp} wins`);
    }
}


//AKA GAME LOOP
function handleCellClick(event: Event) {
    //###STAGE_1 PROCESS IMPUT
    let target: HTMLDivElement = (event.target as HTMLDivElement);
    let x: number = parseInt(target.getAttribute('data-x'));
    let y: number = parseInt(target.getAttribute('data-y'));
    let cellText: string = target.innerText;


    if (turn == GameTurn.X) {
        turn = GameTurn.O;
    } else turn = GameTurn.X;

    //###STAGE_2 UPDATE STATE
    checkWin(gameMemory, turn);
    //RENDER
    if (target.constructor.name == HTMLDivElement.name) {
        console.log("This is a HTMLDivElement");
        (target as HTMLDivElement).innerText = turn;
    } else if (target.constructor.name == HTMLButtonElement.name) {
        console.log("This is a HTMLButtonElement");
    }

    //console.log(typeof event, typeof target, target.constructor.name, event.type);
    //console.log(((target as HTMLDivElement).getAttribute('data-cell-index')));
}

export { Hub, gameMemory };