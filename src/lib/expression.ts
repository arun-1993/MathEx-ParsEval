import { Lexer } from "./lexer";
import { Parser } from "./parser";

export class Expression {
    #ast = {};
    #expression = "";
    #tokenList: Token[] = [];

    static #lexer = new Lexer();
    static #parser = new Parser();

    constructor(expression = "") {
        this.setExpression(expression);
    }

    getExpression(): string {
        return this.#expression;
    }

    setExpression(expression: string): void {
        if (expression.length === 0) return;

        this.#expression = expression.trim();
        this.#tokenList.length = 0;

        try {
            this.#tokenList = Expression.#lexer.tokenize(this.#expression);
            this.#ast = Expression.#parser.parse(this.#tokenList);
        } catch (err) {
            if (err instanceof Error) {
                console.error(`${err.name}: ${err.message}`);
            }
            this.setExpression("");
        }
    }

    getAST() {
        return this.#ast;
    }

    getTokenList(): Token[] {
        return this.#tokenList;
    }
}
