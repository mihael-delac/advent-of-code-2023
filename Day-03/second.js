const { loadInput } = require("../loadInput");

async function main() {
  let perLineData = []; //array of all processed lines
  let sum = 0;
  const lines = await loadInput();

  for (const line of lines) {
    const currentLine = getLineNumbersAndSymbolIndexes(line.split(""));
    perLineData.push(currentLine);
  }

  const allValidNumbers = getAllValidNumbers(perLineData);
  sum = allValidNumbers.reduce((a, b) => a + b);
  console.log("Sum: ", sum);
}

main();

function getLineNumbersAndSymbolIndexes(line) {
  let currentIndex = 0;

  let lineData = {
    numbers: [],
    stars: [],
    allNumberIndexes: [],
  };
  let tempNumber = {
    number: "",
    indexes: [],
  };
  for (const char of line) {
    if (char.match(/\*/g)) {
      if (tempNumber.number != "") {
        lineData.numbers.push(tempNumber);
        lineData.allNumberIndexes = lineData.allNumberIndexes.concat(
          ...tempNumber.indexes
        );
      }
      tempNumber = {
        number: "",
        indexes: [],
      };
      lineData.stars.push(currentIndex);
    } else if (!isNaN(char)) {
      tempNumber.number += char;
      parseInt(tempNumber.number);
      tempNumber.indexes.push(currentIndex);
      if (line.length == currentIndex + 1) {
        lineData.numbers.push(tempNumber);
        lineData.allNumberIndexes = lineData.allNumberIndexes.concat(
          ...tempNumber.indexes
        );
      }
    } else {
      if (tempNumber.number != "") {
        lineData.numbers.push(tempNumber);
        lineData.allNumberIndexes = lineData.allNumberIndexes.concat(
          ...tempNumber.indexes
        );
      }
      tempNumber = {
        number: "",
        indexes: [],
      };
    }
    currentIndex += 1;
  }
  return lineData;
}
//za svaku * provjeriti ako ima numberindex u prev, curr i next redu (edge case: mogu bit npr 213.324 i ispod/iznad/umjesto tocke *)
//provjerit je li taj simbol ima tocno dva validna broja uz sebe
function getAllValidNumbers(data) {
  let allValidNumbers = [];
  let previousLine;
  let currentLine;
  let nextLine;
  data.forEach((line) => {
    const currentIndex = data.indexOf(line);
    previousLine = currentLine ? currentLine : null;
    currentLine = line;
    nextLine = data.length == currentIndex + 1 ? null : data[currentIndex + 1];
    const [
      previousLineNumberIndexes,
      currentLineNumberIndexes,
      currentLineStarIndexes,
      nextLineNumberIndexes,
    ] = getLineData(previousLine, currentLine, nextLine);

    currentLineStarIndexes.forEach((star) => {
      ///3 indexa u svakom staru(-1, index, +1)
      const starValidNumbers = {
        prev: null,
        curr: null,
        next: null,
      };
      star.forEach((index) => {
        previousLine &&
          previousLineNumberIndexes.some((number) => {
            if (number.includes(index)) {
              starValidNumbers.prev = getMatchingNumberValues(
                previousLine,
                star
              );
            }
          });
        currentLineNumberIndexes.some((number) => {
          if (number.includes(index)) {
            starValidNumbers.curr = getMatchingNumberValues(currentLine, star);
          }
        });
        nextLine &&
          nextLineNumberIndexes.some((number) => {
            if (number.includes(index)) {
              starValidNumbers.next = getMatchingNumberValues(nextLine, star);
            }
          });
      });

      const product = getValidNumbersProduct(starValidNumbers);
      product && allValidNumbers.push(product);
    });
  });
  return allValidNumbers;
}

function getLineData(prev, curr, next) {
  const previousLineNumberIndexes =
    prev && prev.numbers.map((value) => value.indexes);

  const currentLineNumberIndexes = curr.numbers.map((value) => value.indexes); //i
  const currentLineSymbolIndexes = curr.stars.map((index) => [
    index - 1,
    index,
    index + 1,
  ]);

  const nextLineNumberIndexes =
    next && next.numbers.map((value) => value.indexes);

  return [
    previousLineNumberIndexes,
    currentLineNumberIndexes,
    currentLineSymbolIndexes,
    nextLineNumberIndexes,
  ];
}

function getMatchingNumberValues(line, starIndexArray) {
  const matchingNumbers = line.numbers.filter((item) =>
    item.indexes.some((itemIndex) => starIndexArray.includes(itemIndex))
  );
  const matchingNumberValues = matchingNumbers.map(
    (item) => parseInt(item.number) || null
  );
  return matchingNumberValues;
}

function getValidNumbersProduct(validNumbers) {
  if (validNumbers.prev && validNumbers.curr) {
    return validNumbers.prev * validNumbers.curr[0];
  } else if (validNumbers.curr && validNumbers.next) {
    return validNumbers.curr[0] * validNumbers.next[0];
  } else if (validNumbers.prev && validNumbers.next) {
    return validNumbers.prev[0] * validNumbers.next[0];
  } else if (validNumbers.prev) {
    return checkEdgeCase(validNumbers.prev);
  } else if (validNumbers.curr) {
    return checkEdgeCase(validNumbers.curr);
  } else if (validNumbers.next) {
    return checkEdgeCase(validNumbers.next);
  }
  function checkEdgeCase(numbers) {
    const edgeCase = numbers[0] * numbers[1];
    if (!isNaN(edgeCase)) {
      return edgeCase;
    }
  }
}
