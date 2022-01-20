const chalk = require("chalk");

module.exports = (text) => {
  console.log(chalk`{cyan [nextron]} ${text}`);
};
