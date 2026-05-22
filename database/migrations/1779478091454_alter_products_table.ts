import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('SET NULL').nullable()
      table.string('slug').nullable() // making nullable initially to avoid breaking existing rows
      table.decimal('discount_price', 10, 2).nullable()
      table.integer('stock').nullable().defaultTo(0)
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_featured').defaultTo(false)
      
      // We will drop the old 'category' string column if it exists, but SQLite doesn't support dropColumn easily sometimes. 
      // Fortunately Adonis v6 with better-sqlite3 handles it.
      table.dropColumn('category')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('category_id')
      table.dropColumn('slug')
      table.dropColumn('discount_price')
      table.dropColumn('stock')
      table.dropColumn('is_active')
      table.dropColumn('is_featured')
      table.string('category').nullable()
    })
  }
}