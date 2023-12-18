const { loadInput } = require("../loadInput");

async function main() {
  let sum = 0;
  const lines = await loadInput();

  lines.forEach((line) => {
    const numbersArray = extractNumbers(line) || []; // [firstNumber, lastNumber]
    const number = parseInt(numbersArray.join("")); // firstNumber + lastNumber
    sum += number;
  });
  console.log("Sum: ", sum);
}

main();

function extractNumbers(str) {
  const lineString = str.split("");
  let firstNumber = findNumber(lineString);
  let lastNumber = findNumber(reverseString(str), true);
  return [firstNumber, lastNumber];
}

function findNumber(string, reversed = false) {
  let number = null;
  let word = "";
  for (const char of string) {
    if (isNaN(char)) {
      word += char;
      if (word.length > 2) {
        const numberMatch = checkForNumberMatch(
          reversed ? reverseString(word) : word
        );
        if (numberMatch != null) {
          number = numberMatch;
          break;
        }
      }
    } else {
      number = parseInt(char);
      break;
    }
  }
  return number;
}

function checkForNumberMatch(str) {
  if (str.includes("one")) {
    return 1;
  } else if (str.includes("two")) {
    return 2;
  } else if (str.includes("three")) {
    return 3;
  } else if (str.includes("four")) {
    return 4;
  } else if (str.includes("five")) {
    return 5;
  } else if (str.includes("six")) {
    return 6;
  } else if (str.includes("seven")) {
    return 7;
  } else if (str.includes("eight")) {
    return 8;
  } else if (str.includes("nine")) {
    return 9;
  } else {
    return null;
  }
}

function reverseString(str) {
  const stringArray = str.split("");
  if (stringArray.includes("\r")) {
    stringArray.pop();
  }
  const reversedArray = stringArray.reverse();
  const reversedString = reversedArray.join("");
  return reversedString;
}
