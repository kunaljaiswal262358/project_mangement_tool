import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    members: [{
        userId: {type: mongoose.Schema.Types.ObjectId}
    }],
    deadline: {type: Date, required: true},
    status: {type: String, enum: ["Active","Completed"]},
    createdAt: {type: Date, default: Date.now()}
})

const Project = mongoose.model('Project',ProjectSchema);
export default Project;

