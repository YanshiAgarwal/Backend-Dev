

//     fs.writeFileSync("./login.txt", "Enter your credentials to login");
//     const loginFile = fs.readFileSync("${timeStamp}","login.txt", "utf-8");
//     return loginFile;
// 
const fs = require("fs");
const { get } = require("http");

function logActivity(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${message} - ${timestamp}\n`;

  fs.appendFile("activity.log", logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

function getLogs() {
  return fs.readFileSync("activity.log", "utf-8");
}

module.exports = {logActivity,getLogs};
