var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

/**Auth API */
router.post('/auth/register',
    userValidator.userCreateValidator,
    userValidator.handleValidationErrors,
    userController.register);
router.post('/auth/login',
    userValidator.userLoginValidator,
    userValidator.handleValidationErrors,
    userController.login);
module.exports = router;
