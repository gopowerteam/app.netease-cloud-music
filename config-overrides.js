const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackModuleRule
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true
  }),
  addWebpackModuleRule({
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: "babel-loader"
      },
      {
        loader: "@svgr/webpack",
        options: {
          babel: false,
          icon: true
        }
      }
    ]
  })
);
