//Student Management REST API

const express = require('express');
const app = express();
const port = 8000;

app.use(express.json()); //  use ONCE

const students = [
    { id: 1, name: "Yanshi", age: 20, branch:"CSE" },
    { id: 2, name: "Aparna", age: 21,branch:"CSE" },
    { id: 3, name: "Rohit", age: 22 ,branch:"CSE"},
     { id: 5, name: "Yanshi", age: 20, branch:"IT" },

];

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Home page');
});

// Get all students OR search by name

app.get("/students/search", (req, res) => {
    const { name } = req.query;

    if (name) {
        const result = students.filter(s => s.name === name);
        console.log(result)
        return res.json(result);
    }

    return res.json(students);
});
// Get student by ID
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// Register student
app.post("/student/register", (req, res) => {
    const data = req.body;

    if (!data || !data.name || !data.age) {
        return res.status(400).send("Please provide valid student data");
    }

    students.push(data);
    res.status(201).json({
        message: "Student registered successfully",
        data
    });
});

app.put("/students/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const{name, age} = req.body

    const student = students.find(s => s.id === id);

    if(!student){
        return res.status(404).json({message:"Students not found"});
    }

    if(name) student.name = name;
    if(age) student.age = age;

    res.json({
        message:"Student updated successfully",
        student
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});