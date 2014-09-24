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

function sendMail(opt,cb){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.gmail.user,
            pass: config.gmail.pass
        }
    });
    opt.from="Node App <h.marqa@gmail.com>";
    transporter.sendMail(opt,cb);
}
exports.register=function(req,res,next){
    if(!req.body.email && !req.body.password && !req.body.password<4) return  res.status(400).json({msg:"Email and Password can't be blank"});
    if(req.body.email){
        if(!isEmail(req.body.email)) return res.status(400).json({msg:'Email is invalid'});
    }
    if(!req.body.password) return  res.status(400).json({msg:"Password can't be blank"});
    if(req.body.password.length<4) return  res.status(400).json({msg:'Password must be at least 4 characters long'});
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        verify:{}
    });
    User.findOne({email:req.body.email}, function(err,exist){
        if(err) return next(err);
        if(exist) return res.status(400).json({msg:'Email is already exist'+app.host});
        crypto.randomBytes(16, function(err, buf){
            if(err) return next(err);
            var code = buf.toString('hex');
            user.verify.code=code;
            user.save(function(err){
                if(err) return next(err);
                sendMail({
                        to:user.email,
                        subject:"Email confirmation via Node App",
                        text:"Thank you for registration!\n\nYour verification code is: "+code.toUpperCase()
                    },
                    function(err, info){
                        if(err) return next(err);
                        res.status(200).json({msg:'An e-mail has been sent to ' + user.email + ' for E-mail verification.'})
                    })
            })
        })
    })
};