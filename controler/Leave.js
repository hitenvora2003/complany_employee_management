const user = require('../model/Leave')


exports.pageviews = async (req, res) => {
  try {
    const alldata = await user.find().populate({path:"employee",populate:{path:'department'}}).populate('department')
    console.log("=======",alldata)
    res.status(200).json({
      status: 'success',
      message: 'data find successfull',
      data: alldata
    })

  }
  catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,

    })
  }
}

exports.createdata = async (req, res) => {
  try {
    let passdata = req.body
    const data = await user.create(passdata)
    console.log(data);
    res.status(200).json({
      status: 'success',
      message: 'data create successfull',
      data: data
    })

  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    })
  }
}
exports.deleteData = async (req, res) => {
  try {
    const deleteid = req.params.deleteid
    const deleteData = await user.findByIdAndDelete(deleteid)
    res.status(200).json({
      status: 'success',
      message: 'data delete is success',
      data: deleteData

    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
}
exports.updatedata = async (req, res) => {
  try {

    const Id = req.params.editdata

    const editdata = await user.findByIdAndUpdate(Id, req.body, { new: true })
    res.status(200).json({
      status: 'success',
      message: 'data update is success',
      data: editdata

    })
  }
  catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error
    })
  }
}


