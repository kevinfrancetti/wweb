function User(email: string, name: string) {
  this.email = email;
  this.name = name;
  console.log('User constructor fired');
  /*
  this.login = function(){
      console.log(this.email, 'has logd in');
  }
  */
  User.prototype.arrowLogin = () => console.log(this);
  User.prototype.login = function () {
    console.log(this, this.email, 'has logd in');
  }
}

let u1 = Object.create(User.prototype);
u1.constructor('PoP', 'POPO');
let u2 = new User(undefined, undefined);
//User.prototype = "mmm";

//################################################

// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log("Is rect an instance of Rectangle? " + (rect instanceof Rectangle)); // true
console.log("Is rect an instance of Shape? " + (rect instanceof Shape)); // true

rect.move(1, 1); // Outputs, 'Shape moved.'