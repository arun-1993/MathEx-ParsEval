import {
    createToken,
    isIdentifierPart,
    isIdentifierStart,
    isNumber,
    isOperator,
    isSpace,
} from "./utils";

export class Expression {
    #index: number = 0;
    #expression: string = "";
    #tokenList: Token[] = [];

    constructor(expression: string) {
        this.setExpression(expression);
    }

    getExpression(): string {
        return this.#expression;
    }

    setExpression(expression: string): void {
        this.#index = 0;
        this.#expression = expression.trim();
        this.#tokenList.length = 0;
        this.#tokenize();
    }

    getTokenList(): Token[] {
        return this.#tokenList;
    }

    #getIdentifier(): Token {
        let identifier = "";
        let nextChar;

        do {
            identifier += this.#getNextChar();
            nextChar = this.#peekNextChar();
        } while (isIdentifierPart(nextChar));

        return createToken("Identifier", identifier);
    }

    #getNextChar(): string {
        return this.#index < this.#expression.length
            ? this.#expression[this.#index++]
            : "";
    }

    #getNumber(): Token {
        let nextChar = this.#peekNextChar();
        let number = "";

        if (nextChar !== ".") {
            do {
                number += this.#getNextChar();
                nextChar = this.#peekNextChar();
            } while (isNumber(nextChar));
        }

        if (nextChar === ".") {
            number += this.#getNextChar();

            do {
                number += this.#getNextChar();
                nextChar = this.#peekNextChar();
            } while (isNumber(nextChar));
        }

        if (nextChar === "e" || nextChar === "E") {
            number += this.#getNextChar();
            nextChar = this.#peekNextChar();

            if (isNumber(nextChar) || nextChar === "+" || nextChar === "-") {
                do {
                    number += this.#getNextChar();
                    nextChar = this.#peekNextChar();
                } while (isNumber(nextChar));
            } else {
                throw new SyntaxError("Invalid scientific notation...");
            }
        }

        return createToken("Number", number);
    }

    #getOperator(): Token {
        return createToken("Operator", this.#getNextChar());
    }

    #peekNextChar() {
        return this.#index < this.#expression.length
            ? this.#expression[this.#index]
            : "";
    }

    #skipSpaces(): void {
        let char;

        do {
            this.#getNextChar();
            char = this.#peekNextChar();
        } while (isSpace(char));
    }

    #tokenize() {
        while (this.#index < this.#expression.length) {
            const char = this.#peekNextChar();

            if (isSpace(char)) {
                this.#skipSpaces();
            }

            if (isIdentifierStart(char)) {
                this.#tokenList.push(this.#getIdentifier());
            }

            if (isNumber(char)) {
                this.#tokenList.push(this.#getNumber());
            }

            if (isOperator(char)) {
                this.#tokenList.push(this.#getOperator());
            }
        }
    }
}

const test = new Expression("5+6.73+7.1e2");

console.log(test.getExpression());
console.log(test.getTokenList());
