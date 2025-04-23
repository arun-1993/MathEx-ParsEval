import { Expression } from "./expression.js";

const expr1 = new Expression("10-5+6.73+7.1e2");
console.log(expr1.getExpression());
console.log(expr1.getTokenList());
console.dir(expr1.getAST(), { depth: null });
console.log(expr1.getResult());

const expr2 = new Expression("x=5+6.73+7.1e2");
console.log(expr2.getExpression());
console.log(expr2.getTokenList());
console.dir(expr2.getAST(), { depth: null });
console.log(expr2.getResult());

const expr3 = new Expression("x@5+6.73+7.1e2");
console.log(expr3.getExpression());
console.log(expr3.getTokenList());
console.dir(expr3.getAST(), { depth: null });
console.log(expr3.getResult());

const expr4 = new Expression("x = abs(27-3*-10)");
console.log("Expression : ", expr4.getExpression());
console.log("Tokens : ", expr4.getTokenList());
console.dir(expr4.getAST(), { depth: null });
console.log(expr4.getResult());

const expr5 = new Expression("sin(pi) * sqrt(25) - 23");
console.log("Expression : ", expr5.getExpression());
console.log("Tokens : ", expr5.getTokenList());
console.dir(expr5.getAST(), { depth: null });
console.log(expr5.getResult());

const expr6 = new Expression("x = 2 + 3");
console.log("Expression : ", expr6.getExpression());
console.log("Tokens : ", expr6.getTokenList());
console.dir(expr6.getAST(), { depth: null });
console.log(expr6.getResult());

const expr7 = new Expression("x * 10");
console.log("Expression : ", expr7.getExpression());
console.log("Tokens : ", expr7.getTokenList());
console.dir(expr7.getAST(), { depth: null });
console.log(expr7.getResult());
