const fs = require("fs");

const filePath = "input.txt";

let allCardsData = {};

let totalNumberOfCards = 6;

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  let cardId = 0;

  for (const line of lines) {
    cardId += 1;
    const currentLine = line.split(/[|:]/).splice(1);
    getCardData(currentLine, cardId);
  }
  getNumberOfCopies();
  console.log(totalNumberOfCards);
});

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
    const maxDepth = allCardsData[cardId].matchingNumbers.length;
    if (maxDepth) {
      checkWinningTree(
        allCardsData[cardId + 1],
        parseInt(cardId) + 1,
        maxDepth
      );
      console.log(
        " cardId:",
        cardId,
        " number of copies:",
        allCardsData[cardId].numberOfCopies,
        " max matching numbers count:",
        maxDepth
      );
    }
    console.log(" total number of cards:", totalNumberOfCards);
  }
}
function checkWinningTree(card, id, maxDepth, depth = 1) {
  if (depth > maxDepth) {
    return;
  }
  console.log(depth);
  // card.numberOfCopies += 1;
  totalNumberOfCards += 1;
  depth += 1;
  return checkWinningTree(allCardsData[id + 1], id + 1, maxDepth, depth);
}
