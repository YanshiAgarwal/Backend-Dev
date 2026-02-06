const fs = require("fs").promises;
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 8000;
const FILE_PATH = "./students.json";

/* ---------- HELPERS ---------- */

const readStudentsFromFile = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    // If file does not exist, return empty array
    if (err.code === "ENOENT") {
      await fs.writeFile(FILE_PATH, "[]");
      return [];
    }
    throw err;
  }
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(records, null, 2));
};

/* ---------- ROUTES ---------- */

// GET all students
app.get("/students", async (req, res) => {
  try {
    const students = await readStudentsFromFile();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST create student
app.post("/students", async (req, res) => {
  try {
    const { name, age, branch } = req.body;

    if (!name || !age || !branch) {
      return res.status(400).json({
        message: "name, age and branch are required",
      });
    }

    const students = await readStudentsFromFile();

    const newId =
      students.length > 0 ? students[students.length - 1].id + 1 : 1;

    const newStudent = {
      id: newId,
      name,
      age,
      branch,
    };

    students.push(newStudent);
    await writeStudentsToFile(students);

    return res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// PUT update student
app.put("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body not allowed" });
    }

    const students = await readStudentsFromFile();

    const index = students.findIndex((s) => s.id === userId);
    if (index === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    students[index] = {
      ...students[index],
      ...req.body,
    };

    await writeStudentsToFile(students);

    return res.status(200).json({
      message: "Updated successfully",
      student: students[index],
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const students = await readStudentsFromFile();

    const index = students.findIndex((s) => s.id === userId);
    if (index === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1);

    await writeStudentsToFile(students);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: deletedStudent[0],
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

/* ---------- SERVER ---------- */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});