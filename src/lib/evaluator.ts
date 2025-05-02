import type { ASTNode } from "./types";

export class Evaluator {
    #ast: ASTNode = {};

    #constants: Record<string, number> = {
        e: 2.718281828459045,
        pi: 3.141592653589793,
    };

    #functions: Record<string, (...args: number[]) => number> = {
        abs: Math.abs,
        acos: Math.acos,
        asin: Math.asin,
        atan: Math.atan,
        ceil: Math.ceil,
        cos: Math.cos,
        exp: Math.exp,
        floor: Math.floor,
        log: Math.log10,
        ln: Math.log,
        random: Math.random,
        sin: Math.sin,
        sqrt: Math.sqrt,
        tan: Math.tan,
    };

    #variables: Record<string, number> = {};

    evaluate(ast: ASTNode): number | null {
        this.#ast = ast;

        if (this.#ast.expression === undefined) return null;

        return this.#calculate(this.#ast.expression);
    }

    #calculate(node: ASTNode): number {
        if (node.assignment !== undefined) {
            const value = this.#calculate(node.assignment.value);
            this.#variables[node.assignment.name.identifier] = value;
            return value;
        }

        if (node.binary !== undefined) {
            const childNode = node.binary;
            const left = this.#calculate(childNode.left);
            const right = this.#calculate(childNode.right);

            switch (childNode.operator) {
                case "+":
                    return left + right;
                case "-":
                    return left - right;
                case "*":
                    return left * right;
                case "/":
                    return left / right;
                default:
                    throw new SyntaxError(
                        `Unknown operator "${childNode.operator}" found...`
                    );
            }
        }

        if (node.expression !== undefined) {
            return this.#calculate(node.expression);
        }

        if (node.functionCall !== undefined) {
            const functionName = node.functionCall.name;
            const functionArgs = node.functionCall.args;

            if (this.#functions[functionName] !== undefined) {
                const args: number[] = [];

                for (const arg of functionArgs) {
                    args.push(this.#calculate(arg));
                }

                if (typeof this.#functions[functionName] === "function") {
                    return this.#functions[functionName](...args);
                }

                throw new SyntaxError(
                    `The function "${functionName}" does not have a valid callback...`
                );
            }

            throw new SyntaxError(
                `The function "${functionName} is not a valid function...`
            );
        }

        if (node.identifier !== undefined) {
            if (this.#variables[node.identifier] !== undefined) {
                return this.#variables[node.identifier];
            }

            if (this.#constants[node.identifier] !== undefined) {
                return this.#constants[node.identifier];
            }
        }

        if (node.number !== undefined) {
            return Number(node.number);
        }

        if (node.unary !== undefined) {
            const childNode = node.unary;
            const value = this.#calculate(childNode.expression);

            switch (childNode.operator) {
                case "+":
                    return value;
                case "-":
                    return -value;
                default:
                    throw new SyntaxError(
                        `Unknown operator "${childNode.operator}" found...`
                    );
            }
        }

        throw new SyntaxError("Invalid node type...");
    }
}
