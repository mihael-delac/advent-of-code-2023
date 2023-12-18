const fs = require("fs");

let allCardsData = {};
let totalNumberOfCards = 0;

async function main() {
  let cardId = 0;
  const lines = await loadInput();

  for (const line of lines) {
    cardId += 1;
    const currentLine = line.split(/[|:]/).splice(1);
    getCardData(currentLine, cardId);
  }
  getNumberOfCopies();
  console.log(totalNumberOfCards);
}

main();

function getCardData(line, id) {
  let winningNumbers, numbersList;
  let matchingNumbers = [];
  line.forEach((str) => {
    str = str.split(" ");
    str = str.filter((value) => value !== "");
    str = str.map(Number);
    str.length == 10 ? (winningNumbers = str) : (numbersList = str);
  });

  getMatchingNumbers(winningNumbers, numbersList);

  setCardData(matchingNumbers, id);

  function getMatchingNumbers(winningNumbers, numbersList) {
    winningNumbers?.some((num) => {
      numbersList.includes(num) && matchingNumbers.push(num);
    });
  }
  function setCardData(matchingNumbers, id) {
    allCardsData[id] = {
      matchingNumbers: matchingNumbers,
      numberOfCopies: 0,
    };
  }
}

function getNumberOfCopies() {
  for (const cardId in allCardsData) {
    countCardsPerLine(allCardsData[cardId], parseInt(cardId));
  }
}

function countCardsPerLine(card, id) {
  const matchingNumbersCount = card.matchingNumbers.length;
  totalNumberOfCards++;
  card.numberOfCopies++;
  if (matchingNumbersCount) {
    for (let i = 1; i < matchingNumbersCount + 1; i++) {
      countCardsPerLine(allCardsData[id + i], id + i);
    }
  } else {
    return 0;
  }
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
