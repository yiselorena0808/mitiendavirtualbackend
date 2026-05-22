import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class AdminController {
  
  // Middleware should ensure only role === 'admin' can reach here
  
  async getSellers({ response }: HttpContext) {
    const sellers = await User.query()
      .where('role', 'seller')
      .orderBy('createdAt', 'desc')
      
    return response.ok(sellers)
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
