const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require("customize-cra");

const path = require("path");

function setWebpackConfig(app) {
  // build时设置publicPath
  return config => {
    if (app.publicPath && process.env.NODE_ENV === "production") {
      config.output.publicPath = `${app.publicPath}/`;
    }
    return config;
  };
}

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true
  }),
  setWebpackConfig({
    publicPath: "/netease-cloud-music"
  }),
  addWebpackAlias({
    "~": path.resolve(__dirname, "src/")
  })
);
