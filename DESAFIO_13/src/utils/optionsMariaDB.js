// const path = require('path')

// const optionsSql3 = {
//     client: "better-sqlite3",
//     connection: { filename: path.resolve(__dirname, "./DB/ecommerce.db3") },
//     useNullAsDefault: true
// }

const optionsMariaDB = {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "db_productos",
    },
  };
  
  module.exports = { optionsMariaDB };