import Product from '#models/product'
import Store from '#models/store'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  // Public route to get products of a store (Active only, ordered by featured)
  async indexPublic({ params, response }: HttpContext) {
    const store = await Store.query().where('slug', params.slug).firstOrFail()
    const products = await Product.query()
      .where('storeId', store.id)
      .where('isActive', true)
      .orderBy('isFeatured', 'desc')
    return response.ok(products)
  }

  // Get all products across all stores of the authenticated user
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const stores = await user.related('stores').query().preload('products')
    // Flat map the products
    const products = stores.flatMap((store: any) => store.products)
    return response.ok(products)
  }

  // Create product for a specific store
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const data = request.only(['storeId', 'categoryId', 'name', 'slug', 'description', 'price', 'discountPrice', 'stock', 'imageUrl', 'isActive', 'isFeatured'])
    
    // Validate store belongs to user
    await Store.query().where('id', data.storeId).where('userId', user.id).firstOrFail()

    const product = await Product.create(data)
    return response.created(product)
  }

  // Update product
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const product = await Product.query()
      .where('id', params.id)
      .whereHas('store', (query) => {
        query.where('userId', user.id)
      })
      .firstOrFail()

    const data = request.only(['categoryId', 'name', 'slug', 'description', 'price', 'discountPrice', 'stock', 'imageUrl', 'isActive', 'isFeatured'])
    product.merge(data)
    await product.save()

    return response.ok(product)
  }

  // Delete product
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const product = await Product.query()
      .where('id', params.id)
      .whereHas('store', (query) => {
        query.where('userId', user.id)
      })
      .firstOrFail()

    await product.delete()
    return response.noContent()
  }

  // Toggle active status
  async toggleStatus({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const product = await Product.query()
      .where('id', params.id)
      .whereHas('store', (query) => {
        query.where('userId', user.id)
      })
      .firstOrFail()

    product.isActive = !product.isActive
    await product.save()

    return response.ok(product)
  }
}
