// import fungsi body dan validationResult dari library express-validator untuk validasi data input
const {body, validationResult} = require("express-validator")

// middleware untuk validasi data project saat membuat atau mengupdate project
exports.validateProject = [
    // validasi bahwa field title, description, dan technology tidak boleh kosong
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("technology").notEmpty().withMessage("Technology is required"),

    // middleware untuk mengecek hasil validasi
    (req, res, next) => {
        // mengambil hasil validasi dari request
        const errors = validationResult(req)    
        // jika ada error validasi, kirim response 400 dengan daftar error
        if(!errors.isEmpty()){
            // jika validasi gagal, kirim response 400 (bad request) dengan pesan error
            return res.status(400).json({errors: errors.array()})
        }
        // jika validasi berhasil, lanjutkan ke middleware atau controller berikutnya
        next()
    }
]

