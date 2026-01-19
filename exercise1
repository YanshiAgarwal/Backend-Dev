const fs = require("fs");

fs.readFile("input.txt", "utf8", (error, data) => {
    if (error) {
        console.log("File cannot be read");
        return;
    }
    
    const wordCount = data.trim().split(/\s+/).length;

    fs.writeFile("output.txt", "Total words: " + wordCount, () => {
        console.log("Word count saved successfully");
    });
});
