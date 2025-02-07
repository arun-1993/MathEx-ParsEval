const operatorList = ["+", "-", "*", "/", "(", ")"];

export const createToken = (type: string, value: string): Token => ({
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
    operatorList.includes(char);

export const isSpace = (char: string): boolean => /\s/.test(char);
