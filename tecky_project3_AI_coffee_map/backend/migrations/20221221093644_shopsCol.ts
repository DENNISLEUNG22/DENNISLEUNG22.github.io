import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("shop", (table) => {
    table.string("name", 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("shop", (table) => {
    table.dropColumn("name");
  });
}
