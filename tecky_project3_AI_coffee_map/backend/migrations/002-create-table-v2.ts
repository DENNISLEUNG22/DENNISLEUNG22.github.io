import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");
      table.text("username").notNullable();
      table.text("password_hash").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("shop"))) {
    await knex.schema.createTable("shop", (table) => {
      table.increments("id");
      table.text("address").notNullable();
      table.point("latlng").notNullable();
      table.text("start_time").nullable();
      table.text("end_time").nullable();
      table.text("tel").nullable();
      table.integer("owner_id").unsigned().nullable().references("user.id");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("coffee"))) {
    await knex.schema.createTable("coffee", (table) => {
      table.increments("id");
      table.integer("shop_id").unsigned().notNullable().references("shop.id");
      table.text("name").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("coffee_variant"))) {
    await knex.schema.createTable("coffee_variant", (table) => {
      table.increments("id");
      table
        .integer("coffee_id")
        .unsigned()
        .notNullable()
        .references("coffee.id");
      table.text("name").notNullable();
      table.integer("price").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("taste_report"))) {
    await knex.schema.createTable("taste_report", (table) => {
      table.increments("id");
      table
        .integer("coffee_variant_id")
        .unsigned()
        .notNullable()
        .references("coffee_variant.id");
      table.integer("user_id").unsigned().notNullable().references("user.id");
      table.integer("bitter").notNullable();
      table.integer("sweet").notNullable();
      table.integer("soft").notNullable();
      table.integer("milk").notNullable();
      table.integer("sour").notNullable();
      table.integer("cream").notNullable();
      table.integer("latte_art").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("bean"))) {
    await knex.schema.createTable("bean", (table) => {
      table.increments("id");
      table.text("brand").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("coffee_content"))) {
    await knex.schema.createTable("coffee_content", (table) => {
      table.increments("id");
      table
        .integer("coffee_id")
        .unsigned()
        .notNullable()
        .references("coffee.id");
      table.integer("bean_id").unsigned().notNullable().references("bean.id");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("shop_images"))) {
    await knex.schema.createTable("shop_images", (table) => {
      table.increments("id");
      table.integer("shop_id").unsigned().notNullable().references("shop.id");
      table.integer("image").notNullable();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("shop_images");
  await knex.schema.dropTableIfExists("coffee_content");
  await knex.schema.dropTableIfExists("bean");
  await knex.schema.dropTableIfExists("taste_report");
  await knex.schema.dropTableIfExists("coffee_variant");
  await knex.schema.dropTableIfExists("coffee");
  await knex.schema.dropTableIfExists("shop");
  await knex.schema.dropTableIfExists("user");
}
