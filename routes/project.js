var express = require('express');
var router = express.Router();

const pc = require('../controler/project')
const mw = require('../middleware/auth')

router.get('/',mw.authCheck, pc.pageviews);
router.post('/createdata',mw.authCheck,pc.createdata)
router.delete('/:deleteid',mw.authCheck,pc.deleteData)
router.patch('/:editid',mw.authCheck,pc.updatedata)

module.exports = router;