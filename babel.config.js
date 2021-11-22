module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ],
    "@babel/preset-react"
  ],
  env: {
    production: {
      only: ["src"],
      plugins: [
      ]
    }
  }
};