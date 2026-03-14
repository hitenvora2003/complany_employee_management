var express = require('express');
var router = express.Router();
const lc = require('../controler/Leave')

const mw = require('../middleware/auth')

router.get('/',mw.authCheck, lc.pageviews);
router.post('/createdata',mw.authCheck,lc.createdata)
router.delete('/:deleteid',mw.authCheck,lc.deleteData)
router.patch('/:editid',mw.authCheck,lc.updatedata)

module.exports = router;