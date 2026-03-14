// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Enter your Task Title']
    },
    description: {
        type: String,
        required: [true, 'Enter your Task Title']
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Enter project']
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',

    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'Enter department']

    },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    deadline: {
        type: String,
        required: [true, 'Enter your Deadline']
    }
});

module.exports = mongoose.model('Task', taskSchema);
