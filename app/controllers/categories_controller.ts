import Category from '#models/category'
import Store from '#models/store'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  // Get all categories for a specific store (Public)
  async indexPublic({ params, response }: HttpContext) {
    const store = await Store.query().where('slug', params.slug).firstOrFail()
    const categories = await Category.query().where('storeId', store.id)
    return response.ok(categories)
  }

  // Get all categories for the authenticated user's stores
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const stores = await user.related('stores').query().preload('categories')
    const categories = stores.flatMap((store: any) => store.categories)
    return response.ok(categories)
  }

  // Create a new category
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const data = request.only(['storeId', 'name', 'slug'])
    
    // Verify store belongs to user
    await Store.query().where('id', data.storeId).where('userId', user.id).firstOrFail()

    const category = await Category.create(data)
    return response.created(category)
  }

  // Update a category
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const category = await Category.query()
      .where('id', params.id)
      .whereHas('store', (query) => {
        query.where('userId', user.id)
      })
      .firstOrFail()

    const data = request.only(['name', 'slug'])
    category.merge(data)
    await category.save()

    return response.ok(category)
  }

  // Delete a category
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const category = await Category.query()
      .where('id', params.id)
      .whereHas('store', (query) => {
        query.where('userId', user.id)
      })
      .firstOrFail()

    await category.delete()
    return response.noContent()
  }
}
