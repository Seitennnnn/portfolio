// import framework Express untuk membuat routing API
const express = require("express")

// membuat object router dari Express
const router = express.Router()

// mengambil fungsi login dari file authController
const {login} = require("../controllers/authController")

// membuat endpoint POST /login
// ketika ada request POST ke /login maka fungsi login akan dijalankan
router.post("/login", login)

// mengekspor router agar bisa digunakan di file server utama
module.exports = router