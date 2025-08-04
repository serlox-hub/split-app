import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      import: eslintPluginImport,
      react: eslintPluginReact,
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [["@", "./"]],
          extensions: [".js", ".jsx"],
        },
      },
    },
    rules: {
      "react/jsx-uses-react": "error", // útil si React import implícito no está en uso
      "react/jsx-uses-vars": "error", // detecta variables JSX no utilizadas/importadas
      "no-undef": "error", // muestra error en símbolos no definidos
      "import/no-unresolved": "error", // detecta imports rotos
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];

export default eslintConfig;
