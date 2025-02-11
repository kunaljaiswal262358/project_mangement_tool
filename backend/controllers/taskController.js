import Task from '../models/task.js'

export const getTask = async (req,res) => {
    try {
        const result = await Task.find();
        res.status(200).json(result)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const getTaskByProjectId = async (req,res) => {
    try {
        const {projectId} = req.params;
        const result = await Task.find({project: projectId}).populate("assignedTo");
        res.status(200).json(result)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const createTask = async (req, res) => {
    try {
        const {title, description, project, assignedTo, status, priority, deadline} = req.body;

    if(!title || !description || !project || !assignedTo || !status || !priority || !deadline) {
        return res.status(400).json({message: "All fields are required"})
    }

    const task = new Task({title, description, project, assignedTo, status, priority, deadline});
    const result = await task.save();
    res.status(201).json({message: "Task created successfully",data : result})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const updateTask = async (req, res) => {
    try {
        const {taskId} = req.params;
        const result = await Task.findByIdAndUpdate(taskId,req.body,{new : true})
        if(!result) return res.status(400).json({message: "Task not found"})
        res.status(200).json({message: "Task updated successfully0",data: result})
    }  catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const {taskId} = req.params;

        const result = await Task.findByIdAndDelete(taskId);
        if(!result) return res.status(400).json({message: "Task not found"})
        res.status(200).json({message: "Task deleted successfully",data: result})
    }   catch(error) {
        res.status(500).json({message: error.message})
    }
}