const repo = require("../repositories/projectRepo")

exports.getProjects = async (page, limit)=>{
 return await repo.getAllProjects(page, limit)
}

exports.getProjectById = async (id)=>{
 return await repo.getProjectById(id)
}

exports.createProject = async (data)=>{
 return await repo.createProject(
  data.title,
  data.description,
  data.technologies,
  data.image
 )
}

exports.updateProjectById = async (id,data)=>{
 return await repo.updateProject(
  id,
  data.title,
  data.description,
  data.technologies
 )
}

exports.deleteProjectById = async (title)=>{
 return await repo.deleteProject(title)
}