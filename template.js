const { loadInput } = require("../loadInput");

async function main() {
  const lines = await loadInput();
  console.log(lines);
}

main();
