import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Store from './store.js'
import Category from './category.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare storeId: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare price: number

  @column()
  declare categoryId: number | null

  @column()
  declare slug: string | null

  @column()
  declare discountPrice: number | null

  @column()
  declare stock: number | null

  @column()
  declare isActive: boolean

  @column()
  declare isFeatured: boolean

  @column()
  declare imageUrl: string | null

  @column()
  declare isAvailable: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Store)
  declare store: BelongsTo<typeof Store>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
