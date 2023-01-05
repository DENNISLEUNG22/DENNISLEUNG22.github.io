import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("shop", (table) => {
    table.string("bean", 255).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("shop", (table) => {
    table.dropColumn("bean");
  });
}
