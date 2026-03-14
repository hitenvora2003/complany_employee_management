// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    pro_title: {
        type: String,
        required: [true, 'Enter projecttitle']
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    startDate: {
        type: Date,
        required: [true, 'Enter Date']
    },
    endDate: {
        type: Date,
        required: [true, 'Enter Date']
    }
});

module.exports = mongoose.model('Project', projectSchema);
