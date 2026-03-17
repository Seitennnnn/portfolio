const repo = require("../repositories/projectRepo")

exports.getProjects = async (page, limit)=>{
 return await repo.getAllProjects(page, limit)
}

exports.createProject = async (data)=>{
 return await repo.createProject(
  data.title,
  data.description,
  data.technologies,
  data.image
 )
}

exports.updateProject = async (id,data)=>{
 return await repo.updateProject(
  id,
  data.title,
  data.description,
  data.technologies
 )
}

exports.deleteProject = async (id)=>{
 return await repo.deleteProject(id)
}