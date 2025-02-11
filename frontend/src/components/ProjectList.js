import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProjectList = () => {
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  const edit = (event,projectId) => {
    navigate(`/project/edit/${projectId}`)
    console.log(event)
    event.stopPropagation();
  }

  const deleteProject = async (projectId) => {
    console.log(projectId)
    const response = await fetch(`http://localhost:5000/projects/${projectId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    const result = await response.json();
    fetchProjects()
  }

  const fetchProjects = async () => {
    const response = await fetch("http://localhost:5000/projects");
    const result = await response.json();
    setProjects(result)
  }

  useEffect(() => {
    fetchProjects()
  }, [])
  
    
  return (
    <div className='projects-list'>
      {projects.length === 0 && <div>No project found</div>}
      {projects.map(project => (
        <div className="project-container" key={project._id}>
            <Link to={`/project/${project._id}`}  style={{textDecoration: "none", color: "black"}}>
            <h2>{project.name}</h2>
            <p className="description">Description: <span>{project.description}</span></p>
            <p className="deadline">Deadline: <span>{project.deadline.split('T')[0]}</span></p>
            <p className="status">Status: <span>{project.status}</span></p>
              
       </Link>
            <div className="btns">
            <button onClick={(event)=>{edit(event, project._id)}} className="edit">Edit</button>
              <button onClick={()=>deleteProject(project._id)} className="delete">Delete</button>
            </div>
          </div>
      ))}
    </div>
  )
}

export default ProjectList
