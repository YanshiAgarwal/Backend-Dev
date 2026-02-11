const fs = require("fs").promises;
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 8000;
const FILE_PATH = "./students.json";

//LOGGER MIDDLEWARE
app.use(async (req, res, next) => {
  try {
    const log = `${new Date().toString()} - ${req.method} - ${req.url}\n`;
    await fs.appendFile("log.txt", log);
    next();
  } catch (err) {
    console.log("Logging error:", err);
    next();
  }
});

//SIMPLE MIDDLEWARE
app.use((req, res, next) => {
  console.log("I am middleware 1");
  next();                      //next:- to pass the control to the next middleware or route handler
});

app.use((req, res, next) => {
  console.log("I am middleware 2");
  next();
});

//AUTH TOKEN MIDDLEWARE
app.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(400).send("please provide auth token");
  }
  if (token === "secrettoken") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

//ROUTE MIDDLEWARE
const fileAuthMiddleware = async (req, res, next) => {
  console.log("I am checking file access");
  next();
};

const authMiddleware = (req, res, next) => {
  console.log("I am checking auth");
  next();
};


//HELPERS
const readStudentsFromFile = async () => {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  return JSON.parse(data || "[]");
};

//ROUTE
app.get("/students", fileAuthMiddleware, authMiddleware, async (req, res) => {
  const students = await readStudentsFromFile();
  return res.status(200).json(students);
});

//SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
