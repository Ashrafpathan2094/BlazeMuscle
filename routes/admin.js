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
        failureRedirect : "/login",
        failureFlash : true
    }
));

router.get('/user/new',function(req,res){
    res.render('new-user');
});

router.post('/user/new',function(req,res){
    const Password = req.body.password;
	const newUser = {
		name : req.body.name,
		phoneNumber : req.body['phone-number'],
		username : req.body.email
	};

	User.register(newUser , Password , function(err,user){
		if(err){
			console.log(err);
			req.flash('error','An error occured');
			return res.redirect("/admin/user/new");
		} else {
            req.flash('success','User added Successfully');
            return res.redirect('/admin/user/new');
		}
		
	});
});

router.get('/user',function(req,res){
    User.find({},function(err,foundDocs){
        if(err){
            console.log(err);
        } else {
            res.render('view-user',{users : foundDocs});
        }
    });
});

router.post('/user/:id/delete',function(req,res){
    User.findByIdAndDelete(req.params.id,function(){
        req.flash('success','User Deleted Successfully');
        res.redirect('/admin/user');
    });
});

router.get('/user/:id/modify',function(req,res){
    User.findById(req.params.id,null,{orders:0},function(err,foundDoc){
        if(err){
            console.log(err);
        } else {
            res.render('modify-user',{User:foundDoc});
        }
    })
});

router.post('/user/:id/modify',function(req,res){

    var updatedUser = {
        name:req.body.name,
        phoneNumber:req.body['phone-number'],
        username:req.body.email    
    };

    User.findByIdAndUpdate(req.params.id,updatedUser,{new:true},function(err,modifiedUser){
        if(err){
            console.log(err);
            req.flash('err','An error occured.');
            res.redirect('/admin/user');
        } else {
            modifiedUser.setPassword(req.body['new-password'],function(){
                modifiedUser.save();
                req.flash('success','Data updated successfully');
                res.redirect('/admin/user');
            });
        }
    });

});

module.exports = router;