const fs = require("fs");

const filePath = "input.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  let sum = 0;
  // Process each line
  lines.forEach((line) => {
    const sessionResult = checkMinQuantity(line);
    sessionResult > 0 && (sum += sessionResult);
  });
  console.log("Sum: ", sum);
});

function checkMinQuantity(str) {
  const sessionsArray = getSessionsArray(str); //get an array of all sessions per game
  let minRed = 0;
  let minGreen = 0;
  let minBlue = 0;
  for (const session of sessionsArray) {
    //session check
    let sessionArray = session.split(",");
    sessionArray = sessionArray.map((color) => color.trim()); //remove spaces from the array
    for (const cubeColor of sessionArray) {
      //cubeColor validator for each session
      const currentValue = parseInt(cubeColor.charAt(0) + cubeColor.charAt(1));
      if (cubeColor.includes("red")) {
        if (minRed < currentValue) {
          minRed = currentValue;
        }
      } else if (cubeColor.includes("green")) {
        if (minGreen < currentValue) {
          minGreen = currentValue;
        }
      } else if (cubeColor.includes("blue")) {
        if (minBlue < currentValue) {
          minBlue = currentValue;
        }
      }
    }
  }
  const sessionResult = minRed * minGreen * minBlue;
  return sessionResult;
}

function getSessionsArray(str) {
  let sessionsArray = str.split(":"); //split the 'Game X:'
  sessionsArray = sessionsArray[1].split(";"); //devide by sessions per line
  return sessionsArray;
}
