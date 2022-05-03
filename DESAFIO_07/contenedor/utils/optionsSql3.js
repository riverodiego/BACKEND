const path = require("path");

const optionsSql3 = {
  client: "better-sqlite3",
  connection: { filename: path.resolve(__dirname, "../DB/ecommerce.db3") },
  useNullAsDefault: true,
};

module.exports = { optionsSql3 };
