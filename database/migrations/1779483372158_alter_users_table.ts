import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('plan_type').nullable().defaultTo('free') // free, weekly, biweekly, monthly
      table.dateTime('subscription_expires_at').nullable()
      table.boolean('is_active').defaultTo(true) // Start true for buyers, admin disables sellers if needed
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('plan_type')
      table.dropColumn('subscription_expires_at')
      table.dropColumn('is_active')
    })
  }
}