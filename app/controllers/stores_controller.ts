import Store from '#models/store'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoresController {
  // Public route to get a store by slug
  async show({ params, response }: HttpContext) {
    const store = await Store.query().where('slug', params.slug).preload('products').firstOrFail()
    return response.ok(store)
  }

  // Public route to get all stores for the marketplace
  async publicIndex({ response }: HttpContext) {
    const stores = await Store.query().orderBy('createdAt', 'desc')
    return response.ok(stores)
  }

  // Get stores for authenticated user
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const stores = await user.related('stores').query()
    return response.ok(stores)
  }

  // Create a store
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const data = request.only(['name', 'slug', 'description', 'whatsappNumber', 'themeColor', 'logoUrl', 'layoutStyle', 'bannerUrl'])

    // Automatically assign userId
    const store = await Store.create({ ...data, userId: user.id })
    return response.created(store)
  }

  // Update a store
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const store = await Store.query().where('id', params.id).where('userId', user.id).firstOrFail()
    
    const data = request.only(['name', 'slug', 'description', 'whatsappNumber', 'themeColor', 'logoUrl', 'layoutStyle', 'bannerUrl'])
    store.merge(data)
    await store.save()

    return response.ok(store)
  }

  // Delete a store
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const store = await Store.query().where('id', params.id).where('userId', user.id).firstOrFail()
    await store.delete()
    return response.noContent()
  }
}
