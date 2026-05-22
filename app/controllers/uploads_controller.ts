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

    // Asegurar que exista la carpeta
    const uploadsDir = app.makePath('public/uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const fileName = `${crypto.randomUUID()}.${file.extname}`
    await file.move(uploadsDir, {
      name: fileName,
    })

    // Return the public URL
    const url = `/uploads/${fileName}`
    return response.ok({ url })
  }
}
