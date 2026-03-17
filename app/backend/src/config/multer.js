// import library multer yang digunakan untuk upload file (gambar, dll)
const multer = require("multer")

// menentukan cara penyimpanan file yang diupload
const storage = multer.diskStorage({

  // menentukan folder tempat file disimpan
  destination: (req, file, cb) => {

    // cb = callback untuk memberi tahu multer lokasi penyimpanan
    // "uploads/" adalah folder tempat file akan disimpan
    cb(null, "uploads/")
  },

  // menentukan nama file yang akan disimpan
  filename: (req, file, cb) => {

    // membuat nama file unik dengan menambahkan timestamp
    // contoh: 17123412312-namaFile.jpg
    cb(null, Date.now() + "-" + file.originalname)
  }
})

// membuat middleware upload menggunakan konfigurasi storage di atas
const upload = multer({ storage })

// mengekspor middleware upload agar bisa digunakan di route lain
module.exports = upload