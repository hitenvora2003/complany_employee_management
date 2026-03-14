// models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentname: {
        type:String,
        required : [true,'Enter your departmnet']

    },
    location:{
            type:String,
        required : [true,'Enter your location']
    }
  
});

module.exports = mongoose.model('Department', departmentSchema);

