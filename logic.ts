import {sayHi} from './sayhi.js';
import {Hub} from './tree.js';

//Debug proupose
console.log('type for import stuff for debugging: import(\'/scripts/logic.js\').then( m => module = m); ');

const statusDisplay: Element = document.querySelector(".game--status");
const cellList: NodeListOf<Element> = document.querySelectorAll("button, .cell");

let gameSize: number = 3;
let gameMemory = [];

for(let i = 0; i < gameSize; i++){
    gameMemory[i] = [];
    for(let j = 0; j < gameSize; j++){
        gameMemory[i][j] = undefined;
    }
}

for (let i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener('click', handleCellClick);
}

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

let gameActive = true;
let currentPlayer = "X";

function newContent() {
    //document.open();
    document.write("<h1>Out with the old aids, in with the new!</h1>");
    //document.close();
}

function spamAllert() {
    window.alert("DIO CAN");
}

function Yolo() {
    console.log("From Yeolo", this);
}

export {spamAllert as culo, Hub, gameMemory};