var express = require('express');
var router = express.Router();

const tc = require('../controler/task')
const mw = require('../middleware/auth')

router.get('/',mw.authCheck, tc.pageviews);
router.post('/createdata',mw.authCheck,tc.createdata)
router.delete('/:deleteid',mw.authCheck,tc.deleteData)
router.patch('/:editid',mw.authCheck,tc.updatedata)

module.exports = router;