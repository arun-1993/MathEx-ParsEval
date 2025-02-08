import { Expression } from "./expression";

const expr1 = new Expression("10-5+6.73+7.1e2");
console.log(expr1.getExpression());
console.log(expr1.getTokenList());

const expr2 = new Expression("x=5+6.73+7.1e2");
console.log(expr2.getExpression());
console.log(expr2.getTokenList());

const expr3 = new Expression("x@5+6.73+7.1e2");
console.log(expr3.getExpression());
console.log(expr3.getTokenList());
