// const user = {name:"Yanshi",email:"yanshi.ag@gmail.com" , phone: 1234567890};
// // methods of object

// // const userName = user.name;
// // const email = user.email;
// // console.log(userName);
// // console.log(email);

// const {name , email , phone} = user;
// // console.log(name);
// // console.log(email);
// // console.log(phone);
// const user1=user;
// user1.name="Yanshi Agarwal";
// console.log(user);
// // const updateUser = {...user , address:"mathura"}
// // console.log(updateUser);

// // spread operator
// const updatedUser = {
//   ...user,              
//   address: "Mathura",
//   age: 20
// };

// console.log(updatedUser);
// console.log(user); 

// //rest operator
// const { name: userName, ...restDetails } = updatedUser;

// console.log(userName);     
// console.log(restDetails); 

//TASK-1
const rawUsers = [
    { id: 1, name: "Rahul", password: "fb_password", role: "admin" },
    { id: 2, name: "Sanya", password: "123_password", role: "user" },
    { id: 3, name: "Amit", password: "secret_password", role: "user" }
];
const safeUsers = rawUsers.map(({ password, ...rest }) => rest);
console.log(safeUsers);

const admins = rawUsers.filter(({ role }) => role === "admin");
console.log(admins);

//TASK-2
const cart = [
    { item: "Laptop", price: 50000, quantity: 1, inStock: true },
    { item: "Mouse", price: 1500, quantity: 2, inStock: true },
    { item: "Keyboard", price: 3000, quantity: 1, inStock: false }
];

const readyToShip = cart.every(product => product.inStock);
console.log(readyToShip ? "Ready to Ship" : "Wait");

const availableItems = cart.filter(product => product.inStock);
console.log(availableItems);

const totalCost = availableItems.reduce((total, product) => total + (product.price * product.quantity), 0);
console.log(totalCost);