function getDigitsAndIndices(numbers) {
  const result = [];

  for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const digitsArray = Array.from(String(currentNumber), Number);

    for (let j = 0; j < digitsArray.length; j++) {
      const digit = digitsArray[j];
      result.push({ number: currentNumber, digit, index: j });
    }
  }

  return result;
}

// Example usage:
const numbersArray = [123, 45, 6789];
const result = getDigitsAndIndices(numbersArray);

console.log(result);
