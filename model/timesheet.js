// models/Timesheet.js
const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Enter Employee name']

    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, 'Enter task']
    },
    date: {
        type: Date,
        required: [true, 'Enter your Date']
    },
    hoursWorked: {
        type: Number,
        required: [true, 'Enter your time']
    }
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
