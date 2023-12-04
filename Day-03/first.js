//provjeravam 3 linije
//

const fs = require("fs");

const filePath = "input.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const numberOfLines = lines.length;

  let sum = 0;
  let previousLine = [];
  let currentLine = [];
  let nextLine = [];
  // Process each line
  for (const line of lines) {
    const currentIndex = lines.indexOf(line);
    currentLine = lines[currentIndex].split("");
    previousLine = currentIndex ? lines[currentIndex - 1].split("") : null;
    nextLine =
      numberOfLines != currentIndex + 1
        ? lines[currentIndex + 1].split("")
        : null;
    isNumberAdjacentToSymbol(previousLine, currentLine, nextLine);
  }
  //   console.log("Sum: ", sum);
});

function isNumberAdjacentToSymbol(previousLine, currentLine, nextLine) {
  if (!previousLine) {
    //prva
    //check current vs next

    console.log("Current line: ", currentLine);
    console.log("Next line: ", nextLine);
  } else if (!nextLine) {
    //zadnja
    //check current vs prev
    console.log("Previous line: ", previousLine);
    console.log("Current line: ", currentLine);
  } else {
    //check current vs prev vs next
    console.log("Previous line: ", previousLine);
    console.log("Current line: ", currentLine);
    console.log("Next line: ", nextLine);
  }
}
