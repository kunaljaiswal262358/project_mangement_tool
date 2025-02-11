import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProjectModel = () => {
    const {projectId} = useParams()
    const navigate = useNavigate()
    const [projectForm, setProjectForm] = useState({name: "", description: "", members: [], status: "", deadline: ""})

    const closeModel = () => {
        navigate("/")
    }

    const handleChange = (e) => {
        setProjectForm({...projectForm, [e.target.name] : e.target.value})
    }

    const CreateProject = async () => {
        const response = await fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(projectForm)
        })
        const result = await response.json();

    }

    const editProject = async () => {
        const response = await fetch(`http://localhost:5000/projects/${projectId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(projectForm)
        })
        const result = await response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(projectId) editProject()
        else CreateProject()
        closeModel()
    }

    const fetchProjectDetails = async (projectId) => {
        const response = await fetch(`http://localhost:5000/projects/${projectId}`);
        const result = await response.json();
        fillProjectForm(result)
    }

    const fillProjectForm = (project) => {
        project.deadline = project["deadline"].split('T')[0]
        for (const key in project) {
            if(projectForm[key] === "") {
                setProjectForm(prevForm => ({ ...prevForm, [key]: project[key] }));
            }
        }

    }

    useEffect(() => {
        if(projectId) {
            fetchProjectDetails(projectId);
        }
            
    }, [])
    
  return (
    <div className='project-model'>
        {projectId ? <h2>Edit Project</h2> : <h2>Create Project</h2>}
        <div className="close-model" onClick={closeModel}>X</div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" name='name' value={projectForm.name} onChange={handleChange} placeholder='Enter project name' />
        <input type="text" name='description' value={projectForm.description} onChange={handleChange} placeholder='Enter project description' />
        <select name="status" id="status" value={projectForm.status} onChange={handleChange}>
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
        </select>
        <input type="Date" name='deadline' value={projectForm.deadline} onChange={handleChange} placeholder='Enter deadline' />
        <button className="save-and-close">Save and close</button>
      </form>
    </div>
  )
}

export default ProjectModel
