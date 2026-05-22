import Order from '#models/order'
import Store from '#models/store'
import type { HttpContext } from '@adonisjs/core/http'
import OrderItem from '#models/order_item'

export default class OrdersController {
  // Public route to create an order for a store
  async store({ auth, params, request, response }: HttpContext) {
    const store = await Store.query().where('slug', params.slug).firstOrFail()
    const data = request.only(['customerName', 'customerPhone', 'items'])
    
    // items should be [{ productId: 1, quantity: 2, unitPrice: 10.5 }]
    
    // Calculate total price
    const totalPrice = data.items.reduce((acc: number, item: any) => acc + (item.quantity * item.unitPrice), 0)

    const order = await Order.create({
      storeId: store.id,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      totalPrice,
      status: 'pending',
      userId: auth?.user?.id || null, // If authenticated buyer
    })

    // Create order items
    for (const item of data.items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })
    }

    return response.created(order)
  }

  // Get all orders for the authenticated user's stores
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    
    const stores = await user.related('stores').query()
    const storeIds = stores.map((store: any) => store.id)

    const orders = await Order.query().whereIn('storeId', storeIds).preload('items').orderBy('createdAt', 'desc')
    
    return response.ok(orders)
  }

  // Update order status
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const order = await Order.query()
      .where('id', params.id)
      .whereHas('store', (query) => {
        query.where('userId', user.id)
      })
      .firstOrFail()

    const { status } = request.only(['status'])
    order.status = status
    await order.save()

    return response.ok(order)
  }

  // Get orders for authenticated buyer
  async buyerIndex({ auth, response }: HttpContext) {
    const user = auth.user!
    const orders = await Order.query().where('userId', user.id).preload('store').preload('items').orderBy('createdAt', 'desc')
    return response.ok(orders)
  }
}
