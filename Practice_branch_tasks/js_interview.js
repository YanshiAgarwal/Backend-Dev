//q-1
const obj = { a: "one", b: "two", a: "three" };
console.log(obj);
// object key must be unique so in above a overrides previous one

//q-2
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b])
//object keys are converted to strings
//both b and c becomes ["object object"] so second overwrites the one

//q-3
const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };
console.log(admin);
//spread operator (...user) copies all properties
//admin object gets all user properties

//q-4
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());
//diameter is a normal function so it gives 20
//perimeter is an arrow function. in arrow function there is no this keyword so it gives undefined(NaN)

//q-5
function test() {
    console.log(a);
    console.log(b);
   
    var a = 10;
    let b = 20;
}
test();
//var a is hoisted so value is undefined
//let b is in temporal dead zone
//accessing b before declaration gives ReferenceError

//q-6
var x = 10;
if (true) {
  var x = 20;
  console.log(x);
}
console.log(x);

let y = 10;
if (true) {
  let y = 20;
  console.log(y);
}
console.log(y);
//var x is function scoped so both console logs give 20
//let y is block scoped so first console log gives 20 and second gives 10