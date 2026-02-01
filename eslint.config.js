import prettierConfig from "eslint-config-prettier";

export default [
  prettierConfig,
  {
    ignores: ["build/**", "node_modules/**", "src/site/assets/js/**"]
  }
];
