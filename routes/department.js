var express = require('express');
var router = express.Router();
const dc = require('../controler/department')
const mw = require('../middleware/auth')

router.get('/',mw.authCheck, dc.pageviews);
router.post('/createdata',mw.authCheck,dc.createdata)
router.delete('/:deleteid',mw.authCheck ,dc.deleteData)
router.patch('/:editid' ,mw.authCheck, dc.updatedata)

module.exports = router;