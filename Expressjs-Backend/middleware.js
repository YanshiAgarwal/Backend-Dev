const fs = require("fs").promises;
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 8000;
const FILE_PATH = "./students.json";

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//middleware to log request method and url   


app.use(async (req, res, next) => {
  try {
    const log = `${new Date().toString()} - ${req.method} - ${req.url}\n`;

    await fs.appendFile("log.txt", log);
    
    next();
  } catch (err) {
    console.log("Logging error:", err);
    next(); // server ko rukne mat do
  }
});

app.use((req,res,next)=>{           //next:- to pass the control to the next middleware
    console.log("I am middleware 1");
    next()                          //Call next() to pass control to the next middleware or route handler
});

app.use((req, res, next) => {
    console.log("I am middleware 2");
    next();
    //return res.send("You are not allowed")
});


const fileAuthMiddleware = async (req, res, next) => {
    console.log("I am checking file access");
    return res.send("auth failed");
}

app.use((req, res, next) => {
    const token =  req.headers["authorization"];
    if(!token){
        return res.status(400).send("please provide auth token" );
    }
    if(token === "secrettoken"){
        next();
    }
    else{
        return res.status(401).json({ message: "Unauthorized" });
    }
});

const authMiddleware = (req, res, next) => {
    console.log("I am checking auth");
}

/* ---------- HELPERS ---------- */
const readStudentsFromFile = async () => {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
}; 

const writeStudentsToFile = async (records) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(records, null, 2));
};


// GET all students
app.get("/students", fileAuthMiddleware, authMiddleware,async (req, res) => {
    const students = await readStudentsFromFile();
    return res.status(200).json(students);
});