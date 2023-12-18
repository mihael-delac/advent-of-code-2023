const { loadInput } = require("../loadInput");

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
