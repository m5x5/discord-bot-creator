const webpack = require("webpack");
const configure = require("./webpack.config.renderer.dev");

const compiler = webpack(configure("production"));

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
  }
  if (stats && stats.hasErrors()) {
    console.error(stats.toString());
  }
});
