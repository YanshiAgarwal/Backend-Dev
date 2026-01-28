const fs = require("fs");
const path = require("path");
const readline = require("readline");
const Stream = require("stream");

const logPath = path.join(__dirname, "app.log");
const readStream = fs.createReadStream(logPath);

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

let errorCount = 0;
let warningCount = 0;
let totalLines = 0;

rl.on("line", (line) => {
  totalLines++;
  if (line.includes("ERROR")) {
    errorCount++;
  }
  if (line.includes("WARN")) {
    warningCount++;
  }
});

rl.on("close", () => {
  console.log("Log File Analysis:");
  console.log("-------------------");
  console.log("Total Lines:", totalLines);
  console.log("Error Count:", errorCount);
  console.log("Warning Count:", warningCount);
});

readStream.on("error", (err) => {
  console.error("Error reading file:", err);
});