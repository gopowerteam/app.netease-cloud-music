const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addDecoratorsLegacy
} = require("customize-cra");

const path = require("path");
function setWebpackConfig() {
  // build时设置publicPath
  return config => {
    if (process.env.BROWSER !== "none" && process.env.REACT_APP_BASEHREF) {
      config.output.publicPath = `${process.env.REACT_APP_BASEHREF||""}/`;
    }
    return config;
  };
}

module.exports = override(
  addDecoratorsLegacy(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true
  }),
  setWebpackConfig(),
  addWebpackAlias({
    "~": path.resolve(__dirname, "src")
  })
);
