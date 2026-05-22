import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import Order from './order.js'
import Category from './category.js'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare whatsappNumber: string

  @column()
  declare themeColor: string | null

  @column()
  declare logoUrl: string | null

  @column()
  declare layoutStyle: string | null

  @column()
  declare bannerUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @hasMany(() => Category)
  declare categories: HasMany<typeof Category>
}
