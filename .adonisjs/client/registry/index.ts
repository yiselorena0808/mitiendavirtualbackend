/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/auth/register',
    tokens: [{"old":"/api/auth/register","type":0,"val":"api","end":""},{"old":"/api/auth/register","type":0,"val":"auth","end":""},{"old":"/api/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/auth/login',
    tokens: [{"old":"/api/auth/login","type":0,"val":"api","end":""},{"old":"/api/auth/login","type":0,"val":"auth","end":""},{"old":"/api/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'stores.public_index': {
    methods: ["GET","HEAD"],
    pattern: '/api/stores/public',
    tokens: [{"old":"/api/stores/public","type":0,"val":"api","end":""},{"old":"/api/stores/public","type":0,"val":"stores","end":""},{"old":"/api/stores/public","type":0,"val":"public","end":""}],
    types: placeholder as Registry['stores.public_index']['types'],
  },
  'stores.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/public/stores/:slug',
    tokens: [{"old":"/api/public/stores/:slug","type":0,"val":"api","end":""},{"old":"/api/public/stores/:slug","type":0,"val":"public","end":""},{"old":"/api/public/stores/:slug","type":0,"val":"stores","end":""},{"old":"/api/public/stores/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['stores.show']['types'],
  },
  'products.index_public': {
    methods: ["GET","HEAD"],
    pattern: '/api/public/stores/:slug/products',
    tokens: [{"old":"/api/public/stores/:slug/products","type":0,"val":"api","end":""},{"old":"/api/public/stores/:slug/products","type":0,"val":"public","end":""},{"old":"/api/public/stores/:slug/products","type":0,"val":"stores","end":""},{"old":"/api/public/stores/:slug/products","type":1,"val":"slug","end":""},{"old":"/api/public/stores/:slug/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.index_public']['types'],
  },
  'categories.index_public': {
    methods: ["GET","HEAD"],
    pattern: '/api/public/stores/:slug/categories',
    tokens: [{"old":"/api/public/stores/:slug/categories","type":0,"val":"api","end":""},{"old":"/api/public/stores/:slug/categories","type":0,"val":"public","end":""},{"old":"/api/public/stores/:slug/categories","type":0,"val":"stores","end":""},{"old":"/api/public/stores/:slug/categories","type":1,"val":"slug","end":""},{"old":"/api/public/stores/:slug/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.index_public']['types'],
  },
  'orders.store': {
    methods: ["POST"],
    pattern: '/api/public/stores/:slug/orders',
    tokens: [{"old":"/api/public/stores/:slug/orders","type":0,"val":"api","end":""},{"old":"/api/public/stores/:slug/orders","type":0,"val":"public","end":""},{"old":"/api/public/stores/:slug/orders","type":0,"val":"stores","end":""},{"old":"/api/public/stores/:slug/orders","type":1,"val":"slug","end":""},{"old":"/api/public/stores/:slug/orders","type":0,"val":"orders","end":""}],
    types: placeholder as Registry['orders.store']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/auth/me',
    tokens: [{"old":"/api/auth/me","type":0,"val":"api","end":""},{"old":"/api/auth/me","type":0,"val":"auth","end":""},{"old":"/api/auth/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/api/auth/logout',
    tokens: [{"old":"/api/auth/logout","type":0,"val":"api","end":""},{"old":"/api/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'stores.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/stores',
    tokens: [{"old":"/api/stores","type":0,"val":"api","end":""},{"old":"/api/stores","type":0,"val":"stores","end":""}],
    types: placeholder as Registry['stores.index']['types'],
  },
  'stores.store': {
    methods: ["POST"],
    pattern: '/api/stores',
    tokens: [{"old":"/api/stores","type":0,"val":"api","end":""},{"old":"/api/stores","type":0,"val":"stores","end":""}],
    types: placeholder as Registry['stores.store']['types'],
  },
  'stores.update': {
    methods: ["PUT"],
    pattern: '/api/stores/:id',
    tokens: [{"old":"/api/stores/:id","type":0,"val":"api","end":""},{"old":"/api/stores/:id","type":0,"val":"stores","end":""},{"old":"/api/stores/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['stores.update']['types'],
  },
  'stores.destroy': {
    methods: ["DELETE"],
    pattern: '/api/stores/:id',
    tokens: [{"old":"/api/stores/:id","type":0,"val":"api","end":""},{"old":"/api/stores/:id","type":0,"val":"stores","end":""},{"old":"/api/stores/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['stores.destroy']['types'],
  },
  'uploads.store': {
    methods: ["POST"],
    pattern: '/api/uploads',
    tokens: [{"old":"/api/uploads","type":0,"val":"api","end":""},{"old":"/api/uploads","type":0,"val":"uploads","end":""}],
    types: placeholder as Registry['uploads.store']['types'],
  },
  'categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/categories',
    tokens: [{"old":"/api/categories","type":0,"val":"api","end":""},{"old":"/api/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.index']['types'],
  },
  'categories.store': {
    methods: ["POST"],
    pattern: '/api/categories',
    tokens: [{"old":"/api/categories","type":0,"val":"api","end":""},{"old":"/api/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.store']['types'],
  },
  'categories.update': {
    methods: ["PUT"],
    pattern: '/api/categories/:id',
    tokens: [{"old":"/api/categories/:id","type":0,"val":"api","end":""},{"old":"/api/categories/:id","type":0,"val":"categories","end":""},{"old":"/api/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.update']['types'],
  },
  'categories.destroy': {
    methods: ["DELETE"],
    pattern: '/api/categories/:id',
    tokens: [{"old":"/api/categories/:id","type":0,"val":"api","end":""},{"old":"/api/categories/:id","type":0,"val":"categories","end":""},{"old":"/api/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.destroy']['types'],
  },
  'products.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/products',
    tokens: [{"old":"/api/products","type":0,"val":"api","end":""},{"old":"/api/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.index']['types'],
  },
  'products.store': {
    methods: ["POST"],
    pattern: '/api/products',
    tokens: [{"old":"/api/products","type":0,"val":"api","end":""},{"old":"/api/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.store']['types'],
  },
  'products.update': {
    methods: ["PUT"],
    pattern: '/api/products/:id',
    tokens: [{"old":"/api/products/:id","type":0,"val":"api","end":""},{"old":"/api/products/:id","type":0,"val":"products","end":""},{"old":"/api/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.update']['types'],
  },
  'products.toggle_status': {
    methods: ["PATCH"],
    pattern: '/api/products/:id/toggle-status',
    tokens: [{"old":"/api/products/:id/toggle-status","type":0,"val":"api","end":""},{"old":"/api/products/:id/toggle-status","type":0,"val":"products","end":""},{"old":"/api/products/:id/toggle-status","type":1,"val":"id","end":""},{"old":"/api/products/:id/toggle-status","type":0,"val":"toggle-status","end":""}],
    types: placeholder as Registry['products.toggle_status']['types'],
  },
  'products.destroy': {
    methods: ["DELETE"],
    pattern: '/api/products/:id',
    tokens: [{"old":"/api/products/:id","type":0,"val":"api","end":""},{"old":"/api/products/:id","type":0,"val":"products","end":""},{"old":"/api/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.destroy']['types'],
  },
  'orders.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/orders',
    tokens: [{"old":"/api/orders","type":0,"val":"api","end":""},{"old":"/api/orders","type":0,"val":"orders","end":""}],
    types: placeholder as Registry['orders.index']['types'],
  },
  'orders.update': {
    methods: ["PUT"],
    pattern: '/api/orders/:id',
    tokens: [{"old":"/api/orders/:id","type":0,"val":"api","end":""},{"old":"/api/orders/:id","type":0,"val":"orders","end":""},{"old":"/api/orders/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['orders.update']['types'],
  },
  'chats.seller_chats': {
    methods: ["GET","HEAD"],
    pattern: '/api/seller/chats',
    tokens: [{"old":"/api/seller/chats","type":0,"val":"api","end":""},{"old":"/api/seller/chats","type":0,"val":"seller","end":""},{"old":"/api/seller/chats","type":0,"val":"chats","end":""}],
    types: placeholder as Registry['chats.seller_chats']['types'],
  },
  'orders.buyer_index': {
    methods: ["GET","HEAD"],
    pattern: '/api/buyer/orders',
    tokens: [{"old":"/api/buyer/orders","type":0,"val":"api","end":""},{"old":"/api/buyer/orders","type":0,"val":"buyer","end":""},{"old":"/api/buyer/orders","type":0,"val":"orders","end":""}],
    types: placeholder as Registry['orders.buyer_index']['types'],
  },
  'chats.buyer_chats': {
    methods: ["GET","HEAD"],
    pattern: '/api/buyer/chats',
    tokens: [{"old":"/api/buyer/chats","type":0,"val":"api","end":""},{"old":"/api/buyer/chats","type":0,"val":"buyer","end":""},{"old":"/api/buyer/chats","type":0,"val":"chats","end":""}],
    types: placeholder as Registry['chats.buyer_chats']['types'],
  },
  'chats.get_or_create': {
    methods: ["GET","HEAD"],
    pattern: '/api/chats/store/:storeId',
    tokens: [{"old":"/api/chats/store/:storeId","type":0,"val":"api","end":""},{"old":"/api/chats/store/:storeId","type":0,"val":"chats","end":""},{"old":"/api/chats/store/:storeId","type":0,"val":"store","end":""},{"old":"/api/chats/store/:storeId","type":1,"val":"storeId","end":""}],
    types: placeholder as Registry['chats.get_or_create']['types'],
  },
  'chats.messages': {
    methods: ["GET","HEAD"],
    pattern: '/api/chats/:id/messages',
    tokens: [{"old":"/api/chats/:id/messages","type":0,"val":"api","end":""},{"old":"/api/chats/:id/messages","type":0,"val":"chats","end":""},{"old":"/api/chats/:id/messages","type":1,"val":"id","end":""},{"old":"/api/chats/:id/messages","type":0,"val":"messages","end":""}],
    types: placeholder as Registry['chats.messages']['types'],
  },
  'chats.send_message': {
    methods: ["POST"],
    pattern: '/api/chats/:id/messages',
    tokens: [{"old":"/api/chats/:id/messages","type":0,"val":"api","end":""},{"old":"/api/chats/:id/messages","type":0,"val":"chats","end":""},{"old":"/api/chats/:id/messages","type":1,"val":"id","end":""},{"old":"/api/chats/:id/messages","type":0,"val":"messages","end":""}],
    types: placeholder as Registry['chats.send_message']['types'],
  },
  'admin.get_sellers': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/sellers',
    tokens: [{"old":"/api/admin/sellers","type":0,"val":"api","end":""},{"old":"/api/admin/sellers","type":0,"val":"admin","end":""},{"old":"/api/admin/sellers","type":0,"val":"sellers","end":""}],
    types: placeholder as Registry['admin.get_sellers']['types'],
  },
  'admin.update_subscription': {
    methods: ["PUT"],
    pattern: '/api/admin/sellers/:id',
    tokens: [{"old":"/api/admin/sellers/:id","type":0,"val":"api","end":""},{"old":"/api/admin/sellers/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/sellers/:id","type":0,"val":"sellers","end":""},{"old":"/api/admin/sellers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.update_subscription']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
