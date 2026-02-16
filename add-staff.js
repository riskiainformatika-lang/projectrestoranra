const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Creating staff admin...');
    
    // EDIT DATA DI BAWAH INI:
    const staffEmail = 'staffadmin@gmail.com';  // Ganti dengan email staff
    const staffPassword = 'ikiganteng22';       // Ganti dengan password staff
    const staffName = 'Staff Admin Nusa Rasa Resto';       // Ganti dengan nama staff
    const staffPhone = '08123456789';         // Ganti dengan no HP staff
    
    const hashedPassword = await hash(staffPassword, 10);
    
    const staff = await prisma.user.create({
        data: {
            name: staffName,
            email: staffEmail,
            password: hashedPassword,
            phone: staffPhone,
            role: 'ADMIN', // Bisa juga 'ADMIN' kalau mau full admin
        },
    });
    
    console.log('✅ Staff admin created successfully!');
    console.log('Name:', staff.name);
    console.log('Email:', staff.email);
    console.log('Password:', staffPassword);
    console.log('Role:', staff.role);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });