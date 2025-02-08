import { Lexer } from "./lexer";

export class Expression {
    #expression = "";
    #tokenList: Token[] = [];
    static #lexer = new Lexer();

    constructor(expression = "") {
        this.setExpression(expression);
    }

    getExpression(): string {
        return this.#expression;
    }

    setExpression(expression: string): void {
        this.#expression = expression.trim();
        this.#tokenList.length = 0;

        try {
            this.#tokenList = Expression.#lexer.tokenize(this.#expression);
        } catch (err) {
            if (err instanceof Error) {
                console.error(`${err.name}: ${err.message}`);
            }
            this.setExpression("");
        }
    }

    getTokenList(): Token[] {
        return this.#tokenList;
    }
}
