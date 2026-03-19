// mengambil koneksi database dari file config/db
const db = require("../config/db")

// import library bcrypt untuk membandingkan password yang sudah di-hash
const bcrypt = require("bcrypt")

// import library jsonwebtoken untuk membuat token login (JWT)
const jwt = require("jsonwebtoken")

// fungsi login untuk admin
exports.login = async (req,res)=>{
  // mengambil username dan password dari body request
  const {username,password} = req.body

  try{

    // mencari user admin di database berdasarkan username
    const result = await db.query(
      "SELECT * FROM admins WHERE username=$1",
      [username]
    )

    // jika username tidak ditemukan di database
    if(result.rows.length === 0){

      // kirim response 401 (unauthorized) dengan pesan user tidak ditemukan
      return res.status(401).json({message:"User not found"})
    }

    // mengambil data admin dari hasil query
    const admin = result.rows[0]

    // membandingkan password yang dimasukkan dengan password hash di database
    const match = await bcrypt.compare(password, admin.password)

    // jika password tidak cocok
    if(!match){

      // kirim response 401 dengan pesan password salah
      return res.status(401).json({message:"Wrong password"})
    }

    // membuat token JWT untuk user yang berhasil login
    const token = jwt.sign(

      // payload yang disimpan di dalam token
      {id:admin.id},

      // secret key untuk menandatangani token
      "SECRET_KEY",

      // masa berlaku token (1 hari)
      {expiresIn:"1d"}
    )

    // mengirim token ke client
    res.json({token})

  }catch(err){

    // jika terjadi error di server
    res.status(500).json({error:err.message})

  }

}