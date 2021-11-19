exports.up = function (knex) {
    return knex.schema.createTable("tables", (table) => {
      table.integer('capacity')
      table.string('table_name')
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("tables");
  };