
//Task 2: The "Secure Admin Entrance" (Auth Simulation)

const http = require('http');
const url= require('url');
const fs = require('fs');

const Server = http.createServer((req, res) =>{
    const parsedurl = url.parse(req.url, true);
    const pathname = parsedurl.pathname;
    const query = parsedurl.query;
    if(pathname === '/'){
        res.writeHead(200,{'Content-Type': 'text/plain'});
        res.end("Welcome page");
    }
    else if (pathname === '/admin'){
        const user = query.user;
        const pass = query.pass;
        if(user == "admin" && pass == "1234"){
            
            fs.readFile("text.txt", "utf-8", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        }
        
    }
    else{
        res.writeHead(401, {'Content-Type': 'text/plain'})
        res.end("401 Access Denied");
    }
})
Server.listen(3000, () => {
    console.log("Server is running on port 3000");
})
