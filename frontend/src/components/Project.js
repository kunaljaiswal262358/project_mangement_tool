import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Project = () => {
    const {projectId} = useParams()
    const [taskId, setTaskId] = useState(null)
    const [projectDetails, setProjectDetails ] = useState({})
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({title: "", description: "", project: projectId, assignedTo: "", status: "", priority: "", deadline: ""})

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const editTask = async (taskId) => {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })
      const result = await response.json();
      console.log(result)
      setTaskId(null)
      setIsOpen(false)
      setFormData({title: "", description: "", project: projectId, assignedTo: "", status: "", priority: "", deadline: ""})
      fetchTasks()
    }

    const handleEdit = (task) => {
      setIsOpen(true)
      for (const key in task) {
        if (formData.hasOwnProperty(key)) {
          if(key !== "assignedTo")           
            setFormData(prevForm => ({ ...prevForm, [key]: task[key] }));
        }
      }
      setFormData(prevForm => ({ ...prevForm, "assignedTo": task["assignedTo"]._id }));
      setTaskId(task._id)
    }

    const deleteTask = async (taskId) => {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })
      fetchTasks()
    }

    const addTask = async (e) => {
      e.preventDefault()
      if(taskId) {
        editTask(taskId)
      } else {
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData)
        })
        const result = await response.json();
        setFormData({title: "", description: "", project: projectId, assignedTo: "", status: "", priority: "", deadline: ""})
        setIsOpen(false)
        fetchTasks()
      }
      
    }
    
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:5000/tasks/${projectId}`);
      const result = await response.json();
      setTasks(result)
    }

    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:5000/user/`);
      const result = await response.json();
      setUsers(result)
    }

    const fetchProjectDetails = async (projectId) => {
        const response = await fetch(`http://localhost:5000/projects/${projectId}`);
        const result = await response.json();
        setProjectDetails(result)
    }

    useEffect(() => {
      fetchProjectDetails(projectId)
      fetchUsers()
      fetchTasks()
    }, [])
    
  return (
    <div className='project-page-container'>
      <h2 className="name">{projectDetails.name}</h2>
      <p className="description">{projectDetails.description}</p>
      <p className="status">{projectDetails.status}</p>
      <p className="deadline">{projectDetails.deadline?.split('T')[0]}</p>
      {tasks.length === 0 && <div>No task found</div>}
      {tasks.map(task => (
        <div className="task-container" key={task._id}>
          <h2 className='task_title'>{task.title}</h2>
          <p className="description">Description: <span>{task.description}</span></p>
          <p className="assignedTo">Assigned to: <span>{task.assignedTo.email}</span></p>
          <p className="status">Status: <span>{task.status}</span></p>
          <p className="deadline">Deadline: <span>{task.deadline}</span></p>
          <div className="btns">
            <button onClick={()=>{handleEdit(task)}} className="edit">Edit</button>
            <button onClick={()=>{deleteTask(task._id)}} className="delete">Delete</button>
          </div>
        </div>
      ))}
      <button onClick={()=>{setIsOpen(true)}} className="add-task">Add task and assign memeber</button>
      {isOpen && <>
        <div key={"dk"}>
          <form onSubmit={(e)=>addTask(e)}>
          <div onClick={()=> {setIsOpen(false)}} className="close">X</div>
            <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder='Enter task name'/>
            <input id='description' type="text" name='description' value={formData.description} onChange={handleChange} placeholder='Enter description'/>
            <select name="assignedTo" id="assignedTo" value={formData.assignedTo} onChange={handleChange}>
              <option value="">Select member</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.email}</option>
              ))}
            </select>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
              <option value="">Select status</option>
              <option value="To Do">To do</option>
              <option value="In Progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
            <select name="priority" id="priority" value={formData.priority} onChange={handleChange}>
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input type="date" name='deadline' value={formData.deadline} onChange={handleChange}/>
          <button  className='add-task'>Save and Close</button>
          </form>
        </div>
      </>}
    </div>
  )
}

export default Project
