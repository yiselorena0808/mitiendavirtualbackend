import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'fullName', 'role'])
    
    // Simple validation could go here
    const isSeller = data.role === 'seller'
    const user = await User.create({
      ...data,
      isActive: true, // Always start active (buyers too, and sellers get a trial)
      planType: isSeller ? 'prueba' : 'free',
      subscriptionExpiresAt: isSeller ? DateTime.now().plus({ days: 3 }) : null
    })

    const token = await User.accessTokens.create(user)

    return response.created({
      user,
      token: token.value!.release(),
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      user,
      token: token.value!.release(),
    })
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.user
    return response.ok(user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken!.identifier)
    return response.noContent()
  }
}
