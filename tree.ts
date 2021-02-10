interface Hub {
    x: number,
    y: string,
    neighbours: Hub[],
    addNeighbour(neighbour: Hub): void,
    printInfo(): void
}

function Hub(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.neighbours = [];
}

Hub.prototype.printInfo = function () {
    let t: Hub = this;
    console.log(t.x, t.y);
    console.log(t.neighbours);
}

Hub.prototype.addNeighbour = function (n1: Hub, n2: Hub) {
    n1.neighbours.push(n2);
}



Hub.prototype.testArrow = function(){
    console.log('dio cane', this, 'ads');
}
/*
function factory() {
    let tmp = Object.create(Hub.prototype);
    tmp.constructor(0, 0);
    return tmp;
}
*/

let n1 = new Hub(3, 4);




export { Hub };