/**
 * Created by hafizbilalraza on 9/22/2014.
 */
var express = require('express'),
    nodemailer = require('nodemailer');
    crypto = require('crypto'),
    User = require('../models/User'),
    config = require('../config');

function isEmail(email){
    var re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

exports.register(function(req,res,next){
    var error={msg:''};
    if(!req.body.username || !req.body.password)
        return res.status(400).json({msg:'invalid user'});
    if(!isEmail(req.body.email))
        error.msg+='Email is not valid\n';
    if(req.body.password<4)
        error.msg+='Password must me greater than';
    if(error.msg){
        return res.status(400).json(error)
    }
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({email: user.email}, function (err,exist) {
        if(err) return next(err);
        if(exist){
            error.msg+="Account with that email address already exists.";
            return res.json(error)
        }
    })
});