// middleware/errorHandler.js
// middleware untuk menangani error yang terjadi di seluruh aplikasi
exports.errorHandler = (err,req,res,next)=>{
    // mencetak error ke console untuk debugging
 console.error(err)
//  mengambil status code dari error, jika tidak ada maka default ke 500 (internal server error)
 const status = err.status || 500
// mengirim response dengan status code yang sesuai dan pesan error
 res.status(status).json({
  success:false,
  message:err.message || "Internal server error"
 })

}