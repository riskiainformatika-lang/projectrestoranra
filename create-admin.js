const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Creating admin user...');
    
    const adminPassword = await hash('ikiganteng22', 10);
    
    // Hapus user lama kalau ada
    try {
        await prisma.user.delete({
            where: { email: 'riskiapriansyahh22@gmail.com' }
        });
        console.log('Old admin deleted');
    } catch (e) {
        console.log('No old admin to delete');
    }
    
    // Buat admin baru
    const admin = await prisma.user.create({
        data: {
            name: 'Riski Apriansyah',
            email: 'riskiapriansyahh22@gmail.com',
            password: adminPassword,
            phone: '081234567890',
            role: 'ADMIN',
        },
    });
    
    console.log('✅ Admin created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: ikiganteng22');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });