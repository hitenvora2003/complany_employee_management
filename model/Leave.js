// models/Leave.js
const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    startDate:{
        type : Date,
        required : [true,'Enter Date']
    },
    endDate: {
        type : Date,
        required : [true,'Enter Date']
    },
    reason: {
        type : String,
        required : [true,'Enter Reason']
    },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

module.exports = mongoose.model('Leave', leaveSchema);
