const { loadInput } = require("../loadInput");

async function main() {
  let sum = 0;
  const lines = await loadInput();

  for (const line of lines) {
    const currentLine = line.split(/[|:]/).splice(1);
    let winningNumbers, numbersList;
    let matchingNumbers = [];

    currentLine.forEach((str) => {
      str = str.split(" ");
      str = str.filter((value) => value !== "");
      str = str.map(Number);
      str.length == 10 ? (winningNumbers = str) : (numbersList = str);
    });

    winningNumbers.some((num) => {
      numbersList.includes(num) && matchingNumbers.push(num);
    });
    const points = matchingNumbers.length && 2 ** (matchingNumbers.length - 1);
    sum += points;
  }

  console.log("Sum: ", sum);
}

main();
