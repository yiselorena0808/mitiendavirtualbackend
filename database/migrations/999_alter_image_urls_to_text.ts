import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('stores', (table) => {
      table.text('logo_url').alter()
      table.text('banner_url').alter()
    })

    this.schema.alterTable('products', (table) => {
      table.text('image_url').alter()
    })
  }

  async down() {
    this.schema.alterTable('stores', (table) => {
      table.string('logo_url', 255).alter()
      table.string('banner_url', 255).alter()
    })

    this.schema.alterTable('products', (table) => {
      table.string('image_url', 255).alter()
    })
  }
}
