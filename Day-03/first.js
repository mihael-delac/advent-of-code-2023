const fs = require("fs");

const filePath = "input.txt";
let perLineData = []; //array objekata svake procesirane linije

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  let sum = 0;

  for (const line of lines) {
    const id = lines.indexOf(line) + 1;
    const currentLine = getLineNumbersAndSymbolIndexes(line.split(""));
    perLineData.push(currentLine);
  }

  const allValidNumbers = getAllValidNumbers(perLineData);
  sum = allValidNumbers.reduce((a, b) => a + b);
  console.log("Sum: ", sum);
});

function getLineNumbersAndSymbolIndexes(line) {
  let currentIndex = -1;

  let lineData = {
    numbers: [],
    symbols: [],
    allNumberIndexes: [],
  };
  let tempNumber = {
    number: "",
    indexes: [],
  };
  for (const char of line) {
    currentIndex += 1;
    if (char.match(/[^\w\s.0-9]/g)) {
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
      lineData.symbols.push(currentIndex);
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
  }
  return lineData;
}

function getAllValidNumbers(data) {
  //treba returnat samo brojeve koji su uz simbole
  //validni su oni koji u rangeu indexa -1, {broj}, +1 na sve tri linije imaju bar jedan simbol u bilokojoj liniji
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
      previousLineSymbolIndexes,
      currentLineNumberIndexes,
      currentLineSymbolIndexes,
      nextLineSymbolIndexes,
    ] = getLineData(previousLine, currentLine, nextLine);

    if (!previousLine) {
      //prva
      //check current vs next
      currentLineNumberIndexes.forEach((numberIndexArray) => {
        const isMatching = numberIndexArray.some((index) =>
          nextLineSymbolIndexes.includes(index)
        );
        if (isMatching) {
          const matchingNumberValues = getMatchingNumberValues(
            currentLine,
            numberIndexArray
          );
          allValidNumbers.push(...matchingNumberValues);
        }
      });
    } else if (!nextLine) {
      //zadnja
      //check current vs prev
      currentLineNumberIndexes.forEach((numberIndexArray) => {
        const isMatching = numberIndexArray.some((index) =>
          previousLineSymbolIndexes.includes(index)
        );
        if (isMatching) {
          const matchingNumberValues = getMatchingNumberValues(
            currentLine,
            numberIndexArray
          );
          allValidNumbers.push(...matchingNumberValues);
        }
      });
    } else {
      //check current vs prev vs next
      currentLineNumberIndexes.forEach((numberIndexArray) => {
        const isMatching = numberIndexArray.some(
          (index) =>
            nextLineSymbolIndexes.includes(index) ||
            previousLineSymbolIndexes.includes(index) ||
            currentLineSymbolIndexes.includes(index)
        );

        if (isMatching) {
          const matchingNumberValues = getMatchingNumberValues(
            currentLine,
            numberIndexArray
          );
          allValidNumbers.push(...matchingNumberValues);
        }
      });
    }
  });
  return allValidNumbers;
}

function getLineData(prev, curr, next) {
  const previousLineSymbolIndexes = prev
    ? [].concat(...prev?.symbols.map((index) => [index - 1, index, index + 1]))
    : null;
  const currentLineNumberIndexes = curr.numbers.map((value) => value.indexes); //i
  const currentLineSymbolIndexes = [].concat(
    ...curr.symbols.map((index) => [index - 1, index, index + 1])
  );
  const nextLineSymbolIndexes = next
    ? [].concat(...next?.symbols.map((index) => [index - 1, index, index + 1]))
    : null;
  return [
    previousLineSymbolIndexes,
    currentLineNumberIndexes,
    currentLineSymbolIndexes,
    nextLineSymbolIndexes,
  ];
}

function getMatchingNumberValues(line, numberIndexArray) {
  const matchingNumbers = line.numbers.filter((item) => {
    return item.indexes.some((itemIndex) =>
      numberIndexArray.includes(itemIndex)
    );
  });
  const matchingNumberValues = matchingNumbers.map((item) =>
    parseInt(item.number)
  );
  return matchingNumberValues;
}
