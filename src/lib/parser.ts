import { matchOperator } from "./utils";

export class Parser {
    #index = 0;
    #tokenList: Token[] = [];

    parse(tokenList: Token[]): ASTNode {
        this.#index = 0;
        this.#tokenList = tokenList;

        const expr = this.#parseAssignment();

        return {
            expression: expr,
        };
    }

    #parseAssignment(): ASTNode {
        const expr = this.#parseAddition();

        if (expr !== undefined && expr.identifier) {
            const token = this.#tokenPeek();

            if (matchOperator(token, "=")) {
                this.#tokenNext();

                return {
                    assignment: {
                        name: { identifier: expr.identifier },
                        value: this.#parseAssignment(),
                    },
                };
            }

            return expr;
        }

        return expr;
    }

    #parseAddition(): ASTNode {
        let expr = this.#parseMultiplication();
        let token = this.#tokenPeek();

        while (matchOperator(token, "+") || matchOperator(token, "-")) {
            this.#tokenNext();

            expr = {
                binary: {
                    operator: token.value,
                    left: expr,
                    right: this.#parseMultiplication(),
                },
            };

            token = this.#tokenPeek();
        }

        return expr;
    }

    #parseMultiplication(): ASTNode {
        let expr = this.#parseUnary();
        let token = this.#tokenPeek();

        while (matchOperator(token, "*") || matchOperator(token, "/")) {
            this.#tokenNext();

            expr = {
                binary: {
                    operator: token.value,
                    left: expr,
                    right: this.#parseUnary(),
                },
            };

            token = this.#tokenPeek();
        }

        return expr;
    }

    #parseUnary(): ASTNode {
        let token = this.#tokenPeek();

        while (matchOperator(token, "+") || matchOperator(token, "-")) {
            token = this.#tokenNext();
            const expr = this.#parseUnary();

            return {
                unary: {
                    operator: token.value,
                    expression: expr,
                },
            };
        }

        return this.#parsePrimary();
    }

    #parsePrimary(): ASTNode {
        let token = this.#tokenPeek();

        if (token.type === "Identifier") {
            this.#tokenNext();

            if (matchOperator(this.#tokenPeek(), "(")) {
                return this.#parseFunctionCall(token.value);
            } else {
                return { identifier: token.value };
            }
        }

        if (token.type === "Number") {
            this.#tokenNext();
            return { number: token.value };
        }

        if (matchOperator(token, "(")) {
            this.#tokenNext();
            const expr = this.#parseAssignment();
            token = this.#tokenNext();

            if (!matchOperator(token, ")")) {
                throw new SyntaxError(
                    'Could not find closing parenthesis ")"...'
                );
            }

            return { expression: expr };
        }

        throw new SyntaxError(`Unable to parse token "${token.value}"`);
    }

    #parseFunctionCall(name: string): ASTNode {
        const args: ASTNode[] = [];
        let token = this.#tokenNext();

        if (!matchOperator(token, "(")) {
            throw new SyntaxError(
                `Could not find opening parenthesis "(" in function call "${name}"`
            );
        }

        token = this.#tokenPeek();

        if (!matchOperator(token, ")")) {
            args.push(...this.#parseArgumentList());
        }

        token = this.#tokenNext();

        if (!matchOperator(token, ")")) {
            throw new SyntaxError(
                `Could not find closing parenthesis ")" in function call "${name}"`
            );
        }

        return { functionCall: { name, args } };
    }

    #parseArgumentList(): ASTNode[] {
        const args = [];

        while (true) {
            const expr = this.#parseAssignment();

            if (expr === undefined) break;

            args.push(expr);
            const token = this.#tokenPeek();

            if (!matchOperator(token, ",")) break;

            this.#tokenNext();
        }

        return args;
    }

    #tokenPeek() {
        return this.#tokenList[this.#index];
    }

    #tokenNext() {
        return this.#tokenList[this.#index++];
    }
}
