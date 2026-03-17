// controllers/projectController.js
const service = require("../services/projectService")
const cloudinary = require("../config/cloudinary")
const response = require("../utils/response")
const logger = require("../config/logger")
const fs = require("fs")

// fungsi untuk menangani request GET /projects
exports.getProjects = async (req,res,next)=>{
// menggunakan try-catch untuk menangani error yang mungkin terjadi saat mengambil data project
 try{

  // mengambil nilai page dan limit dari query parameters, jika tidak ada maka default ke page 1 dan limit 6
  const page = parseInt(req.query.page) || 1
  // limit adalah jumlah project yang ditampilkan per halaman, default 6
  const limit = parseInt(req.query.limit) || 6

  // memanggil fungsi getProjects dari service dengan parameter page dan limit untuk mendapatkan daftar project yang sesuai dengan pagination
  const projects = await service.getProjects(page, limit)

  response.success(res, projects)
// jika terjadi error, kirim response 500 dengan pesan error
 }catch(err){

  next(err)
 }

}

// fungsi untuk menangani request POST /projects
exports.createProject = async (req,res)=>{
 // menggunakan try-catch untuk menangani error yang mungkin terjadi saat membuat project baru
 try{

  // inisialisasi variabel imageUrl dengan nilai null
  let imageUrl = null

  // jika ada file gambar yang diupload, maka upload ke Cloudinary dan dapatkan URL-nya
  if(req.file){
    // upload file gambar ke Cloudinary menggunakan fungsi uploader.upload
   const result = await cloudinary.uploader.upload(req.file.path)
    // simpan URL gambar yang diupload ke variabel imageUrl
   imageUrl = result.secure_url
    // hapus file gambar yang diupload dari server setelah berhasil diupload ke Cloudinary
   fs.unlinkSync(req.file.path)
  }

  // memanggil fungsi createProject dari service dengan data yang dikirim di body request dan URL gambar yang sudah diupload
  const project = await service.createProject({
   ...req.body,
   image:imageUrl
  })

  res.status(201).json(project)
  logger.info(`Project created: ${project.title}`)
 }catch(err){

  res.status(500).json({error:err.message})

 }

}