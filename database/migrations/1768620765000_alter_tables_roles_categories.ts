import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('role').defaultTo('seller')
    })
    
    this.schema.alterTable('stores', (table) => {
      table.string('banner_url').nullable()
    })

    this.schema.alterTable('products', (table) => {
      table.string('category').nullable()
    })

    this.schema.alterTable('orders', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL').nullable()
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('role')
    })
    
    this.schema.alterTable('stores', (table) => {
      table.dropColumn('banner_url')
    })

    this.schema.alterTable('products', (table) => {
      table.dropColumn('category')
    })

    this.schema.alterTable('orders', (table) => {
      table.dropColumn('user_id')
    })
  }
}
