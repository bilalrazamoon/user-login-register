/**
 * Created by hafizbilalraza on 9/22/2014.
 */
var express = require('express'),
    router = express.Router(),
    api = require('../controllers/users');


/**
 * API routes.
 */
//register user and return msg
router.post('/register', api.register);
//login user and return userId and msg
router.post('/login', api.login);
//get all users
router.get('/users', api.getUsers);

//user middleware
router.param('userId', api.param);
// update user
router.put('/users/:userId', api.updateUser);
//delete user
router.delete('/users/:userId', api.delUser);
//password reset
/*router.post('users/:userId', api.passwordReset);*/

/**
 * API for wrong request.
 */

router.all('*',function(req,res){
    res.status(400).json({msg:'invalid api'})
});


module.exports = router;