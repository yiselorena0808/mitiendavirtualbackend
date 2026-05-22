import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { hasMany, column } from '@adonisjs/lucid/orm'
import Store from './store.js'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @column()
  declare role: 'seller' | 'buyer' | 'admin'

  @column()
  declare planType: string | null

  @column.dateTime()
  declare subscriptionExpiresAt: DateTime | null

  @column()
  declare isActive: boolean

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  @hasMany(() => Store)
  declare stores: HasMany<typeof Store>
}
