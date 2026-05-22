import type { HttpContext } from '@adonisjs/core/http'
import Chat from '#models/chat'
import Message from '#models/message'

export default class ChatsController {
  
  // For Buyer: Get or create chat with a specific store
  async getOrCreate({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const storeId = params.storeId

    let chat = await Chat.query()
      .where('storeId', storeId)
      .where('userId', user.id)
      .preload('store')
      .first()

    if (!chat) {
      chat = await Chat.create({
        storeId: storeId,
        userId: user.id
      })
      await chat.load('store')
    }

    return response.ok(chat)
  }

  // For Seller: Get all chats for their stores
  async sellerChats({ auth, response }: HttpContext) {
    const user = auth.user!
    
    // Find all chats where the chat's store belongs to the seller
    const chats = await Chat.query()
      .whereHas('store', (q: any) => {
        q.where('userId', user.id)
      })
      .preload('user') // The buyer
      .preload('store')
      .orderBy('updatedAt', 'desc')

    return response.ok(chats)
  }

  // For Buyer: Get all their chats
  async buyerChats({ auth, response }: HttpContext) {
    const user = auth.user!
    
    const chats = await Chat.query()
      .where('userId', user.id)
      .preload('store')
      .orderBy('updatedAt', 'desc')

    return response.ok(chats)
  }

  // Get messages for a specific chat
  async messages({ auth, params, response }: HttpContext) {
    const user = auth.user!
    
    const chat = await Chat.query()
      .where('id', params.id)
      .preload('store')
      .firstOrFail()

    // Authorization: User must be either the buyer of this chat OR the seller of the store
    const isBuyer = chat.userId === user.id
    const isSeller = chat.store.userId === user.id

    if (!isBuyer && !isSeller) {
      return response.unauthorized({ message: 'No tienes permiso para ver este chat.' })
    }

    const messages = await Message.query()
      .where('chatId', chat.id)
      .orderBy('createdAt', 'asc')

    return response.ok(messages)
  }

  // Send a message
  async sendMessage({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const content = request.input('content')

    const chat = await Chat.query()
      .where('id', params.id)
      .preload('store')
      .firstOrFail()

    const isBuyer = chat.userId === user.id
    const isSeller = chat.store.userId === user.id

    if (!isBuyer && !isSeller) {
      return response.unauthorized({ message: 'No tienes permiso para enviar mensajes en este chat.' })
    }

    const senderType = isSeller ? 'seller' : 'buyer'

    const message = await Message.create({
      chatId: chat.id,
      senderType: senderType,
      content: content
    })

    // Update chat timestamp
    chat.updatedAt = message.createdAt
    await chat.save()

    return response.created(message)
  }
}
