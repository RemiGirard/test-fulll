import readline from "readline";

import modulo from "./Implementations/modulo.mjs";
import preBuiltArray from "./Implementations/preBuiltArray.mjs";

const algoProvider = modulo; // modulo or preBuiltArray
const defaultNumber = 50;

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`Please enter a number and press enter: [${defaultNumber}]`, (answer) => {
    const number = answer === '' ? defaultNumber : Number(answer);

    if (isNaN(number)) {
      console.log('This is not a valid number.');
    } else {
      // execute the algorithm
      algoProvider(number);
    }

    rl.close();
  });
}

main();
