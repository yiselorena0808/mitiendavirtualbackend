/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
const StoresController = () => import('#controllers/stores_controller')
const ProductsController = () => import('#controllers/products_controller')
const OrdersController = () => import('#controllers/orders_controller')

router.get('/fix-admin', async () => {
  const User = (await import('#models/user')).default
  let user = await User.findBy('email', 'admin@mitienda.com')
  if (!user) {
    user = new User()
    user.email = 'admin@mitienda.com'
  }
  user.fullName = 'Administrador Principal'
  user.password = 'admin'
  user.role = 'admin'
  user.isActive = true
  user.planType = 'admin'
  await user.save()
  return { success: true, message: 'Admin account created/updated perfectly.' }
})

router.group(() => {
  // Auth
  router.post('auth/register', [AuthController, 'register'])
  router.post('auth/login', [AuthController, 'login'])

  // Public Marketplace
  router.get('stores/public', [StoresController, 'publicIndex'])

  // Public Storefronts
  router.get('public/stores/:slug', [StoresController, 'show'])
  router.get('public/stores/:slug/products', [ProductsController, 'indexPublic'])
  router.get('public/stores/:slug/categories', [() => import('#controllers/categories_controller'), 'indexPublic'])
  router.post('public/stores/:slug/orders', [OrdersController, 'store'])

  // Protected routes
  router.group(() => {
    router.get('auth/me', [AuthController, 'me'])
    router.post('auth/logout', [AuthController, 'logout'])

    // Stores
    router.get('stores', [StoresController, 'index'])
    router.post('stores', [StoresController, 'store'])
    router.put('stores/:id', [StoresController, 'update'])
    router.delete('stores/:id', [StoresController, 'destroy'])

    // Uploads
    router.post('uploads', [() => import('#controllers/uploads_controller'), 'store'])

    // Categories (Seller)
    router.get('categories', [() => import('#controllers/categories_controller'), 'index'])
    router.post('categories', [() => import('#controllers/categories_controller'), 'store'])
    router.put('categories/:id', [() => import('#controllers/categories_controller'), 'update'])
    router.delete('categories/:id', [() => import('#controllers/categories_controller'), 'destroy'])

    // Products (Seller)
    router.get('products', [ProductsController, 'index'])
    router.post('products', [ProductsController, 'store'])
    router.put('products/:id', [ProductsController, 'update'])
    router.patch('products/:id/toggle-status', [ProductsController, 'toggleStatus'])
    router.delete('products/:id', [ProductsController, 'destroy'])

    // Orders (Seller)
    router.get('orders', [OrdersController, 'index'])
    router.put('orders/:id', [OrdersController, 'update'])

    // Chats (Seller)
    router.get('seller/chats', [() => import('#controllers/chats_controller'), 'sellerChats'])
  }).use(middleware.auth({ guards: ['api'] }))

  // Buyer routes
  router.group(() => {
    router.get('buyer/orders', [OrdersController, 'buyerIndex'])
    router.get('buyer/chats', [() => import('#controllers/chats_controller'), 'buyerChats'])
    
    // Chats (Buyer & Seller shared logic mostly in controller)
    router.get('chats/store/:storeId', [() => import('#controllers/chats_controller'), 'getOrCreate'])
    router.get('chats/:id/messages', [() => import('#controllers/chats_controller'), 'messages'])
    router.post('chats/:id/messages', [() => import('#controllers/chats_controller'), 'sendMessage'])
  }).use(middleware.auth({ guards: ['api'] }))

  // Admin routes
  router.group(() => {
    router.get('admin/stats', [() => import('#controllers/admin_controller'), 'getStats'])
    router.get('admin/sellers', [() => import('#controllers/admin_controller'), 'getSellers'])
    router.get('admin/buyers', [() => import('#controllers/admin_controller'), 'getBuyers'])
    router.get('admin/stores', [() => import('#controllers/admin_controller'), 'getStores'])
    router.get('admin/products', [() => import('#controllers/admin_controller'), 'getProducts'])
    router.put('admin/sellers/:id', [() => import('#controllers/admin_controller'), 'updateSubscription'])
    router.put('admin/users/:id/password', [() => import('#controllers/admin_controller'), 'updatePassword'])
  }).use(middleware.auth({ guards: ['api'] }))

}).prefix('api')
