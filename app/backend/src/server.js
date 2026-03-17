// import framework Express untuk membuat server backend

// IF YOU DONT USE DB

/*
const express = require('express');

// membuat aplikasi server menggunakan Express
const app = express();

// middleware agar server bisa membaca data JSON dari request (biasanya dari frontend)
app.use(express.json())

// import file routes khusus untuk endpoint projects
const projectsRoutes = require('./routes/projectRoutes');

// memberi tahu server bahwa semua request ke /projects akan ditangani oleh projectsRoutes
app.use('/projects', projectsRoutes)

// menjalankan server di port 3000
app.listen(3000, () => {
    // menampilkan pesan di terminal bahwa server sudah berjalan
    console.log('Server Online on port 3000');
})
*/

// DIBAWAH INI ADALAH DB

// mengimpor library dotenv untuk membaca variabel lingkungan dari file .env
require("dotenv").config()


const {errorHandler} = require("./middleware/errorHandler")

// import framework Express untuk membuat server backend
const express = require("express")

// import middleware CORS agar frontend dari domain lain bisa mengakses API
const cors = require("cors")

// membuat aplikasi server menggunakan Express
const app = express()

// mengaktifkan CORS supaya request dari frontend tidak diblokir browser
app.use(cors())

// middleware agar server bisa membaca data JSON dari request body
app.use(express.json())

// import file routes yang berisi endpoint untuk autentikasi (login)
const authRoutes = require("./routes/authRoutes")

// semua request yang menuju /auth akan diarahkan ke authRoutes
app.use("/auth", authRoutes)

app.use('/uploads', express.static('uploads')) // agar file gambar yang diupload bisa diakses secara publik


// import file routes yang berisi endpoint untuk project
const projectRoutes = require("./routes/projectRoutes")

// semua request yang menuju /projects akan diarahkan ke projectRoutes
app.use("/projects", projectRoutes)

// menjalankan server di port 3000
app.listen(3000, () => {

  // menampilkan pesan di terminal bahwa server sudah berjalan
  console.log("Server running on port 3000")
})

app.use(errorHandler) // middleware untuk menangani error yang terjadi di seluruh aplikasi