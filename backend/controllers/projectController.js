import Project from '../models/project.js'

export const getProject = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects)
    } catch(error) {
        res.status(200).json({message: error.message})
    }

}

export const createProject = async (req, res) => {
    const {name , description , members , deadline , status} = req.body;

    try {
        if(!name || !description || !members || !deadline || !status)
            res.status(400).json({message: "All fields are required"});
    
        const project = new Project({name, description, members, deadline, status});
        const savedProject = await project.save();
        res.status(201).json({message: "project created successfully",data: savedProject});
    } catch(error) {
        res.status(500).json({message: error.message})
    }
    
}

export const updateProject = async (req, res) => {
   try {
    const {projectId} = req.params;
    let updatedProject = await Project.findOneAndUpdate({_id: projectId},req.body,{new: true})

    if(!updatedProject) return res.status(500).json({message: "project not found"});
   
    console.log(updatedProject)
    res.status(200).json({message: "Project updated successfully",data: updatedProject})
   } catch(error) {
    res.status(500).json({message: error.message})
   }
}   

export const deleteProject = async (req, res) => {
    try {
        const {projectId} = req.params;

        const deletedProject = await Project.findByIdAndDelete(projectId)
        res.status(200).json({message: "project deleted successfully",data: deletedProject})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}   