var express = require('express');
var router = express.Router();
var {auth} = require('../middleware/auth');


let authController = require('../controllers/authController');
let noteController = require('../controllers/noteController');

router.post('/login', authController.signIn);
router.post('/register', authController.signUp)

router.post('/note',auth, noteController.save)
router.get('/notes',auth, noteController.load)
router.put('/notes/:id',auth, noteController.update)
router.delete('/notes/:id',auth, noteController.delete)

router.use('/account', auth, require('./users'));

module.exports = router;
