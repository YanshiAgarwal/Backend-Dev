const express = require("express");
const fs = require("fs");

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Home page");
});

//read students from file
const readStudentsFromFile = () => {
    const data = fs.readFileSync("./students.json", "utf-8");
    return JSON.parse(data || "[]");
};

//write students to file
const writeStudentsToFile = (records) => {
    fs.writeFileSync("./students.json", JSON.stringify(records), "utf-8");
};


app.get("/students", async(req, res) => {
    const students = await readStudentsFromFile();
    return res.status(200).json(students);
});


//Update student details
app.put("/students/id",async(req,res)=>{
    try{
        const userid = parseInt(req.params.id);

        if(!req.body.name || Object.keys(req.body).length === 0){
            return res.status(400).json({message:"Empty body is not allowed"});
        }

        const existingStudents = await readStudentsFromFile();

        const foundIndex = existingStudents.findIndex(s => s.id === userid);
        if(foundIndex === -1){
            return res.status(404).json({message:"Student not found"});
        }

        existingStudents[foundIndex] = {
            ...existingStudents[foundIndex],
            ...req.body
        };

        await writeStudentsToFile(existingStudents);

        return res.status(200).json({
            message:"Student details updated successfully",
            student:existingStudents[foundIndex]
        });
    }
    catch(err){
        return res.status(500).json({message:"Error updating student details"});
    }
});


//Delete student details
app.delete("/students/:id", async(req, res) => {
    try {
        const userid = parseInt(req.params.id);

        const existingStudents = await readStudentsFromFile();

        const foundIndex = existingStudents.findIndex(s => s.id === userid);
        if (foundIndex === -1) {
            return res.status(404).send({ message: "Student not found" });
        }
        const deleteStudent = existingStudents.splice(foundIndex, 1);

        await writeStudentsToFile(existingStudents);
        return res.status(200).send({ message: "Student deleted successfully",
            deleteStudent: deleteStudent[0]
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Error deleting student" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});