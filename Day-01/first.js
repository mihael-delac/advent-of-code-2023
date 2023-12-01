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
    const numbers = extractNumbers(line);
    if (numbers.length == 1) {
      const number = `${numbers[0]}${numbers[0]}`;
      sum += parseInt(number);
    } else {
      const number = `${numbers[0]}${numbers.pop()}`;
      sum += parseInt(number);
    }
  });
  console.log("Sum: ", sum);
});

function extractNumbers(str) {
  const numbersArray = str.match(/\d/g);
  if (numbersArray) {
    const numbers = numbersArray.map(Number);
    return numbers;
  } else {
    return [];
  }
}
