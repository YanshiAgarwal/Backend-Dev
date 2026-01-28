const fs = require('fs');
const path = require('path');

const action = process.argv[2];  //what to do (read/write/copy/delete/list)
const filename = process.argv[3];
const data = process.argv[4];

const filePath = path.join(__dirname, filename || '');

switch(action) {
    case 'read':
       fs.readFile(filePath, "utf8", (err, content) => {
        if (err)
            console.error("Read error",err.message);
        console.log("File content:", content);
    });
        break;
    case 'write':
        fs.writeFile(filePath, data || '', (err) => {
            if (err)
                console.error("Write error", err.message);
            console.log("File written successfully");
        });
        break;

    case "copy":
        const dest = path.join(__dirname, process.argv[4]);
        fs.copyFile(filePath, dest, (err) => {
            if (err) return console.error("Copy error:", err.message);
            console.log("File copied successfully");
        });
        break;
    case "delete":
        fs.unlink(filePath, (err) => {
            if (err) return console.error("Delete error:", err.message);
            console.log("File deleted successfully");
        });
        break;

    case "list":
        fs.readdir(__dirname, (err, files) => {
            if (err) return console.error("List error:", err.message);
            console.log("Files in directory:", files);
            files.forEach(file => {
                console.log(file);
            });
        });
        break;
    default:
        console.log("Invalid command");

}

