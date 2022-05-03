const { optionsMariaDB } = require("./contenedor/utils/optionsMariaDB");
const knex = require("knex")(optionsMariaDB);

knex.schema
  .createTable("productos", (table) => {
    table.increments("id").primary();
    table.string("nombre", 30).notNullable();
    table.float("precio");
    table.string("foto_url", 200);
  })
  .then(() => {
    console.log("Tabla creada!");
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })

  .finally(() => {
    knex.destroy();
  });
