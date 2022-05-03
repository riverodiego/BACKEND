const { optionsSql3 } = require("./contenedor/utils/optionsSql3");
const knex = require("knex")(optionsSql3);

knex.schema
  .createTable("mensajes", (table) => {
    table.increments("id").primary();
    table.string("email", 50).notNullable();
    table.timestamp("fecha").defaultTo(knex.fn.now());
    table.string("mensaje", 300);
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
