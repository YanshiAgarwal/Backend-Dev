//http module

const http= require("http");
const url = require("url");
const fs = require("fs");
const Server= http.createServer((req, res)=>{   
    // res.writeHead(200, {'Content-Type': "application/json"});
    // res.end("Response is closed");

    const parsedUrl = url.parse(req.url, true)
    const {name,email} = parsedUrl.query;
    console.log(name,email);

    // const timestamp =new Date().toISOString();
    // const log = `User is requested at: ${timestamp} for request: ${req.url}`; 

//    fs.appendFile("server_log.txt", log + "\n", (err,date) => { 
//         if (err) {
//         console.error("Error writing to log file", err);
//         }
//         else{
//             console.log("Log written successfully");
//         }
//     });

    switch(req.url){
        case "/":
            res.end("Welcome to Home Page");
            break;
        case "/about":
            res.writeHead(200, {'Content-Type': "text/html"});
            res.end(`<h1>Hello, I am ${name} email: ${email}</h1>`);
            break;
        default:
            res.writeHead(404, {'Content-Type': "application/json"});
            res.end({"Page Not Found": 404});
            break;
    }
});

Server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
