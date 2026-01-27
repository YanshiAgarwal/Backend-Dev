const fs = require("fs");
const path = require("path");
// const inputPath= path.resolve(__dirname, "input.txt");
// const outputPath = path.resolve(__dirname, "output.txt");
// const readStream = fs.createReadStream(inputPath);
// const writeStream = fs.createWriteStream(outputPath);

// readStream.pipe(writeStream);

const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");
const readStream=fs.createReadStream(inputFilePath , {encoding:"utf-8"});
const writeStream=fs.createWriteStream(outputFilePath);

readStream.pipe(writeStream);

writeStream.on("finish", ()=>{
    console.log("Write stream is end");
});