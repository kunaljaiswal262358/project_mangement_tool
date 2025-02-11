import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    project: {type: mongoose.Schema.Types.ObjectId, required: true},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: {type: String, enum: ["To Do","In Progress","Completed"],default: "To Do"},
    priority: {type: String, enum: ["Low","Medium","High"],required: true},
    deadline: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()}
})

const Task = mongoose.model('Task',TaskSchema);

export default Task;