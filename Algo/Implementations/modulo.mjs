function canBeDividedBy(value, divisor) {
  return value % divisor === 0;
}

export default function modulo(value) {
  for (let i = 1; i <= value; i++) {
    let textOutput = "";

    if (canBeDividedBy(i, 3)) {
      textOutput += "Fizz";
    }
    if (canBeDividedBy(i, 5)) {
      textOutput += "Buzz";
    }

    console.log(textOutput.length > 0 ? textOutput : i);
  }
}
