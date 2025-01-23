import eslint from "@eslint/js";
import "node:path";
import tslint from "typescript-eslint";

export default tslint.config(
    eslint.configs.recommended,
    tslint.configs.strict,
    tslint.configs.stylistic,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        },
    }
);
