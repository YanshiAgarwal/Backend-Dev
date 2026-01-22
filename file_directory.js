
const fs = require("fs");
fs.mkdir("newDirectory", (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("new directory created");
})

fs.mkdir("folder/folder1/folder2", { recursive: true }, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("Directories is created");
})

fs.rmdir("newDirectory", (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("Directory is removed");
})

fs.rm("newDirectory", (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("directory is removed");
})