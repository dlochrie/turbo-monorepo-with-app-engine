module.exports = {
  extends: [
    "turbo",
    "airbnb",
    "airbnb-typescript",
    "next",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/type-annotation-spacing": [
      1
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }
    ]
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
    "project": "**/tsconfig.json"
  },
};
