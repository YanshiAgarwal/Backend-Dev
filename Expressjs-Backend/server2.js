const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 3500


app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/students",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'form.html'))
})

app.post('/students', (req, res) => {
  const { name, branch } = req.body;

  if (!name || !branch) {
    return res.status(400).send("All fields are required");
  }

  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let users = [];

    // If file exists and has data
    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        return res.status(500).send("Invalid JSON format in file");
      }
    }

    users.push({ name, branch });

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving user data");
      }

      res.send("User registered successfully");
    });
  });
});

app.post('/contact',(req,res)=>{
    console.log("Contact data: ",req.body);
    res.send("contact")
    
})

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    
})