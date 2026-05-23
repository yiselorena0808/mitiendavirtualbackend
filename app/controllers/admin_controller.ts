import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Store from '#models/store'
import Product from '#models/product'
import { DateTime } from 'luxon'

export default class AdminController {
  
  // Middleware should ensure only role === 'admin' can reach here
  
  async getSellers({ response }: HttpContext) {
    const sellers = await User.query()
      .where('role', 'seller')
      .orderBy('createdAt', 'desc')
      
    return response.ok(sellers)
  }

  async getBuyers({ response }: HttpContext) {
    const buyers = await User.query()
      .where('role', 'buyer')
      .orderBy('createdAt', 'desc')
      
    return response.ok(buyers)
  }

  async getStores({ response }: HttpContext) {
    const stores = await Store.query().preload('user').orderBy('createdAt', 'desc')
    return response.ok(stores)
  }

  async getProducts({ response }: HttpContext) {
    const products = await Product.query().preload('store').orderBy('createdAt', 'desc')
    return response.ok(products)
  }

  async getStats({ response }: HttpContext) {
    const sellersCount = await User.query().where('role', 'seller').count('* as total')
    const buyersCount = await User.query().where('role', 'buyer').count('* as total')
    const activeSellersCount = await User.query().where('role', 'seller').andWhere('isActive', true).count('* as total')

    return response.ok({
      totalSellers: sellersCount[0].$extras.total || 0,
      totalBuyers: buyersCount[0].$extras.total || 0,
      activeSellers: activeSellersCount[0].$extras.total || 0
    })
  }

  async updatePassword({ request, params, response }: HttpContext) {
    const userId = params.id
    const { password } = request.only(['password'])

    const userToUpdate = await User.findOrFail(userId)
    userToUpdate.password = password
    await userToUpdate.save()

    return response.ok({ message: 'Contraseña actualizada' })
  }

  async updateSubscription({ request, params, response }: HttpContext) {
    const sellerId = params.id
    const { isActive, addDays, planType } = request.only(['isActive', 'addDays', 'planType'])

    const seller = await User.findOrFail(sellerId)

    if (isActive !== undefined) {
      seller.isActive = isActive
    }

    if (planType !== undefined) {
      seller.planType = planType
    }

    if (addDays) {
      const now = DateTime.now()
      let currentExpiry = seller.subscriptionExpiresAt

      // If no expiry or expiry is in the past, start from now
      if (!currentExpiry || currentExpiry < now) {
        currentExpiry = now
      }

      seller.subscriptionExpiresAt = currentExpiry.plus({ days: addDays })
    }

    await seller.save()

    return response.ok(seller)
  }
}
