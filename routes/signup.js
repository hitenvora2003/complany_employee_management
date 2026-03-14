var express = require('express');
var router = express.Router();


const uc = require('../controler/signup')

// const mw = require('../middleware/auth')

/* GET home page. */
router.get('/', uc.pageview);
router.post('/createdata',uc.createdata)
router.post('/login',uc.login)

module.exports = router;