const express = require('express');
const path = require('path');
const moment = require('moment');
const passport = require('passport');

const router = express.Router();

const User = require('../models/user');
const Exercise = require('../models/exercise');
const Message = require('../models/message');
const Item = require('../models/item');
const middleware = require('../middleware/middleware');

router.get('/',middleware.isAdminLoggedIn,function(req,res){
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

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/admin/login');
});

router.get('/user/new',middleware.isAdminLoggedIn,function(req,res){
    res.render('new-user');
});

router.post('/user/new',middleware.isAdminLoggedIn,function(req,res){
    const Password = req.body.password;
	const newUser = {
		name : req.body.name,
		phoneNumber : req.body['phone-number'],
        username : req.body.email,
        isMember : false
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

router.get('/user',middleware.isAdminLoggedIn,function(req,res){
    User.find({},function(err,foundDocs){
        if(err){
            console.log(err);
        } else {
            res.render('view-user',{users : foundDocs});
        }
    });
});

router.post('/user/:id/delete',middleware.isAdminLoggedIn,function(req,res){
    User.findByIdAndDelete(req.params.id,function(){
        req.flash('success','User Deleted Successfully');
        res.redirect('/admin/user');
    });
});

router.get('/user/:id/modify',middleware.isAdminLoggedIn,function(req,res){
    User.findById(req.params.id,null,{orders:0},function(err,foundDoc){
        if(err){
            console.log(err);
        } else {
            res.render('modify-user',{User:foundDoc});
        }
    })
});

router.post('/user/:id/modify',middleware.isAdminLoggedIn,function(req,res){

    var updatedUser = {
        name:req.body.name,
        phoneNumber:req.body['phone-number'],
        username:req.body.email,
        isMember : req.body.status === 'Active' ? true : false
    };

    User.findByIdAndUpdate(req.params.id,updatedUser,{new:true},function(err,modifiedUser){
        if(err){
            console.log(err);
            req.flash('err','An error occured.');
            res.redirect('/admin/user');
        } else {
            req.flash('success','Data updated successfully');
            res.redirect('/admin/user');
            // modifiedUser.setPassword(req.body['new-password'],function(){
            //     modifiedUser.save();
            //     req.flash('success','Data updated successfully');
            //     res.redirect('/admin/user');
            // });
        }
    });

});

router.get('/item',middleware.isAdminLoggedIn,function(req,res){
    Item.find({},function(err,foundDocs){
        if(err){
            console.log(err);
        } else {
            res.render('view-item',{Item:foundDocs});
        }
    });
}); 

router.post('/item/:id/delete',middleware.isAdminLoggedIn,function(req,res){
    Item.findByIdAndDelete(req.params.id,function(){
        req.flash('success','Item Deleted Successfully');
        res.redirect('/admin/item');
    });
});

router.get('/item/:id/modify',middleware.isAdminLoggedIn,function(req,res){
    Item.findById(req.params.id,function(err,foundDoc){
        if(err){
            console.log(err);
        } else {
            res.render('modify-item',{Item:foundDoc});
        }
    })
});

router.post('/item/:id/modify',middleware.isAdminLoggedIn,function(req,res){

    var updatedItem = {
        Name : req.body.name,
        Price : req.body.price,
        Category : req.body.category,
        Units : req.body.units
    };

    Item.findByIdAndUpdate(req.params.id,updatedItem,{new:true},function(err){
        if(err){
            console.log(err);
            req.flash('err','An error occured.');
            res.redirect('/admin/item');
        } else {
            req.flash('success','Data updated successfully');
            res.redirect('/admin/item');
        }
    });
    
});

router.get('/item/new',middleware.isAdminLoggedIn,function(req,res){
    res.render('new-item');
});

router.post('/item/new',function(req,res){
    var newItem = {
        Name : req.body.name,
        Price : req.body.price,
        Category : req.body.category,
        Units : req.body.units
    };

    Item.insertMany(newItem,function(err,doc){
        if(err){
            console.log(err);
            req.flash('err','An error occured.');
            res.redirect('/admin/item');
        } else {
            req.flash('success','Data Inserted successfully');
            res.redirect('/admin/item');
        }
    });
});

module.exports = router;