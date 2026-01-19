
//Task 1: The "Support Ticket Generator" (Data Formatting)

console.log("File running");
const http = require("http");
const url = require("url");


const Server = http.createServer((req, res) => {
    const parsedurl = url.parse(req.url, true);
    const pathname = parsedurl.pathname;
    const query = parsedurl.query;
    if (pathname === "/") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Home Page");
    } 
    else if (pathname === "/complain") {
        const name = query.name;
        const issue = query.issue;
        const priority = query.priority;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Name: ${name}, Issue: ${issue}, Priority: ${priority}`);
    } 
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end("404 Page Not Found");
    }
})
Server.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})