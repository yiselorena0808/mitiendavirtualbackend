import { BaseCommand } from '@adonisjs/core/ace'
import User from '#models/user'

export default class CreateAdmin extends BaseCommand {
  static commandName = 'create:admin'
  static description = 'Creates the default admin account'
  static options = { startApp: true }

  async run() {
    const adminExists = await User.findBy('email', 'admin@mitienda.com')
    if (adminExists) {
      this.logger.info('Admin account already exists')
      return
    }

    await User.create({
      fullName: 'Administrador Principal',
      email: 'admin@mitienda.com',
      password: 'admin',
      role: 'admin',
      isActive: true,
      planType: 'admin'
    })

    this.logger.success('Admin account created: admin@mitienda.com / admin')
  }
}