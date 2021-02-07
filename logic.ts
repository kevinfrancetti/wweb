import {sayHi} from './sayhi.js';
import {Hub, factory} from './tree.js';
sayHi();

factory();
//let x1: number = 3;
//let x2: number = 4;
//Hub(x1,x2);


const statusDisplay: Element = document.querySelector(".game--status");
const cellList: NodeListOf<Element> = document.querySelectorAll("button, .cell");

for (let i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener('click', handleCellClick);
}

function tryme(val: () => void){
    val();
    mimi();
}

let mimi = () => {
    console.log('ciao bro madonna merda');
}

tryme(() => console.log('arrow ') );
tryme(mimi);
tryme(mimi);

function handleCellClick(event: Event) {
    let target: EventTarget = event.target;

    if (target.constructor.name == HTMLDivElement.name) {
        console.log("This is a HTMLDivElement");
        (target as HTMLDivElement).innerText = 'AIDS';
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

export {mimi as culo};