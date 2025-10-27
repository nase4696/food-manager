// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { dirname } from "path";
import { fileURLToPath } from "url";

import storybook from "eslint-plugin-storybook";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  plugins: {
    import: importPlugin,
  },
  rules: {
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
      },
    ],
  },
}, {
  plugins: {
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "react/jsx-sort-props": "error",
  },
}, {
  ignores: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "*.config.js",
    "next-env.d.ts",
    "**/.next/**",
    "generated/**",
  ],
}, eslintConfigPrettier, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
