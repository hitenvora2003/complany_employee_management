var express = require('express');
var router = express.Router();
const mc = require('../controler/maincontroller')
const mw = require('../middleware/auth')
router.get('/',mw.authCheck, mc.getalldata);


module.exports = router;