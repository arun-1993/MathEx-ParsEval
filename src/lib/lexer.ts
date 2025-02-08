import {
    createToken,
    isIdentifierPart,
    isIdentifierStart,
    isNumber,
    isOperator,
    isSpace,
} from "./utils";

export class Lexer {
    #expression = "";
    #index = 0;
    #tokenList: Token[] = [];

    #getNextIdentifier(): Token {
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

    #peekNextChar(): string {
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

    tokenize(expression: string): Token[] {
        this.#expression = expression;
        this.#index = 0;
        this.#tokenList.length = 0;

        while (this.#index < this.#expression.length) {
            const char = this.#peekNextChar();

            if (isSpace(char)) {
                this.#skipSpaces();
            } else if (isIdentifierStart(char)) {
                this.#tokenList.push(this.#getNextIdentifier());
            } else if (isNumber(char)) {
                this.#tokenList.push(this.#getNumber());
            } else if (isOperator(char)) {
                this.#tokenList.push(this.#getOperator());
            } else {
                throw new SyntaxError(
                    `Invalid character "${char}" found in expression ${
                        this.#expression
                    } at position ${this.#index + 1}`
                );
            }
        }

        return this.#tokenList;
    }
}
