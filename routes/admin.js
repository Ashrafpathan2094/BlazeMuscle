const express = require('express');
const path = require('path');
const moment = require('moment');
const passport = require('passport');

const router = express.Router();

const User = require('../models/user');
const Exercise = require('../models/exercise');
const Message = require('../models/message');
const middleware = require('../middleware/middleware');

router.get('/',function(req,res){
    User.find({},function(err,foundUsers){
        if(err){
            console.log(err);
        } else {
            var userCount = foundUsers.length;
            var statsObject = {
                user : userCount
            };
            Message.find({},function(err,docs){
                res.render('dashboard',{stats : statsObject,messages : docs});
            });
        }
    });
});

router.get('/login',function(req,res){
    res.render('admin-login');
});

router.post('/login',
    passport.authenticate('admin-local',{
        successRedirect : '/admin',
        failureRedirect : "/admin/login",
        failureFlash : true
    }
));

module.exports = router;