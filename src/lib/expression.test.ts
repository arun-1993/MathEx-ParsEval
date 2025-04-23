import { Expression } from "./expression.js";

const expr1 = new Expression("10-5+6.73+7.1e2");
console.log(expr1.getExpression());
console.log(expr1.getTokenList());
console.dir(expr1.getAST(), { depth: null });

const expr2 = new Expression("x=5+6.73+7.1e2");
console.log(expr2.getExpression());
console.log(expr2.getTokenList());
console.dir(expr2.getAST(), { depth: null });

const expr3 = new Expression("x@5+6.73+7.1e2");
console.log(expr3.getExpression());
console.log(expr3.getTokenList());
console.dir(expr3.getAST(), { depth: null });

const expr4 = new Expression("x = abs(27-3*-10)");
console.log("Expression : ", expr4.getExpression());
console.log("Tokens : ", expr4.getTokenList());
console.dir(expr4.getAST(), { depth: null });
