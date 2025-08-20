# test-fulll

Technical test for Fulll.

## Algo

### Usage
```bash
  cd Algo
  node main.mjs
  # Please enter a number and press enter: [50]
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

## Requirements

 - [Node.js](https://nodejs.org/en/download)
 - [pnpm](https://pnpm.io/installation)

## Usage

```bash
    cd Frontend
    pnpm install
    pnpm run dev
    # open http://localhost:5173/ in your browser
```

## Tests

```bash
    pnpm run test
```

## Vite instead of `create-react-app`

The instructions in the README, indicate to use `create-react-app`. This tool is [officially deprecated](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) and should not be used anymore.

The [React documentation](https://react.dev/learn/build-a-react-app-from-scratch) recommend `vite`, `parcel` or `rsbuild`.

After pointing out the issue, I have been allowed to use [Vite](https://vite.dev/).

## pnpm

[pnpm](https://pnpm.io/) is used for package management because it's widely adopted and fast.

## Architecture

The directories are in `Frontend/src/`:

- Domain
  - Entities and use cases.
- Infrastructure
  - Access to external services (e.g., API calls).
- Presentation
  - Components, assets and hooks.

## Styling

I used default CSS Modules for its modularity and simplicity.

## Testing

I use Vitest for its simplicity and speed.
Test files live next to the components they test to also serve as documentation.

## Reducer

In `UserSearchList.tsx`, to handle table logic, I used a reducer.

It's rarely used but it's good practice to handle complex logic and multiple actions of a table.

```typescript
  const [userList, dispatchUserList] = useUserListReducer();
```

All actions on the userList are available through the `dispatchUserList` function and defined in `useUserListReducer.ts`.

