const statusDisplay: Element = document.querySelector(".game--status");
const cellList: NodeListOf<Element> = document.querySelectorAll(".cell");
let mmm = 4;

for (let i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener('click', spamAllert);
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

var perimeter = function (a, b) {
    console.log(2 * a + 2 * b);
}


var Rectangle = {
    height: 3,
    width: 4,
    area: function () {
        console.log("Area: " + this.height * this.width);
        console.log(this);
    }
}

function test(){
    console.log(this);
}
let cat = {
    someMethod: function(){
        console.log(this);
        test();
    }
}
