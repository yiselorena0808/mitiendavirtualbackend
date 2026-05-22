import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE')
      table.string('customer_name').notNullable()
      table.string('customer_phone').notNullable()
      table.decimal('total_price', 12, 2).notNullable()
      table.enum('status', ['pending', 'completed', 'cancelled']).defaultTo('pending')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
