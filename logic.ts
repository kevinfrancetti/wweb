import { sayHi } from './sayhi.js';
import { Hub } from './tree.js';

//Debug proupose
console.log('type for import stuff for debugging: import(\'/scripts/logic.js\').then( m => module = m); ');


//###GAME SETUP
const cellList: NodeListOf<Element> = document.querySelectorAll(".cell");
const buttonList: NodeListOf<Element> = document.querySelectorAll("button");
const gameSize: number = 3;
const gameMemory = [];

for (let i = 0; i < gameSize; i++) {
    gameMemory[i] = [];
    for (let j = 0; j < gameSize; j++) {
        gameMemory[i][j] = undefined;
    }
}

(() => {
    for (let i = 0; i < cellList.length; i++) {
        cellList[i].setAttribute('data-x', `${i%gameSize}`);
        cellList[i].setAttribute('data-y', `${Math.trunc(i/gameSize)}`);
        cellList[i].addEventListener('click', handleCellClick);
        gameMemory[i%gameSize][Math.trunc(i/gameSize)] = cellList [i];
    }
})();
buttonList.forEach(btn => btn.addEventListener('click', handleCellClick));
//###GAME SETUP


const statusDisplay: Element = document.querySelector(".game--status");

function handleCellClick(event: Event) {
    let target: EventTarget = event.target;

    if (target.constructor.name == HTMLDivElement.name) {
        console.log("This is a HTMLDivElement");
        (target as HTMLDivElement).getAttribute('data-cell-index');
        (target as HTMLDivElement).innerText = 'AIDS';
        (target as HTMLDivElement).setAttribute('cazzo', 'legno');
    } else if (target.constructor.name == HTMLButtonElement.name) {
        console.log("This is a HTMLButtonElement");
    }

    console.log(typeof event, typeof target, target.constructor.name, event.type);

    console.log(((target as HTMLDivElement).getAttribute('data-cell-index')));
}

function newContent() {
    //document.open();
    document.write("<h1>Out with the old aids, in with the new!</h1>");
    //document.close();
}

export {Hub, gameMemory};