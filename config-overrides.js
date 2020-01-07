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
  // addWebpackModuleRule({
  //   test: /\.svg$/,
  //   use: [
  //     {
  //       loader: "babel-loader"
  //     },
  //     {
  //       loader: "react-svg-loader",
  //     }
  //   ]
  // })
);
