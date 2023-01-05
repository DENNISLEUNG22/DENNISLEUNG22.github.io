import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('area'))) {
    await knex.schema.createTable('area', table => {
      table.increments('id')
      table.string('area_name', 100).nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('cafe_timetable'))) {
    await knex.schema.createTable('cafe_timetable', table => {
      table.increments('id')
      table.string('date_of_week', 255).nullable()
      table.string('opening_status', 255).nullable()
      table.time('opening_time').nullable()
      table.time('closing_time').nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('coffee_beans'))) {
    await knex.schema.createTable('coffee_beans', table => {
      table.increments('id')
      table.string('brand', 255).nullable()
      table.string('name', 255).nullable()
      table.string('origin', 255).nullable()
      table.string('variety', 255).nullable()
      table.string('flavors', 255).nullable()
      table.integer('weight_g').nullable()
      table.decimal('price_hkd', 10, 2).nullable()
      table.string('photo', 512).nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('cafe_profile'))) {
    await knex.schema.createTable('cafe_profile', table => {
      table.increments('id')
      table.string('name', 255).nullable()
      table.string('icon', 512).nullable()
      table.string('background_photo', 512).nullable()
      table.string('address', 512).nullable()
      table.integer('area_id').unsigned().nullable().references('area.id')
      table.point('geolocation').nullable()
      table.integer('cafe_timetable_id').unsigned().nullable().references('cafe_timetable.id')
      table.string('vibs', 255).nullable()
      table.string('taste', 255).nullable()
      // table.integer('coffee_beans_provided_id').unsigned().nullable().references('coffee_beans_provided.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('coffee_beans_provided'))) {
    await knex.schema.createTable('coffee_beans_provided', table => {
      table.increments('id')
      table.integer('cafe_profile_id').unsigned().nullable().references('cafe_profile.id')
      table.integer('coffee_beans_id').unsigned().nullable().references('coffee_beans.id')
      table.timestamps(false, true)
    })
  }


  if (!(await knex.schema.hasTable('district'))) {
    await knex.schema.createTable('district', table => {
      table.increments('id')
      table.string('district_name', 100).nullable()
      table.integer('area_id').unsigned().nullable().references('area.id')
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('district')
  await knex.schema.dropTableIfExists('coffee_beans_provided')
  await knex.schema.dropTableIfExists('cafe_profile')
  await knex.schema.dropTableIfExists('coffee_beans')
  await knex.schema.dropTableIfExists('cafe_timetable')
  await knex.schema.dropTableIfExists('area')
}
