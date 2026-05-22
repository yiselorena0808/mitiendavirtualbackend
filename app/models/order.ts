import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Store from './store.js'
import OrderItem from './order_item.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare storeId: number

  @column()
  declare userId: number | null

  @column()
  declare customerName: string

  @column()
  declare customerPhone: string

  @column()
  declare totalPrice: number

  @column()
  declare status: 'pending' | 'completed' | 'cancelled'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Store)
  declare store: BelongsTo<typeof Store>

  @hasMany(() => OrderItem)
  declare items: HasMany<typeof OrderItem>
}
