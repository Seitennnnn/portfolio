

// DIBAWAH INI ADALAH DB 

// import middleware untuk verifikasi token JWT
const {verifyToken} = require("../middleware/authMiddleware")

// import middleware untuk validasi data project
const {validateProject} = require("../middleware/projectValidation")

// import framework Express untuk membuat router API
const express = require("express")

// membuat object router dari Express untuk menangani endpoint
const router = express.Router()

// import middleware Multer untuk menangani upload file gambar
const upload = require("../config/multer")
// mengambil fungsi controller dari file projectController
const {
  getProjects,   // fungsi untuk mengambil semua project dari database
  createProject,  // fungsi untuk menambahkan project baru
  getProjectById, // fungsi untuk mengambil project berdasarkan ID
  rmProjectByTitle, // fungsi untuk menghapus project berdasarkan title
  updateProjectByID, // fungsi untuk mengupdate project berdasarkan ID
} = require("../controllers/projectController")



// endpoint GET /projects
// ketika ada request GET ke /projects maka jalankan fungsi getProjects

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Ambil semua project
 *     responses:
 *       200:
 *         description: Berhasil ambil data
 */
router.get("/", getProjects)

// endpoint POST /projects
// ketika ada request POST ke /projects maka jalankan fungsi createProject

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Tambah project baru
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tech:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Project berhasil dibuat
 */
router.post("/", verifyToken, upload.single("image"), validateProject, createProject)

// endpoint GET /projects/:id
// :id artinya parameter dinamis (contoh: /projects/1)
// ketika dipanggil maka jalankan fungsi getProjectById
router.get("/:id", getProjectById)

// endpoint DELETE /projects/:title
// ketika ada request DELETE ke /projects/:title maka jalankan fungsi rmProjectByTitle
router.delete("/:title", verifyToken, rmProjectByTitle)

// endpoint PUT /projects/:id
// ketika ada request PUT ke /projects/:id maka jalankan fungsi updateProjectByID
router.put("/:id", verifyToken, updateProjectByID)


// mengekspor router agar bisa digunakan di file server utama
module.exports = router