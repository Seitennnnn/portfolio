// mengimpor library dotenv untuk membaca variabel lingkungan dari file .env
require("dotenv").config()

// mengambil class Pool dari library pg (PostgreSQL client untuk Node.js)
const { Pool } = require("pg")

// membuat koneksi ke database PostgreSQL menggunakan Pool
// Pool artinya kumpulan koneksi database supaya server bisa akses database lebih efisien
const pool = new Pool({

  // username database PostgreSQL
  user: process.env.DB_USER,

  // alamat database (localhost berarti database ada di komputer yang sama)
  host: "localhost",

  // nama database yang akan dipakai
  database: process.env.DB_NAME,

  // password untuk login ke database
  password: process.env.DB_PASSWORD,
  // port default PostgreSQL
  port: 5432
})

// mengekspor pool supaya bisa digunakan di file lain
// biasanya dipakai di controller untuk query database
module.exports = pool
