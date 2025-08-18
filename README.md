# test-fulll

Technical test for Fulll.

## Algo

### Usage
```bash
  node main.js
  # Please enter a number: [50]
  # enter a number or just press enter to use default value
```

There are two versions of the algorithm.

### modulo

A simple version, corresponding closely to the description of the problem.
And using modulo for testing the conditions of the text to display.

### preBuiltArray

A more optimized version, taking advantage of the repeating pattern of the output.

#### Pattern
| value | return action | text output |
|-------|---------------|-------------|
| 1     | `value`       | 1           |
| 2     | `value`       | 2           |
| 3     | "Fizz"        | Fizz        |
| 4     | `value`       | 4           |
| 5     | "Buzz"        | Buzz        |
| 6     | "Fizz"        | Fizz        |
| 7     | `value`       | 7           |
| 8     | "Fizz"        | Fizz        |
| 9     | "Buzz"        | Buzz        |
| 10    | "FizzBuzz"    | FizzBuzz    |

We loop through the pattern, use the corresponding action and return the corresponding value at each step.

#### avoiding modulo

Modulo can be an expensive operation on large numbers.

An optimization that avoids using modulo is to use a count, increment it and reset it to 0 when the count reaches the length of the pattern.

## Frontend

