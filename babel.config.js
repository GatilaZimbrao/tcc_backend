module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],

  plugins: [
    [
      "module-resolver",

      {
        alias: {
          modules: "./src/modules",
          "@config": "./src/config",
          "@shared": "./src/shared",
          typings: "./src/typings",
        },
      },
    ],

    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
