
// import konfigurasi database
const db = require("../config/db")

// fungsi untuk mengambil semua project dari database
exports.getAllProjects = async (page, limit) => {
 const offset = (page - 1) * limit
 const result = await db.query("SELECT * FROM projects_db LIMIT $1 OFFSET $2", [limit, offset])
 return result.rows
}

// fungsi untuk mengambil project berdasarkan ID
exports.createProject = async (title,description,technologies,image) => {
 const result = await db.query(
  "INSERT INTO projects_db (title,description,technologies,image) VALUES ($1,$2,$3,$4) RETURNING *",
  [title,description,technologies,image]
 )

 return result.rows[0]
}

// fungsi untuk mengambil project berdasarkan ID
exports.updateProject = async (id,title,description,technologies)=>{
 const result = await db.query(
  "UPDATE projects_db SET title=$1,description=$2,technologies=$3 WHERE id=$4 RETURNING *",
  [title,description,technologies,id]
 )

 return result.rows[0]
}

// fungsi untuk mengambil project berdasarkan ID
exports.getProjectById = async (id) => {
 const result = await db.query("SELECT * FROM projects_db WHERE id=$1", [id])
 return result.rows[0]
}

// fungsi untuk menghapus project berdasarkan ID
exports.deleteProject = async (id)=>{
 const result = await db.query(
  "DELETE FROM projects_db WHERE id=$1 RETURNING *",
  [id]
 )

 return result.rows[0]
}