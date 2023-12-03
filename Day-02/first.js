const fs = require("fs");

const filePath = "input.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  let sum = 0;
  let gameId = 1;
  // Process each line
  lines.forEach((line) => {
    const isPossible = checkPossibility(line);
    isPossible && (sum += gameId);
    gameId++;
  });
  console.log("Sum: ", sum);
});

function checkPossibility(str) {
  let isPossible = true;
  const sessionsArray = getSessionsArray(str); //get an array of all sessions per game
  for (const session of sessionsArray) {
    //session check
    let sessionArray = session.split(",");
    sessionArray = sessionArray.map((color) => color.trim()); //remove spaces from the array
    for (const cubeColor of sessionArray) {
      //cubeColor validator for each session
      if (cubeColor.includes("red")) {
        const quantity = parseInt(cubeColor.charAt(0) + cubeColor.charAt(1));
        if (quantity > 12) {
          isPossible = false;
          break;
        }
      } else if (cubeColor.includes("green")) {
        const quantity = parseInt(cubeColor.charAt(0) + cubeColor.charAt(1));
        if (quantity > 13) {
          isPossible = false;
          break;
        }
      } else if (cubeColor.includes("blue")) {
        const quantity = parseInt(cubeColor.charAt(0) + cubeColor.charAt(1));
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
