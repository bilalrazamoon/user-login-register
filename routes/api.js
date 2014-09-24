/**
 * Created by hafizbilalraza on 9/22/2014.
 */
var express = require('express'),
    router = express.Router(),
    api = require('../controllers/api');


/**
 * API routes.
 */

router.post('/register', api.register);

/**
 * API for wrong request.
 */

router.all('*',function(req,res){
    res.status(400).json({msg:'invalid api'})
});


module.exports = router;