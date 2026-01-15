// const file= require('fs');
// const path= require('path');

// const http= require('http');
// http.createServer(function(req, res){

// })

// console.log("Hello World");

// --------------------------------
//node modules - create custom modules ./
//in built module - http, fs, os path etc

//const fs= require("fs"); //file system : to create file in the database db.json 

//custom module
const math= require("./math")
console.log(math.add(1,4), math.remove(1,5))
// custom module by restructuring
const {add, remove}= require("./math")
console.log(add(1,5), remove(1,5))

const {area}= require("./math")
console.log(area(5))

//in built module

//file system (fs)
const fs = require("fs");
fs.writeFileSync("./test.txt", "This is sync file content"); //for synchronus write

const file =fs.readFileSync("test.txt", "utf-8"); //for read file sync (utf-8 for file decoding)
console.log(file);

// const asyncfile = fs.readFile("test.txt", "utf-8")
// console.log(asyncfile); //prints undefined as it is async operation

//we can resolve this using callback function
const asyncFile = fs.readFile("test.txt", "utf-8", (err, data) => {
    if(err){
        console.log("Error in file reading", err);
    }
    else{
        console.log("File reading successfull.", data);
    }
})

// user is logged in 
// const fs1 = require("fs");
// fs1.writeFileSync("./login.txt", "User is logged in");
// const loginFile = fs.readFileSync("login.txt", "utf-8");
// console.log(loginFile);

const logger = require("./logger");
logger.logActivity("User logged in");

const logs = logger.getLogs();
console.log("Activity Logs:\n", logs);