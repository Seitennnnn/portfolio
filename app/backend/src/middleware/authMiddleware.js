// import library jsonwebtoken untuk memverifikasi token JWT
const jwt = require("jsonwebtoken")

// middleware untuk mengecek apakah request memiliki token yang valid
exports.verifyToken = (req,res,next)=>{

  // mengambil header authorization dari request
  const authHeader = req.headers.authorization

  // jika tidak ada header authorization
  if(!authHeader){

    // kirim response 401 (unauthorized) karena tidak ada token
    return res.status(401).json({message:"No token"})
  }

  // mengambil token dari format "Bearer TOKEN"
  // split(" ") akan memisahkan "Bearer" dan tokennya
  const token = authHeader.split(" ")[1]

  try{

    // memverifikasi token menggunakan SECRET_KEY
    const decoded = jwt.verify(token,"SECRET_KEY")

    // menyimpan data hasil decode token ke req.user
    // supaya bisa dipakai di controller berikutnya
    req.user = decoded

    // melanjutkan ke middleware atau controller berikutnya
    next()

  }catch(err){

    // jika token tidak valid atau sudah expired
    res.status(401).json({message:"Invalid token"})

  }

}