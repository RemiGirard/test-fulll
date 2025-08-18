// the output follows a pattern which repeats every 15 steps
const repeatedStepList = [0, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 0, 0, 3];
const repeatedStepListLength = repeatedStepList.length;
// each step corresponds to one action
const actionList = [
  (currentNumber) => currentNumber,
  () => 'Fizz',
  () => 'Buzz',
  () => 'FizzBuzz',
];

export default (n) => {
  // instead of using modulo, use a counter
  let stepIndex = 0;

  for (let i = 1; i <= n; i++) {
    const actionIndex = repeatedStepList[stepIndex];
    const action = actionList[actionIndex];
    console.log(action(i));
    // increment it and reset it when it reaches the end of the step list
    stepIndex++;
    if (stepIndex === repeatedStepListLength) stepIndex = 0;
  }
}
