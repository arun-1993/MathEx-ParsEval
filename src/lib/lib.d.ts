type Token = {
    type: "Identifier" | "Number" | "Operator";
    value: string;
};

type ASTNode = {
    assignment?: {
        name: { identifier: string };
        value: ASTNode;
    };
    binary?: {
        operator: string;
        left: ASTNode;
        right: ASTNode;
    };
    expression?: ASTNode;
    functionCall?: {
        name: string;
        args: ASTNode[];
    };
    identifier?: string;
    number?: string;
    unary?: {
        operator: string;
        expression: ASTNode;
    };
};
