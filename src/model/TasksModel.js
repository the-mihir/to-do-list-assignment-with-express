const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true, versionKey: false });


const TaskModel = mongoose.model("Tasks", tasksSchema);
module.exports = TaskModel;