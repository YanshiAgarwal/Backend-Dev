const express = require('express');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

let tasks = []; // In-memory task storage

//Create a task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = { id: tasks.length + 1, title };
    tasks.push(task);
    res.status(201).json(task);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;
    const task = tasks.find(t => t.id === id);

    if (!task) return res.status(404).json({ error: "Task not found" });
    if (!title) return res.status(400).json({ error: "Title is required" });

    task.title = title;
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) return res.status(404).json({ error: "Task not found" });

    tasks.splice(index, 1);
    res.json({ message: "Task deleted successfully" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`TODO API running on http://localhost:${PORT}`);
});