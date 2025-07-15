const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

async function main() {
  const prisma = new PrismaClient()
  const hashedPassword = await bcrypt.hash('password123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('Admin user created')
}

main()
