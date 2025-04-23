import { Evaluator } from "./evaluator";
import { Lexer } from "./lexer";
import { Parser } from "./parser";

export class Expression {
    #ast: ASTNode = {};
    #expression = "";
    #result: number | null = 0;
    #tokenList: Token[] = [];

    static #evaluator = new Evaluator();
    static #lexer = new Lexer();
    static #parser = new Parser();

    constructor(expression = "") {
        this.#setExpression(expression);
    }

    getExpression(): string {
        return this.#expression;
    }

    #setExpression(expression: string): void {
        if (expression.length === 0) return;

        this.#expression = expression.trim();
        this.#tokenList.length = 0;

        try {
            this.#tokenList = Expression.#lexer.tokenize(this.#expression);
            this.#ast = Expression.#parser.parse(this.#tokenList);
            this.#result = Expression.#evaluator.evaluate(this.#ast);
        } catch (err) {
            if (err instanceof Error) {
                console.error(`${err.name}: ${err.message}`);
            }
            this.#setExpression("");
        }
    }

    getAST(): ASTNode {
        return this.#ast;
    }

    getResult(): number | null {
        return this.#result;
    }

    getTokenList(): Token[] {
        return this.#tokenList;
    }
}
