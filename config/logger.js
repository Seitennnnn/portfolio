// import library winston yang digunakan untuk membuat sistem logging
const winston = require("winston")

// membuat object logger menggunakan winston
const logger = winston.createLogger({

  // menentukan level log minimum yang akan dicatat
  // level "info" berarti info, warning, dan error akan dicatat
  level:"info",

  // menentukan format log
  format:winston.format.combine(

    // menambahkan timestamp (waktu) pada setiap log
    winston.format.timestamp(),

    // mengubah log menjadi format JSON
    winston.format.json()
  ),

  // menentukan tempat penyimpanan log (transport)
  transports:[

    // menampilkan log di terminal / console
    new winston.transports.Console(),

    // menyimpan log error ke file logs/error.log
    // hanya log dengan level "error" yang masuk ke file ini
    new winston.transports.File({filename:"logs/error.log",level:"error"}),

    // menyimpan semua log (info, warn, error) ke file logs/app.log
    new winston.transports.File({filename:"logs/app.log"})
  ]

})

// mengekspor logger agar bisa digunakan di file lain
module.exports = logger