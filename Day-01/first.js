const fs = require("fs");

async function main() {
  let sum = 0;
  const lines = await loadInput();

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
}

main();

function extractNumbers(str) {
  const numbersArray = str.match(/\d/g);
  return numbersArray.map(Number);
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
