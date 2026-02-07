const bcrypt = require('bcryptjs');

// GANTI INI DENGAN DATA ANDA
const email = 'riskiapriansyahh22@gmail.com';      // Email baru Anda
const password = 'ikiganteng22';        // Password baru Anda
const nama = 'Riski Apriansyah';                  // Nama Anda

const hash = bcrypt.hashSync(password, 10);

console.log('='.repeat(50));
console.log('DATA ADMIN BARU:');
console.log('='.repeat(50));
console.log('Email    :', email);
console.log('Password :', password);
console.log('Nama     :', nama);
console.log('Hash     :', hash);
console.log('='.repeat(50));
console.log('\nCopy hash di atas untuk dipakai di SQL query!');