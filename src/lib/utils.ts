const operatorList = ["+", "-", "*", "/", "(", ")", "=", ","] as const;

export const createToken = (type: Token["type"], value: string): Token => ({
    type,
    value,
});

export const isAlphabet = (char: string): boolean => /[A-Za-z]/.test(char);

export const isIdentifierPart = (char: string): boolean =>
    isAlphabet(char) || isNumber(char) || char === "_";

export const isIdentifierStart = (char: string): boolean =>
    isAlphabet(char) || char === "_";

export const isNumber = (char: string): boolean => /[0-9]/.test(char);

export const isOperator = (char: string): boolean =>
    (operatorList as readonly string[]).includes(char);

export const isSpace = (char: string): boolean => /\s/.test(char);

export const matchOperator = (
    token: Token,
    operator: (typeof operatorList)[number]
): boolean =>
    token !== undefined &&
    token.type === "Operator" &&
    token.value === operator;
