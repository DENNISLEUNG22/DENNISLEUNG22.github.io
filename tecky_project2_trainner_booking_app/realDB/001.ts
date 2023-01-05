import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    await knex.schema.createTable('users', table => {
      table.increments('id')
      table.string('username', 100).notNullable()
      table.string('password', 100).notNullable()
      table.integer('age').notNullable()
      table.string('gender', 30).notNullable()
      table.integer('phone').notNullable()
      table.string('email', 100).notNullable()
      table.text('profile_icon').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('main_event_type'))) {
    await knex.schema.createTable('main_event_type', table => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('area'))) {
    await knex.schema.createTable('area', table => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('event'))) {
    await knex.schema.createTable('event', table => {
      table.increments('id')
      table.integer('trainer_id').unsigned().notNullable().references('users.id')
      table.string('event_name', 100).notNullable()
      table.integer('main_event_type_id').unsigned().notNullable().references('main_event_type.id')
      table.date('date').notNullable()
      table.timestamp('start_time').notNullable()
      table.timestamp('end_time').notNullable()
      table.integer('area_id').unsigned().notNullable().references('area.id')
      table.text('full_address').notNullable()
      table.integer('class_size').notNullable()
      table.text('caption').notNullable()
      table.text('event_profile_photo').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('sub_event_type'))) {
    await knex.schema.createTable('sub_event_type', table => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.integer('main_event_type_id').unsigned().notNullable().references('main_event_type.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('training_class'))) {
    await knex.schema.createTable('training_class', table => {
      table.increments('id')
      table.integer('event_id').unsigned().notNullable().references('event.id')
      table.integer('student_id').unsigned().notNullable().references('users.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('district'))) {
    await knex.schema.createTable('district', table => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.integer('area_id').unsigned().notNullable().references('area.id')
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('district')
  await knex.schema.dropTableIfExists('training_class')
  await knex.schema.dropTableIfExists('sub_event_type')
  await knex.schema.dropTableIfExists('event')
  await knex.schema.dropTableIfExists('area')
  await knex.schema.dropTableIfExists('main_event_type')
  await knex.schema.dropTableIfExists('users')
}
