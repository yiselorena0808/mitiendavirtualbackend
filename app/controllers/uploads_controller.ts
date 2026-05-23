import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'
import crypto from 'node:crypto'

export default class UploadsController {
  async store({ request, response }: HttpContext) {
    const file = request.file('image', {
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    })

    if (!file) {
      return response.badRequest('No se subió ningún archivo')
    }

    if (!file.isValid) {
      return response.badRequest(file.errors)
    }

    try {
      const fileBuffer = fs.readFileSync(file.tmpPath!)
      const base64 = fileBuffer.toString('base64')
      const url = `data:image/${file.extname};base64,${base64}`
      return response.ok({ url })
    } catch (error) {
      return response.internalServerError('Error al procesar la imagen')
    }
  }
}
