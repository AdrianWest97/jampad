var express = require('express');
var router = express.Router();

let accountController = require('../controllers/accountController')

router.get('/', accountController.account)
module.exports = router;
