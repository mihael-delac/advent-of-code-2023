const fs = require("fs");

const filePath = "input.txt";
let perLineData = []; //array of all processed lines

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  let sum = 0;

  for (const line of lines) {
    const currentLine = getLineNumbersAndSymbolIndexes(line.split(""));
    perLineData.push(currentLine);
  }

  const allValidNumbers = getAllValidNumbers(perLineData);
  sum = allValidNumbers.reduce((a, b) => a + b);
  console.log("Sum: ", sum);
});

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
        previousLine
          ? previousLineNumberIndexes.some((number) => {
              if (number.includes(index)) {
                starValidNumbers.prev = getMatchingNumberValues(
                  previousLine,
                  star
                );
              }
            })
          : null;
        currentLineNumberIndexes.some((number) => {
          if (number.includes(index)) {
            starValidNumbers.curr = getMatchingNumberValues(currentLine, star);
          }
        });
        nextLine
          ? nextLineNumberIndexes.some((number) => {
              if (number.includes(index)) {
                starValidNumbers.next = getMatchingNumberValues(nextLine, star);
              }
            })
          : null;
      });

      if (starValidNumbers.prev && starValidNumbers.curr) {
        allValidNumbers.push(starValidNumbers.prev * starValidNumbers.curr[0]);
      } else if (starValidNumbers.curr && starValidNumbers.next) {
        allValidNumbers.push(
          starValidNumbers.curr[0] * starValidNumbers.next[0]
        );
      } else if (starValidNumbers.prev && starValidNumbers.next) {
        allValidNumbers.push(
          starValidNumbers.prev[0] * starValidNumbers.next[0]
        );
      } //edge cases
      else if (starValidNumbers.prev) {
        const edgeCase = starValidNumbers.prev[0] * starValidNumbers.prev[1];
        if (!isNaN(edgeCase)) {
          allValidNumbers.push(edgeCase);
        }
      } else if (starValidNumbers.curr) {
        const edgeCase = starValidNumbers.curr[0] * starValidNumbers.curr[1];
        if (!isNaN(edgeCase)) {
          allValidNumbers.push(edgeCase);
        }
      } else if (starValidNumbers.next) {
        const edgeCase = starValidNumbers.next[0] * starValidNumbers.next[1];
        if (!isNaN(edgeCase)) {
          allValidNumbers.push(edgeCase);
        }
      }
    });
  });
  return allValidNumbers;
}

function getLineData(prev, curr, next) {
  const previousLineNumberIndexes = prev
    ? prev.numbers.map((value) => value.indexes)
    : null;
  const currentLineNumberIndexes = curr.numbers.map((value) => value.indexes); //i
  const currentLineSymbolIndexes = curr.stars.map((index) => [
    index - 1,
    index,
    index + 1,
  ]);

  const nextLineNumberIndexes = next
    ? next.numbers.map((value) => value.indexes)
    : null;
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
