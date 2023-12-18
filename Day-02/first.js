const fs = require("fs");

async function main() {
  let sum = 0;
  let gameId = 1;
  const lines = await loadInput();

  lines.forEach((line) => {
    const isPossible = checkPossibility(line);
    isPossible && (sum += gameId);
    gameId++;
  });
  console.log("Sum: ", sum);
}

main();

function checkPossibility(str) {
  let isPossible = true;
  const sessionsArray = getSessionsArray(str); //get an array of all sessions per game
  for (const session of sessionsArray) {
    //session check
    let sessionArray = session.split(",");
    sessionArray = sessionArray.map((color) => color.trim()); //remove spaces from the array
    for (const cubeColor of sessionArray) {
      //cubeColor validator for each session
      const quantity = parseInt(cubeColor.charAt(0) + cubeColor.charAt(1));
      if (cubeColor.includes("red")) {
        if (quantity > 12) {
          isPossible = false;
          break;
        }
      } else if (cubeColor.includes("green")) {
        if (quantity > 13) {
          isPossible = false;
          break;
        }
      } else if (cubeColor.includes("blue")) {
        if (quantity > 14) {
          isPossible = false;
          break;
        }
      }
    }
  }
  return isPossible;
}

function getSessionsArray(str) {
  let sessionsArray = str.split(":"); //split the 'Game X:'
  sessionsArray = sessionsArray[1].split(";"); //devide by sessions per line
  return sessionsArray;
}

async function loadInput() {
  const filePath = "input.txt";
  return await new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data.split("\n"));
    });
  });
}
