# MathEx-ParsEval

## Description

MathEx-ParsEval is an npm package designed to tokenize, parse, and evaluate mathematical expressions efficiently. It helps process complex expressions by generating token lists, Abstract Syntax Trees (ASTs), and evaluating results.

## Features

- Tokenizes a given mathematical expression.
- Generates an Abstract Syntax Tree (AST).
- Evaluates the result of the expression using the AST.
- Supports **variable assignment**, allowing previously assigned variables to be used in later expressions.
- **Supported Operators:** `+`, `-`, `*`, `/`, `(`, `)`, `=`, `,`
- **Supported Mathematical Functions:**
  - `abs` (absolute value), `acos` (cosine inverse), `asin` (sine inverse), `atan` (tangent inverse), `ceil` (ceiling function), `cos` (cosine), `exp` (exponential function), `floor` (floor), `log` (logarithm), `ln` (natural logarithm), `random` (pseudorandom number between 0 and 1), `sin` (sine), `sqrt` (square root), `tan` (tangent)
- **Supported Constants:**
  - `e` (value: 2.718281828459045)
  - `pi` (value: 3.141592653589793)

## Installation

To install MathEx-ParsEval, run the following command:

```sh
npm i mathex-parseval
```

## Usage

Here are some examples of how to use MathEx-ParsEval:

```JavaScript
import { Expression } from "mathex-parseval";

const expr1 = new Expression("x = sin(pi/2) * sqrt(25) - 23");
console.log("Expression : ", expr1.getExpression());
console.log("Tokens : ", expr1.getTokenList());
console.dir(expr1.getAST(), { depth: null });
console.log(expr1.getResult()); // -18

const expr2 = new Expression("abs(2-x*-10)");
console.log("Expression : ", expr2.getExpression());
console.log("Tokens : ", expr2.getTokenList());
console.dir(expr2.getAST(), { depth: null });
console.log(expr2.getResult()); // 178
```

## Contributing

Contributions are welcome! Please fork this repository, create a branch, and submit a pull request.

## License

This project is licensed under the ISC License - see the [LICENSE](./LICENSE.txt) file for details.

---

For more information or to report issues, visit the [GitHub repository](https://github.com/arun-1993/MathEx-ParsEval).
