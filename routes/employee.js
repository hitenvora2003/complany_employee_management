var express = require('express');
var router = express.Router();
const ec = require('../controler/employee')


const mw = require('../middleware/auth')


router.get('/',mw.authCheck, ec.pageviews);
router.post('/createdata',mw.authCheck,ec.createdata)
router.delete('/:deleteid',mw.authCheck,ec.deleteData)
router.patch('/:editid',mw.authCheck,ec.updatedata)

module.exports = router;
