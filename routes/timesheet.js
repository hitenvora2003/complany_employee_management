var express = require('express');
var router = express.Router();


const tsc = require('../controler/timesheet')
const mw = require('../middleware/auth')

router.get('/',mw.authCheck, tsc.pageviews);
router.post('/createdata',mw.authCheck,tsc.createdata)
router.delete('/:deleteid',mw.authCheck,tsc.deleteData)
router.patch('/:editid',mw.authCheck,tsc.updatedata)
module.exports = router;