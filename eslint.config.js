import defineConfig from "@antfu/eslint-config";

// 配置参考
// https://github.com/antfu/eslint-config
// https://github.com/antfu/eslint-flat-config-viewer
export default defineConfig({
  stylistic: {
    indent: 2,
    quotes: "double"
  },
  ignores: []
}, {
  rules: {
    "curly": ["error", "all"],
    "no-console": ["warn", {
      allow: [
        "warn",
        "error"
      ]
    }],
    "dot-notation": ["off"],
    "symbol-description": ["off"],
    "no-extra-boolean-cast": ["off"],
    "prefer-promise-reject-errors": ["off"],
    "style/semi": ["error", "always"],
    "style/eol-last": ["error", "never"],
    "style/brace-style": ["error", "1tbs"],
    "style/quote-props": ["off"],
    "style/comma-dangle": ["error", "never"],
    "style/arrow-parens": ["error", "always"],
    "style/padded-blocks": ["error", {
      blocks: "never",
      classes: "always",
      switches: "never"
    }],
    "style/operator-linebreak": ["error", "before", {
      overrides: {
        "=": "after"
      }
    }],
    "style/no-multiple-empty-lines": ["error", {
      max: 2,
      maxBOF: 0,
      maxEOF: 0
    }],
    "style/member-delimiter-style": ["error", {
      singleline: {
        delimiter: "semi",
        requireLast: true
      },
      multiline: {
        delimiter: "semi",
        requireLast: true
      },
      multilineDetection: "brackets"
    }],
    "ts/ban-ts-comment": ["off"],
    "ts/prefer-ts-expect-error": ["off"],
    "import/no-self-import": ["off"],
    "import/newline-after-import": ["error", {
      count: 1,
      considerComments: false
    }],
    "node/prefer-global/process": ["error", "always"],
    "antfu/consistent-list-newline": ["off"]
  }
});