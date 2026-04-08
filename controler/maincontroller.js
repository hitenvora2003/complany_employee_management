const signup = require('../model/signup');
const department = require('../model/department');
const employee = require('../model/employee');
const project = require('../model/project');
const task = require('../model/task');
const timesheet = require('../model/timesheet');
const leave = require('../model/Leave');

exports.getalldata = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const type = req.query.type;

        // 🔹 CASE 1: No type → return all
        if (!type) {

            const [
                signups, departments, employees,
                projects, tasks, timesheets, leaves,
                totalUsers, totaldepartments, totalemployees,
                totalprojects, totaltasks, totaltimesheets, totalleaves
            ] = await Promise.all([

                signup.find().sort({ createdAt: -1 }).skip(skip).limit(limit),

                department.find().sort({ createdAt: -1 }).skip(skip).limit(limit),

                employee.find()
                    .populate('department')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                project.find()
                    .populate('department')
                    .populate({
                        path: 'employees',
                        populate: { path: 'department' }
                    })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                task.find()
                    .populate({
                        path: 'project',
                        populate: [
                            { path: 'department' },
                            {
                                path: 'employees',
                                populate: { path: 'department' }
                            }
                        ]
                    })
                    .populate({
                        path: 'assignedTo',
                        populate: { path: 'department' }
                    })
                    .populate('department')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                timesheet.find()
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                leave.find()
                    .populate({
                        path: "employee",
                        populate: { path: 'department' }
                    })
                    .populate('department')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                // 🔹 counts
                signup.countDocuments(),
                department.countDocuments(),
                employee.countDocuments(),
                project.countDocuments(),
                task.countDocuments(),
                timesheet.countDocuments(),
                leave.countDocuments()
            ]);

            return res.status(200).json({
                status: 'success',
                message: 'pagination successful',
                page,
                limit,

                totalUsers,
                totaldepartments,
                totalemployees,
                totalprojects,
                totaltasks,
                totaltimesheets,
                totalleaves,

                data: {
                    signups,
                    departments,
                    employees,
                    projects,
                    tasks,
                    timesheets,
                    leaves
                }
            });
        }

        // 🔹 CASE 2: Individual types

        if (type === "signup") {
            const data = await signup.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
            return res.json({ status: "success", page, limit, data });
        }

        if (type === "department") {
            const data = await department.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
            return res.json({ status: "success", page, limit, data });
        }

        if (type === "employee") {
            const data = await employee.find()
                .populate('department')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            return res.json({ status: "success", page, limit, data });
        }

        if (type === "project") {
            const data = await project.find()
                .populate('department')
                .populate({
                    path: 'employees',
                    populate: { path: 'department' }
                })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            return res.json({ status: "success", page, limit, data });
        }

        if (type === "task") {
            const data = await task.find()
                .populate({
                    path: 'project',
                    populate: [
                        { path: 'department' },
                        {
                            path: 'employees',
                            populate: { path: 'department' }
                        }
                    ]
                })
                .populate({
                    path: 'assignedTo',
                    populate: { path: 'department' }
                })
                .populate('department')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            return res.json({ status: "success", page, limit, data });
        }

        if (type === "timesheet") {
            const data = await timesheet.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            return res.json({ status: "success", page, limit, data });
        }

        if (type === "leave") {
            const data = await leave.find()
                .populate({
                    path: "employee",
                    populate: { path: 'department' }
                })
                .populate('department')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            return res.json({ status: "success", page, limit, data });
        }

        // 🔹 Invalid type
        return res.status(400).json({
            status: "fail",
            message: "Invalid type"
        });

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};