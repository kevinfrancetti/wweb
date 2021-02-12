import { sayHi } from './sayhi.js';
import { Hub } from './tree.js';

//Debug proupose
console.log('type for import stuff for debugging: import(\'/scripts/logic.js\').then( m => module = m); ');


//###GAME SETUP
const cellList: NodeListOf<Element> = document.querySelectorAll(".cell");
const buttonList: NodeListOf<Element> = document.querySelectorAll("button");
const gameSize: number = 3;
const gameMemory: object[] = [];
enum GameTurn {
    X = 'X',
    O = 'O'
}
let currentTurn: string = GameTurn.X;

for (let i = 0; i < gameSize; i++) {
    gameMemory[i] = [];
    for (let j = 0; j < gameSize; j++) {
        gameMemory[i][j] = undefined;
    }
}

for (let i = 0; i < cellList.length; i++) {
    cellList[i].setAttribute('data-x', `${i % gameSize}`);
    cellList[i].setAttribute('data-y', `${Math.trunc(i / gameSize)}`);
    cellList[i].addEventListener('click', handleCellClick);
    cellList[i].innerHTML = '';
    gameMemory[i % gameSize][Math.trunc(i / gameSize)] = cellList[i];
}

buttonList.forEach(btn => btn.addEventListener('click', handleCellClick));
//const statusDisplay: Element = document.querySelector(".game--status");


function checkWin(matrix: object[], label: string) {


}


//AKA GAME LOOP
function handleCellClick(event: Event) {


    //###STAGE_1 PROCESS IMPUT
    let target: HTMLDivElement = (event.target as HTMLDivElement);
    let x: number = parseInt(target.getAttribute('data-x'));
    let y: number = parseInt(target.getAttribute('data-y'));
    let cellInnerHtml: string = target.innerHTML;
    
    //###STAGE_2 UPDATE STATE
    if(cellInnerHtml == '') console.log('merda');
    
    //RENDER



    if (target.constructor.name == HTMLDivElement.name) {
        console.log("This is a HTMLDivElement");
        (target as HTMLDivElement).getAttribute('data-cell-index');
        (target as HTMLDivElement).innerText = 'AIDS';
        (target as HTMLDivElement).setAttribute('cazzo', 'legno');
    } else if (target.constructor.name == HTMLButtonElement.name) {
        console.log("This is a HTMLButtonElement");
    }

    //console.log(typeof event, typeof target, target.constructor.name, event.type);
    //console.log(((target as HTMLDivElement).getAttribute('data-cell-index')));
}

function newContent() {
    //document.open();
    document.write("<h1>Out with the old aids, in with the new!</h1>");
    //document.close();
}

export { Hub, gameMemory };