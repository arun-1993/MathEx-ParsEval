export function createToken(type: string, value: string): Token {
    return { type, value };
}

export function isAlphabet(char: string): boolean {
    return /[A-Za-z]/.test(char);
}

export function isIdentifierPart(char: string): boolean {
    return isAlphabet(char) || isNumber(char) || char === "_";
}

export function isIdentifierStart(char: string): boolean {
    return isAlphabet(char) || char === "_";
}

export function isNumber(char: string): boolean {
    return /[0-9]/.test(char);
}

export function isOperator(char: string): boolean {
    const operatorList = ["+", "-", "*", "/", "(", ")"];
    return operatorList.includes(char);
}

export function isSpace(char: string): boolean {
    return /\s/.test(char);
}
