// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeename: {
        type: String,
        required: [true, 'Enter employee name']
    },
    email: {
        type: String,
        required: [true, 'Enter your email']
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    role: {
        type: String,
        required: [true, 'Enter Role']
    },
    joiningDate: {
        type: Date,
        required: [true, 'Enter Date']


    }
});

module.exports = mongoose.model('Employee', employeeSchema);
