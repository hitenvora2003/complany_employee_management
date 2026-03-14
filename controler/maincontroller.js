const signup = require('../model/signup')
const department = require('../model/department')
const employee = require('../model/employee')
const project = require('../model/project')
const task = require('../model/task')
const timesheet = require('../model/timesheet')
const leave = require('../model/Leave')
const { Query } = require('mongoose')

exports.getalldata = async (req, res) => {
    try {
        const page = (req.query.page) || 1
        const limit = (req.query.limit) || 10
        const skip = (page - 1) * limit

        const types = req.query.type
        if (!types) {

            const [signups, departments, employees, projects, tasks, timesheets, leaves] = await Promise.all([
                signup.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                department.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                employee.find().populate('department').sort({ createdAt: -1 }).skip(skip).limit(limit),
                project.find().populate('department').populate({path : 'employees',populate:{path: 'department'}}).sort({ createdAt: -1 }).skip(skip).limit(limit),
                task.find().populate({path: 'project',populate: [ { path: 'department' }, 
                { path: 'employees',populate: { path: 'department' }} ]}).populate({path :'assignedTo',populate :{path:'department',}}) .populate('department').sort({ createdAt: -1 }).skip(skip).limit(limit),
                timesheet.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                leave.find().populate({path:"employee",populate:{path:'department'}}).populate('department').sort({ createdAt: -1 }).skip(skip).limit(limit)
            ])

            res.status(200).json({
                status: 'success',
                page,
                limit,
                message: 'pagination successfull',
                data: {
                    signups, departments, employees, projects, tasks, timesheets, leaves
                }
            })

        }



    } catch (error) {
           res.status(200).json({
                status: 'faild',
                message: error.message
            })
    }
}