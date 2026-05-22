/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
    logout: typeof routes['auth.logout']
  }
  stores: {
    publicIndex: typeof routes['stores.public_index']
    show: typeof routes['stores.show']
    index: typeof routes['stores.index']
    store: typeof routes['stores.store']
    update: typeof routes['stores.update']
    destroy: typeof routes['stores.destroy']
  }
  products: {
    indexPublic: typeof routes['products.index_public']
    index: typeof routes['products.index']
    store: typeof routes['products.store']
    update: typeof routes['products.update']
    toggleStatus: typeof routes['products.toggle_status']
    destroy: typeof routes['products.destroy']
  }
  categories: {
    indexPublic: typeof routes['categories.index_public']
    index: typeof routes['categories.index']
    store: typeof routes['categories.store']
    update: typeof routes['categories.update']
    destroy: typeof routes['categories.destroy']
  }
  orders: {
    store: typeof routes['orders.store']
    index: typeof routes['orders.index']
    update: typeof routes['orders.update']
    buyerIndex: typeof routes['orders.buyer_index']
  }
  uploads: {
    store: typeof routes['uploads.store']
  }
  chats: {
    sellerChats: typeof routes['chats.seller_chats']
    buyerChats: typeof routes['chats.buyer_chats']
    getOrCreate: typeof routes['chats.get_or_create']
    messages: typeof routes['chats.messages']
    sendMessage: typeof routes['chats.send_message']
  }
  admin: {
    getSellers: typeof routes['admin.get_sellers']
    updateSubscription: typeof routes['admin.update_subscription']
  }
}
